import { MCQQuestion } from '../types';

export const MCQS_AND_PYQS: MCQQuestion[] = [
  // ==========================================
  // SECTION 1: NTA NET PAPER 1 (LAST 10 YEARS: 2014 - 2024)
  // ==========================================
  {
    id: 'net-p1-2024-logic',
    exam: 'NTA NET Paper 1',
    year: '2024 June',
    topic: 'Logical Reasoning',
    difficulty: 'Advanced',
    question: 'According to the Classical Square of Opposition, if the Universal Affirmative proposition "All philosophers are rational thinkers" (A) is TRUE, what can be immediately inferred regarding "Some philosophers are not rational thinkers" (O)?',
    options: [
      'It must be True',
      'It must be False',
      'It is Undetermined / Doubtful',
      'It is Subaltern'
    ],
    correctIndex: 1,
    detailedExplanation: 'Propositions A and O are Contradictories. By rule of contradictory opposition: If one proposition is TRUE, the other MUST be FALSE, and vice versa. They cannot both be true and cannot both be false together. Hence, if A is true, O is immediately False.',
    mnemonicOrTip: 'A and O cross diagonal = Contradictories (Opposite truth values).',
    relatedSyllabusTopic: 'Classical Square of Opposition (Paper 1 Unit 6)'
  },
  {
    id: 'net-p1-2024-env',
    exam: 'NTA NET Paper 1',
    year: '2024 June',
    topic: 'ICT & Higher Education',
    difficulty: 'Moderate',
    question: 'Under the United Nations Sustainable Development Goals (SDGs 2015–2030), which goal is specifically dedicated to ensuring "Inclusive and equitable quality education and promoting lifelong learning opportunities for all"?',
    options: [
      'SDG 2',
      'SDG 3',
      'SDG 4',
      'SDG 8'
    ],
    correctIndex: 2,
    detailedExplanation: 'SDG 4 aims to "ensure inclusive and equitable quality education and promote lifelong learning opportunities for all". (SDG 1 is No Poverty, SDG 2 is Zero Hunger, SDG 3 is Good Health, SDG 5 is Gender Equality, and SDG 13 is Climate Action).',
    mnemonicOrTip: 'SDG 4 = 4-part Education (Primary, Secondary, Higher, Vocational).',
    relatedSyllabusTopic: 'People, Development & Environment (Paper 1 Unit 9)'
  },
  {
    id: 'net-p1-2023-teaching',
    exam: 'NTA NET Paper 1',
    year: '2023 Dec',
    topic: 'Teaching Aptitude',
    difficulty: 'Moderate',
    question: 'Which level of teaching involves the learner in problem-raising and problem-solving, requiring high intellectual metacognition and an open, democratic classroom environment?',
    options: [
      'Memory Level of Teaching (Herbart)',
      'Understanding Level of Teaching (Morrison)',
      'Reflective Level of Teaching (Hunt)',
      'Autonomous Development Level'
    ],
    correctIndex: 2,
    detailedExplanation: 'Reflective Level of Teaching (RLT) propounded by Hunt is the highest and most thoughtful level. It is learner-centered, requiring students to identify problems, formulate hypotheses, test evidence, and arrive at original solutions in an open classroom climate.',
    mnemonicOrTip: 'Herbart = Memory; Morrison = Understanding; Hunt = Reflective (H-M-H).',
    relatedSyllabusTopic: 'Levels of Teaching (Paper 1 Unit 1)'
  },
  {
    id: 'net-p1-2023-higher-edu',
    exam: 'NTA NET Paper 1',
    year: '2023 June',
    topic: 'ICT & Higher Education',
    difficulty: 'Moderate',
    question: 'What was the grand central library of the ancient Nalanda University named, which housed thousands of Buddhist manuscripts across three multi-storeyed buildings?',
    options: [
      'Saraswati Mahal',
      'Dharmaganja (composed of Ratnasagara, Ratnodadhi, and Ratnaranjaka)',
      'Vidyapeeth Bhavan',
      'Jnana Mandir'
    ],
    correctIndex: 1,
    detailedExplanation: 'The ancient Nalanda University library was famously called "Dharmaganja" (The Mountain of Truth). It occupied three huge multi-storeyed buildings named Ratnasagara (Ocean of Jewels), Ratnodadhi (Sea of Jewels - a 9-storeyed complex), and Ratnaranjaka (Jewel-adorned).',
    mnemonicOrTip: 'Nalanda Library = Dharmaganja (Ratna-sagara, Ratnodadhi, Ratnaranjaka).',
    relatedSyllabusTopic: 'Ancient Indian Universities (Paper 1 Unit 10)'
  },
  {
    id: 'net-p1-2022-indian-logic',
    exam: 'NTA NET Paper 1',
    year: '2022 Dec',
    topic: 'Logical Reasoning',
    difficulty: 'Advanced',
    question: '"Fat Devadatta does not eat food during the daytime, yet he is growing stout. Therefore, he must be eating at night." In Indian Logic, this knowledge is derived through which Pramana?',
    options: [
      'Anumana (Inference)',
      'Upamana (Comparison)',
      'Arthapatti (Postulation / Derivation from circumstance)',
      'Anupalabdhi (Non-perception)'
    ],
    correctIndex: 2,
    detailedExplanation: 'This is the classical example of Arthapatti (Postulation). Arthapatti occurs when an observed fact (Devadatta is fat) contradicts another observed fact (he does not eat by day). To reconcile this conflict, we postulate an unobserved fact (he eats by night). Accepted as an independent Pramana by Mimamsa and Advaita Vedanta.',
    mnemonicOrTip: 'Fat Devadatta fasting by day = Arthapatti (Postulation).',
    relatedSyllabusTopic: 'Indian Logic / Pramanas (Paper 1 Unit 6)'
  },
  {
    id: 'net-p1-2021-plagiarism',
    exam: 'NTA NET Paper 1',
    year: '2021 Nov',
    topic: 'Research Aptitude',
    difficulty: 'Moderate',
    question: 'According to the UGC (Promotion of Academic Integrity and Prevention of Plagiarism in Higher Educational Institutions) Regulations 2018, what penalty is prescribed for Level 2 similarity (40% to 60%) in submission of a thesis or dissertation?',
    options: [
      'The candidate will not be given any mark or credit',
      'The candidate shall be asked to submit a revised script within 6 months',
      'The candidate shall be debarred from submitting a revised script for a period of one year',
      'The registration of the candidate for the programme shall be permanently cancelled'
    ],
    correctIndex: 2,
    detailedExplanation: 'Under UGC 2018 Plagiarism Regulations: Level 0 (up to 10% - minor, no penalty); Level 1 (10% to 40% - revise within 6 months); Level 2 (40% to 60% - debarred from submitting for 1 year); Level 3 (above 60% - registration for the degree programme is cancelled).',
    mnemonicOrTip: 'Level 1 = 6 months; Level 2 = 1 year debarment; Level 3 = Registration cancelled.',
    relatedSyllabusTopic: 'Research Ethics & Academic Integrity (Paper 1 Unit 2)'
  },
  {
    id: 'net-p1-2020-action-research',
    exam: 'NTA NET Paper 1',
    year: '2020 Sept',
    topic: 'Research Aptitude',
    difficulty: 'Easy',
    question: 'Which of the following research formats specifically focuses on immediate, localized classroom and institutional problem-solving through a cyclical process formulated by Kurt Lewin?',
    options: [
      'Fundamental Research',
      'Applied Research',
      'Action Research (Plan -> Act -> Observe -> Reflect)',
      'Descriptive Survey Research'
    ],
    correctIndex: 2,
    detailedExplanation: 'Action Research (coined by Kurt Lewin in 1946) is a reflective process of progressive problem-solving led by individuals working with others in teams to improve the way they address issues and solve problems. The cyclic sequence is: Plan -> Act -> Observe -> Reflect.',
    mnemonicOrTip: 'P-A-O-R: Plan, Act, Observe, Reflect (Action Research Cycle).',
    relatedSyllabusTopic: 'Types of Research Methodologies (Paper 1 Unit 2)'
  },
  {
    id: 'net-p1-2019-swayam',
    exam: 'NTA NET Paper 1',
    year: '2019 Dec',
    topic: 'ICT & Higher Education',
    difficulty: 'Moderate',
    question: 'SWAYAM (Study Webs of Active-Learning for Young Aspiring Minds), initiated by the Government of India, delivers courses across how many pedagogical quadrants?',
    options: [
      'Two quadrants (Lectures and Exams)',
      'Three quadrants (Audio, Video, Notes)',
      'Four quadrants (Video lecture, Downloadable text, Self-assessment tests, Discussion forum)',
      'Five quadrants (Online laboratory, Audio, Video, Tutor, Grading)'
    ],
    correctIndex: 2,
    detailedExplanation: 'SWAYAM is structured around 4 pedagogical quadrants: Quadrant-I: e-Tutorial (video/audio lecture); Quadrant-II: e-Content (downloadable/printable reading material); Quadrant-III: Assessment (quizzes, MCQs, self-evaluation); Quadrant-IV: Discussion Forum (clearing doubts with course coordinators).',
    mnemonicOrTip: 'SWAYAM 4 Quadrants: Video, Reading Material, Quizzes, Discussion Forum.',
    relatedSyllabusTopic: 'Digital Initiatives in Higher Education (Paper 1 Unit 8)'
  },
  {
    id: 'net-p1-2018-montreal',
    exam: 'NTA NET Paper 1',
    year: '2018 Dec',
    topic: 'ICT & Higher Education',
    difficulty: 'Moderate',
    question: 'The Montreal Protocol (1987), along with its Kigali Amendment (2016), is an international treaty designed primarily to protect human health and the environment by phasing out:',
    options: [
      'Greenhouse gases causing global warming',
      'Ozone Depleting Substances (ODSs) such as Chlorofluorocarbons (CFCs) and Hydrofluorocarbons (HFCs)',
      'Hazardous electronic waste transboundary dumping',
      'Persistent Organic Pollutants (POPs)'
    ],
    correctIndex: 1,
    detailedExplanation: 'The Montreal Protocol on Substances that Deplete the Ozone Layer (agreed on 16 September 1987) phased out the production of numerous substances responsible for ozone depletion (CFCs, Halons). The 2016 Kigali Amendment added the phase-down of Hydrofluorocarbons (HFCs).',
    mnemonicOrTip: 'Montreal Protocol = Stratospheric Ozone Layer protection; Kyoto Protocol = Greenhouse Gases.',
    relatedSyllabusTopic: 'Environmental Treaties & Accords (Paper 1 Unit 9)'
  },
  {
    id: 'net-p1-2017-kothari',
    exam: 'NTA NET Paper 1',
    year: '2017 Jan',
    topic: 'ICT & Higher Education',
    difficulty: 'Moderate',
    question: 'Which landmark education commission in India (1964–66), titled "Education and National Development", recommended that at least 6% of the National Income / GDP be invested in education?',
    options: [
      'Radhakrishnan Commission (1948)',
      'Mudaliar Commission (1952)',
      'Kothari Commission (1964–66)',
      'National Knowledge Commission (2005)'
    ],
    correctIndex: 2,
    detailedExplanation: 'The Kothari Commission (1964–66), chaired by Dr. D.S. Kothari, submitted the report titled "Education and National Development". It recommended the 10+2+3 educational pattern, the Three-Language Formula, common school system, and allocating 6% of GNP to education.',
    mnemonicOrTip: 'Kothari = 6% GDP + Three Language Formula + 10+2+3 pattern.',
    relatedSyllabusTopic: 'Evolution of Higher Learning in India (Paper 1 Unit 10)'
  },
  {
    id: 'net-p1-2015-errors',
    exam: 'NTA NET Paper 1',
    year: '2015 Dec',
    topic: 'Research Aptitude',
    difficulty: 'Advanced',
    question: 'In hypothesis testing, a researcher commits a "Type I Error" (Alpha error) when:',
    options: [
      'A true null hypothesis is incorrectly rejected',
      'A false null hypothesis is mistakenly accepted',
      'The sample size is too large for parametric analysis',
      'The alternative hypothesis is accepted when no hypothesis was formulated'
    ],
    correctIndex: 0,
    detailedExplanation: 'Type I Error (Alpha Error) is the rejection of a TRUE null hypothesis (a "false positive" finding guilt where none exists). Type II Error (Beta Error) is failing to reject (accepting) a FALSE null hypothesis (a "false negative" acquitting a guilty party).',
    mnemonicOrTip: 'Type I = False Alarm (Rejecting Truth); Type II = Missed Detection (Accepting Falsehood).',
    relatedSyllabusTopic: 'Hypothesis Testing (Paper 1 Unit 2)'
  },
  {
    id: 'net-p1-2014-eval',
    exam: 'NTA NET Paper 1',
    year: '2014 June',
    topic: 'Teaching Aptitude',
    difficulty: 'Easy',
    question: 'What type of evaluation is conducted continuously during the instructional process to monitor student learning and provide ongoing feedback for pedagogical improvement?',
    options: [
      'Summative Evaluation',
      'Formative Evaluation',
      'Norm-Referenced Evaluation',
      'Placement Evaluation'
    ],
    correctIndex: 1,
    detailedExplanation: 'Formative evaluation occurs during the learning process (in-class polls, weekly check-ins, low-stakes quizzes) to diagnose difficulties and adjust teaching strategies in real time. Summative evaluation takes place at the end of a unit or course to measure terminal achievement.',
    mnemonicOrTip: 'Formative = During Formation (Assessment FOR learning); Summative = Summary at the End (Assessment OF learning).',
    relatedSyllabusTopic: 'Evaluation Systems (Paper 1 Unit 1)'
  },

  // ==========================================
  // SECTION 2: NTA NET PAPER 2 (ENGLISH LITERATURE: 2014 - 2024)
  // ==========================================
  {
    id: 'net-lit-2024-stuart-hall',
    exam: 'NTA NET',
    year: '2024 June',
    topic: 'Cultural Studies',
    difficulty: 'Advanced',
    question: 'The influential concept of "Encoding/Decoding" model of communication, emphasizing that media texts contain multiple polysemic meanings decoded variably by audiences, was formulated by:',
    options: [
      'Raymond Williams',
      'Stuart Hall',
      'Richard Hoggart',
      'E.P. Thompson'
    ],
    correctIndex: 1,
    detailedExplanation: 'Stuart Hall published "Encoding and Decoding in the Television Discourse" in 1973 (later 1980). He identified three reading positions for receivers: 1. Dominant-hegemonic position; 2. Negotiated position; 3. Oppositional position.',
    mnemonicOrTip: 'Stuart Hall = The Father of British Cultural Studies encoding/decoding models.',
    relatedSyllabusTopic: 'Cultural Studies (Centre for Contemporary Cultural Studies - CCCS)'
  },
  {
    id: 'net-lit-2023-showalter',
    exam: 'NTA NET',
    year: '2023 Dec',
    topic: 'Literary Theory',
    difficulty: 'Advanced',
    question: 'Who among the following coined the term "Gynocriticism" to describe a female framework for the analysis of women\'s literature?',
    options: [
      'Sandra Gilbert and Susan Gubar',
      'Elaine Showalter',
      'Helene Cixous',
      'Julia Kristeva'
    ],
    correctIndex: 1,
    detailedExplanation: 'Elaine Showalter introduced "Gynocriticism" in her seminal 1979 essay "Towards a Feminist Poetics". She argued that unlike traditional feminist critique which examines women as consumers of male-produced art, gynocriticism constructs a female framework for analyzing literature written by women, exploring female subculture, language, and literary history.',
    mnemonicOrTip: 'Mnemonic: "Show-her-alter" -> Showalter creates a room for women writers themselves (Gynocriticism).',
    relatedSyllabusTopic: 'Feminist Literary Theory & Criticism'
  },
  {
    id: 'net-lit-2023-shakes-chrono',
    exam: 'NTA NET',
    year: '2023 June',
    topic: 'Drama',
    difficulty: 'Advanced',
    question: 'Arrange the following plays of William Shakespeare in their probable chronological sequence of composition:\n(A) Macbeth\n(B) Hamlet\n(C) The Tempest\n(D) Othello',
    options: [
      '(B), (D), (A), (C)',
      '(D), (B), (A), (C)',
      '(B), (A), (D), (C)',
      '(A), (B), (D), (C)'
    ],
    correctIndex: 0,
    detailedExplanation: 'The chronological order of Shakespeare\'s major works is: Hamlet (c. 1600–1601), followed by Othello (c. 1603–1604), Macbeth (c. 1606), and finally The Tempest (c. 1611, among Shakespeare\'s late romances). Hence, the order is (B) -> (D) -> (A) -> (C).',
    mnemonicOrTip: 'Remember the mnemonic: H-O-M-K-T (Hamlet -> Othello -> King Lear -> Macbeth -> Tempest).',
    relatedSyllabusTopic: 'Shakespearean Canon & Elizabethan Drama'
  },
  {
    id: 'net-lit-2022-coleridge',
    exam: 'NTA NET',
    year: '2022 Dec',
    topic: 'Poetry',
    difficulty: 'Moderate',
    question: 'In "Biographia Literaria", S.T. Coleridge defines "Secondary Imagination" as an echo of the Primary, co-existing with the conscious will, which dissolves, diffuses, and dissipates in order to:',
    options: [
      'classify sensory impressions into categories',
      'recreate; or where this process is rendered impossible, yet still at all events it struggles to idealize and to unify',
      'reproduce mechanically the external world without aesthetic distortion',
      'substitute scientific precision for emotive inspiration'
    ],
    correctIndex: 1,
    detailedExplanation: 'In Chapter XIII of Biographia Literaria (1817), Coleridge famously writes: "The Secondary Imagination I consider as an echo of the former, co-existing with the conscious will, yet still as identical with the primary in the kind of its agency... It dissolves, diffuses, dissipates, in order to recreate; or where this process is rendered impossible, yet still at all events it struggles to idealize and to unify. It is essentially vital, even as all objects (as objects) are essentially fixed and dead."',
    mnemonicOrTip: 'Keywords to remember for Coleridge\'s Secondary Imagination: "Dissolve, diffuse, dissipate to recreate and unify" (The 3 Ds + Recreate).',
    relatedSyllabusTopic: 'Romantic Literary Criticism & Coleridge'
  },
  {
    id: 'net-lit-2021-fallacy',
    exam: 'NTA NET',
    year: '2021 Nov',
    topic: 'Literary Theory',
    difficulty: 'Moderate',
    question: 'In New Criticism, W.K. Wimsatt and Monroe Beardsley argued that evaluating a literary work on the basis of its emotional effect upon the reader commits which critical error?',
    options: [
      'The Intentional Fallacy',
      'The Affective Fallacy',
      'The Pathetic Fallacy',
      'The Heresy of Paraphrase'
    ],
    correctIndex: 1,
    detailedExplanation: 'In "The Affective Fallacy" (1949), Wimsatt and Beardsley defined it as a confusion between the poem and its results (what it is and what it does). Conversely, "The Intentional Fallacy" (1946) confuses the poem with its origins (the author\'s intended design). Ruskin coined "Pathetic Fallacy", and Cleanth Brooks coined "Heresy of Paraphrase".',
    mnemonicOrTip: 'Affective = Affect/Emotions of reader; Intentional = Intentions of author.',
    relatedSyllabusTopic: 'New Criticism (Wimsatt & Beardsley)'
  },
  {
    id: 'net-lit-2020-bakhtin',
    exam: 'NTA NET',
    year: '2020 Oct',
    topic: 'Literary Theory',
    difficulty: 'Advanced',
    question: 'Mikhail Bakhtin introduced the concept of "Heteroglossia" in "Discourse in the Novel" (1934) to describe:',
    options: [
      'The single dominant ideological voice of an epic narrator',
      'The coexistence of distinct socio-ideological dialects, registers, and conflicting voices within a novel',
      'The linguistic deterioration of postcolonial translations',
      'The unconscious slips in phonetic speech acts'
    ],
    correctIndex: 1,
    detailedExplanation: 'Bakhtin formulated "Heteroglossia" (from Greek hetero- "different" + glotta "language") to denote the internal stratification of any single national language into social dialects, professional jargons, generational languages, and ideological worldviews, all dialogically intersecting in the novel.',
    mnemonicOrTip: 'Bakhtin = Heteroglossia (Multi-voiced languages) + Polyphony + Carnivalesque.',
    relatedSyllabusTopic: 'Theory of the Novel & Bakhtin'
  },
  {
    id: 'net-lit-2019-barthes-death',
    exam: 'NTA NET',
    year: '2019 June',
    topic: 'Literary Theory',
    difficulty: 'Advanced',
    question: 'In his landmark 1967 essay "The Death of the Author", Roland Barthes famously declares that the birth of the reader must be ransomed by:',
    options: [
      'the erasure of historical context',
      'the death of the Author',
      'the liberation of structural phonemes',
      'the elimination of commercial publishers'
    ],
    correctIndex: 1,
    detailedExplanation: 'Barthes concludes his seminal essay with the iconic line: "We know that to give writing its future, it is necessary to overthrow the myth: the birth of the reader must be ransomed by the death of the Author."',
    mnemonicOrTip: 'Barthes 1967: Birth of Reader = Death of Author.',
    relatedSyllabusTopic: 'Post-Structuralism & Roland Barthes'
  },
  {
    id: 'net-lit-2018-first-folio',
    exam: 'NTA NET',
    year: '2018 July',
    topic: 'Drama',
    difficulty: 'Moderate',
    question: 'The First Folio edition of Shakespeare\'s plays, published in 1623 under the title "Mr. William Shakespeares Comedies, Histories, & Tragedies", was compiled by his fellow actors John Heminge and Henry Condell. Which play was famously excluded from this collection?',
    options: [
      'The Winter\'s Tale',
      'Pericles, Prince of Tyre',
      'Cymbeline',
      'Troilus and Cressida'
    ],
    correctIndex: 1,
    detailedExplanation: 'The First Folio (1623) contained 36 plays divided into Comedies, Histories, and Tragedies. Pericles, Prince of Tyre was omitted from the 1623 First Folio (likely due to disputed co-authorship with George Wilkins) and was only included in the Third Folio (1664).',
    mnemonicOrTip: 'First Folio (1623) = 36 plays; Pericles was omitted!',
    relatedSyllabusTopic: 'Shakespearean Canon & First Folio'
  },
  {
    id: 'net-lit-2017-keats-odes',
    exam: 'NTA NET',
    year: '2017 Nov',
    topic: 'Poetry',
    difficulty: 'Moderate',
    question: 'Which of the following celebrated odes of John Keats was composed in September 1819, distinctly later than his spring odes composed in April/May 1819?',
    options: [
      'Ode to a Nightingale',
      'Ode on a Grecian Urn',
      'To Autumn ("Season of mists and mellow fruitfulness")',
      'Ode on Melancholy'
    ],
    correctIndex: 2,
    detailedExplanation: 'Keats composed his five spring odes (Psyche, Nightingale, Grecian Urn, Melancholy, Indolence) between April and May 1819. "To Autumn" was written months later on 19 September 1819 after a peaceful walk near Winchester, marking the final great achievement of his Annus Mirabilis.',
    mnemonicOrTip: 'To Autumn was written in Autumn (September 1819); all other major odes in Spring (April-May 1819).',
    relatedSyllabusTopic: 'Romantic Poetry & Keats\'s Great Odes'
  },
  {
    id: 'net-lit-2016-dryden-dramatick',
    exam: 'NTA NET',
    year: '2016 July',
    topic: 'Prose',
    difficulty: 'Moderate',
    question: 'In John Dryden\'s critical dialogue "An Essay of Dramatick Poesie" (1668), which character serves as the persona for Dryden himself, defending modern English drama and Shakespeare against French neoclassical rules?',
    options: [
      'Crites',
      'Eugenius',
      'Lisideius',
      'Neander'
    ],
    correctIndex: 3,
    detailedExplanation: 'In Dryden\'s Essay: Crites defends the Ancients; Eugenius defends the Modern English dramatists over Ancients; Lisideius defends the French theatre and its adherence to the Three Unities; Neander (Greek for "New Man", representing Dryden himself) defends English tragicomedy, blank verse, and Shakespeare as the largest and most comprehensive soul.',
    mnemonicOrTip: 'Neander = New Man = Dryden himself.',
    relatedSyllabusTopic: 'Neoclassical Criticism & John Dryden'
  },
  {
    id: 'net-lit-2015-spenserian',
    exam: 'NTA NET',
    year: '2015 Dec',
    topic: 'Poetry',
    difficulty: 'Easy',
    question: 'What is the metrical structure and rhyme scheme of the 9-line Spenserian Stanza invented by Edmund Spenser for "The Faerie Queene"?',
    options: [
      '8 lines of iambic pentameter + 1 concluding alexandrine (iambic hexameter), rhyming ababbcbcc',
      '9 lines of uniform iambic pentameter, rhyming ababcdede',
      '7 lines of iambic pentameter + 2 concluding heroic couplets, rhyming ababbccdd',
      '8 lines of ottava rima + 1 alexandrine, rhyming abababcc'
    ],
    correctIndex: 0,
    detailedExplanation: 'The Spenserian Stanza consists of 9 lines: the first 8 lines are in iambic pentameter (10 syllables), and the final 9th line is an Alexandrine in iambic hexameter (12 syllables). Rhyme scheme: ababbcbcc.',
    mnemonicOrTip: 'Spenserian Stanza: 8 pentameters + 1 hexameter (Alexandrine); ababbcbcc.',
    relatedSyllabusTopic: 'Elizabethan Poetics & Spenser'
  },
  {
    id: 'net-lit-2014-chaucer-dialect',
    exam: 'NTA NET',
    year: '2014 Dec',
    topic: 'Poetry',
    difficulty: 'Easy',
    question: 'Geoffrey Chaucer composed "The Canterbury Tales" in which Middle English regional dialect, which subsequently became the basis of standard Modern English?',
    options: [
      'Northern Middle English',
      'East Midland (London) Dialect',
      'West Midland Dialect',
      'Southern / Kentish Dialect'
    ],
    correctIndex: 1,
    detailedExplanation: 'Chaucer wrote in the East Midland dialect spoken in London, Oxford, and Cambridge. Because of London\'s commercial, administrative, and printing prominence (William Caxton 1476), East Midland became the foundation of standard Modern English.',
    mnemonicOrTip: 'Chaucer = East Midland (London) dialect.',
    relatedSyllabusTopic: 'Chaucer & History of English Language'
  },

  // ==========================================
  // SECTION 3: MPSET (MADHYA PRADESH SET LITERATURE: 2017 - 2024)
  // ==========================================
  {
    id: 'mpset-2024-karnad',
    exam: 'MPSET',
    year: '2024 Paper II',
    topic: 'Drama',
    difficulty: 'Moderate',
    question: 'In Girish Karnad\'s play "Hayavadana", the central plot of the swapped heads between Devadatta and Kapila is adapted from which literary source?',
    options: [
      'The Mahabharata',
      'Thomas Mann\'s novella "The Transposed Heads" and the ancient Kathasaritsagara',
      'Somadeva\'s Panchatantra',
      'Kalidasa\'s Malavikagnimitram'
    ],
    correctIndex: 1,
    detailedExplanation: 'Karnad drew the story of Devadatta, Kapila, and Padmini directly from Thomas Mann\'s 1940 novella "The Transposed Heads" (Die vertauschten Köpfe), which itself was a reworked version of an ancient Sanskrit tale from Somadeva\'s 11th-century Kathasaritsagara (Vetalapanchavimshati).',
    mnemonicOrTip: 'Karnad\'s Hayavadana combines Thomas Mann + Folk Yakshagana + Human search for completeness.',
    relatedSyllabusTopic: 'Indian Drama in English Translation'
  },
  {
    id: 'mpset-2023-disbelief',
    exam: 'MPSET',
    year: '2023 Paper II',
    topic: 'Prose',
    difficulty: 'Moderate',
    question: 'Who coined the phrase "Willing suspension of disbelief" which constitutes poetic faith?',
    options: [
      'William Wordsworth',
      'Samuel Taylor Coleridge',
      'John Keats',
      'Percy Bysshe Shelley'
    ],
    correctIndex: 1,
    detailedExplanation: 'Coleridge coined this term in Chapter XIV of Biographia Literaria (1817) when explaining the division of labour in Lyrical Ballads, stating his endeavor was directed to persons and characters supernatural, or at least romantic, yet so as to transfer from our inward nature a human interest and a semblance of truth sufficient to procure for these shadows of imagination that "willing suspension of disbelief for the moment, which constitutes poetic faith."',
    mnemonicOrTip: 'Coleridge = Supernatural + Suspension of Disbelief.',
    relatedSyllabusTopic: 'Romantic Literary Criticism'
  },
  {
    id: 'mpset-2023-differance',
    exam: 'MPSET',
    year: '2023 Paper II',
    topic: 'Literary Theory',
    difficulty: 'Advanced',
    question: 'According to Jacques Derrida, the neologism "Différance" indicates what two simultaneous operations?',
    options: [
      'To differ in spatial meaning and to defer in temporal postponement',
      'To define semantic logic and to defeat phonological hierarchy',
      'To deconstruct grammar and to determine textual truth',
      'To decipher signs and to defend logocentrism'
    ],
    correctIndex: 0,
    detailedExplanation: 'Derrida coined "Différance" with an "a" (playing on the French verb différer, which means both "to differ" and "to postpone/defer"). Thus, signs differ from other signs along the spatial axis of language, and their definitive meaning is eternally deferred (postponed) along the temporal chain of signification.',
    mnemonicOrTip: 'Différance = Differ (Space) + Defer (Time).',
    relatedSyllabusTopic: 'Post-Structuralism & Deconstruction'
  },
  {
    id: 'mpset-2018-tess',
    exam: 'MPSET',
    year: '2018 Paper II',
    topic: 'Fiction',
    difficulty: 'Moderate',
    question: 'Which of the following Victorian novels carries the subtitle "A Pure Woman Faithfully Presented"?',
    options: [
      'Jane Eyre by Charlotte Brontë',
      'Tess of the d\'Urbervilles by Thomas Hardy',
      'Middlemarch by George Eliot',
      'Vanity Fair by W.M. Thackeray'
    ],
    correctIndex: 1,
    detailedExplanation: 'Thomas Hardy subtitled Tess of the d\'Urbervilles (1891) as "A Pure Woman Faithfully Presented". It created enormous controversy among Victorian moralists because Hardy defended Tess as spiritually pure despite her rape by Alec d\'Urberville and societal condemnation.',
    mnemonicOrTip: 'Tess = "A Pure Woman Faithfully Presented". Vanity Fair = "A Novel without a Hero".',
    relatedSyllabusTopic: 'Victorian Fiction'
  },
  {
    id: 'mpset-2018-kanthapura',
    exam: 'MPSET',
    year: '2018 Paper II',
    topic: 'Indian English',
    difficulty: 'Moderate',
    question: 'In the famous 1938 foreword to his novel "Kanthapura", which Indian novelist wrote: "English is not an alien language to us. It is the language of our intellectual make-up... We cannot write like the English. We should not. We cannot write only as Indians"?',
    options: [
      'R.K. Narayan',
      'Raja Rao',
      'Mulk Raj Anand',
      'Bhabani Bhattacharya'
    ],
    correctIndex: 1,
    detailedExplanation: 'Raja Rao penned this famous foreword to Kanthapura (1938), outlining the challenge of conveying in an alien language the emotional tempo and spirit of Indian life, establishing the rhythmic sthalapurana narrative style.',
    mnemonicOrTip: 'Raja Rao = Kanthapura foreword on the Indian idiom of English.',
    relatedSyllabusTopic: 'Indian Writing in English Canon'
  },
  {
    id: 'mpset-2017-touchstone',
    exam: 'MPSET',
    year: '2017 Paper II',
    topic: 'Literary Theory',
    difficulty: 'Moderate',
    question: 'Matthew Arnold\'s "Touchstone Method", proposed in "The Study of Poetry" (1880), selects passages of high poetic seriousness from which canonical masters to evaluate other poetry?',
    options: [
      'Homer, Dante, Shakespeare, and Milton',
      'Chaucer, Spenser, Pope, and Dryden',
      'Wordsworth, Coleridge, Keats, and Shelley',
      'Plato, Aristotle, Horace, and Longinus'
    ],
    correctIndex: 0,
    detailedExplanation: 'In "The Study of Poetry", Arnold advocates applying short lines from Homer, Dante, Shakespeare, and Milton as touchstones to detect the presence or absence of high poetic excellence and "high seriousness". He notably considered Chaucer lacking in high seriousness.',
    mnemonicOrTip: 'Touchstone Quad: Homer, Dante, Shakespeare, Milton (H-D-S-M).',
    relatedSyllabusTopic: 'Victorian Criticism & Matthew Arnold'
  },

  // ==========================================
  // SECTION 4: MPESB GRADE 1 (HIGH SCHOOL TEACHER SELECTION)
  // ==========================================
  {
    id: 'mp-gr1-2023-last-lesson',
    exam: 'MPESB Grade 1',
    year: '2023 Selection Test',
    topic: 'MP Prescribed Texts',
    difficulty: 'Moderate',
    question: 'In Alphonse Daudet\'s prescribed story "The Last Lesson", what French order had been issued from Berlin to be posted in the schools of Alsace and Lorraine?',
    options: [
      'All French books must be confiscated and burned immediately',
      'Only German would be taught in the schools of Alsace and Lorraine',
      'All schoolmasters must enlist in the Prussian army',
      'French students were to pay double taxation fees'
    ],
    correctIndex: 1,
    detailedExplanation: 'In "The Last Lesson", M. Hamel tells the village gathering that an order had come from Berlin that only German language would be taught in the schools of Alsace and Lorraine. This makes Franz realize how precious his mother tongue was, culminating in M. Hamel writing "Vive La France!" on the blackboard.',
    mnemonicOrTip: 'The Last Lesson = Berlin Order -> German replaces French in Alsace & Lorraine.',
    relatedSyllabusTopic: 'NCERT Class 12 Flamingo Prescribed Prose'
  },
  {
    id: 'mp-gr1-2023-paradox',
    exam: 'MPESB Grade 1',
    year: '2023 Selection Test',
    topic: 'Poetry',
    difficulty: 'Moderate',
    question: 'Identify the poetic device used in the line: "The child is father of the man" from William Wordsworth\'s poem "My Heart Leaps Up":',
    options: [
      'Paradox',
      'Hyperbole',
      'Onomatopoeia',
      'Simile'
    ],
    correctIndex: 0,
    detailedExplanation: 'A Paradox is a seemingly contradictory statement that upon deeper reflection reveals a profound truth. Biological common sense says a man fathers a child; but psychologically and spiritually, childhood experiences, pure perceptions, and innocence shape the mature adult.',
    mnemonicOrTip: 'Wordsworth: Child is father of the man = Classic Epigrammatic Paradox.',
    relatedSyllabusTopic: 'Figures of Speech & Romantic Lyric'
  },
  {
    id: 'mp-gr1-2023-frost',
    exam: 'MPESB Grade 1',
    year: '2023 Selection Test',
    topic: 'MP Prescribed Texts',
    difficulty: 'Easy',
    question: 'In Robert Frost\'s famous poem "The Road Not Taken", what does the divergence of roads in the "yellow wood" symbolize?',
    options: [
      'The decay of nature during autumn season',
      'The inevitable, irreversible choices and moral dilemmas one encounters in human life',
      'A literal journey across the Rocky Mountains',
      'The conflict between urban and pastoral lifestyle'
    ],
    correctIndex: 1,
    detailedExplanation: 'The fork in the road in "The Road Not Taken" is a universal metaphor for decision-making in life, where choosing one path precludes taking another, and "way leads on to way".',
    mnemonicOrTip: 'Robert Frost Yellow Wood = Life choices and their lifelong consequence ("And that has made all the difference").',
    relatedSyllabusTopic: 'NCERT Class 9 Beehive Prescribed Poetry'
  },
  {
    id: 'mp-gr1-2023-deepwater',
    exam: 'MPESB Grade 1',
    year: '2023 Selection Test',
    topic: 'MP Prescribed Texts',
    difficulty: 'Moderate',
    question: 'In William Douglas\'s prescribed prose "Deep Water", at what California beach did his initial childhood fear of water begin when he was knocked down by giant waves while holding his father\'s hand?',
    options: [
      'Long Beach',
      'Santa Monica Beach',
      'California Beach (San Diego)',
      'Pismo Beach'
    ],
    correctIndex: 1,
    detailedExplanation: 'William Douglas recounts that his terror of water began when he was three or four years old and his father took him to the beach in California. As they stood together in the surf, the powerful waves knocked him down and swept over him, burying him in water and extinguishing his breath.',
    mnemonicOrTip: 'Douglas trauma: Beach at California (age 3-4), followed by Yakima YMCA pool misadventure (age 10-11).',
    relatedSyllabusTopic: 'NCERT Flamingo Class 12 Prescribed Prose'
  },
  {
    id: 'mp-gr1-2018-keats-beauty',
    exam: 'MPESB Grade 1',
    year: '2018 Selection Test',
    topic: 'MP Prescribed Texts',
    difficulty: 'Moderate',
    question: 'In John Keats\'s prescribed poem "A Thing of Beauty" (an excerpt from Endymion), what removes the pall from our dark spirits?',
    options: [
      'Scientific philosophy and empiricism',
      'Some shape of beauty in nature (the sun, the moon, trees old and young, daffodils)',
      'Worldly wealth and accumulation of gold',
      'Solitary asceticism'
    ],
    correctIndex: 1,
    detailedExplanation: 'Keats writes: "Some shape of beauty moves away the pall / From our dark spirits. Such the sun, the moon, / Trees old, and young, sprouting a shady boon / For simple sheep; and such are daffodils..." Aesthetic beauty uplifts humanity from despondence.',
    mnemonicOrTip: 'Keats Endymion: Shape of beauty moves away the pall from dark spirits.',
    relatedSyllabusTopic: 'NCERT Flamingo Class 12 Prescribed Poetry'
  },
  {
    id: 'mp-gr1-2018-prosody',
    exam: 'MPESB Grade 1',
    year: '2018 Selection Test',
    topic: 'Poetry',
    difficulty: 'Advanced',
    question: 'Which metrical foot consists of two unstressed syllables followed by one stressed syllable (da-da-DUM), as in the word "understand"?',
    options: [
      'Iambic foot',
      'Trochaic foot',
      'Anapestic foot',
      'Dactylic foot'
    ],
    correctIndex: 2,
    detailedExplanation: 'An Anapestic foot consists of two unaccented syllables followed by an accented syllable (˘ ˘ /). Dactyl is the opposite (/ ˘ ˘). Trochee is (/ ˘). Iamb is (˘ /).',
    mnemonicOrTip: 'Anapest = da-da-DUM; Dactyl = DUM-da-da; Iamb = da-DUM; Trochee = DUM-da.',
    relatedSyllabusTopic: 'English Prosody & Metrical Scansion'
  },

  // ==========================================
  // SECTION 5: MPESB GRADE 2 (MIDDLE SCHOOL & TET PEDAGOGY)
  // ==========================================
  {
    id: 'mp-gr2-2023-articles',
    exam: 'MPESB Grade 2',
    year: '2023 Selection Test',
    topic: 'Grammar',
    difficulty: 'Easy',
    question: 'Fill in the blank with the appropriate indefinite article: "He is _____ European scholar who has published research on Sanskrit linguistics."',
    options: [
      'a',
      'an',
      'the',
      'no article required'
    ],
    correctIndex: 0,
    detailedExplanation: 'The choice between "a" and "an" is determined by sound, not spelling. The word "European" begins with the consonant sound /j/ (as in "you" or "yard"), not a vowel sound. Therefore, the correct article is "a European", just as we say "a university" or "a unique opportunity".',
    mnemonicOrTip: 'Vowel Sound = "An"; Consonant Sound = "A". European starts with /j/ consonant sound.',
    relatedSyllabusTopic: 'Articles & Determiners'
  },
  {
    id: 'mp-gr2-2023-chomsky-lad',
    exam: 'MPESB Grade 2',
    year: '2023 Selection Test',
    topic: 'ELT & Pedagogy',
    difficulty: 'Moderate',
    question: 'According to Noam Chomsky, children acquire language with remarkable speed because they possess an innate biological mechanism known as:',
    options: [
      'Operant Conditioning Apparatus',
      'Language Acquisition Device (LAD)',
      'Affective Filter Mechanism',
      'Zone of Proximal Development'
    ],
    correctIndex: 1,
    detailedExplanation: 'Chomsky proposed that human children are born with an innate neurological faculty called the Language Acquisition Device (LAD), which contains Universal Grammar (UG) principles allowing them to decode input syntax effortlessly regardless of cultural environment.',
    mnemonicOrTip: 'Chomsky = Innate LAD (Language Acquisition Device) & Universal Grammar.',
    relatedSyllabusTopic: 'SLA Theories & Cognitive Linguistics'
  },
  {
    id: 'mp-gr2-2020-remedial',
    exam: 'MPESB Grade 2',
    year: '2020 Primary & Middle TET',
    topic: 'ELT & Pedagogy',
    difficulty: 'Easy',
    question: 'In English language teaching, what is "Remedial Teaching" primarily intended for?',
    options: [
      'To provide advanced research assignments for gifted students',
      'To identify and overcome specific learning difficulties and weaknesses diagnosed in students',
      'To conduct periodic annual promotional examinations',
      'To teach foreign languages other than English'
    ],
    correctIndex: 1,
    detailedExplanation: 'Remedial teaching follows Diagnostic Testing. After diagnosing specific learning gaps, mispronunciations, or syntactic errors, the teacher designs customized remedial instructional strategies to bring struggling learners to the expected competency level.',
    mnemonicOrTip: 'Diagnostic Test identifies disease; Remedial Teaching provides the cure.',
    relatedSyllabusTopic: 'Diagnostic & Remedial Teaching in English'
  },
  {
    id: 'mp-gr2-2018-lsrw',
    exam: 'MPESB Grade 2',
    year: '2018 Middle School TET',
    topic: 'ELT & Pedagogy',
    difficulty: 'Easy',
    question: 'According to the hierarchy of language skills development, what is the natural, psycholinguistic order of acquiring language in children?',
    options: [
      'Speaking, Listening, Reading, Writing',
      'Listening, Speaking, Reading, Writing (LSRW)',
      'Reading, Writing, Listening, Speaking',
      'Listening, Reading, Speaking, Writing'
    ],
    correctIndex: 1,
    detailedExplanation: 'LSRW (Listening -> Speaking -> Reading -> Writing) is the natural sequence. Listening and Reading are Receptive (Passive) skills; Speaking and Writing are Productive (Active) skills. Natural language acquisition starts with receptive acoustic input before speech output emerges.',
    mnemonicOrTip: 'L-S-R-W: Listen first, Speak second, Read third, Write fourth.',
    relatedSyllabusTopic: 'Language Skills Hierarchy (LSRW)'
  },
  {
    id: 'mp-gr2-2018-parts-of-speech',
    exam: 'MPESB Grade 2',
    year: '2018 Middle School TET',
    topic: 'Grammar',
    difficulty: 'Moderate',
    question: 'Identify the part of speech of the underlined word: "He walked *round* the garden."',
    options: [
      'Adverb',
      'Preposition',
      'Adjective',
      'Noun'
    ],
    correctIndex: 1,
    detailedExplanation: 'In "He walked round the garden", "round" connects the verb "walked" with the noun object "the garden", governing the relationship of position. Therefore, it functions as a Preposition. (If it were "He turned round", it would be an adverb).',
    mnemonicOrTip: 'Preposition governs an object ("round the garden"); Adverb modifies verb without an object ("turned round").',
    relatedSyllabusTopic: 'Parts of Speech Identification'
  },
  {
    id: 'mp-gr2-2018-skimming-scanning',
    exam: 'MPESB Grade 2',
    year: '2018 Middle School TET',
    topic: 'ELT & Pedagogy',
    difficulty: 'Easy',
    question: 'When a candidate glances rapidly through an examination timetable to find the exact date of the English literature paper, what reading technique is being employed?',
    options: [
      'Skimming',
      'Scanning',
      'Intensive Reading',
      'Critical Reading'
    ],
    correctIndex: 1,
    detailedExplanation: 'Scanning is reading rapidly in order to locate specific discrete facts, numbers, or terms (like looking up a date or a telephone number). Skimming is reading rapidly to get an overall general overview or gist.',
    mnemonicOrTip: 'Scanning = Specific Fact / Needle in a haystack; Skimming = General Gist / Surface cream.',
    relatedSyllabusTopic: 'Reading Sub-skills (Skimming vs Scanning)'
  },

  // ==========================================
  // SECTION 6: ALL-EXAM GRAMMAR (LAST 10 YEARS CORE COMPETITIVE PYQs)
  // ==========================================
  {
    id: 'grammar-pyq-inversion',
    exam: 'All-Exam Grammar',
    year: '2024 State PSC / TET',
    topic: 'Grammar',
    difficulty: 'Advanced',
    question: 'Spot the error in the sentence:\n"Hardly had the candidates entered (A) / into the examination hall (B) / than the chief superintendent announced the instructions. (C) / No error (D)"',
    options: [
      'Part (A)',
      'Part (B)',
      'Part (C)',
      'Part (D)'
    ],
    correctIndex: 2,
    detailedExplanation: 'There is a major correlative conjunction error in Part (C). "Hardly" and "Scarcely" must be followed by "when", not "than"! ("No sooner" takes "than"). Additionally, in (B), "enter" when referring to physical buildings does not take "into", but Part (C) contains the fatal structural conjunction violation.',
    mnemonicOrTip: 'Hardly/Scarcely ... WHEN; No sooner ... THAN.',
    relatedSyllabusTopic: 'Adverbial Inversion & Correlative Conjunctions'
  },
  {
    id: 'grammar-pyq-subjunctive',
    exam: 'All-Exam Grammar',
    year: '2023 Central Exam Core',
    topic: 'Grammar',
    difficulty: 'Moderate',
    question: 'Which of the following sentences correctly uses the subjunctive mood?',
    options: [
      'I wish I was the topper of the NTA NET exam.',
      'I wish I were the topper of the NTA NET exam.',
      'I wish I am the topper of the NTA NET exam.',
      'I wish I have been the topper of the NTA NET exam.'
    ],
    correctIndex: 1,
    detailedExplanation: 'In hypothetical, contrary-to-fact wishes and conditional clauses, the past subjunctive "were" is required for all persons (including singular "I", "he", "she"), not "was". Therefore: "I wish I were...".',
    mnemonicOrTip: 'Unreal/Hypothetical Wish = "Were" (Subjunctive Mood).',
    relatedSyllabusTopic: 'Subjunctive Mood & Conditional Clauses'
  },
  {
    id: 'grammar-pyq-preposition',
    exam: 'All-Exam Grammar',
    year: '2022 Combined State PSC',
    topic: 'Grammar',
    difficulty: 'Moderate',
    question: 'Fill in the blank with the appropriate preposition: "The candidate was declared ineligible as his qualifications were not commensurate _____ the advertised post."',
    options: [
      'to',
      'with',
      'by',
      'for'
    ],
    correctIndex: 1,
    detailedExplanation: 'The adjective "commensurate" strictly takes the preposition "with" ("commensurate with" = corresponding in size, degree, or proportion).',
    mnemonicOrTip: 'Rule of Fixed Prepositions: Commensurate WITH.',
    relatedSyllabusTopic: 'Fixed Prepositions'
  },
  {
    id: 'grammar-pyq-agreement',
    exam: 'All-Exam Grammar',
    year: '2021 Teaching Recruitment',
    topic: 'Grammar',
    difficulty: 'Moderate',
    question: 'Identify the grammatically correct sentence:',
    options: [
      'The committee have issued its unanimous report on curriculum reform.',
      'Neither the critic nor the playwrights was satisfied with the staging.',
      'More than one candidate has qualified the MPSET examination.',
      'A variety of pleasing items were displayed at the exhibition.'
    ],
    correctIndex: 2,
    detailedExplanation: '"More than one" is syntactically followed by a singular countable noun and a singular verb ("More than one candidate has..."). In option A, "committee" acting unanimously is singular, so it should be "has issued".',
    mnemonicOrTip: '"More than one" + Singular Noun + Singular Verb.',
    relatedSyllabusTopic: 'Subject-Verb Concord'
  },
  {
    id: 'grammar-pyq-parenthetical',
    exam: 'All-Exam Grammar',
    year: '2020 Teacher Eligibility',
    topic: 'Grammar',
    difficulty: 'Moderate',
    question: 'Choose the correct verb form: "The professor, along with five research assistants, _____ currently conducting archival field work."',
    options: [
      'is',
      'are',
      'were',
      'have been'
    ],
    correctIndex: 0,
    detailedExplanation: 'Parenthetical phrases introduced by "as well as", "along with", "together with", "in addition to" do not alter the grammatical number of the subject. The subject is "The professor" (singular); therefore, the verb must be singular "is".',
    mnemonicOrTip: 'Along with / As well as -> Verb matches the FIRST subject.',
    relatedSyllabusTopic: 'Subject-Verb Concord'
  },
  {
    id: 'grammar-pyq-gerund-case',
    exam: 'All-Exam Grammar',
    year: '2019 Competitive Core',
    topic: 'Grammar',
    difficulty: 'Advanced',
    question: 'Choose the grammatically correct sentence involving a gerund:',
    options: [
      'The proctor objected to him entering the examination hall without an admit card.',
      'The proctor objected to his entering the examination hall without an admit card.',
      'The proctor objected him entering the examination hall without an admit card.',
      'The proctor objected to he entering the examination hall without an admit card.'
    ],
    correctIndex: 1,
    detailedExplanation: 'In standard prescriptive English grammar, a noun or pronoun modifying a gerund (a verbal noun ending in -ing) must be in the possessive case ("his entering", "my leaving", "their winning"), not objective ("him entering").',
    mnemonicOrTip: 'Possessive Case (my, his, their) + Gerund (-ing).',
    relatedSyllabusTopic: 'Non-Finites (Gerunds & Participles)'
  },
  {
    id: 'grammar-pyq-question-tag',
    exam: 'All-Exam Grammar',
    year: '2018 Competitive Core',
    topic: 'Grammar',
    difficulty: 'Easy',
    question: 'What is the correct question tag for: "Let\'s begin our revision for the NTA NET exam, _____?"',
    options: [
      'will we?',
      'shall we?',
      'don\'t we?',
      'aren\'t we?'
    ],
    correctIndex: 1,
    detailedExplanation: 'Proposals or suggestions beginning with "Let\'s" (Let us) take the fixed question tag "shall we?".',
    mnemonicOrTip: 'Let\'s ... shall we?',
    relatedSyllabusTopic: 'Question Tags'
  },
  {
    id: 'grammar-pyq-dangling-participle',
    exam: 'All-Exam Grammar',
    year: '2017 Competitive Core',
    topic: 'Grammar',
    difficulty: 'Advanced',
    question: 'Spot the grammatical issue: "Walking through the university library, an unpublished manuscript caught the researcher\'s eye."',
    options: [
      'Split infinitive',
      'Dangling participle',
      'Comma splice',
      'Faulty parallelism'
    ],
    correctIndex: 1,
    detailedExplanation: 'The introductory participial phrase "Walking through the university library" has no grammatical subject to attach to except "an unpublished manuscript" immediately following the comma. This absurdity creates a "Dangling Participle". Correction: "While walking through the university library, the researcher discovered an unpublished manuscript."',
    mnemonicOrTip: 'Dangling Participle: Who is performing the action? The subject must immediately follow the comma!',
    relatedSyllabusTopic: 'Non-Finites & Dangling Modifiers'
  },
  {
    id: 'grammar-pyq-stative',
    exam: 'All-Exam Grammar',
    year: '2016 Competitive Core',
    topic: 'Grammar',
    difficulty: 'Moderate',
    question: 'Which of the following sentences violates the rules of stative verbs in English?',
    options: [
      'I understand the distinction between langue and parole.',
      'She is owning three vintage editions of Shakespeare\'s sonnets.',
      'He possesses deep knowledge of Sanskrit poetics.',
      'They know the exam guidelines thoroughly.'
    ],
    correctIndex: 1,
    detailedExplanation: 'Verbs of possession (own, possess, have), cognition (know, understand, believe), and perception (see, hear) are Stative Verbs and do not typically take continuous (-ing) forms in standard English. "She is owning" is ungrammatical; it should be "She owns".',
    mnemonicOrTip: 'Stative Verbs do not take continuous aspect ("She owns", not "She is owning").',
    relatedSyllabusTopic: 'Tenses & Stative Verbs'
  },
  {
    id: 'grammar-pyq-conditional-inversion',
    exam: 'All-Exam Grammar',
    year: '2015 Competitive Core',
    topic: 'Grammar',
    difficulty: 'Advanced',
    question: 'Complete the inverted third conditional sentence: "_____ reviewed the past ten years of question papers, he would have recognized the recurring question patterns."',
    options: [
      'If he had',
      'Had he',
      'Did he',
      'Should he'
    ],
    correctIndex: 1,
    detailedExplanation: 'In formal inverted conditional clauses without "if", "Had" fronts the clause followed by the subject and past participle: "Had he reviewed... he would have recognized". (If "If" were used, it would be "If he had reviewed").',
    mnemonicOrTip: 'Had + Subject + Past Participle (Inverted Third Conditional).',
    relatedSyllabusTopic: 'Conditionals & Grammatical Inversion'
  },

  // ==========================================
  // SECTION 7: MPESB PAPER 1 (COMMON PAPER FOR GRADE 1 & GRADE 2)
  // ==========================================
  {
    id: 'mpesb-p1-2023-cdp-1',
    exam: 'MPESB Paper 1 (Common)',
    year: '2023 Varg 1/2',
    topic: 'CDP & Pedagogy',
    difficulty: 'Moderate',
    question: 'According to Lev Vygotsky, the range of tasks that a learner cannot yet perform independently but can accomplish with guidance from a More Knowledgeable Other (MKO) is termed:',
    options: [
      'Cognitive Equilibrium',
      'Zone of Proximal Development (ZPD)',
      'Sensorimotor Schema',
      'Operant Conditioning'
    ],
    correctIndex: 1,
    detailedExplanation: 'Lev Vygotsky’s Socio-Cultural Theory defines the Zone of Proximal Development (ZPD) as the gap between a learner’s actual developmental level (independent problem-solving) and potential development under adult/peer guidance (Scaffolding).',
    mnemonicOrTip: 'Vygotsky = ZPD + MKO + Social Interaction; Piaget = Schema + Equilibration.',
    relatedSyllabusTopic: 'Unit 1: Child Development & Pedagogy'
  },
  {
    id: 'mpesb-p1-2023-cdp-2',
    exam: 'MPESB Paper 1 (Common)',
    year: '2023 Varg 1/2',
    topic: 'CDP & Pedagogy',
    difficulty: 'Easy',
    question: 'Under the National Education Policy (NEP) 2020, the traditional 10+2 school curricular structure is replaced by which pedagogical framework?',
    options: [
      '5 + 3 + 3 + 4',
      '4 + 4 + 2 + 2',
      '5 + 4 + 3 + 2',
      '3 + 5 + 3 + 4'
    ],
    correctIndex: 0,
    detailedExplanation: 'NEP 2020 introduces the 5+3+3+4 design: Foundational Stage (5 years: 3 Anganwadi/Pre-school + Classes 1-2), Preparatory Stage (3 years: Classes 3-5), Middle Stage (3 years: Classes 6-8), and Secondary Stage (4 years: Classes 9-12).',
    mnemonicOrTip: 'Remember 5-3-3-4 = Ages 3–8, 8–11, 11–14, 14–18.',
    relatedSyllabusTopic: 'Unit 1: NEP 2020 & School Education'
  },
  {
    id: 'mpesb-p1-2019-cdp-3',
    exam: 'MPESB Paper 1 (Common)',
    year: '2019 Varg 1',
    topic: 'CDP & Pedagogy',
    difficulty: 'Easy',
    question: 'A student consistently confuses letters like "b" and "d", skips lines while reading aloud, and struggles with decoding phonemes. This learning disability is diagnosed as:',
    options: [
      'Dyscalculia',
      'Dysgraphia',
      'Dyslexia',
      'Dyspraxia'
    ],
    correctIndex: 2,
    detailedExplanation: 'Dyslexia is a specific reading and phonological decoding disability. Dysgraphia relates to writing/handwriting, Dyscalculia to mathematical calculation, and Dyspraxia to fine motor coordination.',
    mnemonicOrTip: 'Lex = Word/Reading (Dyslexia); Graph = Writing (Dysgraphia); Calcul = Math (Dyscalculia).',
    relatedSyllabusTopic: 'Unit 1: Inclusive Education & Learning Disabilities'
  },
  {
    id: 'mpesb-p1-2024-cdp-4',
    exam: 'MPESB Paper 1 (Common)',
    year: '2024 Practice',
    topic: 'CDP & Pedagogy',
    difficulty: 'Moderate',
    question: 'Under the Right to Education (RTE) Act 2009, what is the mandated Pupil-Teacher Ratio (PTR) for Upper Primary classes (Classes 6 to 8)?',
    options: [
      '30 : 1',
      '35 : 1',
      '40 : 1',
      '25 : 1'
    ],
    correctIndex: 1,
    detailedExplanation: 'The RTE Act 2009 specifies a Pupil-Teacher Ratio of 30:1 for Primary classes (Classes 1–5) and 35:1 for Upper Primary classes (Classes 6–8).',
    mnemonicOrTip: 'Primary = 30:1; Upper Primary = 35:1.',
    relatedSyllabusTopic: 'Unit 1: RTE Act 2009'
  },
  {
    id: 'mpesb-p1-2023-hindi-1',
    exam: 'MPESB Paper 1 (Common)',
    year: '2023 Varg 1/2',
    topic: 'General Hindi',
    difficulty: 'Moderate',
    question: '"स्वागत" शब्द का सही संधि-विच्छेद और संधि का प्रकार कौन-सा है?',
    options: [
      'स्व + आगत (दीर्घ संधि)',
      'सु + आगत (यण स्वर संधि)',
      'सु + गत (गुण संधि)',
      'स + आगत (अयादि संधि)'
    ],
    correctIndex: 1,
    detailedExplanation: 'स्वागत = सु + आगत। यहाँ "उ" के बाद असमान स्वर "आ" आने पर "उ" का "व्" हो जाता है, जो यण स्वर संधि का नियम है।',
    mnemonicOrTip: 'य, व, र से पूर्व आधा वर्ण हो तो प्रायः यण संधि होती है (सु + आगत = स्वागत)।',
    relatedSyllabusTopic: 'Unit 2: सामान्य हिंदी - संधि'
  },
  {
    id: 'mpesb-p1-2019-hindi-2',
    exam: 'MPESB Paper 1 (Common)',
    year: '2019 Varg 2',
    topic: 'General Hindi',
    difficulty: 'Easy',
    question: 'निम्नलिखित में से किस शब्द की वर्तनी शुद्ध है?',
    options: [
      'कवियित्री',
      'कवयित्री',
      'कविइत्री',
      'कवयीत्री'
    ],
    correctIndex: 1,
    detailedExplanation: '"कवि" का स्त्रीलिंग शुद्ध रूप "कवयित्री" होता है (क-व-यि-त्री)। अन्य सभी विकल्प अशुद्ध हैं। MPESB में यह सर्वाधिक बार पूछा गया वर्तनी प्रश्न है।',
    mnemonicOrTip: 'क-व-यि-त्री — "व" पर कोई मात्रा नहीं, केवल "य" पर छोटी इ (यि)।',
    relatedSyllabusTopic: 'Unit 2: सामान्य हिंदी - वर्तनी शुद्धि'
  },
  {
    id: 'mpesb-p1-2018-hindi-3',
    exam: 'MPESB Paper 1 (Common)',
    year: '2018 Varg 1',
    topic: 'General Hindi',
    difficulty: 'Moderate',
    question: '"कनक-कनक ते सौ गुनी, मादकता अधिकाय। वा खाए बौराय जग, या पाए बौराय।।" इस पंक्ति में कौन-सा अलंकार है?',
    options: [
      'श्लेष अलंकार',
      'यमक अलंकार',
      'उपमा अलंकार',
      'अतिशयोक्ति अलंकार'
    ],
    correctIndex: 1,
    detailedExplanation: 'यहाँ "कनक" शब्द दो बार आया है और दोनों बार इसके अर्थ भिन्न हैं — प्रथम "कनक" का अर्थ धतूरा और द्वितीय "कनक" का अर्थ सोना (स्वर्ण) है। अतः यहाँ यमक अलंकार है।',
    mnemonicOrTip: 'शब्द की आवृत्ति + भिन्न अर्थ = यमक अलंकार; एक शब्द में चिपके अनेक अर्थ = श्लेष।',
    relatedSyllabusTopic: 'Unit 2: सामान्य हिंदी - अलंकार'
  },
  {
    id: 'mpesb-p1-2024-hindi-4',
    exam: 'MPESB Paper 1 (Common)',
    year: '2024 Practice',
    topic: 'General Hindi',
    difficulty: 'Easy',
    question: '"यथाशक्ति" शब्द में कौन-सा समास है?',
    options: [
      'तत्पुरुष समास',
      'अव्ययीभाव समास',
      'कर्मधारय समास',
      'द्वंद्व समास'
    ],
    correctIndex: 1,
    detailedExplanation: 'यथाशक्ति (शक्ति के अनुसार) में प्रथम पद "यथा" एक अव्यय/उपसर्ग है और वही प्रधान है। अतः यहाँ अव्ययीभाव समास है।',
    mnemonicOrTip: 'यथा, आ, प्रति, भर, अनु, नि, बे से प्रारंभ होने वाले शब्द अव्ययीभाव समास होते हैं।',
    relatedSyllabusTopic: 'Unit 2: सामान्य हिंदी - समास'
  },
  {
    id: 'mpesb-p1-2023-eng-1',
    exam: 'MPESB Paper 1 (Common)',
    year: '2023 Varg 1/2',
    topic: 'General English',
    difficulty: 'Easy',
    question: 'Choose the correct article to complete the sentence: "Dr. Verma is _____ honourable member of the university senate."',
    options: [
      'a',
      'an',
      'the',
      'no article'
    ],
    correctIndex: 1,
    detailedExplanation: 'The word "honourable" begins with a silent "h" and starts with a vowel sound (/ˈɒn.ər.ə.bəl/). Therefore, the indefinite article "an" is mandatory.',
    mnemonicOrTip: 'Always judge A/An by phonetic SOUND, never by spelling ("an honest", "an hour", "a university").',
    relatedSyllabusTopic: 'Unit 3: General English - Articles'
  },
  {
    id: 'mpesb-p1-2023-eng-2',
    exam: 'MPESB Paper 1 (Common)',
    year: '2023 Varg 2',
    topic: 'General English',
    difficulty: 'Moderate',
    question: 'Select the grammatically accurate option: "She prefers classical poetry _____ modern prose."',
    options: [
      'than',
      'over',
      'to',
      'from'
    ],
    correctIndex: 2,
    detailedExplanation: 'The verb "prefer" and Latin comparatives ending in "-ior" (senior, junior, superior, inferior, prior) always take the preposition "to" rather than "than".',
    mnemonicOrTip: 'Prefer + Noun/Gerund + TO + Noun/Gerund (never "than").',
    relatedSyllabusTopic: 'Unit 3: General English - Fixed Prepositions'
  },
  {
    id: 'mpesb-p1-2019-eng-3',
    exam: 'MPESB Paper 1 (Common)',
    year: '2019 Varg 1',
    topic: 'General English',
    difficulty: 'Moderate',
    question: 'Convert into Passive Voice: "Who composed the national song Vande Mataram?"',
    options: [
      'By whom was the national song Vande Mataram composed?',
      'Who was composed the national song Vande Mataram?',
      'By whom the national song Vande Mataram was composed?',
      'Whom was the national song Vande Mataram composed by?'
    ],
    correctIndex: 0,
    detailedExplanation: 'Interrogative sentences starting with "Who" in Simple Past change to "By whom + was/were + Object + V3?". Notice the auxiliary "was" must precede the subject in an interrogative passive structure.',
    mnemonicOrTip: 'Who + V2 -> By whom + was/were + Subject + V3?',
    relatedSyllabusTopic: 'Unit 3: General English - Active & Passive Voice'
  },
  {
    id: 'mpesb-p1-2024-eng-4',
    exam: 'MPESB Paper 1 (Common)',
    year: '2024 Practice',
    topic: 'General English',
    difficulty: 'Moderate',
    question: 'Identify the correct sentence:',
    options: [
      'Despite of heavy rain, the candidates reached the examination centre.',
      'In spite the heavy rain, the candidates reached the examination centre.',
      'Despite the heavy rain, the candidates reached the examination centre.',
      'Although of the heavy rain, the candidates reached the examination centre.'
    ],
    correctIndex: 2,
    detailedExplanation: '"Despite" means "in spite of" and NEVER takes the preposition "of". Either "Despite the heavy rain" or "In spite of the heavy rain" is correct.',
    mnemonicOrTip: 'Despite = In spite OF (Never write "Despite of").',
    relatedSyllabusTopic: 'Unit 3: General English - Error Spotting'
  },
  {
    id: 'mpesb-p1-2023-mpgk-1',
    exam: 'MPESB Paper 1 (Common)',
    year: '2023 Varg 1/2',
    topic: 'MP GK & Current Affairs',
    difficulty: 'Easy',
    question: 'Which National Park of Madhya Pradesh became the first Tiger Reserve in India to introduce an official mascot named "Bhoorsingh the Barasingha"?',
    options: [
      'Bandhavgarh National Park',
      'Kanha Kisli National Park',
      'Pench National Park',
      'Kuno National Park'
    ],
    correctIndex: 1,
    detailedExplanation: 'Kanha Kisli National Park (established 1955, Project Tiger 1973-74) is the largest National Park in MP and famously introduced "Bhoorsingh the Barasingha" (designed by Rohan Chakravarty) as India’s first official tiger reserve mascot in 2017.',
    mnemonicOrTip: 'Kanha Kisli = Brederi Swamp Deer (Barasingha) + Bhoorsingh Mascot.',
    relatedSyllabusTopic: 'Unit 4: MP Wildlife & National Parks'
  },
  {
    id: 'mpesb-p1-2023-mpgk-2',
    exam: 'MPESB Paper 1 (Common)',
    year: '2023 Varg 2',
    topic: 'MP GK & Current Affairs',
    difficulty: 'Moderate',
    question: 'Which Constitutional Amendment Act transferred "Education" from the State List to the Concurrent List of the Seventh Schedule?',
    options: [
      '44th Amendment Act, 1978',
      '42nd Amendment Act, 1976',
      '86th Amendment Act, 2002',
      '73rd Amendment Act, 1992'
    ],
    correctIndex: 1,
    detailedExplanation: 'The 42nd Constitutional Amendment Act (1976) moved five subjects—Education, Forests, Weights & Measures, Protection of Wild Animals & Birds, and Administration of Justice—from the State List to the Concurrent List.',
    mnemonicOrTip: '42nd (1976) = Education to Concurrent List; 86th (2002) = Article 21A Fundamental Right.',
    relatedSyllabusTopic: 'Unit 4: Indian Constitution & Education'
  },
  {
    id: 'mpesb-p1-2019-mpgk-3',
    exam: 'MPESB Paper 1 (Common)',
    year: '2019 Varg 1',
    topic: 'MP GK & Current Affairs',
    difficulty: 'Easy',
    question: 'Which of the following is the official State Dance of Madhya Pradesh?',
    options: [
      'Garba',
      'Matki',
      'Rai',
      'Bihu'
    ],
    correctIndex: 2,
    detailedExplanation: '"Rai" (predominantly performed in the Bundelkhand region) is the official State Dance of Madhya Pradesh, while "Maach" (Malwa region) is the official State Folk Drama.',
    mnemonicOrTip: 'MP State Dance = Rai (Bundelkhand); MP State Drama = Maach (Malwa).',
    relatedSyllabusTopic: 'Unit 4: MP Art, Culture & Symbols'
  },
  {
    id: 'mpesb-p1-2024-mpgk-4',
    exam: 'MPESB Paper 1 (Common)',
    year: '2024 Practice',
    topic: 'MP GK & Current Affairs',
    difficulty: 'Moderate',
    question: 'The three UNESCO World Heritage Sites located in Madhya Pradesh are:',
    options: [
      'Khajuraho, Sanchi Stupa, and Bhimbetka Rock Shelters',
      'Ujjain Mahakal, Orchha Fort, and Mandu Jahaz Mahal',
      'Gwalior Fort, Pachmarhi, and Amarkantak',
      'Khajuraho, Bhedaghat, and Chanderi'
    ],
    correctIndex: 0,
    detailedExplanation: 'Madhya Pradesh has three permanent UNESCO World Heritage Sites: Khajuraho Group of Monuments (1986), Buddhist Monuments at Sanchi (1989), and Rock Shelters of Bhimbetka (2003).',
    mnemonicOrTip: 'K-S-B: Khajuraho (1986) -> Sanchi (1989) -> Bhimbetka (2003).',
    relatedSyllabusTopic: 'Unit 4: MP Heritage & Tourism'
  },
  {
    id: 'mpesb-p1-2023-reas-1',
    exam: 'MPESB Paper 1 (Common)',
    year: '2023 Varg 1/2',
    topic: 'Reasoning & Numerical',
    difficulty: 'Easy',
    question: 'Find the missing number in the series: 3, 8, 15, 24, 35, ?',
    options: [
      '46',
      '48',
      '49',
      '50'
    ],
    correctIndex: 1,
    detailedExplanation: 'Pattern: 2² − 1 = 3, 3² − 1 = 8, 4² − 1 = 15, 5² − 1 = 24, 6² − 1 = 35, Next = 7² − 1 = 48. Alternatively, consecutive odd differences (+5, +7, +9, +11, +13) give 35 + 13 = 48.',
    mnemonicOrTip: 'Always check differences or n² ± 1 first in MPESB number series!',
    relatedSyllabusTopic: 'Unit 5: Number Series & Pattern Recognition'
  },
  {
    id: 'mpesb-p1-2023-reas-2',
    exam: 'MPESB Paper 1 (Common)',
    year: '2023 Varg 2',
    topic: 'Reasoning & Numerical',
    difficulty: 'Moderate',
    question: 'In a certain code language, "TEACHER" is written as "VGCEJGT". How will "CHILDREN" be written in that code?',
    options: [
      'EJKNFTGP',
      'EJKNFGTO',
      'EJKMFGTO',
      'FJKNFGTP'
    ],
    correctIndex: 0,
    detailedExplanation: 'Each letter moves forward by +2 positions in the alphabet: T(+2)=V, E(+2)=G, A(+2)=C, C(+2)=E, H(+2)=J, E(+2)=G, R(+2)=T. Applying +2 to CHILDREN: C→E, H→J, I→K, L→N, D→F, R→T, E→G, N→P => EJKNFTGP.',
    mnemonicOrTip: 'Write down letter numbers using EJOTY (5-10-15-20-25) to decode shifts instantly.',
    relatedSyllabusTopic: 'Unit 5: Coding & Decoding'
  },
  {
    id: 'mpesb-p1-2019-reas-3',
    exam: 'MPESB Paper 1 (Common)',
    year: '2019 Varg 1',
    topic: 'Reasoning & Numerical',
    difficulty: 'Moderate',
    question: 'If the price of a reference book increases by 25%, by what percentage must a candidate reduce consumption/quantity so that total expenditure remains unchanged?',
    options: [
      '25%',
      '20%',
      '16.67%',
      '30%'
    ],
    correctIndex: 1,
    detailedExplanation: 'Using the standard expenditure neutrality formula: Reduction% = [R / (100 + R)] × 100 = [25 / (100 + 25)] × 100 = (25 / 125) × 100 = 20%.',
    mnemonicOrTip: 'Price up by 25% (1/4) -> Consumption down by 1/(4+1) = 1/5 = 20%.',
    relatedSyllabusTopic: 'Unit 5: Quantitative Aptitude - Percentage'
  },
  {
    id: 'mpesb-p1-2024-reas-4',
    exam: 'MPESB Paper 1 (Common)',
    year: '2024 Practice',
    topic: 'Reasoning & Numerical',
    difficulty: 'Moderate',
    question: 'A teacher walks 12 meters North from the staffroom, then turns East and walks 5 meters to reach the classroom. What is the shortest straight-line distance between the staffroom and the classroom?',
    options: [
      '17 meters',
      '13 meters',
      '15 meters',
      '14 meters'
    ],
    correctIndex: 1,
    detailedExplanation: 'North and East form a 90° right angle. By Pythagoras Theorem: Shortest Distance = √(12² + 5²) = √(144 + 25) = √169 = 13 meters.',
    mnemonicOrTip: 'Memorize standard Pythagorean triplet (5, 12, 13) for 3-second answers!',
    relatedSyllabusTopic: 'Unit 5: Direction Sense & Geometry'
  }
];
