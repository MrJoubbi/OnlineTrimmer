export type SupportedLanguage =
  | 'en' // 1. English
  | 'zh' // 2. Chinese (Simplified)
  | 'zh-TW' // 2. Chinese (Traditional / variants)
  | 'es' // 3. Spanish
  | 'ar' // 4. Arabic
  | 'hi' // 5. Hindi
  | 'id' // 6. Indonesian
  | 'ms' // 6. Malay
  | 'pt' // 7. Portuguese
  | 'fr' // 8. French
  | 'ja' // 9. Japanese
  | 'ru' // 10. Russian
  | 'de' // 11. German
  | 'bn' // 12. Bengali
  | 'ur' // 13. Urdu
  | 'vi' // 14. Vietnamese
  | 'ko' // 15. Korean
  | 'tr' // 16. Turkish
  | 'it' // 17. Italian
  | 'fa' // 18. Persian (Farsi)
  | 'th' // 19. Thai
  | 'pa' // 20. Punjabi
  | 'tl' // 21. Tagalog / Filipino
  | 'sw' // 22. Swahili
  | 'mr' // 23. Marathi
  | 'te' // 24. Telugu
  | 'ta' // 25. Tamil
  | 'uk' // 26. Ukrainian
  | 'pl' // 27. Polish
  | 'nl' // 28. Dutch
  | 'gu' // 29. Gujarati
  | 'kn' // 30. Kannada
  | 'ml' // 31. Malayalam
  | 'jv' // 32. Javanese
  | 'my' // 33. Burmese
  | 'ro' // 34. Romanian
  | 'el' // 35. Greek
  | 'he' // 36. Hebrew
  | 'hu' // 37. Hungarian
  | 'cs' // 38. Czech
  | 'sv' // 39. Swedish
  | 'am' // 40. Amharic
  | 'so' // 41. Somali
  | 'ne' // 42. Nepali
  | 'si' // 43. Sinhala
  | 'km' // 44. Khmer
  | 'sr' // 45. Serbian
  | 'bg' // 46. Bulgarian
  | 'fi' // 47. Finnish
  | 'da' // 48. Danish
  | 'sk' // 49. Slovak
  | 'az' // 50. Azerbaijani
  | 'no'
  | 'hr'
  | 'lt'
  | 'sl'
  | 'lv'
  | 'et';

export interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
  dir: 'ltr' | 'rtl';
  popular?: boolean;
  rank?: number;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  // 1. English
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸', dir: 'ltr', popular: true, rank: 1 },
  // 2. Chinese (Mandarin + variants)
  { code: 'zh', name: 'Chinese (Simplified)', nativeName: '简体中文', flag: '🇨🇳', dir: 'ltr', popular: true, rank: 2 },
  { code: 'zh-TW', name: 'Chinese (Traditional)', nativeName: '繁體中文', flag: '🇹🇼', dir: 'ltr', rank: 2 },
  // 3. Spanish
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', dir: 'ltr', popular: true, rank: 3 },
  // 4. Arabic
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', dir: 'rtl', popular: true, rank: 4 },
  // 5. Hindi
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', dir: 'ltr', popular: true, rank: 5 },
  // 6. Indonesian/Malay
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', flag: '🇮🇩', dir: 'ltr', popular: true, rank: 6 },
  { code: 'ms', name: 'Malay', nativeName: 'Bahasa Melayu', flag: '🇲🇾', dir: 'ltr', rank: 6 },
  // 7. Portuguese
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇧🇷', dir: 'ltr', popular: true, rank: 7 },
  // 8. French
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', dir: 'ltr', popular: true, rank: 8 },
  // 9. Japanese
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', dir: 'ltr', popular: true, rank: 9 },
  // 10. Russian
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺', dir: 'ltr', popular: true, rank: 10 },
  // 11. German
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', dir: 'ltr', popular: true, rank: 11 },
  // 12. Bengali
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇧🇩', dir: 'ltr', rank: 12 },
  // 13. Urdu
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', flag: '🇵🇰', dir: 'rtl', rank: 13 },
  // 14. Vietnamese
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: '🇻🇳', dir: 'ltr', rank: 14 },
  // 15. Korean
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷', dir: 'ltr', rank: 15 },
  // 16. Turkish
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷', dir: 'ltr', rank: 16 },
  // 17. Italian
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹', dir: 'ltr', rank: 17 },
  // 18. Persian (Farsi)
  { code: 'fa', name: 'Persian (Farsi)', nativeName: 'فارسی', flag: '🇮🇷', dir: 'rtl', rank: 18 },
  // 19. Thai
  { code: 'th', name: 'Thai', nativeName: 'ไทย', flag: '🇹🇭', dir: 'ltr', rank: 19 },
  // 20. Punjabi
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳', dir: 'ltr', rank: 20 },
  // 21. Tagalog/Filipino
  { code: 'tl', name: 'Tagalog / Filipino', nativeName: 'Tagalog', flag: '🇵🇭', dir: 'ltr', rank: 21 },
  // 22. Swahili
  { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili', flag: '🇰🇪', dir: 'ltr', rank: 22 },
  // 23. Marathi
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳', dir: 'ltr', rank: 23 },
  // 24. Telugu
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳', dir: 'ltr', rank: 24 },
  // 25. Tamil
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳', dir: 'ltr', rank: 25 },
  // 26. Ukrainian
  { code: 'uk', name: 'Ukrainian', nativeName: 'Українська', flag: '🇺🇦', dir: 'ltr', rank: 26 },
  // 27. Polish
  { code: 'pl', name: 'Polish', nativeName: 'Polski', flag: '🇵🇱', dir: 'ltr', rank: 27 },
  // 28. Dutch
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', flag: '🇳🇱', dir: 'ltr', rank: 28 },
  // 29. Gujarati
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳', dir: 'ltr', rank: 29 },
  // 30. Kannada
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳', dir: 'ltr', rank: 30 },
  // 31. Malayalam
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', flag: '🇮🇳', dir: 'ltr', rank: 31 },
  // 32. Javanese
  { code: 'jv', name: 'Javanese', nativeName: 'Basa Jawa', flag: '🇮🇩', dir: 'ltr', rank: 32 },
  // 33. Burmese
  { code: 'my', name: 'Burmese', nativeName: 'မြန်မာစာ', flag: '🇲🇲', dir: 'ltr', rank: 33 },
  // 34. Romanian
  { code: 'ro', name: 'Romanian', nativeName: 'Română', flag: '🇷🇴', dir: 'ltr', rank: 34 },
  // 35. Greek
  { code: 'el', name: 'Greek', nativeName: 'Ελληνικά', flag: '🇬🇷', dir: 'ltr', rank: 35 },
  // 36. Hebrew
  { code: 'he', name: 'Hebrew', nativeName: 'עברית', flag: '🇮🇱', dir: 'rtl', rank: 36 },
  // 37. Hungarian
  { code: 'hu', name: 'Hungarian', nativeName: 'Magyar', flag: '🇭🇺', dir: 'ltr', rank: 37 },
  // 38. Czech
  { code: 'cs', name: 'Czech', nativeName: 'Čeština', flag: '🇨🇿', dir: 'ltr', rank: 38 },
  // 39. Swedish
  { code: 'sv', name: 'Swedish', nativeName: 'Svenska', flag: '🇸🇪', dir: 'ltr', rank: 39 },
  // 40. Amharic
  { code: 'am', name: 'Amharic', nativeName: 'አማርኛ', flag: '🇪🇹', dir: 'ltr', rank: 40 },
  // 41. Somali
  { code: 'so', name: 'Somali', nativeName: 'Soomaali', flag: '🇸🇴', dir: 'ltr', rank: 41 },
  // 42. Nepali
  { code: 'ne', name: 'Nepali', nativeName: 'नेपाली', flag: '🇳🇵', dir: 'ltr', rank: 42 },
  // 43. Sinhala
  { code: 'si', name: 'Sinhala', nativeName: 'සිංහල', flag: '🇱🇰', dir: 'ltr', rank: 43 },
  // 44. Khmer
  { code: 'km', name: 'Khmer', nativeName: 'ភាសាខ្មែរ', flag: '🇰🇭', dir: 'ltr', rank: 44 },
  // 45. Serbian
  { code: 'sr', name: 'Serbian', nativeName: 'Српски', flag: '🇷🇸', dir: 'ltr', rank: 45 },
  // 46. Bulgarian
  { code: 'bg', name: 'Bulgarian', nativeName: 'Български', flag: '🇧🇬', dir: 'ltr', rank: 46 },
  // 47. Finnish
  { code: 'fi', name: 'Finnish', nativeName: 'Suomi', flag: '🇫🇮', dir: 'ltr', rank: 47 },
  // 48. Danish
  { code: 'da', name: 'Danish', nativeName: 'Dansk', flag: '🇩🇰', dir: 'ltr', rank: 48 },
  // 49. Slovak
  { code: 'sk', name: 'Slovak', nativeName: 'Slovenčina', flag: '🇸🇰', dir: 'ltr', rank: 49 },
  // 50. Azerbaijani
  { code: 'az', name: 'Azerbaijani', nativeName: 'Azərbaycan', flag: '🇦🇿', dir: 'ltr', rank: 50 },

  // Additional Supported European Regional Locales
  { code: 'no', name: 'Norwegian', nativeName: 'Norsk', flag: '🇳🇴', dir: 'ltr' },
  { code: 'hr', name: 'Croatian', nativeName: 'Hrvatski', flag: '🇭🇷', dir: 'ltr' },
  { code: 'lt', name: 'Lithuanian', nativeName: 'Lietuvių', flag: '🇱🇹', dir: 'ltr' },
  { code: 'sl', name: 'Slovenian', nativeName: 'Slovenščina', flag: '🇸🇮', dir: 'ltr' },
  { code: 'lv', name: 'Latvian', nativeName: 'Latviešu', flag: '🇱🇻', dir: 'ltr' },
  { code: 'et', name: 'Estonian', nativeName: 'Eesti', flag: '🇪🇪', dir: 'ltr' },
];
