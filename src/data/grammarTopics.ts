import { GrammarTopic } from '../types';

export const GRAMMAR_TOPICS: GrammarTopic[] = [
  // =========================================================================
  // 1. PARTS OF SPEECH (THE FOUNDATION)
  // =========================================================================
  {
    id: 'nouns-pronouns',
    moduleNumber: '01 · Foundation A',
    title: 'Nouns & Pronouns: Types, Gender, Number & 7 Pronoun Classes',
    category: 'Parts of Speech',
    level: 'Foundation',
    summary:
      'Master all 5 classes of Nouns (Proper, Common, Collective, Abstract, Material), Gender distinctions, irregular Singular/Plural rules (Latin/Greek suffixes, uncountables, pair nouns), and all 7 Pronoun categories including the 231 person order and Reflexive vs. Emphatic distinctions.',
    visualAssetKey: 'parts-tree',
    visualCaption: 'Visual Hierarchy: Noun Classifications, Inflections & Pronoun Substitution Tree',
    animatedDiagramType: 'parts-of-speech',
    flowchartTitle: 'Noun-to-Pronoun Identification Decision Flowchart',
    flowchartSteps: [
      {
        step: '01',
        label: 'Classify the Noun',
        detail: 'Check if it names a specific entity (Proper), class (Common), group (Collective), quality/state (Abstract), or substance (Material).',
        example: 'Shakespeare (Proper) · Jury (Collective) · Wisdom (Abstract)'
      },
      {
        step: '02',
        label: 'Check Number & Gender',
        detail: 'Apply Latin/Greek plural rules (-on -> -a, -is -> -es) and uncountable/pair noun concord rules.',
        example: 'Phenomenon -> Phenomena · Scissors are · Scenery is'
      },
      {
        step: '03',
        label: 'Select Pronoun Type',
        detail: 'Replace repeated nouns using Personal, Demonstrative, Relative, Indefinite, Interrogative, Reflexive, or Possessive pronouns.',
        example: 'The scholar whom we praised delivered his lecture himself.'
      },
      {
        step: '04',
        label: 'Verify Case & Order',
        detail: 'Apply 2-3-1 person order for positive acts, Subjective case after "than/as", and Possessive adjectives before gerunds.',
        example: 'You, he, and I completed it · She is taller than I (am).'
      }
    ],
    tables: [
      {
        title: 'Nouns: 5 Core Classes, Gender & Exam Plural Rules',
        caption: 'Essential classifications and irregular number transformations tested in MPESB & NET.',
        headers: ['Noun Class / Rule', 'Definition & Scope', 'Key Singular / Plural Rule', 'Exam Example'],
        rows: [
          ['Proper Noun', 'Specific person, place, or text', 'Always capitalized; usually singular without "the"', 'Kalidasa, Bhopal, Hamlet'],
          ['Common Noun', 'Shared name for class or kind', 'Takes singular/plural determiners (a/the)', 'poet -> poets, campus -> campuses'],
          ['Collective Noun', 'Group viewed as single or divided unit', 'United = singular verb; Divided = plural verb', 'The jury has given its verdict / The jury are divided.'],
          ['Abstract Noun', 'Quality, emotion, action, or state', 'Uncountable; takes no plural -s and no a/an', 'Honesty, Criticism, Boyhood, Poverty'],
          ['Material Noun', 'Raw matter or substance', 'Uncountable; takes singular verb', 'Gold is precious; Timber was imported.'],
          ['Greek / Latin Plurals', 'Borrowed academic nouns', '-on -> -a | -is -> -es | -um -> -a | -us -> -i', 'criterion -> criteria, crisis -> crises, datum -> data'],
          ['Pair & Zero-Plural Nouns', 'Bipartite tools & identical singular/plural', 'Scissors/trousers = plural; Sheep/deer = unchanged', 'My spectacles are new; Three deer were spotted.'],
          ['Gender Types', 'Masculine, Feminine, Common, Neuter', 'Common covers both; Neuter covers non-living/abstract', 'Author (Common), Empress (Fem.), Manuscript (Neuter)']
        ]
      },
      {
        title: 'The 7 Classes of Pronouns',
        caption: 'Case selection, syntactic roles, and high-frequency distinctions.',
        headers: ['Pronoun Type', 'Key Words', 'Primary Function', 'Example Sentence'],
        rows: [
          ['Personal', 'I/me, you, he/him, she/her, it, we/us, they/them', 'Replaces specific grammatical persons (1st/2nd/3rd)', 'You, she, and I will attend the seminar.'],
          ['Possessive', 'mine, yours, his, hers, ours, theirs (pronouns)', 'Shows ownership without a following noun (no apostrophe!)', 'This annotated anthology is yours, not theirs.'],
          ['Reflexive / Emphatic', 'myself, yourself, himself, herself, itself, ourselves', 'Reflects action back to subject or adds emphasis (never starts subject alone)', 'She corrected the proofs herself.'],
          ['Demonstrative', 'this, that, these, those', 'Points out specific entities near or far in space/time', 'These are Miltonic sonnets; those are Petrarchan.'],
          ['Relative', 'who, whom, whose, which, that', 'Introduces subordinate adjective clause & links antecedent', 'The critic who wrote that essay won the award.'],
          ['Indefinite', 'someone, anybody, everyone, none, few, many, each', 'Refers to non-specific persons or quantities (each/everyone = singular)', 'Everyone must submit his or her assignment.'],
          ['Interrogative', 'Who, Whom, Whose, Which, What', 'Forms direct or indirect questions', 'Whom did the selection board interview today?']
        ]
      }
    ],
    keyRules: [
      {
        rule: 'Uncountable Abstract & Material Nouns Never Take Plural -s',
        explanation:
          'Nouns such as scenery, poetry, furniture, information, advice, luggage, baggage, machinery, and stationery are uncountable in standard English. They take neither "a/an" nor "-s/-es".',
        formula: 'Uncountable Noun (no a/an, no -s) + Singular Verb',
        correctExample: 'The romantic poetry of William Wordsworth offers deep philosophical solace.',
        incorrectExample: 'The romantic poetries of William Wordsworth offer deep philosophical solaces.',
        commonPitfall: 'To count units of uncountable nouns, use partitives like "pieces of advice", "items of furniture", or "sheets of stationery".'
      },
      {
        rule: 'The 231 vs 123 Personal Pronoun Sequence',
        explanation:
          'For normal or positive actions with multiple singular pronouns, follow 2nd -> 3rd -> 1st person (231). When confessing a flaw, guilt, or with plural pronouns (we, you, they), follow 1st -> 2nd -> 3rd person (123).',
        formula: 'Positive/Neutral: You + He + I (2-3-1) | Guilt/Plural: I/We + You + They (1-2-3)',
        correctExample: 'You, Ramesh, and I have been shortlisted for the state fellowship.',
        incorrectExample: 'I, you, and Ramesh have been shortlisted for the state fellowship.',
        commonPitfall: 'Using reflexive pronouns like "Myself Ramesh" as an independent subject. Always say "I am Ramesh".'
      },
      {
        rule: 'Distinguishing "Who" (Subject) vs "Whom" (Object) & "It\'s" vs "Its"',
        explanation:
          'Use "who" when the relative pronoun acts as the subject of a verb; use "whom" as the object of a verb or preposition. Note that "its" is possessive while "it\'s" means "it is/has".',
        formula: 'Who + Verb (Subject) | Whom + Subject + Verb (Object)',
        correctExample: 'The dramatist whom critics admire most shaped modern tragedy.',
        incorrectExample: 'The dramatist who critics admire most shaped modern tragedy.',
        commonPitfall: 'Count subjects and finite verbs in the relative clause: if a verb needs a subject, pick "who".'
      }
    ],
    quickCheck: {
      question: 'Choose the grammatically accurate sentence:',
      options: [
        'Neither of the three research scholars brought their spectacles.',
        'One must keep his promise during an academic evaluation.',
        'The sceneries of Pachmarhi are breathtaking after monsoon.',
        'You, she, and I must collaborate on this linguistics project.'
      ],
      correctIndex: 3,
      explanation:
        'Option D follows the polite 2-3-1 personal pronoun rule ("You, she, and I"). A wrongly uses "Neither" for three items ("None"); B uses "his" instead of "one\'s"; C wrongly pluralizes "scenery".'
    }
  },
  {
    id: 'verbs-adjectives-adverbs',
    moduleNumber: '01 · Foundation B',
    title: 'Verbs, Adjectives & Adverbs: Finites, Degrees & Modifier Order',
    category: 'Parts of Speech',
    level: 'Intermediate',
    summary:
      'Explore Main vs. Auxiliary verbs, Transitive vs. Intransitive objects, Finite vs. Non-Finite verbs (Infinitives, Gerunds, Participles), Adjective Degrees & Order (OSASCOMP), and all 7 Adverb types including the MPT placement order.',
    visualAssetKey: 'parts-tree',
    visualCaption: 'Verb Valency, Non-Finite Transformations & Adjective-Adverb Modification Grid',
    animatedDiagramType: 'verbs-modifiers',
    flowchartTitle: 'Verb & Modifier Classification Flowchart',
    flowchartSteps: [
      {
        step: '01',
        label: 'Test Verb Finiteness',
        detail: 'Does the verb change form when Subject number or Tense shifts? Yes = Finite; No = Non-Finite (to+V1, V-ing, V3).',
        example: 'She loves (Finite) reading (Gerund / Non-Finite) poetry.'
      },
      {
        step: '02',
        label: 'Check Transitivity',
        detail: 'Ask "what?" or "whom?" after the action verb. Direct object present = Transitive; No object = Intransitive.',
        example: 'He raised his hand (Trans.) vs The sun rose (Intrans.).'
      },
      {
        step: '03',
        label: 'Select Adjective Degree',
        detail: 'Positive (as...as), Comparative (-er/more...than, or Latin -ior + to), Superlative (the + -est/most).',
        example: 'Keats is inferior to none; This stanza is the clearest.'
      },
      {
        step: '04',
        label: 'Order Adverbs (M-P-T)',
        detail: 'Place multiple adverbs in Manner -> Place -> Time sequence, and Frequency adverbs before the main verb.',
        example: 'She recited clearly (M) on stage (P) yesterday (T).'
      }
    ],
    tables: [
      {
        title: 'Verbs: Main/Auxiliary, Transitive/Intransitive & Non-Finite Trio',
        caption: 'Structural breakdown tested heavily in MPESB Grade 1 & 2 syntax spotting.',
        headers: ['Category', 'Sub-Type', 'Grammatical Role', 'Exam Illustration'],
        rows: [
          ['Main vs Auxiliary', 'Primary (be, do, have) & Modals (can, must, ought)', 'Marks tense, voice, mood, or ability alongside V-base', 'She has been composing (Aux: has been + Main: composing).'],
          ['Transitive Verb', 'Monotransitive / Ditransitive', 'Requires Direct/Indirect Object to complete sense', 'The mentor gave the scholar (IO) a folio (DO).'],
          ['Intransitive Verb', 'Ergative / Linking / Motion', 'Needs no direct object; cannot passivize directly', 'The auditorium fell silent; Birds migrate south.'],
          ['Infinitive (to + V1)', 'Noun / Adjective / Adverb role; Bare V1 after make/let', 'Shows purpose or unrealized action', 'To err is human; He made me sign the register.'],
          ['Gerund (V-ing)', 'Verbal Noun', 'Acts as Subject/Object; takes possessive noun/pronoun', 'Swimming builds stamina; I appreciate your writing early.'],
          ['Participle (V-ing / V3 / having+V3)', 'Verbal Adjective (Present, Past, Perfect)', 'Modifies a noun; must match sentence subject', 'Having finished the paper, the candidate left calmly.']
        ]
      },
      {
        title: 'Adjectives & Adverbs: Types, Degrees & Placement Rules',
        caption: 'Complete taxonomy of descriptive modifiers and degree transformations.',
        headers: ['Modifier Class', 'Types & Categories', 'Crucial Exam Rule', 'Example'],
        rows: [
          ['Adjective Types', 'Qualitative, Quantitative, Numeral, Demonstrative, Possessive, Distributive', 'Order (OSASCOMP): Opinion-Size-Age-Shape-Color-Origin-Material-Purpose', 'A brilliant (Op) old (Age) English (Orig) lyric poem.'],
          ['Degrees of Comparison', 'Positive (tall), Comparative (taller than), Superlative (the tallest)', 'Compare within class using "any other"; avoid double comparatives', 'Kalidasa is greater than any other Sanskrit dramatist.'],
          ['Latin Comparatives', 'senior, junior, superior, inferior, prior, preferable', 'Followed by preposition "to" — NEVER "than"', 'Early manuscripts are superior to modern reprints.'],
          ['Adverbs (5 Core + 2)', 'Manner, Time, Place, Frequency, Degree + Relative & Interrogative', 'Follow Manner -> Place -> Time (MPT) at clause end', 'He argued persuasively (M) in the hall (P) last evening (T).'],
          ['Confusing Adverb Pairs', 'Hard/Hardly · Late/Lately · Fast (never fastly)', 'Adverbs of frequency (seldom, always, often) precede main verb', 'She works hard (diligently); She hardly rests (almost never).']
        ]
      }
    ],
    keyRules: [
      {
        rule: 'Finite vs Non-Finite: Possessive Case Before a Gerund',
        explanation:
          'Because a Gerund functions grammatically as a Noun, any pronoun or noun placed immediately before it must be in the Possessive case (my, his, her, our, their, John\'s), not the Objective case.',
        formula: 'Possessive Pronoun / Noun\'s + Gerund (V-ing)',
        correctExample: 'The examiner objected to his arriving twenty minutes after the bell.',
        incorrectExample: 'The examiner objected to him arriving twenty minutes after the bell.',
        commonPitfall: 'Confusing a Gerund ("Reading books helps") with a Present Participle modifier ("The reading student").'
      },
      {
        rule: 'Non-Gradable Adjectives & No Double Comparatives',
        explanation:
          'Absolute adjectives like unique, perfect, universal, complete, supreme, circular, and chief cannot take "more", "most", "very", or "-er/-est". Similarly, never pair "more" with "-er".',
        formula: 'Unique / Perfect / Chief (No "more unique" or "most perfect")',
        correctExample: 'Shakespeare\'s dramatic range remains unique among Elizabethan playwrights.',
        incorrectExample: 'Shakespeare\'s dramatic range remains the most unique among Elizabethan playwrights.',
        commonPitfall: 'Combining "more" with "better" or writing "more preferable to".'
      },
      {
        rule: 'Sensation Verbs Take Adjectives, Not Adverbs',
        explanation:
          'Linking verbs of sensation and state (taste, smell, sound, feel, look, appear, seem, grow, become) link to a Subject Complement Adjective, never an -ly adverb.',
        formula: 'Verb of Sensation (look/smell/taste/sound) + Adjective',
        correctExample: 'The hibiscus tea tasted wonderfully refreshing and smelled sweet.',
        incorrectExample: 'The hibiscus tea tasted sweetly and the melody sounded harshly.',
        commonPitfall: 'Writing "She feels badly about the error" (use "She feels bad" for emotion).'
      }
    ],
    quickCheck: {
      question: 'Identify the sentence containing an accurate Non-Finite and Modifier structure:',
      options: [
        'He drove very fastly along the highway yesterday.',
        'This edition is more preferable than the earlier folio.',
        'The principal appreciated my presenting the paper concisely in class.',
        'Having typed the letter, the printer jammed suddenly.'
      ],
      correctIndex: 2,
      explanation:
        'Option C uses the possessive pronoun "my" before the gerund "presenting" and an accurate manner adverb "concisely". A uses invalid "fastly"; B has double comparative + "than" after "preferable"; D has a dangling participle.'
    }
  },
  {
    id: 'prepositions-conjunctions-interjections',
    moduleNumber: '01 · Foundation C',
    title: 'Prepositions, Conjunctions (FANBOYS) & Interjections',
    category: 'Parts of Speech',
    level: 'Competitive / NET & TET',
    summary:
      'Spatial and temporal mastery of Prepositions (at/on/in, between/among, across/through, beside/besides), Fixed Prepositions, all 3 Conjunction systems (Coordinating FANBOYS, Subordinating, Correlative pairs), and expressive Interjections.',
    visualAssetKey: 'parts-tree',
    visualCaption: 'Prepositional Space-Time Trajectories & Correlative Conjunction Connectors',
    animatedDiagramType: 'prepositions-motion',
    flowchartTitle: 'Preposition & Conjunction Selection Pipeline',
    flowchartSteps: [
      {
        step: '01',
        label: 'Time Pyramid (IN > ON > AT)',
        detail: 'Broad spans (months/years/centuries) take IN; exact dates/days take ON; clock times/points take AT.',
        example: 'in 1922 -> on April 15 -> at 9:30 AM'
      },
      {
        step: '02',
        label: 'Trace Spatial Motion',
        detail: 'Between (two/distinct entities) vs Among (>2 collective); Across (surface side-to-side) vs Through (3D enclosed volume).',
        example: 'Walk across the bridge · Walk through the tunnel'
      },
      {
        step: '03',
        label: 'Lock Fixed Collocations',
        detail: 'Match verbs/adjectives to mandatory prepositions; omit redundant prepositions after "discuss, emphasize, order, enter".',
        example: 'Comprise (no "of") · Consist of · Abide by · Comply with'
      },
      {
        step: '04',
        label: 'Pair Conjunctions & Interjections',
        detail: 'Check exact Correlative pairs (No sooner...than, Although...yet) and punctuate Interjections (Alas!, Bravo!, Hurrah!).',
        example: 'Not only the prose but also the prosody was examined.'
      }
    ],
    tables: [
      {
        title: 'Prepositions of Time, Space/Direction & High-Yield Fixed Pairs',
        caption: 'High-frequency competitive exam distinctions and zero-preposition verbs.',
        headers: ['Contrast / Category', 'Word A Rule & Meaning', 'Word B Rule & Meaning', 'Correct Usage'],
        rows: [
          ['Time: At / On / In', 'AT: exact clock time, midnight, festival point', 'ON: days, dates | IN: months, seasons, years, centuries', 'Born in July, on Monday, at 6:00 AM.'],
          ['Duration: Since / For', 'SINCE: point in past time (since 2018, Monday)', 'FOR: total period/duration (for five years, an hour)', 'She has taught here since 2020 (for six years).'],
          ['Distribution: Between / Among', 'BETWEEN: two items OR multiple distinct reciprocal items', 'AMONG: more than two items viewed collectively', 'Treaty between India, Japan, and France; divided among heirs.'],
          ['Movement: Across / Through', 'ACROSS: over a 2D surface from side to side', 'THROUGH: inside a 3D volume or medium', 'Swam across the Narmada; marched through the dense forest.'],
          ['State vs Motion: In / Into & Beside / Besides', 'IN = static rest; BESIDE = next to', 'INTO = inward motion/change; BESIDES = in addition to', 'Dived into the river; Sat beside his friend; Besides tea, he read.'],
          ['Fixed Prepositions', 'senior/prior to, abstain from, comply with, adept at', 'Zero Preposition verbs: discuss, describe, order, enter, comprise', 'We discussed the syllabus (NOT "discussed about").']
        ]
      },
      {
        title: 'Conjunctions (3 Classes) & Interjections',
        caption: 'Clause linkers, FANBOYS, mandatory correlative pairs, and exclamatory markers.',
        headers: ['Type', 'Members', 'Syntactic Requirement', 'Example'],
        rows: [
          ['Coordinating (FANBOYS)', 'For, And, Nor, But, Or, Yet, So', 'Joins grammatically equal words, phrases, or independent clauses', 'He studied tirelessly, yet the syntax puzzle baffled him.'],
          ['Subordinating', 'although, because, since, unless, until, lest, whereas', 'Introduces dependent clause; "lest" always takes "should"', 'Walk carefully lest you should stumble.'],
          ['Correlative Pairs', 'either...or, neither...nor, both...and, not only...but also', 'Requires strict Parallel Structure & exact pairing', 'She is both fluent in Latin and skilled in Greek.'],
          ['Exam Pair Traps', 'Although/Though -> yet (not "but") | Hardly/Scarcely -> when', 'No sooner -> than | Lest -> should (negative meaning, no "not")', 'Scarcely had he arrived when the bell rang.'],
          ['Interjections', 'Hurrah! (Joy), Alas! (Grief), Bravo! (Praise), Hush! (Silence)', 'Grammatically independent exclamation followed by "!" or ","', 'Bravo! You defended your doctoral dissertation admirably.']
        ]
      }
    ],
    keyRules: [
      {
        rule: 'Transitive Verbs That Never Take Prepositions',
        explanation:
          'Active-voice transitive verbs such as discuss, describe, emphasize, order, request, resemble, enter (a place), await, and comprise take their direct object immediately with NO intervening preposition.',
        formula: 'Discuss / Describe / Comprise + Direct Object (No about/of)',
        correctExample: 'The committee discussed the new MPESB grading rubric in detail.',
        incorrectExample: 'The committee discussed about the new MPESB grading rubric in detail.',
        commonPitfall: 'Adding "of" after "comprise" in active voice ("The book comprises of five units" -> write "comprises five units" or "is comprised of").'
      },
      {
        rule: 'Correlative Parallelism & "Neither...Nor" / "Lest...Should"',
        explanation:
          'Words following each half of a correlative conjunction ("not only...but also", "either...or") must belong to the same grammatical form. Furthermore, "until", "unless", and "lest" are inherently negative — never insert "not" in their clause.',
        formula: 'Not only + [Phrase Type A] + but also + [Phrase Type A]',
        correctExample: 'Unless you revise prosody, you cannot scan Spenserian stanzas accurately.',
        incorrectExample: 'Unless you do not revise prosody, you cannot scan Spenserian stanzas accurately.',
        commonPitfall: 'Placing "not only" before the verb when the contrast applies only to two objects.'
      }
    ],
    quickCheck: {
      question: 'Select the error-free sentence:',
      options: [
        'Although he worked diligently, but he missed the fellowship.',
        'She ordered for three volumes of critical theory yesterday.',
        'Work steadily lest you should fail the qualifying examination.',
        'The revised syllabus comprises of ten comprehensive units.'
      ],
      correctIndex: 2,
      explanation:
        '"Lest" means "for fear that" and correctly pairs with "should" without any negative "not". Options A ("although...but"), B ("ordered for"), and D ("comprises of") contain redundant connectors/prepositions.'
    }
  },

  // =========================================================================
  // 2. DETERMINERS & ARTICLES
  // =========================================================================
  {
    id: 'determiners-articles-quantifiers',
    moduleNumber: '02 · Determiners',
    title: 'Articles (A, An, The, Zero Ø) & Quantifiers (Few / Little / Each)',
    category: 'Determiners & Articles',
    level: 'Foundation',
    summary:
      'Master phonetic sound selection for A/An, specific and generic uses of The, Zero Article omissions (languages, meals, primary-purpose institutions), and exact precision on Few/A few/The few, Little/A little/The little, Many/Much, Some/Any, Each/Every/Either/Neither.',
    visualAssetKey: 'parts-tree',
    visualCaption: 'Sound-First Article Routing & Quantitative Beaker Precision',
    animatedDiagramType: 'articles-quantifiers',
    flowchartTitle: 'Article & Quantifier Decision Tree',
    flowchartSteps: [
      {
        step: '01',
        label: 'Identify Noun Countability',
        detail: 'Plural/Uncountable general noun -> cannot take a/an. Singular countable -> requires article or determiner.',
        example: 'Advice (Uncount.) · An idea (Sing. Count.)'
      },
      {
        step: '02',
        label: 'Test Initial Sound (A vs An)',
        detail: 'Base choice on pronunciation sound, NOT spelling letter! Vowel sound (a,e,i,o,u sound) = AN; Consonant sound = A.',
        example: 'an hour, an M.A. vs a university, a one-eyed man'
      },
      {
        step: '03',
        label: 'Specific vs Zero Article (Ø)',
        detail: 'Unique/specified/superlative = THE. Languages, meals, diseases, and primary institutional visits = ZERO Ø.',
        example: 'Go to Ø school (study) vs Visit the school (building)'
      },
      {
        step: '04',
        label: 'Gauge Quantifier Volume',
        detail: 'Zero-article few/little = negative (almost none); a few/a little = positive (some); the few/the little = all available.',
        example: 'A little knowledge is dangerous; The few books he had were lost.'
      }
    ],
    tables: [
      {
        title: 'Articles: Phonetic Indefinite, Definite & Zero-Article Matrix',
        caption: 'Sound traps, geographical/cultural uses of "the", and institutional omission rules.',
        headers: ['Article Category', 'Governing Rule', 'Correct Examples', 'Common Exam Trap'],
        rows: [
          ['Indefinite "A"', 'Used before consonant SOUND (even before vowels u/eu/o = "y"/"w" sound)', 'a university, a European, a one-rupee note, a union', 'Writing "an university" because u is a vowel letter.'],
          ['Indefinite "An"', 'Used before vowel SOUND (including silent h- and abbreviations F, H, L, M, N, R, S, X)', 'an honest scholar, an heir, an M.P., an S.D.O., an x-ray', 'Writing "a honest person" or "a M.A. degree".'],
          ['Definite "The"', 'Previous mention, superlatives, ordinals, rivers, oceans, mountain ranges, epics, "the + Adj" = class', 'The Narmada, the Himalayas, the Gita, the poor, the first', 'Using "the" before single peaks (Mount Everest -> Zero Ø).'],
          ['Zero Article (Ø)', 'Uncountable generalizations, languages, subjects, meals, games, primary purpose of hospital/prison/temple/bed', 'Speak Ø English, after Ø dinner, go to Ø church to pray', 'Writing "The English is spoken globally" ("The English" = English people!).']
        ]
      },
      {
        title: 'Quantifiers Comparison Scale (Countable vs Uncountable)',
        caption: 'Precision guide for Few/Little triads, Some/Any, and Distributives.',
        headers: ['Quantifier Group', 'Noun Compatibility', 'Semantic Nuance', 'Exam Illustration'],
        rows: [
          ['Few vs Little', 'Few = Plural Countable | Little = Uncountable', 'NEGATIVE (hardly any, practically none)', 'He has few friends (lonely); There is little hope left.'],
          ['A few vs A little', 'A few = Plural Countable | A little = Uncountable', 'POSITIVE (some, a small but usable amount)', 'A few scholars attended; Add a little sugar to the tea.'],
          ['The few vs The little', 'The few = Plural Countable | The little = Uncountable', 'DEFINITE ALL (not many/much, but all that exists)', 'The few notes I preserved helped me qualify.'],
          ['Many vs Much', 'Many = Plural Countable | Much = Uncountable', 'Note: "Many a + Sing. Noun + Sing. Verb"', 'Many a candidate has attempted this paper.'],
          ['Some vs Any', 'Both Plural Countable & Uncountable', 'Some = Affirmative/Polite offers; Any = Negative/Questions', 'Would you like some tea? I did not find any errors.'],
          ['Each / Every / Either / Neither', 'Always + Singular Noun + Singular Verb', 'Each (2+), Every (>2 all), Either (1 of 2), Neither (0 of 2)', 'Each of the five contestants holds a valid ticket.']
        ]
      }
    ],
    keyRules: [
      {
        rule: 'Sound Governs A/An — Not Alphabet Letters',
        explanation:
          'When acronyms (MP, MBA, FIR, MA, RTI) or silent-h nouns (hour, honor, heir, honest) open with a vowel phoneme, always select "an". When u/eu/o sounds like /juː/ or /w/, select "a".',
        formula: 'Vowel Sound -> AN | Consonant Sound (/j/, /w/, /h/ aspirated) -> A',
        correctExample: 'An M.A. in English literature applied for a uniform postgraduate post.',
        incorrectExample: 'A M.A. in English literature applied for an uniform postgraduate post.',
        commonPitfall: 'Treating "university", "unique", or "European" as vowel-initial sounds because they start with u/e.'
      },
      {
        rule: 'Primary Purpose Institution Rule (Zero Article vs "The")',
        explanation:
          'School, college, university, hospital, prison, church, temple, and bed take ZERO article when visited for their primary institutional function (studying, treatment, worship). Use "the" only when visiting as a building or guest.',
        formula: 'Primary Purpose -> Zero Ø | Secondary Visit / Building -> THE',
        correctExample: 'The injured playwright was rushed to Ø hospital, and his friends visited the hospital at dusk.',
        incorrectExample: 'The injured playwright was rushed to the hospital for surgery.',
        commonPitfall: 'Inserting "the" automatically before hospital, school, or church.'
      },
      {
        rule: 'Exact Polarity of Little / A Little / The Little & Few / A Few / The Few',
        explanation:
          'Because unprefixed "little" and "few" carry negative meaning ("almost nothing/nobody"), do not combine them with other negative words, and use "the little / the few" whenever followed by a relative clause defining that small stock.',
        formula: 'The few/little + Noun + [that + S + Verb] = All that was available',
        correctExample: 'She carefully preserved the little wealth she inherited from her grandfather.',
        incorrectExample: 'She carefully preserved a little wealth that she inherited from her grandfather.',
        commonPitfall: 'Using "a few / a little" when the sentence adds a restrictive "that..." clause referring to the whole available remainder.'
      }
    ],
    quickCheck: {
      question: 'Choose the sentence with accurate Articles & Quantifiers:',
      options: [
        'A little knowledge of Latin roots she possessed helped her decode the text.',
        'She was appointed an university lecturer after an one-hour interview.',
        'The few manuscripts preserved in the archive were consulted by each scholar.',
        'Many a students were disappointed by the little number of fellowships.'
      ],
      correctIndex: 2,
      explanation:
        'Option C rightly pairs "The few manuscripts [that were] preserved" and "each scholar" (singular). Option A needs "The little knowledge"; B needs "a university" and "a one-hour"; D misuses "many a" with plural verb/noun and "little" with countable "number".'
    }
  },

  // =========================================================================
  // 3. TENSES & AGREEMENT
  // =========================================================================
  {
    id: 'twelve-verb-tenses',
    moduleNumber: '03 · Tenses & Aspect',
    title: 'The 12 Verb Tenses, Time Markers & Stative Verb Exceptions',
    category: 'Tenses & Agreement',
    level: 'Intermediate',
    summary:
      'Complete matrix of all 12 English verb tenses across Past, Present, and Future (Simple, Continuous, Perfect, Perfect Continuous), temporal pairing laws, since/for mechanics, and non-progressive stative verbs.',
    visualAssetKey: 'tenses-timeline',
    visualCaption: 'Tri-Temporal Axis: Simple Points, Continuous Durations & Perfect Bridges',
    animatedDiagramType: 'tenses-timeline',
    flowchartTitle: 'Tense Selection Workflow',
    flowchartSteps: [
      {
        step: '01',
        label: 'Anchor Time Frame',
        detail: 'Establish whether the event sits in Past (before now), Present (now/habitual), or Future (after now).',
        example: 'Yesterday (Past) · Every day (Present) · By 2028 (Future)'
      },
      {
        step: '02',
        label: 'Select Aspect (4 Modes)',
        detail: 'Simple (fact/habit), Continuous (ongoing at reference point), Perfect (completed prior to point), Perfect Continuous (duration leading up to point).',
        example: 'Writes -> Is writing -> Has written -> Has been writing'
      },
      {
        step: '03',
        label: 'Apply Stative Check',
        detail: 'Never use -ing Continuous with cognition/possession/perception verbs (know, believe, own, belong, resemble).',
        example: 'I know the rule (NOT I am knowing the rule).'
      },
      {
        step: '04',
        label: 'Verify Two-Action Sequencing',
        detail: 'Past earlier + later -> had V3 + V2; Future completed by milestone -> will have V3.',
        example: 'Before the bell rang (V2), he had finished (had V3).'
      }
    ],
    tables: [
      {
        title: 'The Complete 12 Verb Tenses Master Matrix',
        caption: 'Syntactic formulas, time markers, and model sentences across all 3 time frames × 4 aspects.',
        headers: ['Aspect', 'Present Form', 'Past Form', 'Future Form'],
        rows: [
          [
            'Simple (Fact / Habit)',
            'S + V1(s/es) · Markers: always, daily, seldom · "Keats writes odes."',
            'S + V2 · Markers: yesterday, ago, in 1922 · "Eliot published The Waste Land in 1922."',
            'S + will/shall + V1 · Markers: tomorrow, soon · "She will present tomorrow."'
          ],
          [
            'Continuous (Ongoing)',
            'S + is/am/are + V-ing · Markers: now, at present · "Students are analyzing prose."',
            'S + was/were + V-ing · Markers: while, at 8 PM yesterday · "He was revising when I called."',
            'S + will be + V-ing · Markers: this time tomorrow · "We will be writing the exam at 10 AM."'
          ],
          [
            'Perfect (Completed)',
            'S + has/have + V3 · Markers: yet, already, just, so far · "I have read six tragedies."',
            'S + had + V3 · Markers: before, after, by the time (past) · "The train had left before we arrived."',
            'S + will have + V3 · Markers: by next month, before + V1 · "She will have earned her Ph.D. by June."'
          ],
          [
            'Perfect Continuous (Duration -> Point)',
            'S + has/have been + V-ing + since/for · "She has been teaching since 2019."',
            'S + had been + V-ing + since/for · "They had been researching for hours before dusk."',
            'S + will have been + V-ing + by/for · "By 2027, he will have been lecturing for ten years."'
          ]
        ]
      },
      {
        title: 'Stative Verbs vs Dynamic Verbs & Tense Trap Pairs',
        caption: 'Exam exceptions where standard -ing or Present Perfect rules are prohibited.',
        headers: ['Tense Rule / Trap', 'Forbidden Form', 'Required Correction', 'Linguistic Reason'],
        rows: [
          ['Cognition & State Verbs', 'I am knowing / am believing / am owning this text.', 'I know / believe / own this text.', 'Mental states and ownership have no observable progress.'],
          ['Perception Shifts', 'This rose is smelling sweet right now.', 'This rose smells sweet; She is smelling the rose (voluntary act).', 'Involuntary sensation = Simple; Deliberate action = Continuous.'],
          ['Definite Past Marker + Present Perfect', 'He has qualified NET in 2023.', 'He qualified NET in 2023.', 'Specific past time adverbs (in 2023, yesterday, ago) force Simple Past V2.'],
          ['It is high time / It is time', 'It is high time we start preparing.', 'It is high time we started preparing.', '"It is (high) time + Subject" demands Subjunctive Past V2.']
        ]
      }
    ],
    keyRules: [
      {
        rule: 'Two Past Events: Earlier Action Gets Past Perfect (had + V3)',
        explanation:
          'Never use Past Perfect for a single isolated past action. Use "had + V3" strictly to mark whichever past action happened earlier than a second past reference point ("V2").',
        formula: 'Earlier Action (had + V3) + before/when + Later Action (V2)',
        correctExample: 'The invigilator noticed that three candidates had already sealed their answer scripts.',
        incorrectExample: 'Yesterday I had gone to the central library at noon.',
        commonPitfall: 'Using Past Perfect instead of Simple Past when there is only one past event and a time adverb like "yesterday".'
      },
      {
        rule: 'Present Perfect with "Since / For" vs Stative Verbs',
        explanation:
          'Duration starting in the past and continuing to the present takes Present Perfect Continuous ("have/has been V-ing") for action verbs, OR Present Perfect Simple ("have/has + V3") for stative verbs like know, own, or be.',
        formula: 'Stative Verb + have/has + V3 + since/for (Never "have been knowing")',
        correctExample: 'I have known Professor Kushro since my postgraduate orientation.',
        incorrectExample: 'I am knowing / have been knowing Professor Kushro since my postgraduate orientation.',
        commonPitfall: 'Keeping a continuing past action in Simple Present ("I am waiting for two hours" -> use "have been waiting").'
      }
    ],
    quickCheck: {
      question: 'Select the sentence with flawless tense logic:',
      options: [
        'It is high time the board releases the revised syllabus.',
        'He has submitted his research synopsis last Tuesday.',
        'By next December, she will have been teaching linguistics for a decade.',
        'I am having three rare first-edition folios in my collection.'
      ],
      correctIndex: 2,
      explanation:
        'Future milestone ("By next December") paired with ongoing duration ("for a decade") requires Future Perfect Continuous ("will have been teaching"). Option A needs "released"; B needs Simple Past "submitted"; D needs stative "have".'
    }
  },
  {
    id: 'subject-verb-concord',
    moduleNumber: '03 · Syntax & Agreement',
    title: 'Subject-Verb Concord: Compound Subjects, Collectives & Units',
    category: 'Tenses & Agreement',
    level: 'Competitive / NET & TET',
    summary:
      'Comprehensive syntax laws governing verb number agreement with correlative pairs (either...or), parenthetical phrases (as well as, along with), collective nouns, singular units of distance/time/currency, "one of the + plural noun", and "a number of vs the number of".',
    visualAssetKey: 'parts-tree',
    visualCaption: 'Grammatical Agreement Balance: True Subject vs Intervening Modifiers',
    animatedDiagramType: 'concord-balance',
    flowchartTitle: 'Subject-Verb Concord Resolution Flowchart',
    flowchartSteps: [
      {
        step: '01',
        label: 'Strip Prepositional & Parenthetical Distractors',
        detail: 'Mentally cross out phrases starting with "of", "as well as", "along with", "in addition to", "besides". Match verb to S1!',
        example: '[The quality] (of these essays) -> IS high.'
      },
      {
        step: '02',
        label: 'Check Correlative Connectors',
        detail: 'If joined by "or", "nor", "either...or", "neither...nor", "not only...but also", match verb to nearest subject (S2).',
        example: 'Neither the coach nor [the players] -> WERE late.'
      },
      {
        step: '03',
        label: 'Evaluate Collective / Measurement Sense',
        detail: 'Acting as single entity or total distance/sum/time = Singular verb. Acting as split individuals = Plural verb.',
        example: 'Fifty miles IS a long drive · The committee ARE divided.'
      },
      {
        step: '04',
        label: 'Verify Special Determiners',
        detail: '"Each/Every" = Singular; "The number of" = Singular; "A number of" = Plural; "One of the + Pl + who" = Plural.',
        example: 'The number of applicants HAS risen · A number of books ARE missing.'
      }
    ],
    tables: [
      {
        title: 'Subject-Verb Concord: Complete Exam Agreement Reference',
        caption: 'Side-by-side verb number rules for every high-frequency exam trap.',
        headers: ['Syntactic Pattern', 'Required Verb Number', 'Governing Rationale', 'Verified Example'],
        rows: [
          ['S1 + as well as / along with / together with / with + S2', 'Matches S1 (usually Singular if S1 is sing.)', 'Parenthetical phrase is not part of true compound subject', 'The dean, along with twelve faculty members, is presiding.'],
          ['Either S1 or S2 / Neither S1 nor S2 / Not only S1 but also S2', 'Matches NEAREST subject (S2)', 'Rule of Proximity dictates agreement with closest head', 'Either the editor or his assistants have misquoted the line.'],
          ['Compound Concept ("Bread and butter", "Slow and steady")', 'Singular Verb', 'Paired nouns representing one unified dish or idea', 'Rice and curry is his staple meal; Time and tide wait(s) for none.'],
          ['One Article vs Two Articles ("The poet and critic")', '1 Article = Singular | 2 Articles = Plural', '"The X and Y" = 1 person holding two roles; "The X and the Y" = 2 persons', 'The philosopher and poet is dead vs The poet and the critic have arrived.'],
          ['Distance, Time, Weight & Money Units', 'Singular Verb', 'Treated as a single aggregate lump quantity', 'Ten thousand rupees is sufficient; Four hours is too short.'],
          ['Collective Nouns (Jury, Audience, Committee, Team)', 'Unanimous = Singular | Divided = Plural', 'Check pronoun: "its" takes singular; "their" takes plural', 'The jury has signed its order vs The jury are split in their views.'],
          ['A number of vs The number of', '"A number of" = Plural | "The number of" = Singular', '"A number of" means "many"; "The number" focuses on count', 'A number of candidates are waiting; The number of seats is fixed.'],
          ['Plural-Form Singulars (Mathematics, Linguistics, News, Measles)', 'Singular Verb', 'Unchanged academic names/illnesses end in -s morphologically', 'Phonetics is tested thoroughly; No news is good news.']
        ]
      }
    ],
    keyRules: [
      {
        rule: '"One of the + Plural Noun" vs "One of the + Plural Noun + Who/That"',
        explanation:
          'In simple sentences ("One of the candidates was selected"), the subject is "One" -> Singular verb. However, inside a relative clause ("One of the candidates who WERE selected"), "who" refers to the plural noun "candidates", taking a plural verb—EXCEPT if preceded by "The only one of the...".',
        formula: 'One of the [Pl] + V(sing) | One of the [Pl] who + V(pl) | The only one of the [Pl] who + V(sing)',
        correctExample: 'Kalidasa is one of those classical poets who have shaped Indian aesthetics.',
        incorrectExample: 'Kalidasa is one of those classical poets who has shaped Indian aesthetics.',
        commonPitfall: 'Always inspect whether "the only" precedes "one of the" — "the only" flips the verb back to Singular!'
      },
      {
        rule: 'More Than One vs More + Plural Noun + Than One',
        explanation:
          'The fixed expression "More than one" immediately precedes a singular noun and takes a singular verb. If split as "More [plural noun] than one", use a plural verb.',
        formula: 'More than one + N(sing) + V(sing)  |  More + N(pl) + than one + V(pl)',
        correctExample: 'More than one manuscript has been digitized; More manuscripts than one have vanished.',
        incorrectExample: 'More than one manuscripts have been digitized.',
        commonPitfall: 'Matching "more than one" logically to plural despite its mandatory singular surface syntax.'
      }
    ],
    quickCheck: {
      question: 'Which sentence obeys Subject-Verb Concord strictly?',
      options: [
        'Neither the director nor the actors was willing to alter the finale.',
        'The captain, together with all team members, have boarded the coach.',
        'He is the only one of the essayists who possesses this rare archive.',
        'Twenty kilometers are a tiring walk before sunrise.'
      ],
      correctIndex: 2,
      explanation:
        '"The only one of the essayists who possesses..." correctly selects singular "possesses" because "the only" restricts the antecedent to "one". Option A should match "actors" (were); B matches "captain" (has); D measures a single distance unit (is).'
    }
  },

  // =========================================================================
  // 4. SENTENCE STRUCTURES & TRANSFORMATIONS
  // =========================================================================
  {
    id: 'active-passive-voice',
    moduleNumber: '04 · Transformations A',
    title: 'Active & Passive Voice: Tenses, Modals, Imperatives & Quasi-Passive',
    category: 'Transformations',
    level: 'Advanced',
    summary:
      'Step-by-step grammatical voice transformations across 8 active tenses, modals, yes/no and Wh-questions, imperative orders/requests, ditransitive objects, agentless passives, preposition retention, and quasi-passive verbs.',
    visualAssetKey: 'voice-bridge',
    visualCaption: 'Subject-Object Pivot Bridge: Reversing Agency While Preserving Tense & Aspect',
    animatedDiagramType: 'voice-transform',
    flowchartTitle: 'Active-to-Passive 4-Step Conversion Protocol',
    flowchartSteps: [
      {
        step: '01',
        label: 'Promote Object to Subject',
        detail: 'Identify the transitive Direct Object (or Personal Indirect Object) and move it into Subject position.',
        example: '"She wrote [a sonnet]" -> [A sonnet]...'
      },
      {
        step: '02',
        label: 'Insert Tense-Matched BE Auxiliary',
        detail: 'Match exact tense/aspect using BE forms: is/am/are, was/were, being (for continuous), been (for perfect), be (after modals).',
        example: 'Simple Past "wrote" -> "was"'
      },
      {
        step: '03',
        label: 'Convert Main Verb to Past Participle (V3)',
        detail: 'Always lock main verb in V3 and retain any fixed verb preposition directly after V3.',
        example: 'was written (or "was laughed at" if phrasal)'
      },
      {
        step: '04',
        label: 'Handle Agent ("by" / Alternative Prepositions / Omission)',
        detail: 'Add "by + Agent", or "to/with/in" for special verbs (known to, surprised at, satisfied with), or omit vague agents (Someone/Police).',
        example: 'A sonnet was written by her. · She is known to all.'
      }
    ],
    tables: [
      {
        title: 'Tense & Modal Voice Conversion Table (8 Convertible Tenses + Modals)',
        caption: 'Note: Future Continuous and all Perfect Continuous tenses have NO standard passive form.',
        headers: ['Tense / Structure', 'Active Voice Structure', 'Passive Voice Formula', 'Transformed Example'],
        rows: [
          ['Simple Present', 'S + V1(s/es) + O', 'O + is/am/are + V3 + by S', 'Critics praise Eliot. -> Eliot is praised by critics.'],
          ['Present Continuous', 'S + is/am/are + V-ing + O', 'O + is/am/are + BEING + V3 + by S', 'She is editing the draft. -> The draft is being edited by her.'],
          ['Present Perfect', 'S + has/have + V3 + O', 'O + has/have + BEEN + V3 + by S', 'They have published the guide. -> The guide has been published.'],
          ['Simple Past', 'S + V2 + O', 'O + was/were + V3 + by S', 'Milton dictated the verses. -> The verses were dictated by Milton.'],
          ['Past Continuous', 'S + was/were + V-ing + O', 'O + was/were + BEING + V3 + by S', 'He was reciting an ode. -> An ode was being recited by him.'],
          ['Past Perfect', 'S + had + V3 + O', 'O + had + BEEN + V3 + by S', 'We had solved the test. -> The test had been solved by us.'],
          ['Simple Future / Modals', 'S + will/can/must/should + V1 + O', 'O + will/can/must/should + BE + V3 + by S', 'You must obey the rules. -> The rules must be obeyed.'],
          ['Imperative Command / Advice / Request', 'Open the door / Help the poor / Please sit', 'Let + O + be + V3 / O + should be + V3 / You are requested to...', 'Let the door be opened / The poor should be helped.']
        ]
      },
      {
        title: 'Special Passive Exceptions (Fixed Prepositions, Wh- & Quasi-Passive)',
        caption: 'Crucial exceptions where "by" is replaced by another preposition or special syntax.',
        headers: ['Active Pattern', 'Passive Pattern', 'Example Transformation'],
        rows: [
          ['Know / Oblige (to)', 'known TO / obliged TO (Never "by")', '"Everybody knows Dr. Sen." -> "Dr. Sen is known to everybody."'],
          ['Satisfy / Please / Disgust / Charmed (with)', 'satisfied/pleased WITH', '"His essay pleased the examiner." -> "The examiner was pleased with his essay."'],
          ['Surprised / Astonished / Alarmed / Vexed (at)', 'surprised/astonished AT', '"Her score astonished everyone." -> "Everyone was astonished at her score."'],
          ['Contain / Engross / Interest (in)', 'contained IN / interested IN', '"This box contains rare slides." -> "Rare slides are contained in this box."'],
          ['Interrogative "Who"', 'By whom + Aux + O + V3?', '"Who wrote Gitanjali?" -> "By whom was Gitanjali written?"'],
          ['Quasi-Passive Verb + Adjective', 'S + is/was + Adj + when it is/was + V3', '"Honey tastes sweet." -> "Honey is sweet when it is tasted."']
        ]
      }
    ],
    keyRules: [
      {
        rule: 'Special Prepositions Instead of "By" in Passive Voice',
        explanation:
          'Verbs expressing mental state, containment, or acquaintance govern fixed prepositions instead of "by": know/oblige -> TO; please/satisfy -> WITH; surprise/astonish/amaze -> AT; contain/interest -> IN.',
        formula: 'known TO | satisfied WITH | surprised AT | contained IN',
        correctExample: 'The scholarship board was deeply impressed with her research portfolio.',
        incorrectExample: 'The scholarship board was deeply impressed by her research portfolio (or "known by").',
        commonPitfall: 'Mechanically inserting "by" in every single passive conversion.'
      },
      {
        rule: 'Retaining Prepositions on Phrasal Verbs & Interrogative "By Whom"',
        explanation:
          'Never delete the preposition attached to an active phrasal verb ("look after", "laugh at", "comply with"). In "Who..." questions, convert "Who" to "By whom + auxiliary + Subject + V3?".',
        formula: 'Active: Who + V2 + Obj? -> Passive: By whom + was/were + Obj + V3?',
        correctExample: 'The neglected manuscript was carefully looked after by the archivist.',
        incorrectExample: 'The neglected manuscript was carefully looked by the archivist.',
        commonPitfall: 'Forgetting to keep question auxiliary inversion after "By whom" ("By whom this poem was written?" is incorrect).'
      }
    ],
    quickCheck: {
      question: 'Convert accurately into Passive Voice: "Someone has stolen my annotated dictionary."',
      options: [
        'My annotated dictionary was stolen by someone.',
        'My annotated dictionary has been stolen.',
        'Someone has been stealing my annotated dictionary.',
        'My annotated dictionary is being stolen by someone.'
      ],
      correctIndex: 1,
      explanation:
        'Present Perfect ("has stolen") maps to "has been stolen", and vague/unknown agents ("someone", "people", "somebody") are dropped cleanly in standard passive voice.'
    }
  },
  {
    id: 'narration-conditionals-inversion-tags',
    moduleNumber: '04 · Transformations B',
    title: 'Narration (Speech), Conditionals, Inversion & Question Tags',
    category: 'Transformations',
    level: 'Competitive / NET & TET',
    summary:
      'Complete conversion handbook for Direct-to-Indirect Speech (statements, questions, commands, exclamations + deictic shifts), Zero-to-Third & Mixed Conditionals, Negative Adverbial Inversion (Hardly, Scarcely, Seldom), and Question Tag rules/exceptions.',
    visualAssetKey: 'voice-bridge',
    visualCaption: 'Tense Backshift Mechanics, Conditional Worlds & Auxiliary Inversion Controls',
    animatedDiagramType: 'narration-conditionals',
    flowchartTitle: 'Narration, Conditionals & Tag Transformation Map',
    flowchartSteps: [
      {
        step: '01',
        label: 'Narration Backshift & Pronouns',
        detail: 'Apply SON rule for pronouns (1st->Subject, 2nd->Object, 3rd->No change); backshift tense when reporting verb is Past (except universal truths).',
        example: 'He said, "I am ready." -> He said that he was ready.'
      },
      {
        step: '02',
        label: 'Convert Speech Sentence Mood',
        detail: 'Statement -> "that"; Yes/No Q -> "if/whether + S + V"; Wh-Q -> "Wh-word + S + V"; Command -> "to + V1"; Exclamation -> "exclaimed with joy/sorrow".',
        example: 'He asked me where I lived (NO "where did I live").'
      },
      {
        step: '03',
        label: 'Verify Conditional Timeline',
        detail: '0 (Fact: V1/V1), 1st (Likely: V1/will+V1), 2nd (Unreal Pres: V2/would+V1), 3rd (Unreal Past: had+V3/would have+V3), Mixed (had+V3 / would+V1 now).',
        example: 'Had he studied, he would have topped · Were I rich, I would travel.'
      },
      {
        step: '04',
        label: 'Invert Negative Adverbs & Build Tags',
        detail: 'Fronted Hardly/Scarcely/Seldom/Never -> Aux + S + V. Question Tag uses opposite polarity, subject pronoun, and special exceptions (Let\'s -> shall we?).',
        example: 'Seldom have I read such verse · Let us begin, shall we?'
      }
    ],
    tables: [
      {
        title: 'Direct to Indirect Speech: Tense, Modal & Deictic Shift Table',
        caption: 'Automatic shifts triggered when reporting verb ("said / told / asked") is in Simple Past.',
        headers: ['Direct Speech Form', 'Indirect Speech Shift', 'Time / Place Word Shifts', 'Example'],
        rows: [
          ['Simple Present (V1)', 'Simple Past (V2) (UNLESS Universal Truth)', 'now -> then | today -> that day', '"I write daily" -> He said that he wrote daily.'],
          ['Present Continuous / Perfect', 'Past Continuous / Past Perfect', 'yesterday -> the previous day | ago -> before', '"I have finished now" -> She said she had finished then.'],
          ['Simple Past (V2)', 'Past Perfect (had + V3)', 'tomorrow -> the next day | here -> there', '"I saw him yesterday" -> He said he had seen him the day before.'],
          ['Will / Can / May / Shall', 'Would / Could / Might / Should or Would', 'this -> that | these -> those', '"I can solve it" -> She said that she could solve it.'],
          ['Interrogative (Yes/No & Wh-)', 'asked + if/whether OR wh-word + S + V (No "do/did"!)', 'Question mark "?" becomes full stop "."', '"Are you tired?" -> He asked if I was tired.'],
          ['Imperative & Exclamatory', 'ordered/advised/requested + to + V1 | exclaimed with joy/grief', 'Alas!/Hurrah!/Bravo! -> descriptive phrase', '"Hurrah! We won" -> They exclaimed with joy that they had won.']
        ]
      },
      {
        title: 'Conditionals (0, 1, 2, 3, Mixed), Negative Inversion & Question Tags',
        caption: 'Complete syntax formulas and high-frequency exam exceptions.',
        headers: ['Structure / Rule', 'Formula', 'Critical Constraint / Exception', 'Exam Example'],
        rows: [
          ['Zero & First Conditional', '0: If V1, V1 | 1st: If V1, will + V1', 'Never put "will/shall" inside the "If" clause!', 'If you heat ice, it melts. / If it rains, I will stay.'],
          ['Second Conditional (Unreal Pres.)', 'If + S + were/V2, S + would + V1', 'Always use "were" for ALL subjects (If I/he were...)', 'If I were the editor, I would restore that stanza.'],
          ['Third & Mixed Conditional', '3rd: If had V3, would have V3 | Mixed: If had V3, would V1 now', 'Inversion drops "If": "Had + S + V3, S + would have V3"', 'Had he checked earlier, he would hold the trophy today (Mixed).'],
          ['Subject-Verb Inversion', 'Hardly/Scarcely/Seldom/Never/Only by... + Aux + S + V', 'Hardly/Scarcely...WHEN | No sooner...THAN', 'Hardly had she spoken when applause erupted.'],
          ['Standard Question Tags', 'Positive Statement -> Negative Tag? | Negative -> Positive Tag?', 'Always end with Subject Pronoun ("There/It/They")', 'She plays well, doesn\'t she? / He hasn\'t left, has he?'],
          ['Question Tag Exceptions', 'I am -> aren\'t I? | Let\'s -> shall we? | Everyone -> they?', 'Semi-negatives (seldom, hardly, few, little) take POSITIVE tag!', 'He seldom visits, does he? / Let\'s analyze this poem, shall we?']
        ]
      }
    ],
    keyRules: [
      {
        rule: 'Fronted Negative Adverbials Trigger Mandatory Inversion',
        explanation:
          'When a sentence begins with a negative or limiting adverbial (Hardly, Scarcely, Barely, Seldom, Rarely, Never, Not only, Little, At no time, Under no circumstances), immediately invert the Auxiliary Verb before the Subject (like a question, without a question mark).',
        formula: 'Negative Adverbial + Auxiliary (had / did / have / do) + Subject + Main Verb',
        correctExample: 'Seldom have literary historians encountered such an authentic forgery.',
        incorrectExample: 'Seldom literary historians have encountered such an authentic forgery.',
        commonPitfall: 'Pairing "No sooner" with "when" — remember "No sooner...THAN" and "Hardly/Scarcely...WHEN".'
      },
      {
        rule: 'Question Tag Exceptions: Imperatives, Semi-Negatives & Indefinites',
        explanation:
          'Statements starting with "I am" take "aren\'t I?"; proposals with "Let\'s" take "shall we?"; imperative requests take "will you / won\'t you?"; subjects like "everyone / everybody / someone" take pronoun "they"; and semi-negative words (hardly, scarcely, seldom, little, few) require a POSITIVE tag.',
        formula: 'Everyone / Someone -> they | Let\'s -> shall we? | Hardly/Few -> Positive Tag',
        correctExample: 'Everyone attended the guest lecture yesterday, didn\'t they?',
        incorrectExample: 'Everyone attended the guest lecture yesterday, didn\'t he?',
        commonPitfall: 'Adding a negative tag after "few" or "seldom" ("He rarely errs, doesn\'t he?" -> wrong; use "does he?").'
      }
    ],
    quickCheck: {
      question: 'Pick the sentence that combines Conditionals / Inversion / Tags accurately:',
      options: [
        'Little did the proctor suspect that the archive had been moved, didn\'t he?',
        'If I would have revised the meter rules, I would pass the mock test.',
        'Scarcely had the bell rung than the students opened their booklets.',
        'Let us review the stanza together before the seminar starts, shall we?'
      ],
      correctIndex: 3,
      explanation:
        '"Let\'s / Let us [proposal]" correctly triggers the fixed question tag "shall we?". Option A uses a negative tag after negative "Little"; B puts "would have" inside the if-clause; C pairs "Scarcely" with "than" instead of "when".'
    }
  },

  // =========================================================================
  // 5. CLAUSE & PHRASE ANALYSIS
  // =========================================================================
  {
    id: 'clauses-sentence-types',
    moduleNumber: '05 · Clauses & Syntax',
    title: 'Independent vs Dependent Clauses (Noun/Adj/Adv) & Sentence Types',
    category: 'Clauses & Syntax',
    level: 'Intermediate',
    summary:
      'Analyze how finite verbs distinguish Clauses from Phrases, classify Noun, Adjective (Relative), and Adverbial subordinate clauses by functional tests, and transform sentences cleanly across Simple, Compound, and Complex architectures.',
    visualAssetKey: 'clauses-arch',
    visualCaption: 'Sentence Architecture: Independent Structural Pillars & Suspended Dependent Spans',
    animatedDiagramType: 'clauses-bridge',
    flowchartTitle: 'Clause Function & Sentence Synthesis Flowchart',
    flowchartSteps: [
      {
        step: '01',
        label: 'Phrase vs Clause Check',
        detail: 'Does the group of words contain its own Subject + Finite Verb? No = Phrase; Yes = Clause.',
        example: 'In the morning (Phrase) vs When the sun rose (Clause)'
      },
      {
        step: '02',
        label: 'Independent vs Dependent Test',
        detail: 'Can the clause stand alone as a full thought? Yes = Main/Independent; Starts with subordinator = Dependent.',
        example: '[The bell rang] (Indep) + [while we read] (Dep)'
      },
      {
        step: '03',
        label: 'Classify Dependent Type (What / Which / How)',
        detail: 'Replaces "something" = Noun Clause; modifies a noun = Adjective Clause; answers why/when/where/although = Adverb Clause.',
        example: 'What he said (Noun) · The book that inspired me (Adj)'
      },
      {
        step: '04',
        label: 'Identify & Synthesize Sentence Type',
        detail: 'Simple = 1 Indep (phrases only); Compound = 2+ Indep (FANBOYS); Complex = 1 Indep + 1+ Dep (Subordinator).',
        example: 'Despite rain, he came (Simple) -> Although it rained, he came (Complex).'
      }
    ],
    tables: [
      {
        title: 'Dependent (Subordinate) Clause Functional Matrix',
        caption: 'How to distinguish Noun, Adjective, and Adverb clauses even when introduced by "that" or "where".',
        headers: ['Subordinate Clause Type', 'Common Connectors', 'Functional Substitution Test', 'Exam Example (Clause Highlighted)'],
        rows: [
          ['Noun Clause', 'that, what, whatever, whether, who, why, how', 'Can be replaced cleanly by "IT" or "SOMETHING" (Subject/Object)', '"[That Shakespeare mastered psychology] is undeniable." (Subject)'],
          ['Adjective (Relative) Clause', 'who, whom, whose, which, that, where (preceded by place noun)', 'Immediately follows and modifies an antecedent NOUN', '"The university [where I studied linguistics] won a grant."'],
          ['Adverb Clause (Time/Reason/Cond/Concession)', 'when, while, because, since, if, unless, although, so that', 'Can move to sentence front; answers When/Why/Under what condition', '"[Although the meter was complex], she scanned it effortlessly."']
        ]
      },
      {
        title: 'Simple vs Compound vs Complex vs Compound-Complex Synthesis',
        caption: 'Structural blueprints and conversion connectors across sentence types.',
        headers: ['Sentence Type', 'Formula', 'Characteristic Connectors', 'Equivalent Transformation Example'],
        rows: [
          ['Simple Sentence', '1 Independent Clause (only 1 Finite Verb)', 'Prepositions / Participles: Inspite of, Despite, Owing to, Having+V3', 'Despite his severe illness, John Milton composed Paradise Lost.'],
          ['Compound Sentence', '2+ Independent Clauses (2+ Finite Verbs)', 'FANBOYS (for, and, nor, but, or, yet, so) + Semicolon (;)', 'John Milton suffered severe illness, yet he composed Paradise Lost.'],
          ['Complex Sentence', '1 Independent + 1+ Dependent Clauses', 'Subordinators: Although, Though, Because, Since, Who, Which, That', 'Although John Milton suffered severe illness, he composed Paradise Lost.'],
          ['Compound-Complex', '2+ Independent + 1+ Dependent Clauses', 'Subordinator + FANBOYS combined', 'Although it was late, he finished the ode, and his mentor praised it.']
        ]
      }
    ],
    keyRules: [
      {
        rule: 'Defining vs Non-Defining Adjective Clauses ("That" vs "Which")',
        explanation:
          'Restrictive (Defining) relative clauses identify WHICH noun is meant and take NO commas (use who/which/that). Non-restrictive (Non-Defining) clauses give extra parenthetical detail between commas — and MUST NOT use "that".',
        formula: 'No Commas: Noun + that/which... | Comma-enclosed Extra Info: Noun, which/who...,',
        correctExample: 'Lyrical Ballads, which appeared in 1798, inaugurated English Romanticism.',
        incorrectExample: 'Lyrical Ballads, that appeared in 1798, inaugurated English Romanticism.',
        commonPitfall: 'Dropping the closing comma on a mid-sentence non-defining relative clause.'
      },
      {
        rule: 'Comma Splice & Sentence Boundary Avoidance',
        explanation:
          'Two independent clauses cannot be joined by a comma alone (Comma Splice) or words like "however/therefore" with only a comma. Link independent clauses with ", + FANBOYS" OR a semicolon ";".',
        formula: 'Indep Clause + ; + however, + Indep Clause (NOT Clause 1, however, Clause 2)',
        correctExample: 'The draft had strong imagery; however, its syntax required polishing.',
        incorrectExample: 'The draft had strong imagery, however, its syntax required polishing.',
        commonPitfall: 'Treating conjunctive adverbs ("however", "moreover", "therefore") like FANBOYS coordinating conjunctions.'
      }
    ],
    quickCheck: {
      question: 'Classify the underlined clause and sentence type: "I clearly remember the quiet village where Tagore drafted these letters."',
      options: [
        'Noun Clause · Simple Sentence',
        'Adjective (Relative) Clause · Complex Sentence',
        'Adverb Clause of Place · Complex Sentence',
        'Coordinating Clause · Compound Sentence'
      ],
      correctIndex: 1,
      explanation:
        'Because "where Tagore drafted these letters" modifies the preceding noun "village" (telling WHICH village), it functions as an Adjective/Relative Clause inside a Complex Sentence.'
    }
  },

  // =========================================================================
  // 6. VOCABULARY BUILDING & WORD POWER
  // =========================================================================
  {
    id: 'vocabulary-word-power',
    moduleNumber: '06 · Word Power',
    title: 'Roots & Affixes, Homophones, Synonyms/Antonyms & Idioms',
    category: 'Word Power',
    level: 'Intermediate',
    summary:
      'Decode unfamiliar scholarly vocabulary rapidly through Latin/Greek roots (bene, mal, chron, anthrop), Prefixes/Suffixes, high-confusion Homophones & Homonyms (stationary/stationery, principal/principle), Academic Synonyms/Antonyms, One-Word Substitutions, and Exam Idioms.',
    visualAssetKey: 'parts-tree',
    visualCaption: 'Morphological Engineering: Prefixes, Classical Roots & Derivational Suffixes',
    animatedDiagramType: 'morphology-roots',
    flowchartTitle: 'Word Decoding & Lexical Differentiation Flow',
    flowchartSteps: [
      {
        step: '01',
        label: 'Isolate Classical Root',
        detail: 'Locate core Latin/Greek stem (bene = good, mal = bad, chron = time, anthrop = humankind, phil = love).',
        example: 'Philanthropist = Phil (love) + Anthrop (humankind)'
      },
      {
        step: '02',
        label: 'Inspect Prefix & Suffix',
        detail: 'Prefixes shift polarity/direction (un-, dis-, anti-, circum-); Suffixes lock Part of Speech (-tion Noun, -ous Adj, -ize Verb).',
        example: 'Mal + evolent (wishing ill) vs Bene + factor (doer of good)'
      },
      {
        step: '03',
        label: 'Resolve Homophone Spelling Clues',
        detail: 'Use mnemonic anchors to split identical-sounding pairs: Stationery (-e- = Envelopes), Stationary (-a- = At rest).',
        example: 'Principal = Main/Head (Pal) vs Principle = Rule (le)'
      },
      {
        step: '04',
        label: 'Apply Literary Substitutions & Idioms',
        detail: 'Compress verbose definitions into precision one-word nouns and recognize non-literal idiomatic expressions.',
        example: 'Ephemeral (short-lived) · Read between the lines (find hidden sense)'
      }
    ],
    tables: [
      {
        title: 'Essential Latin/Greek Roots, Prefixes & Suffixes',
        caption: 'High-leverage morphological stems recurring across NET Paper 1, MPESB, and TGT/PGT papers.',
        headers: ['Root / Affix', 'Classical Meaning', 'Derived Exam Vocabulary', 'Contextual Definition'],
        rows: [
          ['BENE / BON (Lat.)', 'Good, well', 'Benevolent, Benediction, Benefactor, Bona fide', 'Wishing good / Blessing / Good-faith genuine'],
          ['MAL (Lat.)', 'Bad, ill, evil', 'Malevolent, Malign, Malady, Malapropism', 'Spiteful / Defame / Illness / Humorous word misuse'],
          ['CHRON (Gk.)', 'Time', 'Chronology, Anachronism, Chronic, Synchronize', 'Time-order / Out-of-place time error / Persistent'],
          ['ANTHROP (Gk.)', 'Human, mankind', 'Philanthropy, Misanthrope, Anthropology', 'Love of humanity / Hater of mankind / Study of humans'],
          ['LOG / LOQU (Gk./Lat.)', 'Word, speech, reason', 'Soliloquy, Eloquent, Monologue, Neologism', 'Speaking thoughts aloud alone / Fluent / Newly coined word'],
          ['Prefixes / Suffixes', 'anti- (against), circum- (around) / -ic, -ous, -ity', 'Antithesis, Circumlocution, Loquacious, Veracity', 'Opposite contrast / Roundabout speech / Talkative / Truthfulness']
        ]
      },
      {
        title: 'Homophones, Academic Synonyms/Antonyms, One-Word & Idioms',
        caption: 'High-frequency exam pairs, lexical poles, and competitive substitutions.',
        headers: ['Category', 'Term / Pair', 'Precise Meaning / Distinction', 'Exam Illustration'],
        rows: [
          ['Homophone Pair 1', 'Stationary vs Stationery', 'Stationary = still/not moving; Stationery = writing paper/pens', 'The planet appeared stationary while we bought stationery.'],
          ['Homophone Pair 2', 'Principal vs Principle', 'Principal = college head/chief sum; Principle = moral/scientific rule', 'The Principal upheld the principle of academic honesty.'],
          ['Homophone Pair 3', 'Compliment vs Complement', 'Compliment = praise; Complement = completes/enhances a whole', 'I compliment her essay; syntax and diction complement each other.'],
          ['Homophone Pair 4', 'Affect (V) vs Effect (N/V)', 'Affect = influence (Verb); Effect = result (Noun) or bring about (Verb)', 'Heavy rain affected harvest; The new policy had a lasting effect.'],
          ['Academic Syn / Ant', 'Ephemeral | Ubiquitous | Lucid', 'Syn: Transient / Omnipresent / Clear · Ant: Eternal / Scarce / Obscure', 'Fame is ephemeral, yet classics achieve ubiquitous acclaim.'],
          ['One-Word Substitutions', 'Iconoclast · Polyglot · Omniscient · Stoic', 'Destroyer of traditions · Knows many languages · All-knowing narrator · Indifferent to pain', 'Third-person omniscient narration reveals every character\'s mind.'],
          ['Idioms & Phrases', 'Achilles\' heel · Bolt from the blue · Read between the lines', 'Fatal weak spot · Sudden unexpected shock · Grasp implied meaning', 'Weak time management proved to be his Achilles\' heel.']
        ]
      }
    ],
    keyRules: [
      {
        rule: 'Principal vs Principle & Affect vs Effect Contextual Locking',
        explanation:
          'Remember "PrinciPAL is your pal (a person/chief)" vs "PrinciPLE is a ruLE". For Affect/Effect: RAVEN mnemonic — Remember: Affect is Verb, Effect is Noun (except formal "effect a change" = cause to happen).',
        formula: 'Affect = Action (Verb) | Effect = End Result (Noun)',
        correctExample: 'Poor punctuation adversely affects clarity and diminishes the rhetorical effect.',
        incorrectExample: 'Poor punctuation adversely effects clarity and diminishes the rhetorical affect.',
        commonPitfall: 'Using "stationery" (with -e-) for a parked vehicle instead of "stationary" (with -a-).'
      },
      {
        rule: 'Anachronism & Malapropism (Literature-Linked Vocabulary)',
        explanation:
          'Exam papers frequently pair Greek/Latin roots with literary terms: Anachronism (ana = against + chronos = time, e.g., a striking clock in Julius Caesar) and Malapropism (mal = bad + propos = appropriate, humorous misuse of a similar-sounding word).',
        formula: 'Chron (Time) + Ana (Back/Against) = Chronological Error',
        correctExample: 'Referring to smartphones in a Victorian novel is a glaring anachronism.',
        incorrectExample: 'Referring to smartphones in a Victorian novel is an accurate chronology.',
        commonPitfall: 'Confusing "Misanthrope" (hater of mankind) with "Misogynist" (hater of women) or "Ascetic" (self-denying).'
      }
    ],
    quickCheck: {
      question: 'Select the sentence that uses Homophones and Classical Roots accurately:',
      options: [
        'The school Principle ordered fresh stationary for the examination board.',
        'Her speech was an extraordinary example of circumlocution, direct and brief.',
        'Though fame is ephemeral, the philanthropist\'s benevolence left an enduring effect.',
        'The new syllabus had a positive affect on everyone\'s writing style.'
      ],
      correctIndex: 2,
      explanation:
        'Option C accurately uses "ephemeral" (short-lived), "philanthropist" (lover of humankind), "benevolence" (well-wishing kindness), and noun "effect". Option A swaps Principal/Principle and Stationery/Stationary; B contradicts "circumlocution" (wordiness); D uses "affect" as a noun.'
    }
  },

  // =========================================================================
  // 7. ADVANCED APPLIED GRAMMAR & STYLISTICS (FOR TET & LITERATURE)
  // =========================================================================
  {
    id: 'figures-of-speech',
    moduleNumber: '07 · Stylistics A',
    title: 'Figures of Speech: All 12 Rhetorical & Poetic Devices',
    category: 'Stylistics & Errors',
    level: 'Competitive / NET & TET',
    summary:
      'Complete analytical taxonomy of all 12 core Figures of Speech tested in NTA NET, MPSET, and MPESB Grade 1/2: Simile, Metaphor, Personification, Oxymoron, Hyperbole, Irony, Alliteration, Onomatopoeia, Synecdoche, Metonymy, Apostrophe, and Pun.',
    visualAssetKey: 'stylistics-prosody',
    visualCaption: 'Figurative Poetics: Comparison Tropes, Sound Devices & Associative Shifts',
    animatedDiagramType: 'figures-of-speech',
    flowchartTitle: 'Rapid Figure-of-Speech Diagnostic Flowchart',
    flowchartSteps: [
      {
        step: '01',
        label: 'Check Explicit vs Implied Comparison',
        detail: 'Words "like/as/so" linking two unlike things = Simile. Direct identity (A IS B) = Metaphor. Human traits given to inanimate = Personification.',
        example: 'Red like a rose (Simile) vs All the world\'s a stage (Metaphor)'
      },
      {
        step: '02',
        label: 'Inspect Contradiction & Exaggeration',
        detail: 'Two adjacent opposite words = Oxymoron. Vast overstatement = Hyperbole. Double-layered opposite truth = Irony.',
        example: 'Loving hate (Oxymoron) · Ten thousand at a glance (Hyperbole)'
      },
      {
        step: '03',
        label: 'Distinguish Part-Whole vs Association',
        detail: 'Physical PART stands for WHOLE (or vice versa) = Synecdoche. Closely ASSOCIATED object/attribute substitutes = Metonymy.',
        example: 'All hands on deck (Synecdoche) · The pen > the sword (Metonymy)'
      },
      {
        step: '04',
        label: 'Test Sound, Address & Wordplay',
        detail: 'Initial consonant repetition = Alliteration; Echoed sound word = Onomatopoeia; Addressing absent/dead = Apostrophe; Double meaning = Pun.',
        example: 'O Wild West Wind! (Apostrophe) · Murmuring of innumerable bees'
      }
    ],
    tables: [
      {
        title: 'All 12 Figures of Speech Master Matrix',
        caption: 'Exact definitions, canonical literary illustrations, and NET/MPESB exam differentiation clues.',
        headers: ['# & Device', 'Mechanism', 'Canonical Literary Example', 'Exam Distinction Cue'],
        rows: [
          ['01. Simile', 'Explicit comparison using "like", "as", "so"', '"My love is like a red, red rose." (Robert Burns)', 'Must compare two UNLIKE things; "He is like his brother" is NOT simile.'],
          ['02. Metaphor', 'Implicit comparison equating A directly to B', '"All the world\'s a stage, and all the men and women merely players."', 'No "like/as"; states X is Y directly.'],
          ['03. Personification', 'Endows inanimate objects/abstract ideas with human traits', '"Death lays his icy hand on kings." (James Shirley)', 'Look for capitalized abstractions performing human verbs.'],
          ['04. Oxymoron', 'Places two contradictory words side by side', '"O heavy lightness! serious vanity! ... Feather of lead." (Shakespeare)', 'Narrower than Paradox (which is a full contradictory statement).'],
          ['05. Hyperbole', 'Intentional extreme exaggeration for emotional effect', '"Ten thousand saw I at a glance." (Wordsworth, Daffodils)', 'Not meant literally; used for emphasis or humor.'],
          ['06. Irony', 'Gap between literal words/expectation and reality (Verbal/Dramatic/Situational)', '"Brutus is an honourable man." (Mark Antony, Julius Caesar)', 'Contrast Dramatic (audience knows) vs Verbal (sarcasm/opposite).'],
          ['07. Alliteration', 'Repetition of initial consonant sounds in nearby words', '"The fair breeze blew, the white foam flew, the furrow followed free."', 'Based on SOUND not spelling ("city/cat" is NOT alliteration).'],
          ['08. Onomatopoeia', 'Words whose spoken sound imitates the real acoustic noise', '"The moan of doves in immemorial elms / And murmuring of innumerable bees."', 'Buzz, hiss, clang, whisper, murmur, splash.'],
          ['09. Synecdoche', 'A physical part represents the whole (or whole represents part)', '"Give us this day our daily bread" / "Twenty sails entered the port."', 'Part IS physically inside the whole (wheels = car, hands = sailors).'],
          ['10. Metonymy', 'Substitutes an intimately associated attribute or symbol', '"The pen is mightier than the sword." / "The Crown announced reforms."', 'Crown is NOT physically part of the King; it symbolizes royalty.'],
          ['11. Apostrophe', 'Direct address to an absent, dead, or personified entity', '"O Captain! my Captain!" / "Milton! thou shouldst be living at this hour."', 'Distinct from Personification because the speaker actively TALKS TO it.'],
          ['12. Pun (Paronomasia)', 'Play on multiple meanings or homophonic sounds of a word', '"Ask for me tomorrow, and you shall find me a grave man." (Mercutio)', '"Grave" = serious OR buried in a tomb.']
        ]
      }
    ],
    keyRules: [
      {
        rule: 'Synecdoche vs Metonymy — The Physical Inclusion Test',
        explanation:
          'Students frequently confuse these two substitution tropes. Ask: Is the substitute word physically a PART of the target thing? If yes ("roof" for house, "gray hairs" for old age, "sail" for ship), it is SYNECDOCHE. If it is only conceptually ASSOCIATED ("White House" for US Presidency, "Bench" for Judges, "Laurel" for Victory), it is METONYMY.',
        formula: 'Physical Part <-> Whole = Synecdoche  |  Associated Attribute / Emblem = Metonymy',
        correctExample: '"All hands on deck" (hands are physically part of sailors -> Synecdoche) vs "He is addicted to the bottle" (bottle holds wine -> Metonymy).',
        incorrectExample: 'Labeling "The Crown" as Synecdoche (a crown is worn, not a biological body part of the monarch).',
        commonPitfall: 'Treating all figurative substitutions as Metaphor instead of noticing part-whole or emblem associations.'
      },
      {
        rule: 'Personification vs Apostrophe & Oxymoron vs Antithesis',
        explanation:
          'Personification gives human life to non-human entities in third person ("Opportunity knocks once"). Apostrophe directly addresses the non-human or absent entity in second person ("O Wild West Wind!"). Meanwhile, Oxymoron locks two opposing words together ("open secret"), whereas Antithesis balances two contrasting clauses ("Man proposes, God disposes").',
        formula: '2 Opposing Adjacent Words = Oxymoron | 2 Contrasting Balanced Clauses = Antithesis',
        correctExample: '"O Solitude! where are the charms that sages have seen in thy face?" (Apostrophe + Personification).',
        incorrectExample: 'Confusing a balanced antithesis like "To err is human, to forgive divine" with an oxymoron.',
        commonPitfall: 'Forgetting that "You/Thou/O..." direct vocal address is the unmistakable signature of Apostrophe.'
      }
    ],
    quickCheck: {
      question: 'Identify the two figures of speech in: "Ask for me tomorrow, and you shall find me a grave man" and "The White House issued a statement":',
      options: [
        'Oxymoron and Synecdoche',
        'Pun and Metonymy',
        'Simile and Apostrophe',
        'Onomatopoeia and Irony'
      ],
      correctIndex: 1,
      explanation:
        'Shakespeare\'s Mercutio puns on "grave" (serious vs dead in a grave), while "The White House" substitutes an associated building for the administration — classic Metonymy.'
    }
  },
  {
    id: 'prosody-scansion-common-errors',
    moduleNumber: '07 · Stylistics & Errors',
    title: 'Prosody (Metrical Feet), Sonnets & Spotting Common Errors',
    category: 'Stylistics & Errors',
    level: 'Competitive / NET & TET',
    summary:
      'Master poetic scansion across the 5 classical Metrical Feet (Iambic, Trochaic, Anapestic, Dactylic, Spondaic), Shakespearean vs. Petrarchan Sonnet architectures, and systematic elimination of Redundancies, Dangling Modifiers, Misplaced Modifiers, and Faulty Parallelism.',
    visualAssetKey: 'stylistics-prosody',
    visualCaption: 'Classical Prosody Scansion Waves, Sonnet Volta Blueprint & Syntactic Error Correction',
    animatedDiagramType: 'prosody-scansion',
    flowchartTitle: 'Poetic Scansion & Sentence Error Spotting Workflow',
    flowchartSteps: [
      {
        step: '01',
        label: 'Mark Unstressed (u) & Stressed (/) Syllables',
        detail: 'Speak the line aloud to feel natural rising (da-DUM = Iambic) vs falling (DUM-da = Trochaic) beats.',
        example: 'Shall I / com-PARE / thee TO / a SUM- / mer\'s DAY?'
      },
      {
        step: '02',
        label: 'Divide Feet & Count Meter',
        detail: 'Rising 2-syllable = Iamb (u /); Falling 2 = Trochee (/ u); Rising 3 = Anapest (u u /); Falling 3 = Dactyl (/ u u); Twin heavy = Spondee (/ /).',
        example: '5 Feet = Pentameter | 6 Feet = Hexameter (Alexandrine)'
      },
      {
        step: '03',
        label: 'Map Sonnet Stanzas & Volta',
        detail: 'Shakespearean (4+4+4+2: ABAB CDCD EFEF GG, Volta at Line 13/9); Petrarchan (8+6: ABBAABBA CDECDE, Volta at Line 9).',
        example: 'Octave poses the problem; Sestet resolves after Volta.'
      },
      {
        step: '04',
        label: 'Audit Clauses for 4 Fatal Errors',
        detail: 'Scan for Tautology/Redundancy ("return back"), Dangling Modifiers, Misplaced Modifiers ("only"), and Broken Parallelism.',
        example: 'Reading, writing, and TO speak -> Reading, writing, and SPEAKING.'
      }
    ],
    tables: [
      {
        title: 'Prosody: The 5 Core Metrical Feet & Line Length Nomenclature',
        caption: 'Syllable stress notation: u = unstressed (breve), / = stressed (ictus).',
        headers: ['Metrical Foot', 'Stress Pattern', 'Rhythm Feel & Mnemonic', 'Canonical Poetic Example'],
        rows: [
          ['Iamb (Iambic)', 'u / (da-DUM)', 'Rising duple heartbeat; most natural to English blank verse', '"The CUR-few TOLLS the KNELL of PAR-ting DAY" (Gray)'],
          ['Trochee (Trochaic)', '/ u (DUM-da)', 'Falling forceful chant; common in incantations & trochaic tetrameter', '"TY-ger TY-ger, BURN-ing BRIGHT" (Blake)'],
          ['Anapest (Anapestic)', 'u u / (da-da-DUM)', 'Galloping triple rising rhythm (used in light/narrative verse)', '"The As-SYR-ian came DOWN like a WOLF on the FOLD" (Byron)'],
          ['Dactyl (Dactylic)', '/ u u (DUM-da-da)', 'Waltz-like triple falling cadence (classical epic / Evangeline)', '"CAN-non to RIGHT of them, / CAN-non to LEFT of them" (Tennyson)'],
          ['Spondee (Spondaic)', '/ / (DUM-DUM)', 'Two consecutive heavy stresses for slow gravity/emphasis', '"ROCKS, CAVES, LAKES, FENS, BOGS, DENS, and SHADES of DEATH" (Milton)']
        ]
      },
      {
        title: 'Sonnet Structures & Common Error Spotting Checklist',
        caption: 'Side-by-side sonnet stanza geometry and error-correction patterns.',
        headers: ['Domain / Pattern', 'Structural / Incorrect Version', 'Resolution / Corrected Version', 'Exam Key Point'],
        rows: [
          ['Petrarchan (Italian) Sonnet', 'Octave (8 lines: ABBAABBA) + Sestet (6 lines: CDECDE / CDCDCD)', 'Volta (thematic turn) occurs strictly at Line 9', 'Introduced to England by Sir Thomas Wyatt; used by Milton & Wordsworth.'],
          ['Shakespearean (English) Sonnet', '3 Quatrains (ABAB CDCD EFEF) + 1 Heroic Couplet (GG)', 'Argument develops across 3 quatrains; epigrammatic twist at Couplet (L13–14)', '14 lines of unrhymed or rhymed Iambic Pentameter (10 syllables/line).'],
          ['Redundancy / Tautology', 'Err: "return back", "revert back", "repeat again", "final conclusion", "cousin brother"', 'Fix: "return", "revert", "repeat", "conclusion", "cousin"', 'Never attach directional "back/again" to words already containing re-.'],
          ['Dangling Modifier', 'Err: "Entering the auditorium, the fresco caught her eye."', 'Fix: "Entering the auditorium, SHE noticed the fresco."', 'Opening participle phrase MUST modify the immediate subject after comma.'],
          ['Misplaced Modifier', 'Err: "The critic only praised two poems in the entire collection."', 'Fix: "The critic praised ONLY two poems in the entire collection."', 'Place limiting modifiers ("only, nearly, just") directly before the word modified.'],
          ['Faulty Parallelism', 'Err: "The syllabus demands critical reading, clarity in writing, and to speak fluently."', 'Fix: "...demands reading critically, writing clearly, and speaking fluently."', 'Items in lists or paired correlatives must share identical grammatical forms.']
        ]
      }
    ],
    keyRules: [
      {
        rule: 'Eliminating High-Frequency Exam Redundancies (Tautology)',
        explanation:
          'English exam error-spotting sections routinely embed semantic repetition: return/revert/retreat + back, repeat + again, mutual + cooperation/agreement, true + facts, past + history, free + gift, and consensus + of opinion.',
        formula: 'Remove duplicate modifier ("return", NOT "return back"; "consensus", NOT "consensus of opinion")',
        correctExample: 'After reviewing the final draft, the committee reached a consensus on the rubric.',
        incorrectExample: 'After reviewing the final draft, the committee reached a mutual consensus of opinion on the rubric.',
        commonPitfall: 'Also avoid "Suppose if", "equally as good as", and "reason why...is because" (use "reason...is THAT").'
      },
      {
        rule: 'Modifier Alignment & Faulty Parallelism Test',
        explanation:
          'Every series linked by "and / or" or "not only...but also" must align Noun with Noun, Gerund with Gerund, or Infinitive with Infinitive. Furthermore, a Misplaced Modifier like "only" shifts sentence meaning entirely based on its position.',
        formula: 'Infinitive || Infinitive  |  Gerund || Gerund  |  [Modifier] -> Target Word',
        correctExample: 'Her critical monograph is valued not only for its archival rigor but also for its lucid prose.',
        incorrectExample: 'Her critical monograph is valued not only for its archival rigor but also because the prose is lucid.',
        commonPitfall: 'Writing "She nearly spent Rs. 7,000" (didn\'t spend it!) instead of "She spent nearly Rs. 7,000".'
      }
    ],
    quickCheck: {
      question: 'Spot the option that demonstrates BOTH accurate scansion knowledge and error-free parallelism:',
      options: [
        'A Shakespearean sonnet shifts at the octave, demanding concise diction, rhythm, and to rhyme accurately.',
        'The meter "u /" is Trochaic, and the committee repeated the announcement again.',
        'Iambic pentameter consists of five rising "u /" feet, balancing clarity of thought, grace of expression, and precision of meter.',
        'Entering the sonnet, the volta surprised every reader by reverting back to love.'
      ],
      correctIndex: 2,
      explanation:
        'Option C accurately defines Iambic Pentameter (5 feet of unstressed-stressed "u /") and executes flawless parallel noun-of-noun phrasing ("clarity of thought, grace of expression, and precision of meter").'
    }
  }
];
