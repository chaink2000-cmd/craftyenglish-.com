import { MpesbCommonPaper1Unit } from '../types';

export const MPESB_COMMON_PAPER1_UNITS: MpesbCommonPaper1Unit[] = [
  {
    id: 'mpesb-p1-unit-1',
    unitNumber: 1,
    title: 'Unit 1: Child Development, Learning & Pedagogy (CDP)',
    hindiTitle: 'बाल विकास एवं शिक्षाशास्त्र (Shiksha Shastra)',
    marksWeightage: '10 Marks (Common Compulsory Part-A)',
    overview:
      'Covers adolescent & middle-school psychology, cognitive/moral developmental theorists (Piaget, Vygotsky, Kohlberg, Erikson), Inclusive Education (RPwD Act 2016), RTE Act 2009, NEP 2020 (5+3+3+4), NCF 2005/2023, CCE assessment, and learning disabilities.',
    topics: [
      {
        name: '1.1 Child Growth, Development & Developmental Theories',
        subtopics: [
          'Principles of Growth & Development (Cephalocaudal vs Proximodistal)',
          'Jean Piaget: 4 Stages of Cognitive Development, Schema, Assimilation & Accommodation',
          'Lev Vygotsky: Socio-Cultural Theory, ZPD (Zone of Proximal Development), MKO & Scaffolding',
          'Lawrence Kohlberg: 3 Levels & 6 Stages of Moral Development (Heinz Dilemma)',
          'Erik Erikson: 8 Psychosocial Stages (Adolescence: Identity vs Role Confusion)',
        ],
        keyDetails:
          'MPESB Grade 1 focuses heavily on Adolescence ("Storm & Stress" - Stanley Hall) while Grade 2 balances Later Childhood and Early Adolescence transitions.',
      },
      {
        name: '1.2 Intelligence, Motivation, Personality & Learning Theories',
        subtopics: [
          'Howard Gardner: Theory of Multiple Intelligences (8/9 frames)',
          'Spearman (Two-Factor g & s), Sternberg (Triarchic), Guilford (Structure of Intellect)',
          'IQ Formula (Stern 1912 & Terman 1916: MA/CA × 100)',
          'Behaviorism & Cognitivism: Pavlov (Classical), Skinner (Operant), Thorndike (Trial & Error - 3 Primary Laws), Bandura (Social Learning), Gestalt (Kohler Insight)',
          'Maslow’s Hierarchy of Needs & Intrinsic vs Extrinsic Motivation',
        ],
        keyDetails:
          'Direct PYQs ask who coined Mental Age (Alfred Binet), who added ×100 (Lewis Terman), and Thorndike’s Laws of Readiness, Exercise, and Effect.',
      },
      {
        name: '1.3 Inclusive Education, RTE 2009, NCF & NEP 2020',
        subtopics: [
          'Learning Disabilities: Dyslexia (Reading), Dysgraphia (Writing), Dyscalculia (Math), Dyspraxia (Motor), Aphasia (Language)',
          'RTE Act 2009: Free & Compulsory Education (6-14 yrs), Pupil-Teacher Ratio (30:1 Primary, 35:1 Upper Primary), Section 12(1)(c) 25% EWS quota',
          'NEP 2020: 5+3+3+4 Curricular Structure, PARAKH National Assessment Centre, FLN (NIPUN Bharat)',
          'CCE (Continuous & Comprehensive Evaluation), Formative vs Summative, Bloom’s Taxonomy (Cognitive, Affective, Psychomotor)',
        ],
        keyDetails:
          'Questions on NEP 2020 structure (Foundational 5, Preparatory 3, Middle 3, Secondary 4) and RTE 2009 PTR norms appear in almost every shift.',
      },
    ],
    examPoints: [
      { number: 1, tag: 'CDP', point: 'Cephalocaudal principle means development proceeds from head to toe; Proximodistal means from center (spine) outward to extremities.' },
      { number: 2, tag: 'CDP', point: 'G. Stanley Hall defined Adolescence as a period of "great storm and stress" (Adolescence, 1904).' },
      { number: 3, tag: 'Piaget', point: 'Piaget’s 4 Cognitive Stages: Sensorimotor (0-2 yrs, Object Permanence), Pre-operational (2-7, Egocentrism/Animism), Concrete Operational (7-11, Conservation/Reversibility), Formal Operational (11+, Abstract Logic).' },
      { number: 4, tag: 'Piaget', point: 'Assimilation fits new information into an existing schema; Accommodation modifies or creates a new schema when existing ones do not fit.' },
      { number: 5, tag: 'Vygotsky', point: 'Lev Vygotsky proposed Zone of Proximal Development (ZPD) — the gap between independent ability and potential ability with guidance from a More Knowledgeable Other (MKO).' },
      { number: 6, tag: 'Vygotsky', point: 'The term "Scaffolding" (temporary support withdrawn gradually as mastery grows) was coined by Jerome Bruner based on Vygotsky’s theory.' },
      { number: 7, tag: 'Kohlberg', point: 'Kohlberg’s 3 Moral Levels: Pre-conventional (Obedience/Self-interest), Conventional (Good boy-nice girl/Law & Order), Post-conventional (Social Contract/Universal Ethics).' },
      { number: 8, tag: 'Erikson', point: 'According to Erik Erikson, the core psychosocial crisis of Adolescence (12-18 yrs) is "Identity vs Role Confusion".' },
      { number: 9, tag: 'Intelligence', point: 'Concept of Mental Age (MA) was given by Alfred Binet (1905); IQ = (MA/CA) was suggested by William Stern (1912), and multiplied by 100 by Lewis Terman (1916).' },
      { number: 10, tag: 'Intelligence', point: 'Howard Gardner’s Multiple Intelligences (1983) identifies 8 distinct intelligences: Linguistic, Logical-Mathematical, Spatial, Bodily-Kinesthetic, Musical, Interpersonal, Intrapersonal, Naturalistic.' },
      { number: 11, tag: 'Learning', point: 'Thorndike’s 3 Primary Laws of Learning: Law of Readiness, Law of Exercise (Use/Disuse), and Law of Effect.' },
      { number: 12, tag: 'Learning', point: 'B.F. Skinner propounded Operant Conditioning (Instrumental Conditioning) using positive/negative reinforcement and punishment.' },
      { number: 13, tag: 'Learning', point: 'Albert Bandura’s Social Learning Theory (Bobo Doll Experiment) highlights 4 steps of Observational Learning: Attention, Retention, Reproduction, Motivation.' },
      { number: 14, tag: 'Disabilities', point: 'Learning Disabilities: Dyslexia (reading), Dysgraphia (writing), Dyscalculia (arithmetic), Dyspraxia (motor coordination), Dysphasia/Aphasia (spoken language comprehension).' },
      { number: 15, tag: 'RTE 2009', point: 'RTE Act 2009 (implemented 1 April 2010) mandates free & compulsory education for ages 6-14 under Article 21A (86th Amendment 2002); PTR is 30:1 (Primary) and 35:1 (Upper Primary).' },
      { number: 16, tag: 'NEP 2020', point: 'NEP 2020 replaces the 10+2 structure with 5+3+3+4: Foundational (ages 3-8), Preparatory (8-11), Middle (11-14), and Secondary (14-18).' },
      { number: 17, tag: 'NEP 2020', point: 'PARAKH (Performance Assessment, Review, and Analysis of Knowledge for Holistic Development) is the national assessment center established under NEP 2020.' },
      { number: 18, tag: 'Taxonomy', point: 'Bloom’s Taxonomy (1956) Cognitive Domain hierarchy (Revised 2001 by Anderson & Krathwohl): Remember, Understand, Apply, Analyze, Evaluate, Create.' },
      { number: 19, tag: 'Evaluation', point: 'Formative Assessment (Assessment FOR Learning) happens during teaching for feedback; Summative Assessment (Assessment OF Learning) evaluates terminal achievement.' },
      { number: 20, tag: 'NCF 2005', point: 'NCF 2005 (Chaired by Prof. Yash Pal) emphasizes "Learning Without Burden", constructivism, and connecting knowledge to life outside the school.' },
    ],
  },
  {
    id: 'mpesb-p1-unit-2',
    unitNumber: 2,
    title: 'Unit 2: General Hindi (सामान्य हिंदी - व्याकरण एवं बोध)',
    hindiTitle: 'विलोम, पर्यायवाची, संधि, समास, रस-छंद-अलंकार व अपठित गद्यांश',
    marksWeightage: '8 Marks (Common Compulsory Part-A)',
    overview:
      'Tests applied Hindi language proficiency required for all MPESB Grade 1 & Grade 2 educators: संधि, समास, उपसर्ग-प्रत्यय, तत्सम-तद्भव, पर्यायवाची-विलोम, वाक्यांश के लिए एक शब्द, रस, छंद, अलंकार, मुहावरे-लोकोक्तियाँ एवं अशुद्धि शोधन।',
    topics: [
      {
        name: '2.1 वर्ण विचार, संधि एवं समास (Phonology, Sandhi & Samas)',
        subtopics: [
          'स्वर वर्ण (11) एवं व्यंजन वर्ण (33), अयोगवाह (अं, अः), संयुक्त व्यंजन (क्ष, त्र, ज्ञ, श्र)',
          'संधि के 3 भेद: स्वर संधि (दीर्घ, गुण, वृद्धि, यण, अयादि), व्यंजन संधि, विसर्ग संधि',
          'समास के 6 भेद: अव्ययीभाव, तत्पुरुष, कर्मधारय, द्विगु, द्वंद्व, बहुव्रीहि',
        ],
        keyDetails:
          'यद्यपि (यदि + अपि = यण), पवन (पो + अन = अयादि), तथा हिमालय/नीलकमल/दशानन जैसे समास विग्रह प्रश्न सर्वाधिक पूछे जाते हैं।',
      },
      {
        name: '2.2 शब्द भंडार, उपसर्ग-प्रत्यय एवं वाक्य शुद्धि',
        subtopics: [
          'तत्सम-तद्भव, देशज-विदेशज, रूढ़-यौगिक-योगरूढ़ शब्द',
          'उपसर्ग (संस्कृत के 22, हिंदी व उर्दू उपसर्ग) तथा कृत व तद्धित प्रत्यय',
          'पर्यायवाची, विलोम, अनेकार्थी, समश्रुत भिन्नार्थक शब्द एवं वाक्यांश के लिए एक शब्द',
          'वर्तनी एवं वाक्य अशुद्धि शोधन, मुहावरे व लोकोक्तियाँ',
        ],
        keyDetails:
          'MPESB में "उज्ज्वल", "कवयित्री", "आशीर्वाद", "ज्योत्स्ना" की शुद्ध वर्तनी और तत्सम-तद्भव युग्म लगभग हर परीक्षा में आते हैं।',
      },
      {
        name: '2.3 काव्यशास्त्र: रस, छंद, अलंकार एवं अपठित गद्यांश',
        subtopics: [
          'रस (9 मूल रस + वात्सल्य/भक्ति) एवं उनके स्थायी भाव (जैसे शृंगार-रति, करुण-शोक, वीर-उत्साह)',
          'छंद: मात्रिक (दोहा 13-11, सोरठा 11-13, चौपाई 16 मात्रा, रोला) एवं वर्णिक छंद',
          'अलंकार: शब्दालंकार (अनुप्रास, यमक, श्लेष) और अर्थालंकार (उपमा, रूपक, उत्प्रेक्षा, अतिशयोक्ति)',
        ],
        keyDetails:
          'रस के स्थायी भाव और दोहा-सोरठा की मात्राओं के अंतर पर आधारित सीधे प्रश्न आते हैं।',
      },
    ],
    examPoints: [
      { number: 21, tag: 'वर्णमाला', point: 'हिंदी वर्णमाला में कुल 52 वर्ण हैं: 11 स्वर, 33 मूल व्यंजन, 2 अयोगवाह (अं, अः), 4 संयुक्त व्यंजन (क्ष, त्र, ज्ञ, श्र) तथा 2 द्विगुण व्यंजन (ड़, ढ़)।' },
      { number: 22, tag: 'संयुक्त व्यंजन', point: 'संयुक्त व्यंजन संरचना: क्ष = क् + ष, त्र = त् + र, ज्ञ = ज् + ञ, श्र = श् + र। (MPESB PYQ में अत्यंत बार पूछा गया)।' },
      { number: 23, tag: 'संधि', point: 'गुण संधि पहचान: ए, ओ, अर् की मात्रा (जैसे महेंद्र = महा + इंद्र, सूर्योदय = सूर्य + उदय, देवर्षि = देव + ऋषि)।' },
      { number: 24, tag: 'संधि', point: 'वृद्धि संधि पहचान: ऐ, औ की मात्रा (जैसे सदैव = सदा + एव, वनौषधि = वन + औषधि, मतैक्य = मत + ऐक्य)।' },
      { number: 25, tag: 'संधि', point: 'यण संधि पहचान: य, व, र से पहले आधा व्यंजन आता है (जैसे इत्यादि = इति + आदि, स्वागत = सु + आगत, अन्वय = अनु + अय)।' },
      { number: 26, tag: 'संधि', point: 'अयादि संधि पहचान: अय्, आय्, अव्, आव् का उच्चारण (जैसे नयन = ने + अन, नायक = नै + अक, पावक = पौ + अक)।' },
      { number: 27, tag: 'समास', point: 'अव्ययीभाव समास में प्रथम पद प्रधान व अव्यय होता है (जैसे यथाशक्ति, आजीवन, प्रतिदिन, भरपेट)।' },
      { number: 28, tag: 'समास', point: 'द्विगु समास में प्रथम पद संख्यावाचक विशेषण होता है और समूह का बोध कराता है (जैसे चौराहा, त्रिफला, नवग्रह, पंचवटी)।' },
      { number: 29, tag: 'समास', point: 'द्वंद्व समास में दोनों पद प्रधान होते हैं और बीच में "और/या" का लोप होता है (जैसे माता-पिता, पाप-पुण्य, दाल-रोटी)।' },
      { number: 30, tag: 'समास', point: 'बहुव्रीहि समास में कोई भी पद प्रधान न होकर तीसरा विशेष अर्थ प्रधान होता है (जैसे दशानन = रावण, पीतांबर = श्रीकृष्ण, नीलकंठ = शिव)।' },
      { number: 31, tag: 'समास', point: 'कर्मधारय समास में विशेषण-विशेष्य या उपमेय-उपमान का संबंध होता है (जैसे नीलकमल, चंद्रमुख, महात्मा, चरणकमल)।' },
      { number: 32, tag: 'वर्तनी', point: 'सर्वाधिक पूछी जाने वाली शुद्ध वर्तनियाँ: उज्ज्वल (दोनों आधे ज), कवयित्री, आशीर्वाद, पूजनीय, अंत्याक्षरी, शृंगार, ज्योत्स्ना।' },
      { number: 33, tag: 'शब्द भेद', point: 'योगरूढ़ शब्द वे यौगिक शब्द हैं जो किसी विशेष/तीसरे अर्थ में रूढ़ हो जाते हैं (जैसे पंकज, जलज, दशानन, लंबोदर)।' },
      { number: 34, tag: 'प्रत्यय', point: 'कृत प्रत्यय क्रिया/धातु के अंत में जुड़ते हैं (पढ़ + आई = पढ़ाई); तद्धित प्रत्यय संज्ञा, सर्वनाम या विशेषण के अंत में जुड़ते हैं (मानव + ता = मानवता)।' },
      { number: 35, tag: 'रस', point: 'भरतमुनि ने नाट्यशास्त्र में 8 रस माने हैं (शांत रस नहीं गिना); हिंदी में 9 मूल रस और कुल 11 रस (वात्सल्य व भक्ति सहित) माने जाते हैं।' },
      { number: 36, tag: 'रस', point: 'प्रमुख स्थायी भाव: शृंगार (रति), हास्य (हास), करुण (शोक), रौद्र (क्रोध), वीर (उत्साह), भयानक (भय), वीभत्स (जुगुप्सा/घृणा), अद्भुत (विस्मय), शांत (निर्वेद)।' },
      { number: 37, tag: 'छंद', point: 'दोहा अर्धसम मात्रिक छंद है जिसके विषम चरणों (1,3) में 13-13 तथा सम चरणों (2,4) में 11-11 मात्राएँ होती हैं; सोरठा ठीक दोहे का उल्टा (11-13) होता है।' },
      { number: 38, tag: 'छंद', point: 'चौपाई सम मात्रिक छंद है जिसके प्रत्येक चरण में 16 मात्राएँ होती हैं और अंत में दो गुरु या दो लघु होते हैं।' },
      { number: 39, tag: 'अलंकार', point: 'यमक अलंकार में एक ही शब्द की आवृत्ति दो या अधिक बार हो और हर बार अर्थ भिन्न हो (जैसे "कनक-कनक ते सौ गुनी"); श्लेष में एक ही शब्द से अनेक अर्थ चिपके होते हैं।' },
      { number: 40, tag: 'अलंकार', point: 'उत्प्रेक्षा अलंकार के वाचक शब्द: मनु, मानो, जनु, जानो, मनहुँ, जनहुँ। उपमा अलंकार के वाचक शब्द: सा, सी, से, सम, सरिस, समान।' },
    ],
  },
  {
    id: 'mpesb-p1-unit-3',
    unitNumber: 3,
    title: 'Unit 3: General English (Compulsory Common Paper)',
    hindiTitle: 'सामान्य अंग्रेजी (Grammar, Usage, Vocabulary & Comprehension)',
    marksWeightage: '5 Marks (Common Compulsory Part-A)',
    overview:
      'Compulsory General English section common to all subjects in MPESB Grade 1 & Grade 2. Tests Articles, Prepositions, Modals, Tenses, Subject-Verb Concord, Active-Passive Voice, Narration, Synonyms/Antonyms, Idioms & One-Word Substitution.',
    topics: [
      {
        name: '3.1 Functional Grammar & Sentence Correction',
        subtopics: [
          'Articles (a, an, the) & Zero Article Exceptions',
          'Prepositions (Fixed prepositions: abide by, accustomed to, Senior to, prefer to)',
          'Tenses & Conditionals (Zero, First, Second, Third Conditional clauses)',
          'Subject-Verb Agreement & Correlative Conjunctions (Neither-nor, Scarcely-when)',
        ],
        keyDetails:
          'MPESB Part-A English strictly tests sound-based article choice ("an honest man", "a university") and fixed prepositions.',
      },
      {
        name: '3.2 Voice, Narration & Transformation',
        subtopics: [
          'Active to Passive Voice (Imperatives, Interrogatives, Modals, Stative Verbs)',
          'Direct to Indirect Narration (Universal truths, tense backshift, reporting verbs)',
          'Question Tags & Modals (Should, Must, Ought to, Dare, Need)',
        ],
        keyDetails:
          'Common Part-A tests voice changes of "Who wrote this?" -> "By whom was this written?" and imperative "Let + object + be + V3".',
      },
      {
        name: '3.3 Vocabulary, Idioms & Reading Comprehension',
        subtopics: [
          'High-Frequency Synonyms & Antonyms',
          'Idioms & Phrases (e.g., Bite the bullet, Burn the midnight oil, At the eleventh hour)',
          'One-Word Substitutions & Spelling Rules',
        ],
        keyDetails:
          'Reading comprehension questions focus on main idea, tone, and contextual vocabulary inference.',
      },
    ],
    examPoints: [
      { number: 41, tag: 'Articles', point: 'Use "a" or "an" strictly by initial consonant/vowel SOUND, not spelling: "a university", "a one-eyed man", "an M.A.", "an honest person", "an heir".' },
      { number: 42, tag: 'Articles', point: 'No article is used before proper names, abstract nouns in general sense, meals, languages, and school/hospital/church when visited for their primary purpose.' },
      { number: 43, tag: 'Prepositions', point: 'Latin comparatives ending in "-ior" (Senior, Junior, Superior, Inferior, Prior, Anterior, Posterior) and "Prefer" always take "to", never "than".' },
      { number: 44, tag: 'Prepositions', point: 'Use "Between" for two entities or reciprocal relations; "Among" for more than two before consonants; "Amongst" before vowels.' },
      { number: 45, tag: 'Prepositions', point: '"Since" denotes point of time (since 2019, since Monday); "For" denotes duration/period of time (for three hours, for two decades).' },
      { number: 46, tag: 'Prepositions', point: 'Fixed prepositions frequently tested: Accused OF, Acquitted OF, Afraid OF, Compete WITH (person) / FOR (prize), Die OF (disease) / FROM (wound/cause).' },
      { number: 47, tag: 'Prepositions', point: '"Despite" NEVER takes "of" ("Despite the rain", NOT "Despite of"); "In spite" ALWAYS takes "of". Similarly, "Comprise" does not take "of" in active voice.' },
      { number: 48, tag: 'Concord', point: 'With "As well as, Along with, Together with, With, In addition to", the verb agrees strictly with the FIRST subject.' },
      { number: 49, tag: 'Concord', point: 'With "Either...or, Neither...nor, Not only...but also", the verb agrees with the NEAREST subject.' },
      { number: 50, tag: 'Concord', point: '"Each, Every, Everyone, Someone, Nobody, Neither of, Either of" always take a SINGULAR verb ("Each of the students HAS submitted...").' },
      { number: 51, tag: 'Concord', point: '"A number of + plural noun" takes a PLURAL verb; "The number of + plural noun" takes a SINGULAR verb.' },
      { number: 52, tag: 'Tenses', point: 'Universal truths, habitual actions, and scientific facts always remain in Simple Present Tense even in Indirect Speech.' },
      { number: 53, tag: 'Conditionals', point: 'Third Conditional (Unreal Past): "If + Subject + had + V3, Subject + would have + V3" (e.g., "If he had studied, he would have passed").' },
      { number: 54, tag: 'Inversion', point: '"No sooner" is ALWAYS paired with "than" ("No sooner had I reached than..."); "Hardly/Scarcely" is ALWAYS paired with "when/before".' },
      { number: 55, tag: 'Voice', point: 'Verbs like "Know" and "Oblige" take "to" in passive voice ("He is known TO me", NOT "by me"); "Surprised/Astonished" take "at"; "Interested/Contained" take "in".' },
      { number: 56, tag: 'Question Tags', point: 'Positive statement takes a negative question tag ("She is reading, isn’t she?"); negative words like "hardly, seldom, scarcely, rarely, never" take a POSITIVE tag.' },
      { number: 57, tag: 'Modals', point: '"Lest" (for fear that) is ALWAYS followed by "should" (or bare subjunctive) and never "not" ("Walk carefully lest you should fall").' },
      { number: 58, tag: 'Modals', point: '"Used to" expresses past discontinued habit; "Ought to" expresses moral duty or obligation.' },
      { number: 59, tag: 'Grammar', point: 'Gerund (V-ing as noun) is always preceded by a POSSESSIVE adjective/pronoun ("I objected to HIS going", NOT "him going").' },
      { number: 60, tag: 'Vocabulary', point: 'High-yield MPESB One-Words: Panacea (cure for all diseases), Omnipotent (all-powerful), Bibliophile (lover of books), Ephemeral (lasting a very short time).' },
    ],
  },
  {
    id: 'mpesb-p1-unit-4',
    unitNumber: 4,
    title: 'Unit 4: General Knowledge, Current Affairs & Madhya Pradesh GK',
    hindiTitle: 'सामान्य ज्ञान, समसामयिकी एवं मध्य प्रदेश विशेष (MP GK)',
    marksWeightage: '7 Marks (Common Compulsory Part-A)',
    overview:
      'Focuses on Madhya Pradesh History, Geography, Rivers, National Parks, Tribes, Culture, Folk Arts, Constitutional Education Articles, Indian Polity, National Schemes, and Current Affairs.',
    topics: [
      {
        name: '4.1 Madhya Pradesh Geography, Rivers & Biodiversity',
        subtopics: [
          'Formation of MP (1 Nov 1956, Reorganization 1 Nov 2000), Total Districts (55), Divisions (10)',
          'Major Rivers: Narmada (Amarkantak, 1312 km total / 1077 km in MP), Chambal, Betwa, Tapti, Son, Shipra',
          'National Parks & Tiger Reserves: Kanha Kisli, Bandhavgarh, Pench, Satpura, Panna, Kuno (Cheetah Reintroduction), Madhav, Van Vihar',
          'UNESCO World Heritage Sites in MP: Khajuraho (1986), Sanchi Stupa (1989), Bhimbetka Rock Shelters (2003)',
        ],
        keyDetails:
          'MP is known as the "Tiger State" and "Heart of India" (Hridaya Pradesh). Questions on Narmada origin, Kuno Cheetah project, and UNESCO sites are recurrent.',
      },
      {
        name: '4.2 MP Culture, Literature, Tribes & Awards',
        subtopics: [
          'Major Tribes: Bhil (largest in MP), Gond, Baiga, Sahariya, Korku, Bharia (Patalkot)',
          'Folk Dances & Drama: Rai (Bundelkhand), Matki (Malwa), Karma, Bhagoria Festival, Maach (State Folk Drama)',
          'MP State Awards: Kalidas Samman, Tansen Samman, Kabir Samman, Sharad Joshi Samman',
          'Literary Stalwarts of MP: Kalidas, Makhanlal Chaturvedi, Subhadra Kumari Chauhan, Harishankar Parsai',
        ],
        keyDetails:
          'State symbols (Barasingha, Dudhraj, Mahseer, Banyan tree, Malakhamb sport) and folk art forms frequently feature in Part-A.',
      },
      {
        name: '4.3 Indian Constitution, Polity & Current Affairs',
        subtopics: [
          'Fundamental Rights (Articles 12-35), Article 21A (Right to Education), Article 45 (ECCE), Article 51A(k) (11th Fundamental Duty)',
          'Schedules & Amendments: 42nd Amendment (1976 - Education moved to Concurrent List), 73rd/74th Amendments, 86th Amendment (2002)',
          'National Education Commissions: Radhakrishnan (1948), Mudaliar (1952), Kothari (1964-66), NEP 2020',
          'Current Schemes: CM Rise Schools (MP), PM SHRI Schools, Ladli Behna, Chandrayaan-3, Aditya-L1',
        ],
        keyDetails:
          'Expect 2-3 questions connecting Indian Constitutional provisions for education and MP state flagship schemes.',
      },
    ],
    examPoints: [
      { number: 61, tag: 'MP Formation', point: 'Madhya Pradesh was formed on 1 November 1956 (States Reorganisation Act / Fazl Ali Commission); Chhattisgarh separated on 1 November 2000.' },
      { number: 62, tag: 'MP Symbols', point: 'MP State Symbols: Animal — Swamp Deer (Barasingha, Brederi species); Bird — Dudhraj (Asian Paradise Flycatcher); Fish — Mahseer; Sport — Mallakhamb (2013); Tree — Banyan (Vat); Flower — White Lily.' },
      { number: 63, tag: 'MP Rivers', point: 'Narmada (Lifeline of MP) originates from Amarkantak (Anuppur) and flows westward into the Gulf of Khambhat without forming a delta (forms an Estuary); length in MP is 1077 km (total 1312 km).' },
      { number: 64, tag: 'MP Rivers', point: 'Chambal originates from Janapav Hills (Mhow, Indore); Betwa ("Ganga of MP" by pollution/heritage) originates from Kumra village (Raisen); Shipra originates from Kakri Bardi Hills (Indore).' },
      { number: 65, tag: 'MP Heritage', point: '3 UNESCO World Heritage Sites in MP: Khajuraho Temples (Chhatarpur, 1986), Sanchi Stupa (Raisen, 1989), and Bhimbetka Rock Shelters (Raisen, 2003).' },
      { number: 66, tag: 'MP Wildlife', point: 'MP has the highest number of Tigers in India (785 per Tiger Census 2022) and highest forest cover by area in India. Kuno National Park (Sheopur) hosts Project Cheetah.' },
      { number: 67, tag: 'MP Wildlife', point: 'Kanha Kisli (Mandla/Balaghat) is the oldest & largest National Park in MP (1955) and was the first Tiger Reserve in India to adopt an official mascot ("Bhoorsingh the Barasingha").' },
      { number: 68, tag: 'MP Culture', point: 'MP State Dance is "Rai" (Bundelkhand) and State Folk Drama is "Maach" (Malwa region). Bhagoria is the famous festival of the Bhil tribe.' },
      { number: 69, tag: 'MP Tribes', point: 'Largest tribe of MP is Bhil; second largest is Gond. Particularly Vulnerable Tribal Groups (PVTGs) in MP are 3: Baiga, Sahariya, and Bharia (Patalkot, Chhindwara).' },
      { number: 70, tag: 'MP Awards', point: 'Tansen Samaroh is held annually in Gwalior; Kalidas Samaroh in Ujjain; Dhrupad Samaroh in Bhopal; Khajuraho Dance Festival in Chhatarpur.' },
      { number: 71, tag: 'MP Peaks', point: 'Highest peak of Madhya Pradesh is Dhupgarh (1,350 meters), located in the Mahadeo Hills of Satpura Range at Pachmarhi (Narmadapuram).' },
      { number: 72, tag: 'MP Literature', point: 'Makhanlal Chaturvedi ("Ek Bharatiya Atma") wrote "Pushp Ki Abhilasha"; Harishankar Parsai was born in Hoshangabad; Kalidas was one of Chandragupta II’s Navratnas at Ujjain.' },
      { number: 73, tag: 'MP Cities', point: 'Indore is India’s cleanest city (Swachh Survekshan 7 consecutive times) and hosts the only city in India with both IIT and IIM.' },
      { number: 74, tag: 'Polity', point: '42nd Constitutional Amendment (1976) transferred "Education" from the State List to the Concurrent List (along with Forests, Weights & Measures, Wildlife).' },
      { number: 75, tag: 'Polity', point: '86th Constitutional Amendment (2002) inserted Article 21A (Fundamental Right to Education for 6-14 yrs), amended Article 45 (ECCE 0-6 yrs), and added 11th Fundamental Duty under Article 51A(k).' },
      { number: 76, tag: 'Commissions', point: 'Kothari Commission (1964–66, "Education and National Development") recommended the 10+2+3 system, Common School System, and spending 6% of GDP on education.' },
      { number: 77, tag: 'Commissions', point: 'University Education Commission (1948–49) was chaired by Dr. S. Radhakrishnan; Secondary Education Commission (1952–53) was chaired by Dr. A. Lakshmanaswami Mudaliar.' },
      { number: 78, tag: 'MP Education', point: 'MP State Government’s "CM Rise Schools" scheme aims to establish world-class integrated K-12 schools with smart classrooms and holistic sports facilities.' },
      { number: 79, tag: 'Science & Space', point: 'Chandrayaan-3 landed near the Lunar South Pole ("Shiv Shakti Point") on 23 August 2023 (celebrated as National Space Day in India).' },
      { number: 80, tag: 'National', point: 'National Education Day in India is celebrated every year on 11 November to commemorate the birth anniversary of Maulana Abul Kalam Azad (India’s first Education Minister).' },
    ],
  },
  {
    id: 'mpesb-p1-unit-5',
    unitNumber: 5,
    title: 'Unit 5: Reasoning & Numerical Ability (तार्किक एवं आंकिक योग्यता)',
    hindiTitle: 'तर्कशक्ति, गणितीय संक्रियाएँ, श्रृंखला, कोडिंग व डेटा विश्लेषण',
    marksWeightage: '10 Marks (Common Compulsory Part-A)',
    overview:
      'Tests analytical logic and basic quantitative aptitude required across MPESB Varg 1 & Varg 2 common exams: Coding-Decoding, Number & Alphabet Series, Blood Relations, Syllogism, Direction Sense, Percentage, Profit-Loss, Ratio, Average, Time & Work, and Venn Diagrams.',
    topics: [
      {
        name: '5.1 Verbal & Non-Verbal Reasoning (तर्कशक्ति)',
        subtopics: [
          'Number Series & Missing Term Patterns (Squares, Cubes, Prime Differences, Alternating)',
          'Coding-Decoding (Letter Shifting, Opposite Pairs: A-Z, B-Y, C-X, Direct Substitution)',
          'Blood Relations, Direction Sense (Pythagoras Distance) & Seating Arrangement',
          'Syllogism (Venn Diagrams: All, Some, No), Analogy & Odd One Out',
        ],
        keyDetails:
          'EJOTY (5-10-15-20-25) and opposite letter pairs solve 90% of coding-decoding and letter series questions in under 20 seconds.',
      },
      {
        name: '5.2 Quantitative & Numerical Aptitude (आंकिक योग्यता)',
        subtopics: [
          'Number System, Divisibility Rules (3, 4, 8, 9, 11), LCM & HCF, BODMAS',
          'Percentage, Profit & Loss, Simple Interest & Compound Interest',
          'Ratio & Proportion, Partnership, Ages, and Averages',
          'Time & Work (MDH Formula), Speed-Time-Distance (km/h to m/s × 5/18)',
        ],
        keyDetails:
          'Questions on Percentage increase/decrease, Age ratios, and LCM×HCF = Product of two numbers are staples of MPESB Part-A.',
      },
    ],
    examPoints: [
      { number: 81, tag: 'Coding', point: 'Remember EJOTY positions: E=5, J=10, O=15, T=20, Y=25. Opposite letter pairs always sum to 27 (e.g., A(1)+Z(26)=27, G(7)+T(20)=27, M(13)+N(14)=27).' },
      { number: 82, tag: 'Directions', point: 'Pythagorean Triplets save time in Direction Sense: (3,4,5), (5,12,13), (8,15,17), (7,24,25). Shortest distance = √(x² + y²).' },
      { number: 83, tag: 'Clocks', point: 'Angle between hour and minute hands at H:M = |30H − (11/2)M|. Hands coincide (0°) 11 times in 12 hours and 22 times in 24 hours.' },
      { number: 84, tag: 'Calendar', point: 'Ordinary year (365 days) has 1 odd day; Leap year (366 days) has 2 odd days. Century years must be divisible by 400 to be a leap year (1900 is NOT a leap year; 2000 IS).' },
      { number: 85, tag: 'Syllogism', point: 'In Syllogism, if both premises are positive, no negative conclusion can ever follow. "Either-Or" complementary pairs require same subject-predicate with one positive and one negative.' },
      { number: 86, tag: 'Dice', point: 'In a Standard Dice, the sum of opposite faces is always 7 (1↔6, 2↔5, 3↔4). In a General Dice, if two positions share one common face, rotate clockwise from that face to find opposites.' },
      { number: 87, tag: 'Ranking', point: 'Total persons in a row = (Rank from Left + Rank from Right) − 1.' },
      { number: 88, tag: 'Series', point: 'Common MPESB series patterns: n² ± 1, n³ ± n, consecutive prime numbers (2, 3, 5, 7, 11, 13, 17, 19, 23, 29), and double-difference geometric progression.' },
      { number: 89, tag: 'Divisibility', point: 'Divisibility by 11: Difference between sum of digits at odd places and sum of digits at even places is 0 or a multiple of 11. Divisibility by 9: Sum of digits divisible by 9.' },
      { number: 90, tag: 'HCF & LCM', point: 'For any two numbers a and b: HCF(a, b) × LCM(a, b) = a × b. For fractions: LCM = LCM(Numerators)/HCF(Denominators); HCF = HCF(Numerators)/LCM(Denominators).' },
      { number: 91, tag: 'Percentage', point: 'If price increases by R%, required % reduction in consumption so expenditure stays constant = [R / (100 + R)] × 100.' },
      { number: 92, tag: 'Percentage', point: 'Successive % change of x% and y% = x + y + (xy/100)%. An x% increase followed by x% decrease ALWAYS gives a net loss of (x²/100)%.' },
      { number: 93, tag: 'Profit & Loss', point: 'Profit% or Loss% is always calculated on Cost Price (CP), unless explicitly stated on Selling Price. Discount% is always calculated on Marked Price (MP).' },
      { number: 94, tag: 'Interest', point: 'Difference between Compound Interest and Simple Interest for 2 years at rate R% on principal P = P × (R/100)².' },
      { number: 95, tag: 'Average', point: 'Average of first n natural numbers = (n+1)/2. Average of first n even numbers = n+1. Average of first n odd numbers = n.' },
      { number: 96, tag: 'Time & Work', point: 'If A finishes a work in x days and B in y days, together they finish in (xy)/(x+y) days. General formula: (M₁ × D₁ × H₁) / W₁ = (M₂ × D₂ × H₂) / W₂.' },
      { number: 97, tag: 'Speed & Distance', point: 'Convert km/h to m/s by multiplying by 5/18; convert m/s to km/h by multiplying by 18/5. Average speed for equal distances at speeds x and y = (2xy)/(x+y).' },
      { number: 98, tag: 'Trains', point: 'Time taken by a train of length L to cross a pole/man = L / Speed; to cross a platform of length P = (L + P) / Speed.' },
      { number: 99, tag: 'Mensuration', point: 'Circle Area = πr², Circumference = 2πr; Cube Volume = a³, Total Surface Area = 6a², Diagonal = a√3; Triangle Heron’s Area = √[s(s-a)(s-b)(s-c)].' },
      { number: 100, tag: 'Statistics', point: 'Empirical Relationship between Mean, Median, and Mode: Mode = 3(Median) − 2(Mean).' },
    ],
  },
];
