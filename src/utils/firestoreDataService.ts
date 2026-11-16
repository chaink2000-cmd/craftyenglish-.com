import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  deleteDoc,
  where,
  serverTimestamp,
  orderBy,
  limit,
  Timestamp,
} from 'firebase/firestore';
import { db, auth, handleFirestoreError, OperationType } from '../firebase';
import {
  AppLanguage,
  BookmarkRecord,
  CertificateRecord,
  FirebaseUserProfile,
  PracticeQuestion15,
  QuizAttemptRecord,
  SiteConfigRecord,
  StudentProgressRecord,
} from '../types';

function formatTimestamp(ts: unknown): string {
  if (ts instanceof Timestamp) {
    return ts.toDate().toISOString();
  }
  if (typeof ts === 'string') return ts;
  return new Date().toISOString();
}

export async function ensureUserDocuments(
  uid: string,
  displayName: string,
  email: string,
  preferredLanguage: AppLanguage = 'en'
): Promise<FirebaseUserProfile> {
  const userPath = `users/${uid}`;
  const privatePath = `users/${uid}/private/info`;
  const cleanName = (displayName || 'Crafty Scholar').trim().slice(0, 100);
  const cleanEmail = (email || 'scholar@craftyenglish.edu').trim().slice(0, 200);

  let publicSnap;
  try {
    publicSnap = await getDoc(doc(db, 'users', uid));
  } catch (err) {
    handleFirestoreError(err, OperationType.GET, userPath);
  }

  let isAdminUser = email.toLowerCase() === 'chaink2000@gmail.com' && auth.currentUser?.emailVerified === true;
  if (!isAdminUser) {
    try {
      const adminDoc = await getDoc(doc(db, 'admins', uid));
      if (adminDoc.exists()) isAdminUser = true;
    } catch {
      // Non-admin user simply does not have an admin record
    }
  }

  if (!publicSnap || !publicSnap.exists()) {
    try {
      await setDoc(doc(db, 'users', uid), {
        uid,
        displayName: cleanName,
        role: 'student',
        learningLevel: 'Intermediate',
        xp: 100,
        streakDays: 1,
        completedModulesCount: 0,
        preferredLanguage,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, userPath);
    }
  }

  let privateSnap;
  try {
    privateSnap = await getDoc(doc(db, 'users', uid, 'private', 'info'));
  } catch (err) {
    handleFirestoreError(err, OperationType.GET, privatePath);
  }

  if (!privateSnap || !privateSnap.exists()) {
    try {
      await setDoc(doc(db, 'users', uid, 'private', 'info'), {
        uid,
        email: cleanEmail,
        accountStatus: 'active',
        updatedAt: serverTimestamp(),
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, privatePath);
    }
  }

  const latestPublic = await getDoc(doc(db, 'users', uid));
  const data = latestPublic.data() || {};
  const privData = privateSnap?.data() || {};

  return {
    uid,
    displayName: (data.displayName as string) || cleanName,
    email: cleanEmail,
    role: isAdminUser ? 'admin' : ((data.role as FirebaseUserProfile['role']) || 'student'),
    learningLevel: (data.learningLevel as FirebaseUserProfile['learningLevel']) || 'Intermediate',
    xp: typeof data.xp === 'number' ? data.xp : 100,
    streakDays: typeof data.streakDays === 'number' ? data.streakDays : 1,
    completedModulesCount: typeof data.completedModulesCount === 'number' ? data.completedModulesCount : 0,
    preferredLanguage: (data.preferredLanguage as AppLanguage) || preferredLanguage,
    accountStatus: (privData.accountStatus as 'active' | 'suspended') || 'active',
  };
}

export async function updateUserStatsInFirestore(
  uid: string,
  updates: Partial<Pick<FirebaseUserProfile, 'displayName' | 'learningLevel' | 'xp' | 'streakDays' | 'completedModulesCount' | 'preferredLanguage'>>
): Promise<void> {
  const path = `users/${uid}`;
  try {
    await updateDoc(doc(db, 'users', uid), {
      ...updates,
      updatedAt: serverTimestamp(),
    });
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, path);
  }
}

export async function saveStudentModuleProgress(
  uid: string,
  moduleId: string,
  moduleTitle: string,
  status: 'in_progress' | 'completed',
  progressPercent: number
): Promise<void> {
  const docId = `${uid}_${moduleId}`.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 128);
  const path = `studentProgress/${docId}`;
  try {
    const existingRef = doc(db, 'studentProgress', docId);
    const snap = await getDoc(existingRef);
    if (!snap.exists()) {
      await setDoc(existingRef, {
        uid,
        moduleId: moduleId.slice(0, 128),
        moduleTitle: moduleTitle.slice(0, 180),
        status,
        progressPercent: Math.min(100, Math.max(0, Math.round(progressPercent))),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    } else if (snap.data()?.status !== 'completed') {
      await updateDoc(existingRef, {
        moduleTitle: moduleTitle.slice(0, 180),
        status,
        progressPercent: Math.min(100, Math.max(0, Math.round(progressPercent))),
        updatedAt: serverTimestamp(),
      });
    }
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, path);
  }
}

export async function recordQuizAttemptInFirestore(
  uid: string,
  payload: {
    quizId: string;
    quizTitle: string;
    category: string;
    score: number;
    totalQuestions: number;
    mode: 'timed' | 'untimed';
  }
): Promise<void> {
  const attemptId = `att_${uid.slice(0, 12)}_${Date.now()}`;
  const path = `quizAttempts/${attemptId}`;
  const safeTotal = Math.max(1, Math.min(200, Math.round(payload.totalQuestions)));
  const safeScore = Math.max(0, Math.min(safeTotal, Math.round(payload.score)));
  const percentage = Math.round((safeScore / safeTotal) * 100);

  try {
    await setDoc(doc(db, 'quizAttempts', attemptId), {
      uid,
      quizId: payload.quizId.slice(0, 128),
      quizTitle: payload.quizTitle.slice(0, 160),
      category: payload.category.slice(0, 80),
      score: safeScore,
      totalQuestions: safeTotal,
      percentage,
      mode: payload.mode,
      createdAt: serverTimestamp(),
    });
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, path);
  }
}

