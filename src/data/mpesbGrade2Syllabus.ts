import { MpesbGrade2Unit } from '../types';

export const MPESB_GRADE2_UNITS: MpesbGrade2Unit[] = [
  {
    id: 'mp-gr2-grammar',
    section: 'Functional Grammar',
    title: 'Functional Applied Grammar for Middle School Teachers',
    overview: 'Targeted syllabus for MPESB Grade 2 (Madhyamik Shikshak / Varg 2) covering sentence structure, parts of speech, agreement, tense transformations, and voice/narration.',
    topics: [
      {
        name: 'Articles & Determiners',
        content: 'Definite article "The", Indefinite articles "A/An" based on initial vowel sound (not alphabet spelling: "an honest man", "a university", "a European", "an hour"). Quantifiers: Few vs A Few vs The Few; Little vs A Little vs The Little; Each vs Every.',
        highYieldExamPoints: [
          '"Few" means almost none (negative); "A few" means some (positive); "The few" means not many, but all of them.',
          '"Little" is used with uncountable nouns (e.g. water, knowledge); "Few" is used with countable plural nouns (e.g. books, students).',
          '"A European" takes "A" because "European" begins with consonant sound /j/ (yoo-ro-pe-an).'
        ]
      },
      {
        name: 'Tenses & Concord (Subject-Verb Agreement)',
        content: 'Mastery of simple, continuous, perfect, and perfect continuous tenses. Time markers (since/for, ago, already, yet). Correlative conjunction agreement (either...or, neither...nor, not only...but also).',
        highYieldExamPoints: [
          '"Since" denotes point of time (since morning, since 1995); "For" denotes duration or period of time (for 3 hours, for 5 years).',
          'Two subjects joined by "as well as", "along with", "together with" take the verb according to the FIRST subject.',
          'Collective nouns (jury, committee, team) take singular verb when united, and plural verb when divided in opinion.'
        ]
      },
      {
        name: 'Voice, Narration & Transformation of Sentences',
        content: 'Active to Passive voice transformation (including imperatives and quasi-passives). Direct to Indirect speech backshift rules and interrogatives. Degrees of Comparison (Positive, Comparative, Superlative: "No other...", "Very few...").',
        highYieldExamPoints: [
          'Negative question tags for positive statements: "He is a teacher, isn\'t he?". Positive question tags for negative statements: "She cannot sing, can she?".',
          'Sentences starting with "Let\'s" take the question tag "shall we?".',
          'Imperative sentences take question tag "will you?" or "won\'t you?".'
        ]
      }
    ],
    examPoints: [
      'In MPESB Grade 2, 8-10 questions directly test error spotting in functional grammar.',
      'Check pronoun case after prepositions: "Between you and me" (objective case, never "between you and I").',
      'Conditional sentence formula: If + Simple Present -> Future Simple (will + V1); If + Simple Past -> would + V1; If + Past Perfect -> would have + V3.'
    ]
  },
  {
    id: 'mp-gr2-pedagogy',
    section: 'Language Pedagogy (TET)',
    title: 'Pedagogy of Language Development for TET & Teacher Selection',
    overview: 'Core pedagogical framework tested in MP TET Grade 2 and Grade 3 (15 marks). Covers language acquisition, Krashen, Chomsky, LSRW skills development, multilingual classrooms, TLM, and Remedial Teaching.',
    topics: [
      {
        name: 'Language Learning vs Language Acquisition',
        content: 'Acquisition is an unconscious, natural, informal process (L1 mother tongue in home environment); Learning is a conscious, structured, formal process with explicit grammatical rules (L2 target language in school).',
        highYieldExamPoints: [
          'Noam Chomsky: Language Acquisition Device (LAD) and Universal Grammar (UG). Children are born with innate linguistic hardware.',
          'B.F. Skinner: Behaviorist view that language is learned through imitation, reinforcement, and habit formation (stimulus-response).',
          'Jean Piaget: Language reflects thought; sensory-motor stage precedes linguistic development.',
          'Lev Vygotsky: Language is the primary tool for thought; private speech guides children; Zone of Proximal Development (ZPD) & Scaffolding.'
        ]
      },
      {
        name: 'Language Skills (LSRW Hierarchy)',
        content: 'Listening, Speaking, Reading, Writing. Receptive Skills (Passive): Listening and Reading. Productive Skills (Active): Speaking and Writing. Bottom-up vs Top-down processing.',
        highYieldExamPoints: [
          'Natural psychological sequence of language skills: LSRW.',
          'Skimming (Rapid reading to get the overall main idea / gist) vs Scanning (Rapid reading to locate specific discrete information, e.g. dates, telephone numbers, train timings).',
          'Intensive Reading (in-depth detailed study of textual grammar and style in classroom) vs Extensive Reading (fluent leisure reading for pleasure and overall vocabulary development).'
        ]
      },
      {
        name: 'Multilingual Classroom & Language Difficulties',
        content: 'Multilingualism viewed as an asset and teaching resource, NOT as an impediment. Mother tongue interference (interlanguage). Learning disabilities in language: Dyslexia (reading difficulty), Dysgraphia (writing/spelling motor impairment), Dysphasia/Aphasia (speech comprehension impairment).',
        highYieldExamPoints: [
          'Dyslexia is characterized by difficulty in decoding phonemes, reversing letters (reading "saw" as "was", "b" as "d").',
          'Errors are a natural and necessary window into the child\'s learning process; teachers should not punish errors, but use them for diagnostic assessment.'
        ]
      },
      {
        name: 'Teaching-Learning Materials (TLM) & Remedial Teaching',
        content: 'Selection criteria for authentic materials, realia (real physical objects brought into class), flashcards, audio-visual aids. Continuous & Comprehensive Evaluation (CCE). Diagnostic test followed by remedial instructional strategies.',
        highYieldExamPoints: [
          'Diagnostic Test answers the question: "WHERE and WHY does the learner face difficulty?".',
          'Remedial Teaching answers the question: "HOW can the identified weakness be removed through customized intervention?".',
          'Formative Assessment is assessment FOR learning (diagnostic and ongoing); Summative Assessment is assessment OF learning (evaluative at end of term).'
        ]
      }
    ],
    examPoints: [
      'Methods of Language Teaching: 1. Grammar-Translation Method (GTM) - oldest, deductively teaches grammar, L1 used; 2. Direct Method - natural method, L1 strictly banned, inductive grammar; 3. Audio-Lingual Method - army method, drills and habit formation; 4. Communicative Language Teaching (CLT) - communicative competence, fluency over accuracy.',
      'Principles of Language Teaching: Principle of Motivation, Naturalness, Habit Formation, Practice and Drill, Oral Approach, Selection and Gradation.',
      'Received Pronunciation (RP) consists of 44 sounds: 20 Vowel sounds (12 pure vowels/monophthongs + 8 diphthongs) and 24 Consonant sounds.'
    ]
  },
  {
    id: 'mp-gr2-vocab',
    section: 'Vocabulary',
    title: 'Lexical Competency, Affixes, Idioms & Spelling Rules',
    overview: 'High-frequency vocabulary modules tested in MPESB Grade 2: antonyms, synonyms, homophones, morphological root affixes, and contextual idioms.',
    topics: [
      {
        name: 'Word Formation: Prefixes, Suffixes & Roots',
        content: 'Morphology: Latin and Greek roots (bene = good, mal = bad, chron = time, phil = love, anthrop = human). Prefix conversions: un-, in-, dis-, mis-, non-. Suffix conversions forming nouns, adjectives, or adverbs.',
        highYieldExamPoints: [
          '"Misogynist": one who hates women (miso = hate + gyne = woman).',
          '"Philanthropist": one who loves humanity (phil = love + anthrop = human).',
          '"Chronometer": an instrument for measuring time precisely (chron = time + meter = measure).'
        ]
      },
      {
        name: 'Homophones & Confusing Pairs',
        content: 'Stationary (fixed/motionless) vs Stationery (writing materials - pen, paper); Principal (head of school / chief sum) vs Principle (moral rule / fundamental truth); Desert (arid wasteland / to abandon) vs Dessert (sweet course after dinner).',
        highYieldExamPoints: [
          'Station**e**ry has an **e** for **e**nvelope.',
          'Princip**al** is your **pal** (friend) or chief person.',
          'Desse**rt** has two **s**\'s because you want a **s**econd **s**erving.'
        ]
      }
    ],
    examPoints: [
      'Commonly misspelled words in MPESB tests: Accommodation, Bureaucracy, Conscientious, Embarrassment, Millennium, Occurrence, Privilege, Queue, Questionnaire, Separate.',
      'One Word Substitutions: A person who knows many languages = Polyglot; One who cannot be corrected = Incorrigible; One who looks on the bright side = Optimist.'
    ]
  }
];
