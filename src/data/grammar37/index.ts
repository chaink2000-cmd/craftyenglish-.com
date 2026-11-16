import { GrammarLevelNumber, GrammarModule37, InteractiveQuestionFormat, PracticeQuestion15 } from '../../types';
import { GRAMMAR_MODULES_1_TO_14 } from './levels1to2';
import { GRAMMAR_LEVELS_3_TO_4 } from './levels3to4';
import { GRAMMAR_LEVELS_5_TO_6 } from './levels5to6';
import { MCQS_AND_PYQS } from '../mcqsAndPyqs';

export interface GrammarLevelDefinition {
  levelNumber: GrammarLevelNumber;
  titleEn: string;
  titleHi: string;
  subtitleEn: string;
  subtitleHi: string;
  moduleRange: [number, number];
}

export const LEVEL_DEFINITIONS: GrammarLevelDefinition[] = [
  {
    levelNumber: 1,
    titleEn: 'Level 1: Foundation Grammar',
    titleHi: 'स्तर 1: आधारभूत व्याकरण (Foundation Grammar)',
    subtitleEn: 'Core building blocks from sound systems to parts of speech, nouns, articles, adjectives, and verbs.',
    subtitleHi: 'ध्वनि, शब्द-भेद, संज्ञा, सर्वनाम, अनुच्छेद (Articles), विशेषण और क्रिया की ठोस नींव।',
    moduleRange: [1, 8],
  },
  {
    levelNumber: 2,
    titleEn: 'Level 2: Elementary Grammar',
    titleHi: 'स्तर 2: प्रारंभिक व्याकरण (Elementary Grammar)',
    subtitleEn: 'Mastering all twelve verb tenses, adverbs, prepositions, conjunctions, determiners, and modals.',
    subtitleHi: 'बारह काल (12 Tenses), क्रिया-विशेषण, पूर्वसर्ग, संयोजक, निर्धारक और मोडल क्रियाएँ।',
    moduleRange: [9, 14],
  },
  {
    levelNumber: 3,
    titleEn: 'Level 3: Intermediate Grammar',
    titleHi: 'स्तर 3: मध्यम व्याकरण (Intermediate Grammar)',
    subtitleEn: 'Syntax agreement, active/passive voice, narration, clause types, non-finite verbs, tags, and conditionals.',
    subtitleHi: 'कर्ता-क्रिया अन्विति, वाच्य, कथन, उपवाक्य, असमापिका क्रियाएँ, प्रश्न-टैग और शर्तवाचक वाक्य।',
    moduleRange: [15, 22],
  },
  {
    levelNumber: 4,
    titleEn: 'Level 4: Advanced Grammar',
    titleHi: 'स्तर 4: उच्चस्तरीय व्याकरण (Advanced Grammar)',
    subtitleEn: 'Sentence transformations, causatives/subjunctives, inversion, reduced clauses, punctuation, and spot-the-error.',
    subtitleHi: 'वाक्य रूपांतरण, Causative/Subjunctive, व्युत्क्रम पदक्रम, विराम चिह्न व सामान्य अशुद्धियाँ।',
    moduleRange: [23, 28],
  },
  {
    levelNumber: 5,
    titleEn: 'Level 5: Master Grammar & Linguistics',
    titleHi: 'स्तर 5: मास्टर व्याकरण एवं भाषाविज्ञान',
    subtitleEn: 'Linguistic theory, morphology, generative syntax trees, semantics/pragmatics, and cohesive discourse grammar.',
    subtitleHi: 'भाषावैज्ञानिक सिद्धांत, रूपविज्ञान, वाक्य-विन्यास, अर्थविज्ञान व प्रोक्ति विश्लेषण।',
    moduleRange: [29, 33],
  },
  {
    levelNumber: 6,
    titleEn: 'Level 6: Practical English & Examinations',
    titleHi: 'स्तर 6: व्यावहारिक अंग्रेज़ी एवं प्रतियोगी परीक्षाएँ',
    subtitleEn: 'Word roots, communicative fluency, academic composition formats, and competitive exam strategies.',
    subtitleHi: 'शब्द-संपदा, प्रभावी संवाद, पत्र/संक्षेपण लेखन तथा प्रतियोगी परीक्षा रणनीतियाँ।',
    moduleRange: [34, 37],
  },
];

export const GRAMMAR_CURRICULUM_37: GrammarModule37[] = [
  ...GRAMMAR_MODULES_1_TO_14,
  ...GRAMMAR_LEVELS_3_TO_4,
  ...GRAMMAR_LEVELS_5_TO_6,
].sort((a, b) => a.moduleNumber - b.moduleNumber);

