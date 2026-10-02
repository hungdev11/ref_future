import { PYTHAGOREAN_MAP, STANDARD_VOWELS } from './constants.js';

export interface ClassifiedLetter {
  char: string;
  value: number;
  isVowel: boolean;
}

export function normalizeVietnameseName(rawName: string): string {
  if (!rawName) return '';

  let name = rawName.trim().toUpperCase();

  // Replace Vietnamese Đ / đ with D
  name = name.replace(/Đ/g, 'D');

  // Decompose accented characters and strip diacritical marks
  name = name.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  // Keep only Latin letters A-Z and spaces
  name = name.replace(/[^A-Z\s]/g, ' ');

  // Collapse multiple whitespace
  name = name.replace(/\s+/g, ' ').trim();

  return name;
}

export function classifyWordLetters(word: string): ClassifiedLetter[] {
  const letters: ClassifiedLetter[] = [];
  const chars = word.split('');

  const hasStandardVowel = chars.some((c) => STANDARD_VOWELS.has(c));

  for (let i = 0; i < chars.length; i++) {
    const char = chars[i]!;
    const val = PYTHAGOREAN_MAP[char] ?? 0;

    let isVowel = false;

    if (STANDARD_VOWELS.has(char)) {
      isVowel = true;
    } else if (char === 'Y') {
      // Rule 1: Sole vowel in word (e.g. "MY", "LY", "THY", "Y")
      if (!hasStandardVowel) {
        isVowel = true;
      }
      // Rule 2: Preceded by a vowel in diphthong (e.g. "NGUYEN", "THUY")
      else if (i > 0 && STANDARD_VOWELS.has(chars[i - 1]!)) {
        isVowel = true;
      }
      // Rule 3: Leading letter followed by another vowel (e.g. "YEN") -> Consonant
      else if (i === 0 && i + 1 < chars.length && STANDARD_VOWELS.has(chars[i + 1]!)) {
        isVowel = false;
      }
      // Default: If between two consonants (e.g. "LYNN"), functions as vowel
      else if (
        i > 0 &&
        i + 1 < chars.length &&
        !STANDARD_VOWELS.has(chars[i - 1]!) &&
        !STANDARD_VOWELS.has(chars[i + 1]!)
      ) {
        isVowel = true;
      } else {
        isVowel = false;
      }
    }

    letters.push({
      char,
      value: val,
      isVowel,
    });
  }

  return letters;
}

export function classifyNameLetters(normalizedName: string): ClassifiedLetter[] {
  const words = normalizedName.split(' ').filter(Boolean);
  const result: ClassifiedLetter[] = [];

  for (const word of words) {
    result.push(...classifyWordLetters(word));
  }

  return result;
}