export async function toggleBookmarkInFirestore(
  uid: string,
  item: { itemId: string; itemType: 'lesson' | 'question' | 'author'; title: string; category: string },
  currentlyBookmarked: boolean
): Promise<void> {
  const safeItemId = item.itemId.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 80);
  const docId = `${uid.slice(0, 32)}_${safeItemId}`;
  const path = `bookmarks/${docId}`;
  try {
    if (currentlyBookmarked) {
      await deleteDoc(doc(db, 'bookmarks', docId));
    } else {
      await setDoc(doc(db, 'bookmarks', docId), {
        uid,
        itemId: safeItemId,
        itemType: item.itemType,
        title: item.title.slice(0, 200),
        category: item.category.slice(0, 80),
        createdAt: serverTimestamp(),
      });
    }
  } catch (err) {
    handleFirestoreError(err, currentlyBookmarked ? OperationType.DELETE : OperationType.CREATE, path);
  }
}

export async function issueCertificateInFirestore(
  uid: string,
  studentName: string,
  courseTitle: string
): Promise<CertificateRecord> {
  const safeCourseSlug = courseTitle.replace(/[^a-zA-Z0-9]/g, '').slice(0, 20) || 'COURSE';
  const certId = `cert_${uid.slice(0, 16)}_${safeCourseSlug}`;
  const certificateCode = `CE-${safeCourseSlug.toUpperCase()}-${uid.slice(0, 6).toUpperCase()}`;
  const path = `certificates/${certId}`;

  try {
    const ref = doc(db, 'certificates', certId);
    const existingSnap = await getDoc(ref);
    if (!existingSnap.exists()) {
      await setDoc(ref, {
        uid,
        certificateCode,
        studentName: studentName.slice(0, 120),
        courseTitle: courseTitle.slice(0, 180),
        issuedAt: serverTimestamp(),
      });
    }
    const freshSnap = await getDoc(ref);
    const data = freshSnap.data() || {};
    return {
      id: certId,
      uid,
      certificateCode: (data.certificateCode as string) || certificateCode,
      studentName: (data.studentName as string) || studentName,
      courseTitle: (data.courseTitle as string) || courseTitle,
      issuedAt: formatTimestamp(data.issuedAt),
    };
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, path);
  }
}