export const QUESTION_FORMAT_LABELS: Record<InteractiveQuestionFormat, { en: string; hi: string }> = {
  'mcq': { en: '1. Multiple Choice (MCQ)', hi: '1. बहुविकल्पीय (MCQ)' },
  'fill-blank': { en: '2. Fill in the Blanks', hi: '2. रिक्त स्थान भरें' },
  'true-false': { en: '3. True or False', hi: '3. सत्य या असत्य' },
  'match-following': { en: '4. Match the Following', hi: '4. सही मिलान करें' },
  'identify-error': { en: '5. Identify the Error', hi: '5. त्रुटि पहचानें' },
  'sentence-correction': { en: '6. Sentence Correction', hi: '6. वाक्य सुधार' },
  'sentence-transformation': { en: '7. Sentence Transformation', hi: '7. वाक्य रूपांतरण' },
  'drag-drop': { en: '8. Drag and Drop Categorise', hi: '8. ड्रैग एवं ड्रॉप वर्गीकरण' },
  'arrange-words': { en: '9. Arrange the Words', hi: '9. शब्दों को क्रम में लगाएं' },
  'identify-pos': { en: '10. Identify Parts of Speech', hi: '10. शब्द-भेद पहचानें' },
  'tense-identification': { en: '11. Tense Identification', hi: '11. काल पहचानें' },
  'active-passive': { en: '12. Active–Passive Conversion', hi: '12. वाच्य परिवर्तन' },
  'direct-indirect': { en: '13. Direct–Indirect Conversion', hi: '13. कथन परिवर्तन' },
  'correct-word': { en: '14. Correct Word Selection', hi: '14. सटीक शब्द चयन' },
  'paragraph-grammar': { en: '15. Paragraph-Based Grammar', hi: '15. अनुच्छेद आधारित व्याकरण' },
};

