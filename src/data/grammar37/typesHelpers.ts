import {
  BilingualComparisonTable,
  BilingualExample,
  BilingualRule,
  BilingualSubtopicLesson,
  GrammarLevelNumber,
  GrammarModule37,
  PracticeQuestion15,
  QuestionDifficulty,
} from '../../types';

export interface ModuleBlueprintSeed {
  moduleNumber: number;
  levelNumber: GrammarLevelNumber;
  levelTitle: string;
  levelTitleHi: string;
  titleEn: string;
  titleHi: string;
  estimatedMinutes: number;
  visualFocus: string;
  objectivesEn: string[];
  objectivesHi: string[];
  introEn: string;
  introHi: string;
  definitionEn: string;
  definitionHi: string;
  detailedExplanationEn: string;
  detailedExplanationHi: string;
  typesClassification: BilingualSubtopicLesson['typesClassification'];
  rules: BilingualRule[];
  structuresAndFormulas: string[];
  examples: BilingualExample[];
  comparisonTables: BilingualComparisonTable[];
  realLifeApplicationsEn: string[];
  realLifeApplicationsHi: string[];
  commonMistakes: BilingualSubtopicLesson['commonMistakes'];
  examPointsEn: string[];
  examPointsHi: string[];
  summaryEn: string;
  summaryHi: string;
  customQuestions: PracticeQuestion15[];
}

const DIFFICULTIES: QuestionDifficulty[] = ['Beginner', 'Easy', 'Intermediate', 'Advanced', 'Expert'];

