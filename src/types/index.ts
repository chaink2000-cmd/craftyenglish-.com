export type NavTab =
  | 'home'
  | 'grammar'
  | 'literature'
  | 'speech-lab'
  | 'vocab'
  | 'writing-studio'
  | 'mcqs'
  | 'competitive'
  | 'resources'
  | 'coach'
  | 'progress'
  | 'about'
  | 'contact'
  | 'mpesb-paper1'
  | 'syntax-games'
  | 'pricing'
  | 'admin';

export type AppLanguage = 'en' | 'hi';
export type ThemeMode = 'light' | 'dark';
export type TutorLearningMode = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';

export type LiteratureTrack = 'paper1' | 'net-mpset-paper2' | 'mp-grade1' | 'mp-grade2';

export interface PracticePreset {
  view: 'interactive' | 'yearwise-archive' | 'practice-15';
  mode: 'practice' | 'timed';
  examCategory?: string;
  moduleNumber?: number;
  nonce: number;
}

export type ResourceSubTab = 'notes' | 'pdf' | 'charts';

// --- 37-Module Bilingual Grammar Curriculum Types ---
export type GrammarLevelNumber = 1 | 2 | 3 | 4 | 5 | 6;

export interface BilingualExample {
  en: string;
  hi: string;
  note?: string;
}

export interface BilingualRule {
  titleEn: string;
  titleHi: string;
  explanationEn: string;
  explanationHi: string;
  formula?: string;
  correctExample: BilingualExample;
  incorrectExample?: string;
}

export interface BilingualComparisonTable {
  titleEn: string;
  titleHi: string;
  headers: string[];
  rows: string[][];
}

export interface BilingualSubtopicLesson {
  id: string;
  titleEn: string;
  titleHi: string;
  objectivesEn: string[];
  objectivesHi: string[];
  introEn: string;
  introHi: string;
  definitionEn: string;
  definitionHi: string;
  detailedExplanationEn: string;
  detailedExplanationHi: string;
  typesClassification: {
    nameEn: string;
    nameHi: string;
    descriptionEn: string;
    descriptionHi: string;
    examples: BilingualExample[];
  }[];
  rules: BilingualRule[];
  structuresAndFormulas: string[];
  examples: BilingualExample[]; // >= 10 examples per key subtopic
  comparisonTables: BilingualComparisonTable[];
  realLifeApplicationsEn: string[];
  realLifeApplicationsHi: string[];
  commonMistakes: {
    wrong: string;
    right: string;
    reasonEn: string;
    reasonHi: string;
    britishVsAmericanNote?: string;
  }[];
  examPointsEn: string[];
  examPointsHi: string[];
  summaryEn: string;
  summaryHi: string;
}

export type InteractiveQuestionFormat =
  | 'mcq'
  | 'fill-blank'
  | 'true-false'
  | 'match-following'
  | 'identify-error'
  | 'sentence-correction'
  | 'sentence-transformation'
  | 'drag-drop'
  | 'arrange-words'
  | 'identify-pos'
  | 'tense-identification'
  | 'active-passive'
  | 'direct-indirect'
  | 'correct-word'
  | 'paragraph-grammar';

export type QuestionDifficulty = 'Beginner' | 'Easy' | 'Intermediate' | 'Advanced' | 'Expert';

export interface PracticeQuestion15 {
  id: string;
  moduleNumber: number;
  moduleTitle: string;
  topic: string;
  subtopic: string;
  format: InteractiveQuestionFormat;
  difficulty: QuestionDifficulty;
  language: 'en' | 'hi' | 'bilingual';
  examCategory: string;
  sourceType: 'Original Practice' | 'Verified PYQ';
  examReference?: string;
  passage?: string; // for paragraph-grammar
  prompt: string;
  promptHi?: string;
  options?: string[]; // for mcq, true-false, identify-error, identify-pos, tense-identification, correct-word, paragraph-grammar
  matchPairs?: { left: string; right: string }[]; // for match-following
  dragItems?: string[]; // for drag-drop or arrange-words
  dropTargets?: string[]; // for drag-drop
  correctAnswer: string; // canonical answer string (JSON or exact string)
  explanationEn: string;
  explanationHi: string;
}

export interface GrammarModule37 {
  id: string;
  moduleNumber: number;
  levelNumber: GrammarLevelNumber;
  levelTitle: string;
  levelTitleHi: string;
  titleEn: string;
  titleHi: string;
  estimatedMinutes: number;
  visualFocus: string;
  lessons: BilingualSubtopicLesson[];
  practiceExercises: PracticeQuestion15[];
  mcqs: PracticeQuestion15[];
  topicAssessment: PracticeQuestion15[];
  revisionTest: PracticeQuestion15[];
}

// --- Legacy Visual Lab Types (Preserved for 7-Pillar Visual Interactive Diagrams) ---
export type GrammarCategory =
  | 'Parts of Speech'
  | 'Determiners & Articles'
  | 'Tenses & Agreement'
  | 'Transformations'
  | 'Clauses & Syntax'
  | 'Word Power'
  | 'Stylistics & Errors';

