import { Paper1Unit } from '../types';

export const NET_PAPER1_UNITS: Paper1Unit[] = [
  {
    id: 'p1-unit-1',
    unitNumber: 1,
    title: 'Unit 1: Teaching Aptitude',
    subTitle: 'Pedagogical Concepts, Levels of Teaching, Learner Characteristics & Evaluation Systems',
    overview: 'Covers the psychological foundations of instruction, cognitive hierarchies, factors influencing teaching effectiveness, modern ICT-based support systems, Choice Based Credit System (CBCS), and comprehensive evaluation architectures.',
    topics: [
      {
        name: 'Levels of Teaching (MLT, ULT, RLT)',
        description: 'Memory Level of Teaching (Herbartian model - rote recall), Understanding Level of Teaching (Morrison model - generalization and mastery), and Reflective Level of Teaching (Hunt model - problem solving and critical metacognition).',
        highYieldExamPoints: [
          'Memory Level (MLT) is propounded by Herbart; focuses on factual reproduction and stimulus-response conditioning.',
          'Understanding Level (ULT) is propounded by Morrison; focuses on relationship identification and conceptual exemplification.',
          'Reflective Level (RLT) is propounded by Hunt; highest level requiring open classroom climate, critical hypothesis formulation, and creative problem solving.'
        ]
      },
      {
        name: 'Evaluation Systems & CBCS',
        description: 'Diagnostic, Formative (during instruction), and Summative (end of course) evaluations. Criterion-Referenced vs Norm-Referenced testing. Computer Based Testing (CBT) and Choice Based Credit System (CBCS).',
        highYieldExamPoints: [
          'Formative Assessment evaluates ongoing learning to provide continuous feedback (e.g. quizzes, classroom polls).',
          'Summative Assessment evaluates terminal cumulative mastery (e.g. semester finals, standardized tests).',
          'Norm-Referenced Test (NRT) ranks student against peers using percentiles; Criterion-Referenced Test (CRT) measures performance against fixed objective standards.'
        ]
      }
    ],
    examPoints: [
      'Gagne’s 9 Events of Instruction: 1. Gain attention, 2. Inform objectives, 3. Stimulate recall, 4. Present stimulus, 5. Provide guidance, 6. Elicit performance, 7. Provide feedback, 8. Assess performance, 9. Enhance retention.',
      'Bloom’s Revised Taxonomy Cognitive Domain Hierarchy: Remember -> Understand -> Apply -> Analyze -> Evaluate -> Create (coined by Anderson & Krathwohl).',
      'Microteaching: Coined by Dwight Allen (1963) at Stanford; standard cycle time in India (NCERT) is 36 minutes (Plan, Teach 6m, Feedback 6m, Re-plan 12m, Re-teach 6m, Re-feedback 6m).'
    ],
    pastYearTrends: [
      'NTA NET frequently frames assertion-reasoning questions contrasting Norm-referenced testing with Criterion-referenced testing.',
      'Matching question: Herbert (Memory), Morrison (Understanding), Hunt (Reflective).'
    ]
  },
  {
    id: 'p1-unit-2',
    unitNumber: 2,
    title: 'Unit 2: Research Aptitude',
    subTitle: 'Epistemology, Methodologies, Sampling, Referencing Styles & Research Ethics',
    overview: 'Examines positivist and post-positivist epistemologies, quantitative versus qualitative designs, probability and non-probability sampling, thesis formatting (APA, MLA), and plagiarism metrics (Turnitin / Urkund).',
    topics: [
      {
        name: 'Positivism vs Post-Positivism & Research Paradigms',
        description: 'Positivism (Auguste Comte - objective reality, quantitative, deductive, empirical verification) vs Post-Positivism (constructivism, interpretivism, qualitative, subjective reality, fallibilism).',
        highYieldExamPoints: [
          'Positivism relies on quantitative methods, hypothesis testing, and the belief in an objective external reality independent of the observer.',
          'Post-positivism acknowledges subjective biases, uses mixed/qualitative methods, and embraces critical realism.'
        ]
      },
      {
        name: 'Sampling Techniques & Types of Research',
        description: 'Probability sampling (Simple random, Stratified, Systematic, Cluster) vs Non-probability sampling (Convenience, Purposive, Quota, Snowball). Experimental research, ex-post facto research, and action research.',
        highYieldExamPoints: [
          'Action Research cycle: Plan -> Act -> Observe -> Reflect (Kurt Lewin model); designed for immediate localized classroom or institutional problem solving.',
          'Snowball sampling is non-probability, used for hidden or hard-to-reach populations (e.g., drug addicts, rare disease patients).',
          'Ex-post facto research evaluates events after they have occurred without manipulating independent variables.'
        ]
      }
    ],
    examPoints: [
      'Type I Error (Alpha Error): Rejecting a TRUE Null Hypothesis (False Positive: convicting an innocent person).',
      'Type II Error (Beta Error): Accepting a FALSE Null Hypothesis (False Negative: acquitting a guilty criminal).',
      'UGC Plagiarism Regulations 2018 Similarity Levels: Level 0 (up to 10% - no penalty), Level 1 (10-40% - revise within 6 months), Level 2 (40-60% - debarred 1 year), Level 3 (above 60% - registration cancelled).',
      'Referencing Styles: APA (Author-Date, e.g. Smith, 2020) used in Social Sciences; MLA (Author-Page, e.g. Smith 45) used in Humanities & Literature.'
    ],
    pastYearTrends: [
      'Chronological sequence of research steps: 1. Formulation of Problem, 2. Literature Review, 3. Hypothesis Formulation, 4. Research Design, 5. Data Collection, 6. Data Analysis, 7. Hypothesis Testing, 8. Generalization & Reporting.'
    ]
  },
  {
    id: 'p1-unit-3',
    unitNumber: 3,
    title: 'Unit 3: Reading Comprehension',
    subTitle: 'Critical Reading, Inferences, Contextual Vocabulary & Theme Extraction',
    overview: 'Techniques for deciphering complex expository, narrative, and argumentative passages with speed and precision; identifying authorial tone, underlying assumptions, and structural thesis points.',
    topics: [
      {
        name: 'Techniques of Effective Reading',
        description: 'Skimming for central thesis, Scanning for discrete data and numbers, and Intensive Reading for logical nuance.',
        highYieldExamPoints: [
          'Read the questions and key options BEFORE reading the passage to prime selective attention.',
          'Distinguish between factual explicit statements and speculative inferences.'
        ]
      }
    ],
    examPoints: [
      'Identify Tone of Author: Objective, Cynical, Laudatory, Didactic, Pedantic, Skeptical, or Vitriolic.',
      'Watch out for extreme absolute qualifiers in options: "always", "never", "only", "exclusively" are usually incorrect distractors.',
      'Passage questions test reading speed and semantic mapping under timed pressure.'
    ],
    pastYearTrends: [
      'NTA NET questions now feature academic essays on environmental conservation, digital ethics, higher education policy, and philosophical aesthetics.'
    ]
  },
  {
    id: 'p1-unit-4',
    unitNumber: 4,
    title: 'Unit 4: Communication',
    subTitle: 'Communication Models, 7 Cs, Non-Verbal Codes & Classroom Communication',
    overview: 'Explores linear, interactive, and transactional communication paradigms, non-verbal semantics (kinesics, proxemics, chronemics), psychological and physical barriers, and mass media impact on society.',
    topics: [
      {
        name: 'Types & Dimensions of Communication',
        description: 'Intrapersonal (self-talk), Interpersonal (dyadic), Group, Mass Communication, and Downward / Upward / Horizontal / Diagonal organizational flows.',
        highYieldExamPoints: [
          'Shannon and Weaver Model (1949): Mathematical linear model introducing the concept of "Noise".',
          'Berlo\'s SMCR Model: Source, Message, Channel, Receiver.'
        ]
      },
      {
        name: 'Non-Verbal Communication Codes',
        description: 'Kinesics (body language & facial gestures), Proxemics (spatial distance - Edward T. Hall), Haptics (touch), Chronemics (time perception), Paralanguage (pitch, volume, rate).',
        highYieldExamPoints: [
          'Proxemics (Edward T. Hall): Intimate space (0-1.5 ft), Personal space (1.5-4 ft), Social space (4-12 ft), Public space (12+ ft).',
          'Paralanguage refers to HOW words are spoken (vocalics), not the linguistic content.'
        ]
      }
    ],
    examPoints: [
      'The 7 Cs of Effective Communication: Clear, Concise, Concrete, Correct, Coherent, Complete, Courteous.',
      'Entropy: Tendency of a communication message to degenerate or accumulate noise over time/transmission.',
      'Classroom Communication should be dialogic, empathetic, and student-centered rather than authoritarian monologic lecture.'
    ],
    pastYearTrends: [
      'Frequent question: Which non-verbal code relates to personal space? -> Proxemics. To body movements? -> Kinesics.'
    ]
  },
  {
    id: 'p1-unit-5',
    unitNumber: 5,
    title: 'Unit 5: Mathematical Reasoning & Aptitude',
    subTitle: 'Number Series, Codes, Ratios, Speed-Distance, Profit-Loss & Interest',
    overview: 'Core numerical reasoning algorithms, alphabetical pattern decoders, direction matrices, proportion mechanics, and commercial arithmetic.',
    topics: [
      {
        name: 'Series & Coding-Decoding',
        description: 'Arithmetic differences, geometric ratios, prime sequences, alternate series, and forward/backward alphabet positions (EJOTY mnemonic: 5, 10, 15, 20, 25).',
        highYieldExamPoints: [
          'Opposite letters sum to 27 (e.g. A[1] + Z[26] = 27; B[2] + Y[25] = 27).',
          'Check secondary difference in polynomial series when simple gaps do not yield a constant.'
        ]
      },
      {
        name: 'Commercial Arithmetic Essentials',
        description: 'Time, Speed and Distance (relative velocity conversions: km/h * 5/18 = m/s), Percentages, Profit/Loss, and Simple/Compound Interest.',
        highYieldExamPoints: [
          'Average Speed for equal distance: 2xy / (x + y), never simple arithmetic mean!',
          'Difference between CI and SI for 2 years: D = P * (R / 100)^2.'
        ]
      }
    ],
    examPoints: [
      'Formula for Compound Interest: A = P(1 + R/100)^n.',
      'Direction tests: Always draw standard compass (North up, South down, East right, West left). A clockwise turn is right; counter-clockwise is left.',
      'Blood relations: Code males with (+) and females with (-); siblings horizontal, generations vertical.'
    ],
    pastYearTrends: [
      'Guaranteed 1 question on Number Series, 1 on Coding-Decoding, 1 on Blood Relations, and 2 on applied commercial math (Profit/Loss or Ratio).'
    ]
  },
  {
    id: 'p1-unit-6',
    unitNumber: 6,
    title: 'Unit 6: Logical Reasoning & Indian Logic (Pramanas)',
    subTitle: 'Classical Square of Opposition, Syllogisms, Fallacies & Nyaya Epistemology',
    overview: 'Aristotelian formal logic (A, E, I, O propositions), categorical syllogisms, informal fallacies, and complete Nyaya philosophy Pramana epistemology (Pratyaksha, Anumana, Upamana, Shabda, Arthapatti, Anupalabdhi) and Hetvabhasa.',
    topics: [
      {
        name: 'Classical Square of Opposition',
        description: 'Categorical propositions: A (Universal Affirmative - All S is P), E (Universal Negative - No S is P), I (Particular Affirmative - Some S is P), O (Particular Negative - Some S is not P).',
        highYieldExamPoints: [
          'Contradictories (A & O; E & I): If one is TRUE, the other MUST be FALSE, and vice versa. Cannot be true together, cannot be false together.',
          'Contraries (A & E): Cannot both be TRUE together, but CAN both be FALSE.',
          'Subcontraries (I & O): Cannot both be FALSE together, but CAN both be TRUE.',
          'Subalternation (A -> I; E -> O): Truth flows downwards (If A is true, I is true); Falsity flows upwards (If I is false, A is false).'
        ]
      },
      {
        name: 'Indian Logic (Pramanas & Hetvabhasa)',
        description: '6 Pramanas in Nyaya and Advaita Vedanta: 1. Pratyaksha (Perception), 2. Anumana (Inference), 3. Upamana (Comparison), 4. Shabda (Testimony), 5. Arthapatti (Postulation), 6. Anupalabdhi (Non-apprehension).',
        highYieldExamPoints: [
          'Arthapatti (Postulation): Devadatta is fat, but does not eat by day; hence he eats by night. Accepted by Mimamsa and Advaita Vedanta, but reduced to Anumana by Nyaya.',
          'Anupalabdhi (Non-perception): Perceiving the absence of a pot on the ground.',
          'Anumana 5 members (Pancha Avayava): 1. Pratijna (Proposition: Hill has fire), 2. Hetu (Reason: Because it has smoke), 3. Udaharana (Example: Wherever smoke, there fire, like kitchen), 4. Upanaya (Application: Hill has smoke), 5. Nigamana (Conclusion: Therefore hill has fire).'
        ]
      }
    ],
    examPoints: [
      'Hetvabhasa (5 Fallacies of Inference): 1. Savyabhichara (Irregular middle), 2. Viruddha (Contradictory middle), 3. Satpratipaksha (Inferentially contradicted middle), 4. Asiddha (Unproved middle), 5. Badhita (Non-inferentially contradicted middle).',
      'Informal Fallacies: Ad Hominem (attacking person), Strawman (misrepresenting opponent\'s argument), Red Herring (diverting issue), Slippery Slope (unwarranted chain of events), Appeal to Ignorance (Ad Ignorantiam).'
    ],
    pastYearTrends: [
      'Every recent NTA NET paper contains at least 2 questions on the Square of Opposition and 2 questions on Indian Logic Pramanas/Hetvabhasa.'
    ]
  },
  {
    id: 'p1-unit-7',
    unitNumber: 7,
    title: 'Unit 7: Data Interpretation (DI)',
    subTitle: 'Tabulation, Pie Charts, Bar Graphs, Histograms & Percentage Growth',
    overview: 'Quantitative data parsing, cross-tabulation analytics, proportional calculations, and statistical comparison under examination time limits.',
    topics: [
      {
        name: 'Data Parsing & Table Analysis',
        description: 'Analyzing two-way tables, ratios of men/women, revenue versus expenditure, and sectorial allocations.',
        highYieldExamPoints: [
          'Percentage Change formula: [(Final Value - Initial Value) / Initial Value] * 100.',
          'Profit Percentage on Expenditure: [(Income - Expenditure) / Expenditure] * 100.'
        ]
      }
    ],
    examPoints: [
      'Pie chart degree to percentage conversion: 360° = 100%, 1% = 3.6°, 10% = 36°.',
      'Always approximate decimals to save time (e.g. 248 / 985 ≈ 250 / 1000 = 25%).',
      'Watch row and column labels carefully for units (e.g. in thousands vs in millions vs in lakhs).'
    ],
    pastYearTrends: [
      'NTA NET typically sets 1 comprehensive table or dual pie-chart containing 5 integrated sub-questions.'
    ]
  },
  {
    id: 'p1-unit-8',
    unitNumber: 8,
    title: 'Unit 8: Information & Communication Technology (ICT)',
    subTitle: 'Hardware, Software, Memory Hierarchy, Networking, Cyber Ethics & Digital Initiatives',
    overview: 'Computer architecture, binary/octal/hexadecimal bases, RAM/ROM, internet protocols (TCP/IP, HTTP, FTP, DNS), malware categories, and national digital repositories (SWAYAM, e-PG Pathshala, Digilocker).',
    topics: [
      {
        name: 'Memory Hierarchy & Storage Speeds',
        description: 'Fastest to slowest memory: CPU Registers > Cache Memory (L1, L2, L3) > Primary RAM / ROM > Secondary SSD > HDD > Optical Discs > Magnetic Tape.',
        highYieldExamPoints: [
          'RAM is Volatile (loses data on power down); ROM is Non-Volatile (stores BIOS firmware).',
          '1 Byte = 8 bits. 1 Nibble = 4 bits. 1 KB = 1024 Bytes. 1 MB = 1024 KB. 1 GB = 1024 MB. 1 TB = 1024 GB. 1 PB = 1024 TB.'
        ]
      },
      {
        name: 'Government Digital Initiatives in Higher Education',
        description: 'SWAYAM (Study Webs of Active-Learning for Young Aspiring Minds), SWAYAM PRABHA (40 DTH educational channels on GSAT-15), National Digital Library (NDLI), e-ShodhSindhu, Shodhganga, NAD (National Academic Depository).',
        highYieldExamPoints: [
          'Shodhganga is a digital repository of Indian doctoral theses and dissertations.',
          'Shodhgangotri is a repository of approved research synopses / proposals.',
          'SWAYAM provides MOOCs with 4 quadrants: Video lectures, Downloadable reading material, Self-assessment tests, Online discussion forum.'
        ]
      }
    ],
    examPoints: [
      'Phishing: Fraudulent attempt to steal credentials via deceptive emails mimicking legitimate institutions.',
      'Ransomware: Malware that encrypts user files and demands payment for the decryption key (e.g., WannaCry).',
      'IPv4 has 32-bit addresses written in 4 decimal octets (e.g. 192.168.1.1); IPv6 has 128-bit addresses written in 8 hexadecimal blocks.'
    ],
    pastYearTrends: [
      'Conversion questions between Binary and Decimal are asked in almost every shift.',
      'Acronyms: MOOC, ASCII, URL, HTTP, SMTP, DNS, RAID.'
    ]
  },
  {
    id: 'p1-unit-9',
    unitNumber: 9,
    title: 'Unit 9: People, Development & Environment',
    subTitle: 'MDGs, SDGs, Environmental Protocols, Renewable Energy & Disasters',
    overview: 'Anthropogenic ecological disruption, air/water pollutants, National Action Plan on Climate Change (NAPCC 8 missions), international accords (Montreal, Kyoto, Paris, ISA), and disaster mitigation.',
    topics: [
      {
        name: 'MDGs vs SDGs Frameworks',
        description: 'Millennium Development Goals (8 Goals, 2000-2015) vs Sustainable Development Goals (17 Goals, 169 Targets, 2015-2030 adopted at UN Rio+20 Summit).',
        highYieldExamPoints: [
          'SDG 1: No Poverty; SDG 2: Zero Hunger; SDG 3: Good Health; SDG 4: Quality Education; SDG 5: Gender Equality; SDG 6: Clean Water & Sanitation; SDG 7: Affordable & Clean Energy; SDG 13: Climate Action.',
          'MDG 2 was Universal Primary Education, while SDG 4 is Inclusive and Equitable Quality Education for all.'
        ]
      },
      {
        name: 'International Accords & Protocols',
        description: 'Montreal Protocol (1987 - Ozone depleting substances / CFCs; Kigali Amendment), Kyoto Protocol (1997 - Greenhouse gases, Annex 1 countries), Paris Agreement (COP21, 2015 - Keep temperature rise below 2°C, aim for 1.5°C), International Solar Alliance (ISA - Launched by India & France, HQ in Gurugram).',
        highYieldExamPoints: [
          'Montreal Protocol is the most universally ratified environmental treaty in history.',
          'NAPCC (2008) has 8 National Missions: Solar, Enhanced Energy Efficiency, Sustainable Habitat, Water, Sustaining Himalayan Ecosystem, Green India, Sustainable Agriculture, Strategic Knowledge for Climate Change.'
        ]
      }
    ],
    examPoints: [
      'Primary Air Pollutants: Carbon Monoxide (CO), Nitrogen Oxides (NOx), Sulfur Dioxide (SO2), Particulate Matter (PM2.5, PM10).',
      'Secondary Air Pollutant: Ground-level Ozone (O3), Peroxyacetyl Nitrate (PAN), Photochemical Smog (formed by reaction of sunlight with NOx and VOCs).',
      'Biochemical Oxygen Demand (BOD): Indicator of organic pollution in water; high BOD indicates low dissolved oxygen (severely polluted).'
    ],
    pastYearTrends: [
      'Direct questions matching the SDG goal number with its specific target (especially SDG 4, 5, 7, 13).'
    ]
  },
  {
    id: 'p1-unit-10',
    unitNumber: 10,
    title: 'Unit 10: Higher Education System',
    subTitle: 'Ancient Universities, Colonial Commissions, NEP 2020 & Regulatory Governance',
    overview: 'Evolution of Indian higher learning from Vedic/Buddhist centers (Nalanda, Takshashila, Vikramashila) to pre/post-independence commissions, National Education Policy (NEP 2020), and apex regulatory bodies (UGC, AICTE, NAAC, NIRF).',
    topics: [
      {
        name: 'Ancient Centers of Higher Learning',
        description: 'Takshashila (Gandhara - medicine, Chanakya, Jivaka, Panini), Nalanda (Bihar - Mahayana Buddhism, founded by Kumaragupta I, destroyed by Bakhtiyar Khilji, famous library Dharmaganja with 3 buildings: Ratnasagara, Ratnodadhi, Ratnaranjaka), Vikramashila (founded by King Dharmapala of Pala dynasty), Valabhi (Gujarat - Hinayana Buddhism).',
        highYieldExamPoints: [
          'Nalanda library was called "Dharmaganja", housing manuscripts in 9-storeyed Ratnodadhi.',
          'Takshashila was renowned for the study of medicine and military arts; Chanakya composed Arthashastra here; inscribed as UNESCO World Heritage Site in 1980.'
        ]
      },
      {
        name: 'Colonial & Post-Independence Higher Education Commissions',
        description: 'Macaulay’s Minute (1835), Wood’s Despatch (1854 - Magna Carta), Hunter Commission (1882), Sadler Commission (1917 - 10+2+3 structure first suggested), Radhakrishnan Commission (1948 - University Education Commission), Mudaliar Commission (1952 - Secondary Education), Kothari Commission (1964-66 - Education and National Development, 6% of GDP recommended).',
        highYieldExamPoints: [
          'Wood\'s Despatch (1854) recommended establishing the first three universities at Calcutta, Bombay, and Madras (1857).',
          'Radhakrishnan Commission (1948) recommended the creation of the University Grants Commission (UGC established 1953, statutory status 1956 under Section 12).'
        ]
      },
      {
        name: 'NEP 2020 & Apex Regulatory Architecture',
        description: 'National Education Policy 2020 (chaired by Dr. K. Kasturirangan): Replacing 10+2 with 5+3+3+4; 4-year undergraduate degree with multiple entry/exit options; Academic Bank of Credits (ABC); Higher Education Commission of India (HECI) with 4 verticals: NHERC, NAC, HEGC, GEC.',
        highYieldExamPoints: [
          'NEP 2020 targets Gross Enrolment Ratio (GER) in higher education to reach 50% by 2035.',
          'HECI will replace UGC and AICTE, with four autonomous verticals: 1. NHERC (regulation), 2. NAC (accreditation), 3. HEGC (funding), 4. GEC (learning outcomes standard setting).'
        ]
      }
    ],
    examPoints: [
      'NAAC (National Assessment and Accreditation Council) was established in 1994, HQ in Bengaluru.',
      'NIRF (National Institutional Ranking Framework) launched in 2015 by MHRD (now Ministry of Education); ranks institutions across 5 parameters: Teaching, Research, Graduation Outcomes, Outreach, Perception.',
      'Central Universities are established by an Act of Parliament; the President of India is the Visitor of all Central Universities.'
    ],
    pastYearTrends: [
      'Questions comparing ancient university specializations (Nalanda = Mahayana, Valabhi = Hinayana, Takshashila = Medicine/Chanakya).',
      'NEP 2020 structure and the 4 verticals of HECI.'
    ]
  }
];
