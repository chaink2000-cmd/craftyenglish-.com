export interface ReadabilityMetrics {
  wordCount: number;
  characterCount: number;
  sentenceCount: number;
  syllableCount: number;
  fleschReadingEase: number;
  fleschKincaidGrade: number;
  estimatedReadingTimeMinutes: number;
  passiveVoiceInstances: { sentence: string; index: number }[];
  complexityLevel: string;
}

function countSyllables(word: string): number {
  word = word.toLowerCase().trim();
  if (word.length <= 3) return 1;
  word = word.replace(/(?:[^laeiouy]|ed|es|e)$/, '');
  word = word.replace(/^y/, '');
  const matches = word.match(/[aeiouy]{1,2}/g);
  return matches ? matches.length : 1;
}

export function analyzeReadability(text: string): ReadabilityMetrics {
  const trimmed = text.trim();
  if (!trimmed) {
    return {
      wordCount: 0,
      characterCount: 0,
      sentenceCount: 0,
      syllableCount: 0,
      fleschReadingEase: 100,
      fleschKincaidGrade: 0,
      estimatedReadingTimeMinutes: 0,
      passiveVoiceInstances: [],
      complexityLevel: 'N/A',
    };
  }

  const words = trimmed.match(/\b[A-Za-z0-9'-]+\b/g) || [];
  const wordCount = words.length;
  const characterCount = trimmed.length;

  // Split into sentences (by . ! ?)
  const rawSentences = trimmed.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const sentenceCount = Math.max(1, rawSentences.length);

  // Total syllables
  let syllableCount = 0;
  for (const w of words) {
    syllableCount += countSyllables(w);
  }

  // Flesch Reading Ease formula:
  // 206.835 - 1.015 * (total words / total sentences) - 84.6 * (total syllables / total words)
  const wordsPerSentence = wordCount / sentenceCount;
  const syllablesPerWord = wordCount > 0 ? syllableCount / wordCount : 0;

  let fleschReadingEase = 206.835 - (1.015 * wordsPerSentence) - (84.6 * syllablesPerWord);
  fleschReadingEase = Math.max(0, Math.min(100, Math.round(fleschReadingEase * 10) / 10));

  // Flesch-Kincaid Grade Level formula:
  // 0.39 * (total words / total sentences) + 11.8 * (total syllables / total words) - 15.59
  let fleschKincaidGrade = (0.39 * wordsPerSentence) + (11.8 * syllablesPerWord) - 15.59;
  fleschKincaidGrade = Math.max(1, Math.round(fleschKincaidGrade * 10) / 10);

  // Reading time (average 200 words per minute)
  const estimatedReadingTimeMinutes = Math.max(0.5, Math.round((wordCount / 200) * 10) / 10);

  // Detect passive voice (auxiliary 'to be' + past participle ending in 'ed' or common irregular forms)
  const passiveVoiceInstances: { sentence: string; index: number }[] = [];
  const passiveRegex = /\b(am|is|are|was|were|be|been|being)\s+([a-z]+ed|written|spoken|given|taken|seen|done|known|found|built|made|chosen|broken|drawn|sung|eaten)\b/i;

  rawSentences.forEach((s, idx) => {
    if (passiveRegex.test(s)) {
      passiveVoiceInstances.push({
        sentence: s.trim(),
        index: idx,
      });
    }
  });

  let complexityLevel = 'Standard (Grade 7-8)';
  if (fleschReadingEase >= 80) complexityLevel = 'Conversational & Easy (Grade 5-6)';
  else if (fleschReadingEase >= 60) complexityLevel = 'Standard & Balanced (Grade 7-9)';
  else if (fleschReadingEase >= 40) complexityLevel = 'Scholarly & Advanced (College Level)';
  else complexityLevel = 'Academic & NET Critical Literature (Post-Graduate)';

  return {
    wordCount,
    characterCount,
    sentenceCount,
    syllableCount,
    fleschReadingEase,
    fleschKincaidGrade,
    estimatedReadingTimeMinutes,
    passiveVoiceInstances,
    complexityLevel,
  };
}
