import { ToolEditorialBundle, VideoEditorialData } from './types';
import { enEditorial } from './en';
import { SupportedLanguage } from '../types';

function createLocalizedEditorial(
  overrides: Partial<VideoEditorialData> & {
    videoPillarTitle?: string;
    howToTitle?: string;
    specsTitle?: string;
    audioTitle?: string;
    splitPdfTitle?: string;
    signPdfTitle?: string;
  }
): ToolEditorialBundle {
  return {
    video: {
      ...enEditorial.video,
      pillarTitle: overrides.videoPillarTitle || overrides.pillarTitle || enEditorial.video.pillarTitle,
      howToTitle: overrides.howToTitle || enEditorial.video.howToTitle,
      howToSubtitle: overrides.howToSubtitle || enEditorial.video.howToSubtitle,
      step1Title: overrides.step1Title || enEditorial.video.step1Title,
      step1Desc: overrides.step1Desc || enEditorial.video.step1Desc,
      step2Title: overrides.step2Title || enEditorial.video.step2Title,
      step2Desc: overrides.step2Desc || enEditorial.video.step2Desc,
      step3Title: overrides.step3Title || enEditorial.video.step3Title,
      step3Desc: overrides.step3Desc || enEditorial.video.step3Desc,
      specsTitle: overrides.specsTitle || enEditorial.video.specsTitle,
    },
    audio: {
      ...enEditorial.audio,
      pillarTitle: overrides.audioTitle || enEditorial.audio.pillarTitle,
    },
    splitPdf: {
      ...enEditorial.splitPdf,
      pillarTitle: overrides.splitPdfTitle || enEditorial.splitPdf.pillarTitle,
    },
    signPdf: {
      ...enEditorial.signPdf,
      pillarTitle: overrides.signPdfTitle || enEditorial.signPdf.pillarTitle,
    },
    hub: {
      ...enEditorial.hub,
    },
  };
}