// Dedicated curated questions covering formats 8 (drag-drop), 10 (identify-pos), 11 (tense-identification), and 15 (paragraph-grammar) in full depth
const SHOWCASE_FORMAT_QUESTIONS: PracticeQuestion15[] = [
  {
    id: 'fmt-drag-1',
    moduleNumber: 6,
    moduleTitle: 'Articles',
    topic: 'Articles & Determiners',
    subtopic: 'Indefinite Articles (a / an)',
    format: 'drag-drop',
    difficulty: 'Easy',
    language: 'bilingual',
    examCategory: 'Foundation Grammar',
    sourceType: 'Original Practice',
    prompt: 'Classify each noun phrase by clicking/dragging the correct indefinite article bucket ("A" vs "An") based on initial SOUND:',
    promptHi: 'प्रारंभिक उच्चारण ध्वनि के आधार पर प्रत्येक शब्द के लिए सही Article ("A" या "An") श्रेणी चुनें:',
    dragItems: ['university scholar', 'honourable judge', 'one-rupee note', 'M.A. aspirant'],
    dropTargets: ['Takes "A" (Consonant Sound)', 'Takes "An" (Vowel Sound)'],
    correctAnswer: JSON.stringify({
      'university scholar': 'Takes "A" (Consonant Sound)',
      'honourable judge': 'Takes "An" (Vowel Sound)',
      'one-rupee note': 'Takes "A" (Consonant Sound)',
      'M.A. aspirant': 'Takes "An" (Vowel Sound)',
    }),
    explanationEn: '"University" (/juː/) and "one" (/wʌn/) begin with consonant sounds and take "a"; "honourable" (/ɒ/) and "M.A." (/em/) begin with vowel sounds and take "an".',
    explanationHi: '"University" (य्) और "one" (व्) व्यंजन ध्वनि से शुरू होने के कारण "a" लेते हैं, जबकि "honourable" (ऑ) और "M.A." (ए) स्वर ध्वनि से शुरू होने के कारण "an" लेते हैं।',
  },
  {
    id: 'fmt-pos-1',
    moduleNumber: 3,
    moduleTitle: 'Eight Parts of Speech',
    topic: 'Parts of Speech in Context',
    subtopic: 'Functional Word Class',
    format: 'identify-pos',
    difficulty: 'Intermediate',
    language: 'bilingual',
    examCategory: 'MPESB & TET Grammar',
    sourceType: 'Original Practice',
    prompt: 'Identify the part of speech of "FAST" in the sentence: "The express train ran remarkably FAST across the bridge."',
    promptHi: '"The express train ran remarkably FAST across the bridge." वाक्य में "FAST" शब्द किस Part of Speech के रूप में प्रयुक्त है?',
    options: ['Adverb', 'Adjective', 'Preposition', 'Noun'],
    correctAnswer: 'Adverb',
    explanationEn: 'Here "fast" modifies the verb "ran" (telling HOW it ran) and is itself modified by "remarkably", making it an Adverb of Manner.',
    explanationHi: 'यहाँ "fast" क्रिया "ran" की विशेषता बता रहा है, अतः यह Adverb है ("fastly" कोई मानक शब्द नहीं होता)।',
  },
  {
    id: 'fmt-pos-2',
    moduleNumber: 7,
    moduleTitle: 'Adjectives',
    topic: 'Parts of Speech in Context',
    subtopic: 'Attributive Adjective vs Adverb',
    format: 'identify-pos',
    difficulty: 'Easy',
    language: 'bilingual',
    examCategory: 'Grammar Curriculum',
    sourceType: 'Original Practice',
    prompt: 'Identify the part of speech of "LIGHT" in: "She carried a LIGHT bamboo basket."',
    promptHi: '"She carried a LIGHT bamboo basket." में "LIGHT" क्या है?',
    options: ['Adjective', 'Noun', 'Verb', 'Adverb'],
    correctAnswer: 'Adjective',
    explanationEn: 'Because "light" describes the quality/weight of the noun "basket", it functions here as an Adjective of Quality.',
    explanationHi: '"light" यहाँ "basket" (संज्ञा) की विशेषता बता रहा है, इसलिए यह Adjective है।',
  },
  {
    id: 'fmt-tense-1',
    moduleNumber: 9,
    moduleTitle: 'Twelve Tenses',
    topic: 'Verb Tenses',
    subtopic: 'Present Perfect Continuous',
    format: 'tense-identification',
    difficulty: 'Easy',
    language: 'bilingual',
    examCategory: 'MPESB & Competitive',
    sourceType: 'Original Practice',
    prompt: 'Identify the exact tense of: "The researchers have been cataloguing manuscripts since sunrise."',
    promptHi: 'निम्न वाक्य का काल पहचानें: "The researchers have been cataloguing manuscripts since sunrise."',
    options: [
      'Present Perfect Continuous',
      'Present Continuous',
      'Past Perfect Continuous',
      'Present Perfect',
    ],
    correctAnswer: 'Present Perfect Continuous',
    explanationEn: 'The structure "have + been + V-ing" paired with time-point "since sunrise" denotes Present Perfect Continuous tense.',
    explanationHi: '"have been + V-ing" के साथ "since" का प्रयोग Present Perfect Continuous को दर्शाता है।',
  },
  {
    id: 'fmt-tense-2',
    moduleNumber: 9,
    moduleTitle: 'Twelve Tenses',
    topic: 'Verb Tenses',
    subtopic: 'Future Perfect',
    format: 'tense-identification',
    difficulty: 'Intermediate',
    language: 'bilingual',
    examCategory: 'Grammar Curriculum',
    sourceType: 'Original Practice',
    prompt: 'Identify the exact tense of: "By next Friday, the committee will have published the final answer key."',
    promptHi: 'निम्न वाक्य का काल पहचानें: "By next Friday, the committee will have published the final answer key."',
    options: [
      'Future Perfect',
      'Future Continuous',
      'Simple Future',
      'Future Perfect Continuous',
    ],
    correctAnswer: 'Future Perfect',
    explanationEn: '"will + have + V3 (published)" combined with deadline "By next Friday" expresses a completed future action—Future Perfect.',
    explanationHi: '"will have + V3" भविष्य में किसी समय तक कार्य पूर्ण होने का बोध कराता है (Future Perfect)।',
  },
  {
    id: 'fmt-para-1',
    moduleNumber: 28,
    moduleTitle: 'Common Errors and Correct Usage',
    topic: 'Paragraph Grammar & Concord',
    subtopic: 'Integrated Contextual Passage',
    format: 'paragraph-grammar',
    difficulty: 'Advanced',
    language: 'bilingual',
    examCategory: 'NTA NET & MPESB Cloze',
    sourceType: 'Original Practice',
    passage:
      'Every member of the literary society (1) _____ eagerly awaiting the guest lecture. Neither the heavy rain (2) _____ the power outage discouraged the audience. Had the auditorium opened earlier, several scholars (3) _____ seated comfortably before the keynote began.',
    prompt: 'Choose the exact sequence for blanks (1), (2), and (3) in the passage above:',
    promptHi: 'दिए गए अनुच्छेद के रिक्त स्थानों (1), (2), और (3) के लिए शुद्ध व्याकरणिक क्रम चुनें:',
    options: [
      '(1) was · (2) nor · (3) would have been',
      '(1) were · (2) or · (3) would be',
      '(1) was · (2) or · (3) will have been',
      '(1) are · (2) nor · (3) would have been',
    ],
    correctAnswer: '(1) was · (2) nor · (3) would have been',
    explanationEn: '(1) "Every member" takes singular "was"; (2) "Neither" correlates strictly with "nor"; (3) Inverted Type 3 conditional ("Had...opened") requires "would have been".',
    explanationHi: '(1) "Every member" के साथ एकवचन "was", (2) "Neither" की जोड़ी "nor", और (3) "Had + V3" शर्त के साथ "would have been" सही है।',
  },
  {
    id: 'fmt-para-2',
    moduleNumber: 11,
    moduleTitle: 'Prepositions',
    topic: 'Paragraph Grammar & Prepositions',
    subtopic: 'Fixed Prepositions in Prose',
    format: 'paragraph-grammar',
    difficulty: 'Intermediate',
    language: 'bilingual',
    examCategory: 'MPESB & TET Grammar',
    sourceType: 'Original Practice',
    passage:
      'Though proficient (1) _____ classical rhetoric, Kavita insists (2) _____ revising every draft twice. Her anthology consists (3) _____ forty bilingual essays.',
    prompt: 'Select the accurate fixed prepositions for (1), (2), and (3):',
    promptHi: 'दिए गए अनुच्छेद में (1), (2) और (3) के लिए सटीक निश्चित पूर्वसर्ग (Fixed Prepositions) चुनें:',
    options: [
      '(1) in · (2) on · (3) of',
      '(1) at · (2) upon · (3) from',
      '(1) in · (2) in · (3) with',
      '(1) on · (2) for · (3) of',
    ],
    correctAnswer: '(1) in · (2) on · (3) of',
    explanationEn: 'Standard collocations require "proficient in", "insist on (+ V-ing)", and "consist of".',
    explanationHi: 'मानक प्रयोग में "proficient in", "insist on" और "consist of" प्रयुक्त होते हैं।',
  },
];