export function subscribeUserProgress(
  uid: string,
  onData: (items: StudentProgressRecord[]) => void
) {
  const path = 'studentProgress';
  const q = query(collection(db, path), where('uid', '==', uid));
  return onSnapshot(
    q,
    (snap) => {
      const list: StudentProgressRecord[] = snap.docs.map((d) => {
        const data = d.data();
        return {
          id: d.id,
          uid: data.uid,
          moduleId: data.moduleId,
          moduleTitle: data.moduleTitle,
          status: data.status,
          progressPercent: data.progressPercent,
          updatedAt: formatTimestamp(data.updatedAt),
        };
      });
      onData(list);
    },
    (err) => handleFirestoreError(err, OperationType.LIST, path)
  );
}

export function subscribeUserQuizAttempts(
  uid: string,
  onData: (items: QuizAttemptRecord[]) => void
) {
  const path = 'quizAttempts';
  const q = query(
    collection(db, path),
    where('uid', '==', uid),
    orderBy('createdAt', 'desc'),
    limit(25)
  );
  return onSnapshot(
    q,
    (snap) => {
      const list: QuizAttemptRecord[] = snap.docs.map((d) => {
        const data = d.data();
        return {
          id: d.id,
          uid: data.uid,
          quizId: data.quizId,
          quizTitle: data.quizTitle,
          category: data.category,
          score: data.score,
          totalQuestions: data.totalQuestions,
          percentage: data.percentage,
          mode: data.mode,
          createdAt: formatTimestamp(data.createdAt),
        };
      });
      onData(list);
    },
    (err) => handleFirestoreError(err, OperationType.LIST, path)
  );
}

export function subscribeUserBookmarks(
  uid: string,
  onData: (items: BookmarkRecord[]) => void
) {
  const path = 'bookmarks';
  const q = query(collection(db, path), where('uid', '==', uid));
  return onSnapshot(
    q,
    (snap) => {
      const list: BookmarkRecord[] = snap.docs.map((d) => {
        const data = d.data();
        return {
          id: d.id,
          uid: data.uid,
          itemId: data.itemId,
          itemType: data.itemType,
          title: data.title,
          category: data.category,
          createdAt: formatTimestamp(data.createdAt),
        };
      });
      onData(list);
    },
    (err) => handleFirestoreError(err, OperationType.LIST, path)
  );
}

export function subscribeUserCertificates(
  uid: string,
  onData: (items: CertificateRecord[]) => void
) {
  const path = 'certificates';
  const q = query(collection(db, path), where('uid', '==', uid));
  return onSnapshot(
    q,
    (snap) => {
      const list: CertificateRecord[] = snap.docs.map((d) => {
        const data = d.data();
        return {
          id: d.id,
          uid: data.uid,
          certificateCode: data.certificateCode,
          studentName: data.studentName,
          courseTitle: data.courseTitle,
          issuedAt: formatTimestamp(data.issuedAt),
        };
      });
      onData(list);
    },
    (err) => handleFirestoreError(err, OperationType.LIST, path)
  );
}

export async function submitContactInquiryToFirestore(
  uid: string,
  payload: { senderName: string; subject: string; message: string }
): Promise<void> {
  const inquiryId = `inq_${uid.slice(0, 10)}_${Date.now()}`;
  const path = `contactInquiries/${inquiryId}`;
  try {
    await setDoc(doc(db, 'contactInquiries', inquiryId), {
      uid,
      senderName: payload.senderName.trim().slice(0, 120),
      subject: payload.subject.trim().slice(0, 180),
      message: payload.message.trim().slice(0, 2000),
      status: 'open',
      createdAt: serverTimestamp(),
    });
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, path);
  }
}

// --- Admin Firestore Helpers ---
export async function fetchAllQuestionsFromFirestore(): Promise<PracticeQuestion15[]> {
  const path = 'questions';
  try {
    const snap = await getDocs(collection(db, path));
    return snap.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        moduleNumber: Number(data.moduleId?.replace(/\D/g, '') || 1),
        moduleTitle: data.topic || 'Custom CMS Question',
        topic: data.topic || 'Grammar',
        subtopic: data.examCategory || 'General',
        format: (data.questionType || 'mcq') as PracticeQuestion15['format'],
        difficulty: (data.difficulty || 'Intermediate') as PracticeQuestion15['difficulty'],
        language: (data.language || 'bilingual') as PracticeQuestion15['language'],
        examCategory: data.examCategory || 'Competitive Grammar',
        sourceType: (data.sourceType || 'Original Practice') as PracticeQuestion15['sourceType'],
        prompt: data.prompt,
        options: Array.isArray(data.options) ? data.options : [],
        correctAnswer: data.correctAnswer,
        explanationEn: data.explanationEn,
        explanationHi: data.explanationHi,
      };
    });
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, path);
  }
}