export const globalEditorialLocales: Partial<Record<SupportedLanguage, ToolEditorialBundle>> = {
  // 26. Ukrainian
  uk: createLocalizedEditorial({
    videoPillarTitle: 'Безкоштовний онлайн відео обрізувач та відео катер',
    howToTitle: 'Як обрізати відео онлайн покроково',
    howToSubtitle: 'Швидкий посібник у 3 кроки для обрізання будь-якого відео менш ніж за 30 секунд.',
    step1Title: 'Крок 1: Завантажте або перетягніть відеофайл',
    step1Desc: 'Перетягніть відео безпосередньо в OnlineTrimmer. Підтримуються формати MP4, MOV, WebM, AVI та MKV.',
    step2Title: 'Крок 2: Встановіть початковий та кінцевий час',
    step2Desc: 'Переміщуйте маркери на шкалі часу для вибору потрібної сцени з точністю до мілісекунд.',
    step3Title: 'Крок 3: Попередній перегляд та завантаження',
    step3Desc: 'Перевірте фрагмент у циклічному відтворенні та завантажте готове відео без водяних знаків.',
    specsTitle: 'Рекомендовані параметри відео для соціальних мереж',
    audioTitle: 'Безкоштовний онлайн обрізувач аудіо та MP3 катер',
    splitPdfTitle: 'Розділити PDF онлайн з візуальними мініатюрами сторінок',
    signPdfTitle: 'Електронний підпис PDF онлайн (Швидко та конфіденційно)',
  }),

  // 27. Polish
  pl: createLocalizedEditorial({
    videoPillarTitle: 'Darmowy przycinacz wideo online i precyzyjny cutter',
    howToTitle: 'Jak przyciąć wideo online krok po kroku',
    howToSubtitle: 'Trzy proste kroki, aby precyzyjnie przyciąć dowolny klip w mniej niż 30 sekund.',
    step1Title: 'Krok 1: Wybierz lub przeciągnij plik wideo',
    step1Desc: 'Przeciągnij plik bezpośrednio do OnlineTrimmer. Obsługujemy formaty MP4, MOV, WebM, AVI i MKV.',
    step2Title: 'Krok 2: Ustaw punkty początku i końca cięcia',
    step2Desc: 'Przesuwaj suwaki na osi czasu z dokładnością do milisekund, aby uchwycić właściwą scenę.',
    step3Title: 'Krok 3: Odtwórz w pętli i pobierz wideo',
    step3Desc: 'Sprawdź przycięty fragment i pobierz plik bez znaków wodnych bezpośrednio na dysk.',
    specsTitle: 'Specyfikacje wideo dla twórców w mediach społecznościowych',
    audioTitle: 'Darmowy przycinacz audio i wycinanie MP3 online',
    splitPdfTitle: 'Podziel PDF online z miniaturami stron',
    signPdfTitle: 'Podpisz PDF online za darmo (Prywatnie i bezpiecznie)',
  }),

  // 28. Dutch
  nl: createLocalizedEditorial({
    videoPillarTitle: 'Gratis online video cutter en precisie trimmer',
    howToTitle: 'Stap voor stap online video knippen',
    howToSubtitle: 'Volg deze 3 eenvoudige stappen om een videoclip binnen 30 seconden te trimmen.',
    step1Title: 'Stap 1: Upload of sleep je videobestand',
    step1Desc: 'Sleep je bestand direct in OnlineTrimmer. Ondersteuning voor MP4, MOV, WebM, AVI en MKV.',
    step2Title: 'Stap 2: Bepaal begin- en eindtijd',
    step2Desc: 'Verschuif de tijdlijnmarkeringen voor een nauwkeurige selectie op de milliseconde.',
    step3Title: 'Stap 3: Voorbeeld in loop & download video',
    step3Desc: 'Bekijk de selectie en exporteer je video direct lokaal zonder watermerken.',
    specsTitle: 'Aanbevolen videoformaten voor social media creators',
    audioTitle: 'Gratis online audio trimmer & MP3 cutter',
    splitPdfTitle: 'PDF online splitsen met pagina miniaturen',
    signPdfTitle: 'PDF online ondertekenen (Snel, gratis & privé)',
  }),

  // 35. Greek
  el: createLocalizedEditorial({
    videoPillarTitle: 'Δωρεάν Online Κόφτης Βίντεο και Ακριβές Τρίμερ',
    howToTitle: 'Πώς να κόψετε βίντεο online βήμα-βήμα',
    howToSubtitle: 'Ακολουθήστε αυτά τα τρία απλά βήματα για να κόψετε οποιοδήποτε βίντεο σε 30 δευτερόλεπτα.',
    step1Title: 'Βήμα 1: Επιλέξτε ή σύρετε το αρχείο βίντεο',
    step1Desc: 'Σύρετε το αρχείο σας στο OnlineTrimmer. Υποστηρίζονται MP4, MOV, WebM, AVI και MKV.',
    step2Title: 'Βήμα 2: Ορίστε σημεία έναρξης και λήξης',
    step2Desc: 'Μετακινήστε τους δείκτες στη διαδραστική γραμμή χρόνου με ακρίβεια χιλιοστού του δευτερολέπτου.',
    step3Title: 'Βήμα 3: Προεπισκόπηση και λήψη βίντεο',
    step3Desc: 'Δείτε την επιλογή σας και κατεβάστε το επεξεργασμένο αρχείο χωρίς υδατογράφημα.',
    specsTitle: 'Προδιαγραφές βίντεο για δημιουργούς περιεχομένου',
    audioTitle: 'Δωρεάν Online Κόφτης Ήχου & Τρίμερ MP3',
    splitPdfTitle: 'Διαχωρισμός PDF Online με μικρογραφίες σελίδων',
    signPdfTitle: 'Υπογραφή PDF Online (Γρήγορα, Δωρεάν & Ιδιωτικά)',
  }),

  // 34. Romanian
  ro: createLocalizedEditorial({
    videoPillarTitle: 'Tăietor video online gratuit și trimmer de precizie',
    howToTitle: 'Cum să tai un videoclip online pas cu pas',
    howToSubtitle: 'Urmează acest ghid rapid în 3 pași pentru a tăia orice clip în mai puțin de 30 de secunde.',
    step1Title: 'Pasul 1: Încarcă sau trage fișierul video',
    step1Desc: 'Trage fișierul direct în OnlineTrimmer. Suportăm MP4, MOV, WebM, AVI și MKV.',
    step2Title: 'Pasul 2: Setează punctele de început și sfârșit',
    step2Desc: 'Glisează marcatorii pe cronologie pentru a alege scena dorită cu precizie milimetrică.',
    step3Title: 'Pasul 3: Previzualizează în buclă și descarcă',
    step3Desc: 'Verifică selecția și descarcă noul videoclip fără filigran instantaneu.',
    specsTitle: 'Specificații video recomandate pentru social media',
    audioTitle: 'Tăietor audio online gratuit și trimmer MP3',
    splitPdfTitle: 'Împarte PDF online cu miniaturi ale paginilor',
    signPdfTitle: 'Semnează PDF online gratuit (Rapid și privat)',
  }),

  // 39. Swedish
  sv: createLocalizedEditorial({
    videoPillarTitle: 'Gratis videoklippare online och precisionsverktyg',
    howToTitle: 'Hur man klipper video online steg för steg',
    howToSubtitle: 'Följ denna enkla trestegsguide för att trimma vilken video som helst på under 30 sekunder.',
    step1Title: 'Steg 1: Välj eller dra in din videofil',
    step1Desc: 'Dra och släpp filen i OnlineTrimmer. Stöd för MP4, MOV, WebM, AVI och MKV.',
    step2Title: 'Steg 2: Sätt start- och slutpunkt',
    step2Desc: 'Dra handtagen på tidslinjen för att välja exakt scen med millisekundprecision.',
    step3Title: 'Steg 3: Förhandsgranska i loop & spara videon',
    step3Desc: 'Kontrollera klippet och ladda ner din trimmade video direkt utan vattenstämplar.',
    specsTitle: 'Rekommenderade videospecifikationer för sociala medier',
    audioTitle: 'Gratis ljudklippare & MP3-skärare online',
    splitPdfTitle: 'Dela PDF-dokument online med sidminiatyrer',
    signPdfTitle: 'Signera PDF online (Snabbt, gratis & privat)',
  }),

  // 38. Czech
  cs: createLocalizedEditorial({
    videoPillarTitle: 'Bezplatný online střihač videa a přesný trimmer',
    howToTitle: 'Jak stříhat video online krok za krokem',
    howToSubtitle: 'Tři jednoduché kroky ke zkrácení jakéhokoli videa za méně než 30 sekund.',
    step1Title: 'Krok 1: Vyberte nebo přetáhněte video',
    step1Desc: 'Přetáhněte soubor přímo do OnlineTrimmer. Podporujeme MP4, MOV, WebM, AVI a MKV.',
    step2Title: 'Krok 2: Nastavte počáteční a koncový bod',
    step2Desc: 'Posouvejte jezdce na časové ose s milisekundovou přesností pro dokonalý střih.',
    step3Title: 'Krok 3: Smyčkový náhled a stažení videa',
    step3Desc: 'Zkontrolujte výběr a stáhněte oříznuté video bez vodoznaků přímo do zařízení.',
    specsTitle: 'Doporučené formáty videa pro sociální sítě',
    audioTitle: 'Bezplatný online ořezávač zvuku a MP3',
    splitPdfTitle: 'Rozdělení PDF online s náhledy stránek',
    signPdfTitle: 'Podepsat PDF online (Rychle, zdarma a bezpečně)',
  }),

  // 37. Hungarian
  hu: createLocalizedEditorial({
    videoPillarTitle: 'Ingyenes online videóvágó és precíz trimmer',
    howToTitle: 'Hogyan vágjunk videót online lépésről lépésre',
    howToSubtitle: 'Kövesse ezt a gyors 3 lépéses útmutatót bármilyen videó 30 másodpercen belüli vágásához.',
    step1Title: '1. lépés: Válassza ki vagy húzza be a videófájlt',
    step1Desc: 'Húzza a fájlt közvetlenül az OnlineTrimmer ablakába. Támogatott formátumok: MP4, MOV, WebM, AVI, MKV.',
    step2Title: '2. lépés: Állítsa be a kezdő- és végpontot',
    step2Desc: 'Mozgassa a csúszkákat az idővonalon a kívánt jelenet millimásodperces pontosságú kijelöléséhez.',
    step3Title: '3. lépés: Ismételt előnézet és videó letöltése',
    step3Desc: 'Ellenőrizze a kivágott szakaszt és töltse le azonnal vízjel nélkül.',
    specsTitle: 'Ajánlott videó méretek közösségi média alkotóknak',
    audioTitle: 'Ingyenes online hangvágó és MP3 daraboló',
    splitPdfTitle: 'PDF felosztása online oldal-előnézetekkel',
    signPdfTitle: 'PDF aláírása online (Gyors, ingyenes és biztonságos)',
  }),

  // 36. Hebrew
  he: createLocalizedEditorial({
    videoPillarTitle: 'חותך וידאו אונליין בחינם ובדיוק מירבי',
    howToTitle: 'איך לחתוך וידאו אונליין צעד אחר צעד',
    howToSubtitle: 'מדריך מהיר בן שלושה שלבים לחיתוך כל סרטון תוך פחות משלושים שניות.',
    step1Title: 'שלב 1: בחרו או גררו את קובץ הווידאו',
    step1Desc: 'גררו את הקובץ ישירות ל-OnlineTrimmer. אנו תומכים ב-MP4, MOV, WebM, AVI ו-MKV.',
    step2Title: 'שלב 2: הגדירו נקודות התחלה וסיום',
    step2Desc: 'הזיזו את הידיות על ציר הזמן בדיוק של אלפיות השנייה לבחירת הסצנה הרצויה.',
    step3Title: 'שלב 3: תצוגה מקדימה בלופ והורדה',
    step3Desc: 'בדקו את הקטע והורידו את הווידאו החתוך ללא סימני מים באופן מיידי.',
    specsTitle: 'מפרטי חיתוך וידאו מומלצים לרשתות חברתיות',
    audioTitle: 'חותך אודיו ושירים MP3 אונליין בחינם',
    splitPdfTitle: 'פיצול מסמכי PDF אונליין עם תצוגה מקדימה',
    signPdfTitle: 'חתימה על PDF אונליין (מהיר, חינם ופרטי)',
  }),

  // 18. Persian / Farsi
  fa: createLocalizedEditorial({
    videoPillarTitle: 'برش آنلاین ویدیو رایگان و ابزار دقیق کوتاه کردن فیلم',
    howToTitle: 'نحوه برش ویدیو آنلاین گام به گام',
    howToSubtitle: 'این راهنمای ۳ مرحله‌ای را برای برش هر ویدیو در کمتر از ۳۰ ثانیه دنبال کنید.',
    step1Title: 'مرحله ۱: انتخاب یا کشیدن فایل ویدیو',
    step1Desc: 'فایل خود را مستقیماً درون OnlineTrimmer بکشید. پشتیبانی از MP4، MOV، WebM، AVI و MKV.',
    step2Title: 'مرحله ۲: تعیین زمان شروع و پایان',
    step2Desc: 'نشانگرها را روی خط زمانی با دقت میلی‌ثانیه حرکت دهید تا صحنه دلخواه انتخاب شود.',
    step3Title: 'مرحله ۳: پیش‌نمایش و دانلود ویدیو',
    step3Desc: 'بخش انتخاب‌شده را بررسی کرده و ویدیوی برش‌خورده را بدون واترمارک دانلود کنید.',
    specsTitle: 'ابعاد و مشخصات ویدیویی پیشنهادی برای شبکه‌های اجتماعی',
    audioTitle: 'برش آنلاین صدا و آهنگ MP3 رایگان',
    splitPdfTitle: 'تقسیم PDF آنلاین با پیش‌نمایش صفحات',
    signPdfTitle: 'امضای آنلاین PDF (سریع، رایگان و خصوصی)',
  }),

  // 19. Thai
  th: createLocalizedEditorial({
    videoPillarTitle: 'โปรแกรมตัดต่อวิดีโอออนไลน์ฟรี และตัดวิดีโอความแม่นยำสูง',
    howToTitle: 'วิธีตัดวิดีโอออนไลน์ทีละขั้นตอน',
    howToSubtitle: 'ทำตาม 3 ขั้นตอนง่ายๆ เพื่อตัดต่อคลิปวิดีโอภายในเวลาไม่ถึง 30 วินาที',
    step1Title: 'ขั้นตอนที่ 1: เลือกหรือลากไฟล์วิดีโอลงในระบบ',
    step1Desc: 'ลากไฟล์ของคุณลงใน OnlineTrimmer ได้โดยตรง รองรับทั้ง MP4, MOV, WebM, AVI และ MKV',
    step2Title: 'ขั้นตอนที่ 2: กำหนดจุดเริ่มต้นและจุดสิ้นสุด',
    step2Desc: 'เลื่อนแถบไทม์ไลน์ด้วยความแม่นยำระดับมิลลิวินาที (+/- 100ms) เพื่อตัดเฟรมที่ต้องการ',
    step3Title: 'ขั้นตอนที่ 3: ดูตัวอย่างแบบวนซ้ำและส่งออกวิดีโอ',
    step3Desc: 'ตรวจสอบส่วนที่เลือกแล้วดาวน์โหลดวิดีโอที่ตัดเรียบร้อยแล้วโดยไม่มีลายน้ำทันที',
    specsTitle: 'สเปกวิดีโอแนะนำสำหรับครีเอเตอร์บนโซเชียลมีเดีย',
    audioTitle: 'โปรแกรมตัดเสียงเพลงออนไลน์ฟรี & ตัด MP3',
    splitPdfTitle: 'แยกไฟล์ PDF ออนไลน์พร้อมรูปตัวอย่างหน้า',
    signPdfTitle: 'เซ็นเอกสาร PDF ออนไลน์ (รวดเร็ว ฟรี และปลอดภัย)',
  }),

  // 12. Bengali
  bn: createLocalizedEditorial({
    videoPillarTitle: 'ফ্রি অনলাইন ভিডিও কাটার এবং নিখুঁত ভিডিও ট্রিমার',
    howToTitle: 'ধাপে ধাপে অনলাইনে ভিডিও কাটার নিয়ম',
    howToSubtitle: '৩০ সেকেন্ডেরও কম সময়ে যে কোনো ভিডিও ট্রিম করতে এই ৩টি ধাপ অনুসরণ করুন।',
    step1Title: 'ধাপ ১: ভিডিও ফাইল নির্বাচন বা ড্রপ করুন',
    step1Desc: 'আপনার ফাইলটি সরাসরি OnlineTrimmer-এ টেনে আনুন। MP4, MOV, WebM, AVI এবং MKV সমর্থিত।',
    step2Title: 'ধাপ ২: শুরুর এবং শেষের সময় নির্ধারণ করুন',
    step2Desc: 'সঠিক দৃশ্য বেছে নিতে টাইমলাইনের হ্যান্ডেলগুলো নিখুঁতভাবে মিলি সেকেন্ড অনুযায়ী সরান।',
    step3Title: 'ধাপ ৩: প্রিভিউ দেখুন এবং ভিডিও ডাউনলোড করুন',
    step3Desc: 'লুপ প্রিভিউ চালিয়ে দেখে নিন এবং কোনো ওয়াটারমার্ক ছাড়া সাথে সাথে ডাউনলোড করুন।',
    specsTitle: 'সোশ্যাল মিডিয়া নির্মাতাদের জন্য প্রস্তাবিত ভিডিও সাইজ',
    audioTitle: 'ফ্রি অনলাইন অডিও ট্রিমার এবং MP3 গান কাটার',
    splitPdfTitle: 'পৃষ্ঠার প্রিভিউ সহ অনলাইনে PDF ভাগ করুন',
    signPdfTitle: 'অনলাইনে PDF নথিতে স্বাক্ষর করুন (দ্রুত, ফ্রি ও নিরাপদ)',
  }),

  // 13. Urdu
  ur: createLocalizedEditorial({
    videoPillarTitle: 'مفت آن لائن ویڈیو کٹر اور درست ترین ٹریمر',
    howToTitle: 'آن لائن ویڈیو کاٹنے کا مرحلہ وار طریقہ',
    howToSubtitle: 'کسی بھی ویڈیو کو 30 سیکنڈ سے کم وقت میں کاٹنے کے لیے ان تین آسان مراحل پر عمل کریں۔',
    step1Title: 'مرحلہ 1: ویڈیو فائل منتخب یا ڈریگ کریں',
    step1Desc: 'اپنی فائل براہ راست OnlineTrimmer میں لے آئیں۔ ہم MP4، MOV، WebM اور MKV کو سپورٹ کرتے ہیں۔',
    step2Title: 'مرحلہ 2: شروع اور اختتام کا وقت مقرر کریں',
    step2Desc: 'ملی سیکنڈ کی درستگی کے ساتھ اپنے مطلوبہ منظر کو ٹائم لائن پر سلیکٹ کریں۔',
    step3Title: 'مرحلہ 3: ویڈیو کا معائنہ کریں اور ڈاؤن لوڈ کریں',
    step3Desc: 'کٹے ہوئے حصے کو لوپ میں دیکھیں اور بغیر کسی واٹر مارک کے فوراً ڈاؤن لوڈ کریں۔',
    specsTitle: 'سوشل میڈیا تخلیق کاروں کے لیے بہترین ویڈیو سائز',
    audioTitle: 'مفت آن لائن آڈیو ٹریمر اور MP3 کٹر',
    splitPdfTitle: 'صفحات کے پیش منظر کے ساتھ آن لائن PDF الگ کریں',
    signPdfTitle: 'آن لائن PDF دستاویزات پر دستخط کریں (تیز، مفت اور نجی)',
  }),
};