export function buildModule37(seed: ModuleBlueprintSeed): GrammarModule37 {
  const modId = `mod-${seed.moduleNumber}`;

  // Ensure >= 10 bilingual examples
  const examples = [...seed.examples];
  let idx = 0;
  while (examples.length < 10 && seed.rules.length > 0) {
    const r = seed.rules[idx % seed.rules.length];
    examples.push({
      en: r.correctExample.en,
      hi: r.correctExample.hi,
      note: r.titleEn,
    });
    idx++;
  }

  const lesson: BilingualSubtopicLesson = {
    id: `${modId}-lesson-1`,
    titleEn: `${seed.moduleNumber}. ${seed.titleEn}`,
    titleHi: `${seed.moduleNumber}. ${seed.titleHi}`,
    objectivesEn: seed.objectivesEn,
    objectivesHi: seed.objectivesHi,
    introEn: seed.introEn,
    introHi: seed.introHi,
    definitionEn: seed.definitionEn,
    definitionHi: seed.definitionHi,
    detailedExplanationEn: seed.detailedExplanationEn,
    detailedExplanationHi: seed.detailedExplanationHi,
    typesClassification: seed.typesClassification,
    rules: seed.rules,
    structuresAndFormulas: seed.structuresAndFormulas,
    examples,
    comparisonTables: seed.comparisonTables,
    realLifeApplicationsEn: seed.realLifeApplicationsEn,
    realLifeApplicationsHi: seed.realLifeApplicationsHi,
    commonMistakes: seed.commonMistakes,
    examPointsEn: seed.examPointsEn,
    examPointsHi: seed.examPointsHi,
    summaryEn: seed.summaryEn,
    summaryHi: seed.summaryHi,
  };

  // Build >= 20 unique MCQs & 10+ multi-format practice exercises without duplicates
  const seenPrompts = new Set<string>();
  const uniqueCustom: PracticeQuestion15[] = [];
  for (const q of seed.customQuestions) {
    if (!seenPrompts.has(q.prompt)) {
      seenPrompts.add(q.prompt);
      uniqueCustom.push(q);
    }
  }

  // Synthesize pedagogically accurate concept-check questions directly from the module's verified rules, mistakes, and examples so each module has >= 20 MCQs and >= 10 varied exercises without inventing fabricated exam references
  const generatedMcqs: PracticeQuestion15[] = [];

  seed.rules.forEach((rule, rIdx) => {
    const prompt = `Which sentence strictly satisfies the rule "${rule.titleEn}"?`;
    if (!seenPrompts.has(prompt)) {
      seenPrompts.add(prompt);
      const distractor1 = rule.incorrectExample || `Incorrect usage violating ${rule.titleEn}.`;
      const otherExample = seed.examples[(rIdx + 1) % seed.examples.length]?.en || 'Contextually unrelated clause.';
      const options = [
        rule.correctExample.en,
        distractor1,
        `Neither form applies to ${seed.titleEn}`,
        otherExample === rule.correctExample.en ? 'Both structures violate standard concord.' : `Misapplied form: ${otherExample.replace(/\.$/, '')} (incorrect tense/form)`,
      ];
      generatedMcqs.push({
        id: `${modId}-gen-mcq-rule-${rIdx + 1}`,
        moduleNumber: seed.moduleNumber,
        moduleTitle: seed.titleEn,
        topic: seed.titleEn,
        subtopic: rule.titleEn,
        format: 'mcq',
        difficulty: DIFFICULTIES[rIdx % DIFFICULTIES.length],
        language: 'bilingual',
        examCategory: 'Grammar Curriculum',
        sourceType: 'Original Practice',
        prompt,
        promptHi: `नियम "${rule.titleHi}" के अनुसार कौन-सा वाक्य व्याकरणिक रूप से पूर्णतः शुद्ध है?`,
        options,
        correctAnswer: rule.correctExample.en,
        explanationEn: rule.explanationEn,
        explanationHi: rule.explanationHi,
      });
    }
  });

  seed.commonMistakes.forEach((m, mIdx) => {
    const prompt = `Select the grammatically accurate correction for: "${m.wrong}"`;
    if (!seenPrompts.has(prompt)) {
      seenPrompts.add(prompt);
      generatedMcqs.push({
        id: `${modId}-gen-mcq-err-${mIdx + 1}`,
        moduleNumber: seed.moduleNumber,
        moduleTitle: seed.titleEn,
        topic: seed.titleEn,
        subtopic: 'Error Correction',
        format: 'sentence-correction',
        difficulty: 'Intermediate',
        language: 'bilingual',
        examCategory: 'Competitive Grammar',
        sourceType: 'Original Practice',
        prompt,
        promptHi: `दिए गए अशुद्ध वाक्य का सही रूप चुनें: "${m.wrong}"`,
        options: [m.right, m.wrong, `${m.wrong} (keep unchanged)`, 'Omit the main verb'],
        correctAnswer: m.right,
        explanationEn: m.reasonEn,
        explanationHi: m.reasonHi,
      });
    }
  });

  seed.examples.forEach((ex, eIdx) => {
    if (generatedMcqs.length + uniqueCustom.length >= 24) return;
    const prompt = `Identify the most accurate Hindi translation for: "${ex.en}"`;
    if (!seenPrompts.has(prompt)) {
      seenPrompts.add(prompt);
      const otherHi1 = seed.examples[(eIdx + 2) % seed.examples.length]?.hi || 'अन्य संदर्भ वाक्य।';
      const otherHi2 = seed.examples[(eIdx + 3) % seed.examples.length]?.hi || 'यह नियम यहाँ लागू नहीं होता।';
      const otherHi3 = seed.examples[(eIdx + 4) % seed.examples.length]?.hi || 'वाक्य की संरचना अपूर्ण है।';
      const options = Array.from(new Set([ex.hi, otherHi1, otherHi2, otherHi3]));
      while (options.length < 4) {
        options.push(`विकल्प ${options.length + 1}: उपर्युक्त में से कोई नहीं।`);
      }
      generatedMcqs.push({
        id: `${modId}-gen-mcq-tr-${eIdx + 1}`,
        moduleNumber: seed.moduleNumber,
        moduleTitle: seed.titleEn,
        topic: seed.titleEn,
        subtopic: 'Bilingual Comprehension',
        format: 'correct-word',
        difficulty: DIFFICULTIES[(eIdx + 1) % DIFFICULTIES.length],
        language: 'bilingual',
        examCategory: 'Bilingual Grammar',
        sourceType: 'Original Practice',
        prompt,
        promptHi: `"${ex.en}" का सबसे सटीक हिन्दी अनुवाद चुनिए:`,
        options: options.slice(0, 4),
        correctAnswer: ex.hi,
        explanationEn: `In ${seed.titleEn}, "${ex.en}" translates naturally as "${ex.hi}".`,
        explanationHi: `${seed.titleHi} के अंतर्गत "${ex.en}" का स्वाभाविक हिन्दी अनुवाद "${ex.hi}" है।`,
      });
    }
  });

  seed.typesClassification.forEach((tc, tIdx) => {
    const prompt = `Which classification accurately describes "${tc.nameEn}" in ${seed.titleEn}?`;
    if (!seenPrompts.has(prompt)) {
      seenPrompts.add(prompt);
      const alt1 = seed.typesClassification[(tIdx + 1) % seed.typesClassification.length]?.descriptionEn || 'A punctuation mark used at paragraph boundaries.';
      const alt2 = 'An obsolete dialectal spelling rarely used in modern prose.';
      const alt3 = 'A non-syntactic pause filler with no grammatical function.';
      const options = Array.from(new Set([tc.descriptionEn, alt1, alt2, alt3]));
      while (options.length < 4) options.push(`Concept variant ${options.length + 1}`);
      generatedMcqs.push({
        id: `${modId}-gen-mcq-type-${tIdx + 1}`,
        moduleNumber: seed.moduleNumber,
        moduleTitle: seed.titleEn,
        topic: seed.titleEn,
        subtopic: tc.nameEn,
        format: 'mcq',
        difficulty: 'Easy',
        language: 'bilingual',
        examCategory: 'Foundation Concept',
        sourceType: 'Original Practice',
        prompt,
        promptHi: `${seed.titleHi} में "${tc.nameHi}" की सही परिभाषा कौन-सी है?`,
        options: options.slice(0, 4),
        correctAnswer: tc.descriptionEn,
        explanationEn: `${tc.nameEn}: ${tc.descriptionEn}`,
        explanationHi: `${tc.nameHi}: ${tc.descriptionHi}`,
      });
    }
  });

  // Add True/False and Arrange-Words practice exercises derived from rules & examples
  const firstExampleWords = (seed.examples[0]?.en || 'English grammar builds clear communication.').replace(/[.?!]$/, '').split(/\s+/);
  const arrangeExercise: PracticeQuestion15 = {
    id: `${modId}-ex-arrange`,
    moduleNumber: seed.moduleNumber,
    moduleTitle: seed.titleEn,
    topic: seed.titleEn,
    subtopic: 'Syntax Ordering',
    format: 'arrange-words',
    difficulty: 'Beginner',
    language: 'bilingual',
    examCategory: 'Interactive Syntax',
    sourceType: 'Original Practice',
    prompt: `Arrange the words into a grammatically correct sentence illustrating ${seed.titleEn}:`,
    promptHi: `${seed.titleHi} को दर्शाने के लिए शब्दों को सही व्याकरणिक क्रम में व्यवस्थित करें:`,
    dragItems: [...firstExampleWords].sort((a, b) => a.localeCompare(b)),
    correctAnswer: firstExampleWords.join(' '),
    explanationEn: `The canonical word order is: "${firstExampleWords.join(' ')}".`,
    explanationHi: `सही वाक्य क्रम है: "${firstExampleWords.join(' ')}" (${seed.examples[0]?.hi || ''})।`,
  };

  const tfExercise: PracticeQuestion15 = {
    id: `${modId}-ex-tf`,
    moduleNumber: seed.moduleNumber,
    moduleTitle: seed.titleEn,
    topic: seed.titleEn,
    subtopic: 'Rule Verification',
    format: 'true-false',
    difficulty: 'Beginner',
    language: 'bilingual',
    examCategory: 'Grammar Check',
    sourceType: 'Original Practice',
    prompt: `True or False: ${seed.rules[0]?.explanationEn || seed.definitionEn}`,
    promptHi: `सत्य या असत्य: ${seed.rules[0]?.explanationHi || seed.definitionHi}`,
    options: ['True', 'False'],
    correctAnswer: 'True',
    explanationEn: seed.rules[0]?.explanationEn || seed.definitionEn,
    explanationHi: seed.rules[0]?.explanationHi || seed.definitionHi,
  };

  const matchPairs = seed.typesClassification.slice(0, 3).map((tc) => ({
    left: tc.nameEn,
    right: tc.examples[0]?.en || tc.descriptionEn.slice(0, 48),
  }));

  const matchExercise: PracticeQuestion15 | null =
    matchPairs.length >= 2
      ? {
          id: `${modId}-ex-match`,
          moduleNumber: seed.moduleNumber,
          moduleTitle: seed.titleEn,
          topic: seed.titleEn,
          subtopic: 'Classification Matching',
          format: 'match-following',
          difficulty: 'Easy',
          language: 'bilingual',
          examCategory: 'Interactive Practice',
          sourceType: 'Original Practice',
          prompt: `Match each category of ${seed.titleEn} with its matching example or feature:`,
          promptHi: `${seed.titleHi} की प्रत्येक श्रेणी का उसके सही उदाहरण से मिलान करें:`,
          matchPairs,
          correctAnswer: JSON.stringify(Object.fromEntries(matchPairs.map((p) => [p.left, p.right]))),
          explanationEn: `Each category aligns with its structural example in ${seed.titleEn}.`,
          explanationHi: `प्रत्येक श्रेणी अपने सटीक उदाहरण से सुमेलित है।`,
        }
      : null;

  const allMcqs = [...uniqueCustom.filter((q) => !['arrange-words', 'match-following', 'drag-drop'].includes(q.format)), ...generatedMcqs];
  // Top up to 20 MCQs cleanly if needed with distinct formula/exam-point checks
  let extraCounter = 0;
  while (allMcqs.length < 20) {
    const ep = seed.examPointsEn[extraCounter % seed.examPointsEn.length] || seed.summaryEn;
    const epHi = seed.examPointsHi[extraCounter % seed.examPointsHi.length] || seed.summaryHi;
    const formula = seed.structuresAndFormulas[extraCounter % seed.structuresAndFormulas.length] || seed.definitionEn;
    const pText = `Exam Point Check #${extraCounter + 1} (${seed.titleEn}): Which statement is true for standard usage?`;
    allMcqs.push({
      id: `${modId}-extra-mcq-${extraCounter + 1}`,
      moduleNumber: seed.moduleNumber,
      moduleTitle: seed.titleEn,
      topic: seed.titleEn,
      subtopic: 'Examination Mastery',
      format: 'mcq',
      difficulty: DIFFICULTIES[extraCounter % DIFFICULTIES.length],
      language: 'bilingual',
      examCategory: 'Competitive Grammar',
      sourceType: 'Original Practice',
      prompt: pText,
      promptHi: `परीक्षा बिंदु जांच #${extraCounter + 1} (${seed.titleHi}): मानक व्याकरण के लिए कौन-सा कथन सत्य है?`,
      options: [
        ep,
        `Ignore structure (${formula}) in formal writing.`,
        'Always omit auxiliary verbs in affirmative and negative clauses.',
        'British and American grammar never share subject-verb concord rules.',
      ],
      correctAnswer: ep,
      explanationEn: `${ep} Formula focus: ${formula}.`,
      explanationHi: `${epHi}`,
    });
    extraCounter++;
  }

  const practicePool: PracticeQuestion15[] = [
    ...uniqueCustom,
    arrangeExercise,
    tfExercise,
    ...(matchExercise ? [matchExercise] : []),
    ...generatedMcqs,
  ].slice(0, 12);

  return {
    id: modId,
    moduleNumber: seed.moduleNumber,
    levelNumber: seed.levelNumber,
    levelTitle: seed.levelTitle,
    levelTitleHi: seed.levelTitleHi,
    titleEn: seed.titleEn,
    titleHi: seed.titleHi,
    estimatedMinutes: seed.estimatedMinutes,
    visualFocus: seed.visualFocus,
    lessons: [lesson],
    practiceExercises: practicePool.length >= 10 ? practicePool : [...practicePool, ...allMcqs.slice(0, 10 - practicePool.length)],
    mcqs: allMcqs.slice(0, 20),
    topicAssessment: allMcqs.slice(0, 5),
    revisionTest: allMcqs.slice(5, 10),
  };
}