export type GrammarVisualType =
  | 'parts-of-speech'
  | 'verbs-modifiers'
  | 'prepositions-motion'
  | 'articles-quantifiers'
  | 'tenses-timeline'
  | 'concord-balance'
  | 'voice-transform'
  | 'narration-conditionals'
  | 'clauses-bridge'
  | 'morphology-roots'
  | 'figures-of-speech'
  | 'prosody-scansion';

export interface GrammarFlowStep {
  step: string;
  label: string;
  detail: string;
  example?: string;
}

export interface GrammarTableData {
  title: string;
  caption?: string;
  headers: string[];
  rows: string[][];
}

export interface GrammarTopic {
  id: string;
  moduleNumber: string;
  title: string;
  category: GrammarCategory;
  level: 'Foundation' | 'Intermediate' | 'Advanced' | 'Competitive / NET & TET';
  summary: string;
  visualAssetKey: 'parts-tree' | 'tenses-timeline' | 'voice-bridge' | 'clauses-arch' | 'stylistics-prosody';
  visualCaption: string;
  animatedDiagramType: GrammarVisualType;
  flowchartTitle: string;
  flowchartSteps: GrammarFlowStep[];
  tables: GrammarTableData[];
  keyRules: {
    rule: string;
    explanation: string;
    formula?: string;
    correctExample: string;
    incorrectExample: string;
    commonPitfall: string;
  }[];
  quickCheck: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface LiteratureUnit {
  id: string;
  title: string;
  examCoverage: ('NTA NET' | 'MPSET' | 'MPESB Grade 1' | 'MPESB Grade 2' | 'MP TET Grade 3')[];
  periodOrDomain: string;
  overview: string;
  keyWritersAndWorks: {
    writer: string;
    years: string;
    majorWorks: string[];
    criticalThemes: string;
    highYieldExamNote: string;
  }[];
  theoreticalFrameworks?: string[];
  pedagogyInsights?: string;
  pastExamTrends: string[];
  examPoints?: string[];
}

export interface Paper1Unit {
  id: string;
  unitNumber: number;
  title: string;
  subTitle: string;
  overview: string;
  topics: {
    name: string;
    description: string;
    highYieldExamPoints: string[];
  }[];
  examPoints: string[];
  pastYearTrends: string[];
}

export interface MpesbGrade1Unit {
  id: string;
  section: string;
  title: string;
  classLevel?: string;
  overview: string;
  prescribedTexts: {
    title: string;
    author: string;
    genre: string;
    bookSource: string;
    plotAndThemes: string;
    highYieldExamPoints: string[];
  }[];
  examPoints: string[];
}

export interface MpesbGrade2Unit {
  id: string;
  section: 'Functional Grammar' | 'Vocabulary' | 'Language Pedagogy (TET)' | 'Reading Comprehension';
  title: string;
  overview: string;
  topics: {
    name: string;
    content: string;
    highYieldExamPoints: string[];
  }[];
  examPoints: string[];
}

export interface MpesbCommonPaper1ExamPoint {
  number: number;
  point: string;
  tag: string;
}

export interface MpesbCommonPaper1Unit {
  id: string;
  unitNumber: number;
  title: string;
  hindiTitle: string;
  marksWeightage: string;
  overview: string;
  topics: {
    name: string;
    subtopics: string[];
    keyDetails: string;
  }[];
  examPoints: MpesbCommonPaper1ExamPoint[];
}

export interface MCQQuestion {
  id: string;
  exam: 'NTA NET Paper 1' | 'NTA NET' | 'MPSET' | 'NTA NET & MPSET Literature' | 'MPESB Paper 1 (Common)' | 'MPESB Grade 1' | 'MPESB Grade 2' | 'MP TET Grade 3' | 'All-Exam Grammar';
  year?: string;
  topic: 'Grammar' | 'Drama' | 'Poetry' | 'Fiction' | 'Prose' | 'Literary Theory' | 'Cultural Studies' | 'ELT & Pedagogy' | 'Indian English' | 'MP Prescribed Texts' | 'Teaching Aptitude' | 'Research Aptitude' | 'Logical Reasoning' | 'ICT & Higher Education' | 'TET Pedagogy' | 'CDP & Pedagogy' | 'General Hindi' | 'General English' | 'MP GK & Current Affairs' | 'Reasoning & Numerical';
  difficulty: 'Easy' | 'Moderate' | 'Advanced';
  question: string;
  options: string[];
  correctIndex: number;
  detailedExplanation: string;
  mnemonicOrTip?: string;
  relatedSyllabusTopic: string;
  examPoints?: string[];
}

export interface VocabWord {
  id: string;
  word: string;
  phonetic: string;
  partOfSpeech: string;
  definition: string;
  contextSentence: string;
  synonyms: string[];
  antonyms: string[];
  etymology: string;
  examRelevance: string;
  interval: number;
  easeFactor: number;
  repetitions: number;
  dueDate: string;
  status: 'new' | 'learning' | 'mastered';
}

export interface IdiomChallenge {
  id: string;
  idiom: string;
  meaning: string;
  origin: string;
  incompleteSentence: string;
  blankWord: string;
  distractors: string[];
  contextHint: string;
}

export interface SyntaxPuzzle {
  id: string;
  level: number;
  instruction: string;
  targetSentence: string;
  scrambledTokens: { id: string; text: string; role: 'Subject' | 'Verb' | 'Object' | 'Modifier' | 'Conjunction' }[];
  syntaxNote: string;
}

export interface CommunityStory {
  id: string;
  title: string;
  author: string;
  authorBadge: string;
  date: string;
  genre: 'Essay' | 'Literature Critique' | 'Creative Fiction' | 'Poetry' | 'NET Model Answer';
  content: string;
  readabilityScore: number;
  upvotes: number;
  comments: {
    id: string;
    author: string;
    avatar: string;
    timestamp: string;
    highlightedText?: string;
    comment: string;
  }[];
}

export interface UserStats {
  xp: number;
  level: string;
  streakDays: number;
  lastActiveDate: string;
  solvedMCQs: number;
  grammarMasteryPercent: number;
  literatureMasteryPercent: number;
  vocabWordsMastered: number;
  unlockedBadges: string[];
  isPremium: boolean;
  premiumTier?: 'Scholar' | 'Enterprise';
}

export interface SpeechPhrase {
  id: string;
  phrase: string;
  phoneticUk: string;
  phoneticUs: string;
  accentNotes: string;
  category: 'Literary Monologue' | 'Academic Presentation' | 'Exam Oral Test' | 'Idiomatic Rhythm';
  stressPattern: string;
}

// --- Firebase User, Progress, Certificate & Admin Types ---
export interface FirebaseUserProfile {
  uid: string;
  displayName: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
  learningLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'NET Scholar';
  xp: number;
  streakDays: number;
  completedModulesCount: number;
  preferredLanguage: AppLanguage;
  accountStatus: 'active' | 'suspended';
}

export interface QuizAttemptRecord {
  id: string;
  uid: string;
  quizId: string;
  quizTitle: string;
  category: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  mode: 'timed' | 'untimed';
  createdAt: string;
}

export interface StudentProgressRecord {
  id: string;
  uid: string;
  moduleId: string;
  moduleTitle: string;
  status: 'in_progress' | 'completed';
  progressPercent: number;
  updatedAt: string;
}

export interface BookmarkRecord {
  id: string;
  uid: string;
  itemId: string;
  itemType: 'lesson' | 'question' | 'author';
  title: string;
  category: string;
  createdAt: string;
}

export interface CertificateRecord {
  id: string;
  uid: string;
  certificateCode: string;
  studentName: string;
  courseTitle: string;
  issuedAt: string;
}

export interface SiteConfigRecord {
  siteName: string;
  tagline: string;
  educatorName: string;
  contactEmail: string;
  heroNotice: string;
}

export type AdminSection =
  | 'overview'
  | 'users'
  | 'syllabus-cms'
  | 'questions-cms'
  | 'ai-studio'
  | 'financials'
  | 'settings';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'Student' | 'Pro Scholar' | 'Institution Admin' | 'Super Admin';
  joinedDate: string;
  status: 'active' | 'suspended' | 'pending';
  lastActive: string;
  solvedMCQs: number;
  xp: number;
  institution?: string;
  notes?: string;
  recentQuizScores?: { quiz: string; score: number; date: string }[];
}