// Map existing curated MCQS_AND_PYQS cleanly into PracticeQuestion15 with transparent Verified PYQ vs Original Practice labeling
const LEGACY_PYQ_BANK: PracticeQuestion15[] = MCQS_AND_PYQS.map((q) => ({
  id: `pyq-${q.id}`,
  moduleNumber: 37,
  moduleTitle: q.relatedSyllabusTopic || 'Competitive Examination Grammar',
  topic: q.topic,
  subtopic: q.relatedSyllabusTopic || q.exam,
  format: 'mcq',
  difficulty: q.difficulty === 'Moderate' ? 'Intermediate' : q.difficulty === 'Advanced' ? 'Advanced' : 'Easy',
  language: 'en',
  examCategory: q.exam,
  sourceType: q.year ? 'Verified PYQ' : 'Original Practice',
  examReference: q.year ? `${q.exam} (${q.year})` : q.exam,
  prompt: q.question,
  options: q.options,
  correctAnswer: q.options[q.correctIndex] || q.options[0],
  explanationEn: q.detailedExplanation + (q.mnemonicOrTip ? ` Memory Tip: ${q.mnemonicOrTip}` : ''),
  explanationHi: q.detailedExplanation,
}));

// Aggregate all unique curriculum questions across all 37 modules + 15-format showcase + PYQ bank
const curriculumPool: PracticeQuestion15[] = [];
const seenIds = new Set<string>();

for (const q of SHOWCASE_FORMAT_QUESTIONS) {
  if (!seenIds.has(q.id)) {
    seenIds.add(q.id);
    curriculumPool.push(q);
  }
}

for (const mod of GRAMMAR_CURRICULUM_37) {
  for (const q of [...mod.practiceExercises, ...mod.mcqs]) {
    if (!seenIds.has(q.id)) {
      seenIds.add(q.id);
      curriculumPool.push(q);
    }
  }
}

for (const q of LEGACY_PYQ_BANK) {
  if (!seenIds.has(q.id)) {
    seenIds.add(q.id);
    curriculumPool.push(q);
  }
}

export const PRACTICE_QUESTION_BANK_15: PracticeQuestion15[] = curriculumPool;
