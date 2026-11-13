import { IdiomChallenge, SyntaxPuzzle } from '../types';

export const IDIOM_CHALLENGES: IdiomChallenge[] = [
  {
    id: 'idiom-1',
    idiom: 'Bite the bullet',
    meaning: 'To face an inevitable grim situation with courage and fortitude rather than delay.',
    origin: 'Historical battlefield medicine: wounded soldiers before anesthesia bit on lead bullets to endure amputations without screaming.',
    incompleteSentence: 'Knowing the comprehensive NTA NET syllabus was daunting, she decided to _____ and study 8 hours daily.',
    blankWord: 'bite the bullet',
    distractors: ['spill the beans', 'break the ice', 'burn the candle'],
    contextHint: 'Think of military discipline and confronting pain without flinching.'
  },
  {
    id: 'idiom-2',
    idiom: 'Burn the midnight oil',
    meaning: 'To work or study late into the night.',
    origin: 'Dating back to the 17th century when students and scholars studied past sunset by oil lamps.',
    incompleteSentence: 'With the MPESB Grade 1 Teacher selection test scheduled next month, all candidates were _____.',
    blankWord: 'burning the midnight oil',
    distractors: ['barking up the wrong tree', 'beating around the bush', 'skating on thin ice'],
    contextHint: 'Lighting the lamp long after dark to finish revision.'
  },
  {
    id: 'idiom-3',
    idiom: 'Achilles\' heel',
    meaning: 'A single, vulnerable, or fatal weakness in an otherwise strong entity.',
    origin: 'Greek mythology: Thetis held infant Achilles by his heel when dipping him in the River Styx, leaving that spot mortal.',
    incompleteSentence: 'While his grasp of British poetry was unmatched, literary theory remained his _____.',
    blankWord: 'Achilles\' heel',
    distractors: ['Trojan horse', 'Pandora\'s box', 'Gordian knot'],
    contextHint: 'A mythic weakness that brought down a nearly invincible hero.'
  },
  {
    id: 'idiom-4',
    idiom: 'Cut the Gordian knot',
    meaning: 'To resolve a seemingly intractable, complex dilemma by a bold and decisive stroke.',
    origin: 'Alexander the Great in 333 BC was challenged to untie an intricately tangled knot at Gordium; he simply sliced through it with his sword.',
    incompleteSentence: 'Instead of prolonged academic debate over syllabus ambiguity, the commission decided to _____.',
    blankWord: 'cut the Gordian knot',
    distractors: ['cross the Rubicon', 'tilt at windmills', 'leave no stone unturned'],
    contextHint: 'A decisive sword slash through endless complications.'
  },
  {
    id: 'idiom-5',
    idiom: 'Cross the Rubicon',
    meaning: 'To take an irrevocable, decisive step with no turning back.',
    origin: 'Julius Caesar crossed the river Rubicon in 49 BC with his army, committing himself to civil war against the Roman Senate.',
    incompleteSentence: 'Once she submitted her doctoral thesis on Derridean deconstruction, she knew she had _____.',
    blankWord: 'crossed the Rubicon',
    distractors: ['fallen on her sword', 'feathered her nest', 'jumped on the bandwagon'],
    contextHint: 'Crossing a forbidden boundary that seals one\'s fate.'
  }
];

export const SYNTAX_PUZZLES: SyntaxPuzzle[] = [
  {
    id: 'syntax-1',
    level: 1,
    instruction: 'Arrange the tokens in the correct English syntactic order (Subject + Verb + Object + Prepositional Modifier):',
    targetSentence: 'The diligent scholar published an insightful critique in the academic journal.',
    scrambledTokens: [
      { id: 't1', text: 'published', role: 'Verb' },
      { id: 't2', text: 'The diligent scholar', role: 'Subject' },
      { id: 't3', text: 'in the academic journal', role: 'Modifier' },
      { id: 't4', text: 'an insightful critique', role: 'Object' },
    ],
    syntaxNote: 'Standard English declarative syntax follows S-V-O-M (Subject + Transitive Verb + Direct Object + Prepositional Phrase of Location).'
  },
  {
    id: 'syntax-2',
    level: 2,
    instruction: 'Construct the inverted conditional sentence without "If" (Inversion + Subject + Verb + Consequence):',
    targetSentence: 'Had the candidate analyzed the previous year papers, she would have anticipated the difficult questions.',
    scrambledTokens: [
      { id: 't5', text: 'the candidate analyzed', role: 'Subject' },
      { id: 't6', text: 'Had', role: 'Verb' },
      { id: 't7', text: 'she would have anticipated', role: 'Conjunction' },
      { id: 't8', text: 'the previous year papers,', role: 'Object' },
      { id: 't9', text: 'the difficult questions.', role: 'Modifier' },
    ],
    syntaxNote: 'Inverted conditional: Auxiliary "Had" fronts the clause, followed by the subject, past participle, and consequence clause.'
  },
  {
    id: 'syntax-3',
    level: 3,
    instruction: 'Construct the complex sentence with a restrictive relative clause modifying the antecedent:',
    targetSentence: 'The theories which Roland Barthes articulated transformed modern literary analysis.',
    scrambledTokens: [
      { id: 't10', text: 'transformed', role: 'Verb' },
      { id: 't11', text: 'which Roland Barthes articulated', role: 'Modifier' },
      { id: 't12', text: 'The theories', role: 'Subject' },
      { id: 't13', text: 'modern literary analysis.', role: 'Object' },
    ],
    syntaxNote: 'Relative clause "which Roland Barthes articulated" immediately follows its antecedent noun "The theories".'
  }
];