export interface AdminCoupon {
  id: string;
  code: string;
  discountPercent: number;
  expiryDate: string;
  maxUses: number;
  usedCount: number;
  status: 'active' | 'expired' | 'disabled';
  minOrderValue: number;
  description: string;
}

export interface AdminTransaction {
  id: string;
  invoiceId: string;
  customerName: string;
  customerEmail: string;
  plan: 'Pro Scholar Monthly' | 'Pro Scholar Annual' | 'Institution License';
  amount: number;
  currency: 'USD' | 'INR';
  date: string;
  status: 'succeeded' | 'refunded' | 'failed';
  paymentMethod: string;
}

export interface GlobalAnnouncement {
  id: string;
  text: string;
  linkText?: string;
  linkTab?: NavTab;
  variant: 'info' | 'success' | 'warning' | 'urgent';
  isLive: boolean;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  adminUser: string;
  action: string;
  category: 'Syllabus' | 'Questions' | 'User RBAC' | 'Coupons' | 'AI Prompt' | 'Financials' | 'System';
  details: string;
}

export interface AiPromptConfig {
  mentorPrompt: string;
  grammarPrompt: string;
  tonePrompt: string;
  explainerPrompt: string;
  temperature: number;
  maxOutputTokens: number;
  safetyLevel: 'standard' | 'strict' | 'permissive';
  selectedModel: string;
}

export interface PricingTierConfig {
  scholarMonthlyUsd: number;
  scholarMonthlyInr: number;
  scholarAnnualUsd: number;
  scholarAnnualInr: number;
  institutionMonthlyUsd: number;
  institutionMonthlyInr: number;
  usdToInrRate: number;
}
