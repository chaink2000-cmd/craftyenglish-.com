# Crafty English — Firestore Security Specification (Phase 0 TDD)

## 1. Core Data Invariants
1. **Strict RBAC Separation**: Standard users can never set `role: "admin"` on `/users/{userId}` or create `/admins/{userId}`. Only verified administrators (bootstrapped admin email `chaink2000@gmail.com` with `email_verified == true` or existing `/admins/{uid}` members) can manage roles, courses, modules, lessons, questions, quizzes, announcements, and website settings.
2. **PII Isolation**: User email addresses and account statuses reside in `/users/{userId}/private/{docId}` readable only by the account owner or an admin—never via blanket signed-in reads.
3. **Immutable Outcomes & Answer Keys**:
   - Official answer keys in `/questions/{questionId}` are admin-writable only.
   - `/quizAttempts/{attemptId}` records are append-only by their owner (`uid == request.auth.uid`), with bounded scores (`0 <= score <= totalQuestions`, `0 <= percentage <= 100`) and immutable after creation (`allow update, delete: if isAdmin()`).
4. **Query Isolation (No O(n) List Leaks)**: Every `allow list` rule on private/user-scoped collections (`quizAttempts`, `studentProgress`, `bookmarks`, `certificates`, `contactInquiries`) enforces `resource.data.uid == request.auth.uid || isAdmin()`.
5. **Temporal Integrity & Size Bounds**: Every `createdAt` / `updatedAt` / `issuedAt` requires `request.time`, every document ID satisfies `^[a-zA-Z0-9_-]+$` (`<= 128` chars), and every string/list field enforces strict `.size()` bounds.

## 2. The "Dirty Dozen" Adversarial Payloads (Must Return PERMISSION_DENIED)
1. **Self-Privilege Escalation on Signup**: `CREATE /users/user123` with `{ ..., "role": "admin" }` by a non-admin user -> DENIED (non-admin create requires `role == 'student'`).
2. **Role Mutation on Profile Update**: `UPDATE /users/user123` with `{ "role": "admin" }` by `user123` -> DENIED (`affectedKeys().hasOnly(...)` excludes `role`).
3. **Shadow Field Injection**: `CREATE /bookmarks/bm1` with `{ ..., "isAdminOverride": true }` -> DENIED (`hasOnly` key guard).
4. **Other-User PII Read**: `GET /users/victimUid/private/info` by `attackerUid` -> DENIED.
5. **Question Answer Key Tampering**: `UPDATE /questions/q1` `{ "correctAnswer": "Fake" }` by student -> DENIED (admin-only write).
6. **Quiz Attempt Score Inflation After Submission**: `UPDATE /quizAttempts/att1` `{ "score": 100, "percentage": 100 }` by student -> DENIED (attempts immutable for students).
7. **Forged Timestamp Spoofing**: `CREATE /studentProgress/prog1` with `updatedAt: "2099-01-01T00:00:00Z"` -> DENIED (`updatedAt == request.time`).
8. **Cross-Owner Bookmark Hijack**: `CREATE /bookmarks/bm2` with `{ "uid": "victimUid" }` by `attackerUid` -> DENIED (`uid == request.auth.uid`).
9. **ID Poisoning Attack**: `CREATE /bookmarks/<1500 chars>` -> DENIED (`isValidId` rejects `size > 128` and invalid chars).
10. **Blanket List Scraping**: `LIST /quizAttempts` without `.where("uid", "==", auth.uid)` by student -> DENIED (`resource.data.uid == request.auth.uid`).
11. **Unverified Admin Email Spoof**: Signed-in user with `email == 'chaink2000@gmail.com'` and `email_verified == false` attempting `CREATE /courses/c1` -> DENIED (`email_verified == true` enforced).
12. **Contact Inquiry Status Hijacking**: Student creating `/contactInquiries/inq1` with `status: "resolved"` -> DENIED (`status == 'open'` required on create).