export async function adminSaveQuestionToFirestore(
  adminUid: string,
  qItem: Omit<PracticeQuestion15, 'id'> & { id?: string }
): Promise<string> {
  const questionId = (qItem.id || `q_${Date.now()}`).replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 128);
  const path = `questions/${questionId}`;
  try {
    const ref = doc(db, 'questions', questionId);
    const snap = await getDoc(ref);
    const payload = {
      id: questionId,
      prompt: qItem.prompt.trim().slice(0, 2000),
      questionType: qItem.format.slice(0, 60),
      topic: qItem.topic.trim().slice(0, 120),
      moduleId: `mod-${qItem.moduleNumber || 1}`,
      difficulty: qItem.difficulty,
      examCategory: qItem.examCategory.trim().slice(0, 100),
      language: qItem.language,
      options: (qItem.options || []).slice(0, 8).map((o) => o.slice(0, 400)),
      correctAnswer: qItem.correctAnswer.trim().slice(0, 500),
      explanationEn: qItem.explanationEn.trim().slice(0, 2000),
      explanationHi: (qItem.explanationHi || qItem.explanationEn).trim().slice(0, 2000),
      sourceType: qItem.sourceType,
      createdBy: adminUid,
      updatedAt: serverTimestamp(),
    };
    if (!snap.exists()) {
      await setDoc(ref, { ...payload, createdAt: serverTimestamp() });
    } else {
      await setDoc(ref, { ...payload, createdAt: snap.data().createdAt }, { merge: false });
    }
    return questionId;
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, path);
  }
}

export async function adminDeleteQuestionFromFirestore(questionId: string): Promise<void> {
  const path = `questions/${questionId}`;
  try {
    await deleteDoc(doc(db, 'questions', questionId));
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, path);
  }
}

export async function adminSaveSiteConfig(
  adminUid: string,
  config: SiteConfigRecord
): Promise<void> {
  const path = 'settings/siteConfig';
  try {
    await setDoc(doc(db, 'settings', 'siteConfig'), {
      siteName: config.siteName.trim().slice(0, 120),
      tagline: config.tagline.trim().slice(0, 200),
      educatorName: config.educatorName.trim().slice(0, 120),
      contactEmail: config.contactEmail.trim().slice(0, 200),
      heroNotice: config.heroNotice.trim().slice(0, 300),
      updatedBy: adminUid,
      updatedAt: serverTimestamp(),
    });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, path);
  }
}

export async function adminListAllStudents(): Promise<FirebaseUserProfile[]> {
  const path = 'users';
  try {
    const snap = await getDocs(collection(db, path));
    const results: FirebaseUserProfile[] = [];
    for (const d of snap.docs) {
      const data = d.data();
      let email = 'Private / Verified Scholar';
      let accountStatus: 'active' | 'suspended' = 'active';
      try {
        const privSnap = await getDoc(doc(db, 'users', d.id, 'private', 'info'));
        if (privSnap.exists()) {
          email = privSnap.data().email || email;
          accountStatus = privSnap.data().accountStatus || 'active';
        }
      } catch {
        // Ignore missing private doc
      }
      results.push({
        uid: d.id,
        displayName: data.displayName || 'Scholar',
        email,
        role: data.role || 'student',
        learningLevel: data.learningLevel || 'Intermediate',
        xp: data.xp || 0,
        streakDays: data.streakDays || 0,
        completedModulesCount: data.completedModulesCount || 0,
        preferredLanguage: data.preferredLanguage || 'en',
        accountStatus,
      });
    }
    return results;
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, path);
  }
}

export async function adminToggleStudentAccountStatus(
  uid: string,
  nextStatus: 'active' | 'suspended'
): Promise<void> {
  const path = `users/${uid}/private/info`;
  try {
    await updateDoc(doc(db, 'users', uid, 'private', 'info'), {
      accountStatus: nextStatus,
      updatedAt: serverTimestamp(),
    });
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, path);
  }
}
