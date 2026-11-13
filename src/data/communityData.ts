import { CommunityStory, SpeechPhrase } from '../types';

export const COMMUNITY_STORIES: CommunityStory[] = [
  {
    id: 'story-1',
    title: 'The Poetics of Absence: Rereading King Lear through Lacanian Desire',
    author: 'Aarav Sharma',
    authorBadge: 'UGC-NET JRF Scholar',
    date: '2 days ago',
    genre: 'Literature Critique',
    readabilityScore: 42.5,
    upvotes: 148,
    content: `When Cordelia utters her devastating "Nothing, my lord," she refuses to reduce filial love to the commodified currency of Lear's court. In Jacques Lacan's psychoanalytic schema, this "Nothing" designates the fundamental void around which symbolic desire circulates. 

Lear demands an imaginary wholeness—a totalizing linguistic affirmation that would confirm his absolute sovereignty. By offering silence rather than flattery, Cordelia exposes the radical lack that grounds monarchical power. The subsequent tragedy unfolds not merely because of Goneril and Regan's filial cruelty, but because Lear cannot tolerate the shattering of his imaginary mirror stage.`,
    comments: [
      {
        id: 'c1',
        author: 'Dr. Meenakshi Sundaram',
        avatar: 'MS',
        timestamp: '1 day ago',
        highlightedText: 'she refuses to reduce filial love to the commodified currency',
        comment: 'Brilliant critique! This ties in directly with Marxian readings of early modern mercantile transition in Lear as well.'
      },
      {
        id: 'c2',
        author: 'Pooja Verma',
        avatar: 'PV',
        timestamp: '18 hours ago',
        comment: 'Extremely clear explanation of the Lacanian void. Would love to see this applied to Hamlet\'s delay!'
      }
    ]
  },
  {
    id: 'story-2',
    title: 'Bridging Krashen and Communicative Competence in Rural Classrooms',
    author: 'Sunil Choudhary',
    authorBadge: 'MPESB Grade 1 English Educator',
    date: '4 days ago',
    genre: 'NET Model Answer',
    readabilityScore: 61.2,
    upvotes: 93,
    content: `In government secondary schools across central India, teaching English through the Grammar-Translation Method has generated students who can conjugate past participles on paper yet freeze during spontaneous discourse.

By lowering the affective filter through collaborative storytelling and realia (real-world objects), we operationalize Krashen's Input Hypothesis (i+1). Instead of punitive error correction that triggers anxiety, teachers must validate communicative intent before refining syntax. Communicative competence is not born of rote drill; it emerges in authentic communicative exchange.`,
    comments: [
      {
        id: 'c3',
        author: 'Rashmi Tripathi',
        avatar: 'RT',
        timestamp: '3 days ago',
        highlightedText: 'validate communicative intent before refining syntax',
        comment: 'This is the exact pedagogy question from the MP TET 2020 paper! Formative affirmation precedes summative drilling.'
      }
    ]
  },
  {
    id: 'story-3',
    title: 'Whispers of the Malabar Rain',
    author: 'Deepika Nair',
    authorBadge: 'Creative Fellow',
    date: '1 week ago',
    genre: 'Creative Fiction',
    readabilityScore: 78.4,
    upvotes: 215,
    content: `The monsoon arrived not with fanfare, but like an old aunt bearing wet umbrellas and jars of salted mangoes. The terracotta tiles overhead hummed in three-four time, a percussive rhythm that smelled of ancient clay and rain-soaked jackfruit leaves. 

Grandmother sat by the verdigris brass lamp, threading jasmine garlands with fingertips darkened by turmeric. "Words," she murmured, gazing into the courtyard pool, "are just clouds trying to remember their shape before they fall."`,
    comments: [
      {
        id: 'c4',
        author: 'Kabir Das',
        avatar: 'KD',
        timestamp: '5 days ago',
        highlightedText: 'Words are just clouds trying to remember their shape',
        comment: 'Evocative sensory metaphor! The synesthesia of smell and cadence is beautifully sustained.'
      }
    ]
  }
];

export const SPEECH_PHRASES: SpeechPhrase[] = [
  {
    id: 'speech-1',
    phrase: 'To be, or not to be, that is the question.',
    phoneticUk: '/tə biː ɔː nɒt tə biː ðæt ɪz ðə ˈkwɛs.tʃən/',
    phoneticUs: '/tə bi ɔːr nɑːt tə bi ðæt ɪz ðə ˈkwɛs.tʃən/',
    accentNotes: 'Notice the silent or intrusive "r" in British non-rhotic speech vs full rhotic pronunciation in General American. Main stress rests on "question".',
    category: 'Literary Monologue',
    stressPattern: 'da DUM da DUM da DUM da DUM da DUM da (Feminine ending hypermetric syllable)'
  },
  {
    id: 'speech-2',
    phrase: 'Beauty is truth, truth beauty,—that is all Ye know on earth, and all ye need to know.',
    phoneticUk: '/ˈbjuː.ti ɪz truːθ truːθ ˈbjuː.ti ðæt ɪz ɔːl jiː nəʊ ɒn ɜːθ ænd ɔːl jiː niːd tə nəʊ/',
    phoneticUs: '/ˈbjuː.t̬i ɪz truːθ truːθ ˈbjuː.t̬i ðæt ɪz ɔːl ji noʊ ɑːn ɜːrθ ænd ɔːl ji nid tə noʊ/',
    accentNotes: 'American English uses an alveolar flap [t̬] for "beauty", while British English uses a crisp voiceless alveolar plosive [t].',
    category: 'Literary Monologue',
    stressPattern: 'Chiasmus cadence: A-B, B-A rhetorical inversion'
  },
  {
    id: 'speech-3',
    phrase: 'Communicative competence facilitates authentic linguistic acquisition.',
    phoneticUk: '/kəˈmjuː.nɪ.kə.tɪv ˈkɒm.pɪ.təns fəˈsɪl.ɪ.teɪts ɔːˈθɛn.tɪk lɪŋˈɡwɪs.tɪk ˌæk.wɪˈzɪʃ.ən/',
    phoneticUs: '/kəˈmjuː.nəˌkeɪ.t̬ɪv ˈkɑːm.pə.təns fəˈsɪl.əˌteɪts ɑːˈθɛn.t̬ɪk lɪŋˈɡwɪs.tɪk ˌæk.wəˈzɪʃ.ən/',
    accentNotes: 'Secondary stress on "com-", primary on "pe-tence". Glottal stops should be avoided before voiceless consonants.',
    category: 'Academic Presentation',
    stressPattern: 'Poly-syllabic tertiary rhythm with primary pitch accent on "acquisition"'
  },
  {
    id: 'speech-4',
    phrase: 'She sells seashells by the seashore in Sussex.',
    phoneticUk: '/ʃiː sɛlz ˈsiː.ʃɛlz baɪ ðə ˈsiː.ʃɔːr ɪn ˈsʌs.ɪks/',
    phoneticUs: '/ʃi sɛlz ˈsiˌʃɛlz baɪ ðə ˈsiˌʃɔːr ɪn ˈsʌs.ɪks/',
    accentNotes: 'Phonemic contrast between voiceless postalveolar fricative /ʃ/ and voiceless alveolar sibilant /s/.',
    category: 'Exam Oral Test',
    stressPattern: 'Rapid alternation testing tongue-blade motor control'
  }
];
