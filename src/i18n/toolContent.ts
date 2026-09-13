import { SupportedLanguage } from './types';
import { ToolId, FAQItem, HowItWorksStep } from '../types';

interface LocalizedToolData {
  h1: string;
  subheading: string;
  howItWorks: HowItWorksStep[];
  faqs: FAQItem[];
}

export const LOCALIZED_TOOL_CONTENT: Record<SupportedLanguage, Partial<Record<ToolId, LocalizedToolData>>> = {
  en: {}, // Falls back to tools.ts default English content

  fr: {
    'video-trimmer': {
      h1: 'Coupeur Vidéo en Ligne Gratuit',
      subheading: 'Coupez et ajustez vos fichiers vidéo instantanément dans votre navigateur. 100% privé sans aucun téléversement.',
      howItWorks: [
        {
          step: 1,
          title: 'Sélectionnez votre fichier vidéo',
          description: 'Glissez-déposez votre vidéo ou cliquez pour parcourir. Le fichier reste sur votre ordinateur.',
        },
        {
          step: 2,
          title: 'Définissez les marqueurs de coupe',
          description: 'Déplacez les curseurs ou entrez des horodatages précis à la milliseconde près.',
        },
        {
          step: 3,
          title: 'Aperçu et enregistrement immédiat',
          description: 'Vérifiez le résultat et téléchargez votre extrait vidéo sans filigrane.',
        },
      ],
      faqs: [
        {
          question: 'Mes vidéos sont-elles envoyées sur un serveur distant ?',
          answer: 'Jamais. OnlineTrimmer fonctionne à 100% dans votre navigateur via WebAssembly. Vos données restent strictement sur votre machine.',
        },
        {
          question: 'Quels formats vidéo sont pris en charge ?',
          answer: 'Nous prenons en charge tous les formats majeurs : MP4, MOV, WebM, AVI et MKV.',
        },
        {
          question: 'Y a-t-il des filigranes ou des limites de taille ?',
          answer: 'Aucun filigrane ni frais cachés. Le traitement étant local, il dépend de votre mémoire vive (RAM) et traite facilement des fichiers jusqu\'à 1 Go.',
        },
        {
          question: 'Puis-je couper à la milliseconde près ?',
          answer: 'Oui, vous pouvez ajuster manuellement les heures, minutes, secondes et millisecondes pour une précision d\'image absolue.',
        },
      ],
    },

    'audio-trimmer': {
      h1: 'Coupeur Audio & Découpeur MP3 en Ligne',
      subheading: 'Coupez des musiques, créez des sonneries de téléphone et éditez vos pistes audio directement dans le navigateur.',
      howItWorks: [
        {
          step: 1,
          title: 'Importez votre chanson ou enregistrement',
          description: 'Chargez un fichier MP3, WAV, AAC ou M4A. La forme d\'onde est générée localement.',
        },
        {
          step: 2,
          title: 'Sélectionnez le passage idéal',
          description: 'Activez le fondu d\'ouverture ou de fermeture (anti-clic) pour une transition musicale parfaite.',
        },
        {
          step: 3,
          title: 'Exportez votre sonnerie ou extrait',
          description: 'Écoutez la sélection en boucle et téléchargez votre nouveau fichier audio instantanément.',
        },
      ],
      faqs: [
        {
          question: 'Puis-je créer une sonnerie pour iPhone et Android ?',
          answer: 'Oui, sélectionnez le bouton Sonnerie (29 secondes), appliquez un fondu et téléchargez votre fichier MP3 ou M4R.',
        },
        {
          question: 'Comment fonctionnent les fondus audio ?',
          answer: 'Les filtres de fondu sonore (Fade In / Fade Out) évitent les bruits de clic désagréables lors du découpage musical.',
        },
        {
          question: 'La qualité du son est-elle préservée ?',
          answer: 'Oui, les données audio sont traitées fidèlement sans compression destructive superflue.',
        },
      ],
    },

    'split-pdf': {
      h1: 'Diviser un PDF & Extraire des Pages Gratuitement',
      subheading: 'Extrayez des pages spécifiques ou supprimez des feuilles de vos PDF en quelques secondes sans aucun téléversement cloud.',
      howItWorks: [
        {
          step: 1,
          title: 'Sélectionnez votre document PDF',
          description: 'Chargez votre fichier pour générer les vignettes de pages directement dans votre navigateur.',
        },
        {
          step: 2,
          title: 'Sélectionnez les pages à extraire',
          description: 'Cliquez sur les miniatures de pages ou tapez un intervalle (ex: 1-3, 5, 8-10).',
        },
        {
          step: 3,
          title: 'Téléchargez le nouveau PDF découpé',
          description: 'Générez un nouveau PDF compact ne contenant que les pages voulues.',
        },
      ],
      faqs: [
        {
          question: 'Mes documents confidentiels sont-ils protégés ?',
          answer: 'Absolument. Aucune page de votre PDF n\'est jamais transmise à un serveur. Tout s\'exécute avec les moteurs pdf-lib et pdf.js côté client.',
        },
        {
          question: 'Puis-je diviser un PDF protégé par mot de passe ?',
          answer: 'Vous devrez d\'abord le déverrouiller pour que le navigateur puisse lire et découper les pages en mémoire.',
        },
      ],
    },

    'sign-pdf': {
      h1: 'Signer un PDF en Ligne Gratuitement (eSignature)',
      subheading: 'Ajoutez des signatures électroniques visuelles ou des tampons de texte à vos documents en toute confidentialité.',
      howItWorks: [
        {
          step: 1,
          title: 'Importez votre document PDF',
          description: 'Visualisez les pages dans le lecteur sécurisé intégré.',
        },
        {
          step: 2,
          title: 'Créez votre signature manuscrite',
          description: 'Dessinez à la souris ou au doigt, tapez votre nom en écriture cursive ou importez une image.',
        },
        {
          step: 3,
          title: 'Placez et téléchargez le document signé',
          description: 'Déposez la signature sur la ligne voulue et téléchargez le document scellé.',
        },
      ],
      faqs: [
        {
          question: 'Cette signature est-elle juridiquement valable ?',
          answer: 'Il s\'agit d\'une signature électronique visuelle couramment acceptée pour les contrats standard, devis et approbations quotidiennes.',
        },
        {
          question: 'Ma signature est-elle enregistrée sur un serveur ?',
          answer: 'Non, votre tracé de signature reste dans la mémoire de votre navigateur et s\'efface à la fermeture de la page.',
        },
      ],
    },
  },

  ar: {
    'video-trimmer': {
      h1: 'أداة قص الفيديو أونلاين مجاناً',
      subheading: 'قص واقطع ونسّق مقاطع الفيديو فورياً في متصفحك. خصوصية 100% دون رفع أي ملفات إلى السيرفر.',
      howItWorks: [
        {
          step: 1,
          title: 'اختر ملف الفيديو من جهازك',
          description: 'اسحب وأفلت الملف أو اضغط للتصفح. يبقى الفيديو آمناً على جهازك دون إرسال أي بايت.',
        },
        {
          step: 2,
          title: 'حدد أوقات القص بدقة',
          description: 'حرك شريط التحديد أو اكتب أجزاء الثانية للحصول على دقة متناهية مطابقة لقطات الفيديو.',
        },
        {
          step: 3,
          title: 'معاينة وتنزيل المقطع',
          description: 'شاهد التحديد بالوقت الفعلي ونزّل الفيديو المقصوص فوراً بدون أي علامة مائية.',
        },
      ],
      faqs: [
        {
          question: 'هل يتم رفع مقاطع الفيديو الخاصة بي إلى سيرفر خارجي؟',
          answer: 'أبداً. يعتمد OnlineTrimmer تقنية WebAssembly داخل المتصفح، مما يجعل جميع عمليات التقطيع تتم على معالج جهازك فقط.',
        },
        {
          question: 'ما هي تنسيقات الفيديو المدعومة؟',
          answer: 'ندعم جميع التنسيقات الشائعة بما في ذلك MP4 وMOV وWebM وAVI وMKV.',
        },
        {
          question: 'هل هناك أي علامة مائية أو رسوم خفية؟',
          answer: 'لا توجد أي علامات مائية إطلاقاً، والأداة مجانية تماماً وبدون تسجيل حساب.',
        },
        {
          question: 'هل يمكنني القص بدقة أجزاء من الثانية؟',
          answer: 'نعم، تتيح لك الأداة إدخال الدقائق والثواني وأجزاء الألف من الثانية بدقة الإطار الكامل.',
        },
      ],
    },

    'audio-trimmer': {
      h1: 'أداة قص الصوت وتقطيع ملفات MP3 أونلاين',
      subheading: 'قص الأغاني، اصنع نغمات رنين للهاتف، وعدّل مقاطعك الصوتية مباشرة عبر موجات الصوت التفاعلية في متصفحك.',
      howItWorks: [
        {
          step: 1,
          title: 'رفع الملف الصوتي أو الأغنية',
          description: 'يدعم ملفات MP3 وWAV وAAC وM4A مع رسم فوري للمخطط الموجي الصوتي.',
        },
        {
          step: 2,
          title: 'تحديد مقطع النغمة',
          description: 'اختر ميزة نغمة الرنين (29 ثانية) وفعّل ميزة التلاشي لتجنب طقطقة البداية والنهاية.',
        },
        {
          step: 3,
          title: 'حفظ المقطع الصوتي',
          description: 'استمع للتحديد بشكل متكرر ونزّل مقطعك بنقرة زر واحدة.',
        },
      ],
      faqs: [
        {
          question: 'هل يمكنني صنع نغمة رنين للآيفون والأندرويد؟',
          answer: 'نعم، حدد طول النغمة ثم صدّر الملف بصيغة MP3 أو M4R وضعها كنغمة مخصصة لهاتفك بسهولة.',
        },
        {
          question: 'ما هي ميزة التلاشي الصوتي (Fade)؟',
          answer: 'تمنحك بداية ناعمة تصاعدية ونهاية متلاشية تدريجياً، مما يمنع الأصوات المفاجئة المزعجة.',
        },
      ],
    },

    'split-pdf': {
      h1: 'تقسيم ملفات PDF واستخراج الصفحات أونلاين',
      subheading: 'استخرج صفحات محددة أو احذف صفحات غير مرغوبة من مستنداتك خلال ثوانٍ معدودة وبسرية مطلقة.',
      howItWorks: [
        {
          step: 1,
          title: 'اختر ملف الـ PDF',
          description: 'يتم عرض صور مصغرة لجميع الصفحات فورياً داخل المتصفح دون رفعه.',
        },
        {
          step: 2,
          title: 'حدد الصفحات المطلوبة',
          description: 'انقر على الصفحات التي تريدها أو اكتب نطاق الأرقام مثل 1-3, 5.',
        },
        {
          step: 3,
          title: 'تنزيل الملف الجديد',
          description: 'احصل على مستند جديد يحتوي فقط على الصفحات التي قمت بتحديدها.',
        },
      ],
      faqs: [
        {
          question: 'هل مستنداتي الحساسة آمنة؟',
          answer: 'نعم بنسبة 100%، فالملف لا يغادر ذاكرة متصفحك إطلاقاً ولا يمر بأي خادم سحابي.',
        },
      ],
    },

    'sign-pdf': {
      h1: 'توقيع مستندات PDF إلكترونياً مجاناً',
      subheading: 'وقّع مستنداتك وعقودك إلكترونياً بالرسم بالقلم أو الخط اليدوي دون الحاجة لطباعة الورق.',
      howItWorks: [
        {
          step: 1,
          title: 'فتح المستند',
          description: 'اختر ملف PDF لعرضه في المعاين الآمن المدمج.',
        },
        {
          step: 2,
          title: 'إنشاء توقيعك الشخصي',
          description: 'ارسم بيدك أو اختر خطاً انسيابياً أو ارفع صورة توقيعك الجاهزة.',
        },
        {
          step: 3,
          title: 'تثبيت التوقيع والحفظ',
          description: 'ضع التوقيع في المكان المناسب على الورقة وحمّل الملف فوراً.',
        },
      ],
      faqs: [
        {
          question: 'هل يتم الاحتفاظ بنسخة من توقيعي؟',
          answer: 'كلا، بمجرد إغلاق المتصفح تُمحى جميع البيانات من الذاكرة العشوائية للجهاز.',
        },
      ],
    },
  },

  ru: {
    'video-trimmer': {
      h1: 'Бесплатная обрезка видео онлайн',
      subheading: 'Быстро обрезайте, нарезайте и разделяйте видеоклипы прямо в браузере. 100% приватность без передачи на сервер.',
      howItWorks: [
        {
          step: 1,
          title: 'Выберите видеофайл',
          description: 'Перетащите файл или выберите его на устройстве. Файл остается у вас на компьютере.',
        },
        {
          step: 2,
          title: 'Укажите границы обрезки',
          description: 'Перемещайте ползунки или введите время с точностью до миллисекунд.',
        },
        {
          step: 3,
          title: 'Предпросмотр и скачивание',
          description: 'Проверьте результат и сохраните готовое видео без водяных знаков.',
        },
      ],
      faqs: [
        {
          question: 'Загружаются ли видео на внешний сервер?',
          answer: 'Никогда. OnlineTrimmer выполняет всю обработку прямо в вашем браузере через WebAssembly. Файлы не покидают ваше устройство.',
        },
        {
          question: 'Какие форматы поддерживаются?',
          answer: 'Поддерживаются все популярные форматы: MP4, MOV, WebM, AVI и MKV.',
        },
        {
          question: 'Есть ли ограничения по размеру или водяные знаки?',
          answer: 'Никаких водяных знаков и скрытых платежей. Видеофайлы до 1 ГБ обрабатываются быстро и плавно при достаточном объеме ОЗУ.',
        },
      ],
    },

    'audio-trimmer': {
      h1: 'Обрезка музыки и нарезка MP3 онлайн',
      subheading: 'Обрезайте песни, создавайте рингтоны для телефонов и редактируйте аудио по наглядной звуковой волне прямо в браузере.',
      howItWorks: [
        {
          step: 1,
          title: 'Загрузите аудиофайл',
          description: 'Поддерживаются форматы MP3, WAV, AAC, M4A с мгновенным построением аудиоволны.',
        },
        {
          step: 2,
          title: 'Выделите фрагмент',
          description: 'Включите плавное нарастание (Fade In) и затухание (Fade Out) для идеального звучания.',
        },
        {
          step: 3,
          title: 'Сохраните новый трек',
          description: 'Прослушайте отрезок в зацикленном режиме и скачайте файл в один клик.',
        },
      ],
      faqs: [
        {
          question: 'Можно ли сделать рингтон для iPhone и Android?',
          answer: 'Да! Нажмите кнопку режима рингтона (29 секунд), примените затухание и сохраните аудио.',
        },
        {
          question: 'Зачем нужны функции Fade In и Fade Out?',
          answer: 'Они плавно изменяют громкость в начале и конце отрезка, устраняя неприятные щелчки.',
        },
      ],
    },

    'split-pdf': {
      h1: 'Разделение PDF и извлечение страниц',
      subheading: 'Извлекайте нужные страницы или удаляйте лишние листы из PDF за считанные секунды без загрузки в облако.',
      howItWorks: [
        {
          step: 1,
          title: 'Выберите PDF-документ',
          description: 'Миниатюры страниц генерируются локально в браузере.',
        },
        {
          step: 2,
          title: 'Отметьте нужные страницы',
          description: 'Кликайте по страницам или введите диапазон (например: 1-3, 5, 8-10).',
        },
        {
          step: 3,
          title: 'Скачайте готовый PDF',
          description: 'Получите новый PDF-документ только с выбранными листами.',
        },
      ],
      faqs: [
        {
          question: 'Безопасны ли конфиденциальные документы?',
          answer: 'На 100% безопасны. Ни один байт вашего файла не передается в интернет.',
        },
      ],
    },

    'sign-pdf': {
      h1: 'Электронная подпись PDF онлайн',
      subheading: 'Добавляйте визуальные подписи или текстовые штампы в документы PDF конфиденциально прямо в браузере.',
      howItWorks: [
        {
          step: 1,
          title: 'Откройте PDF',
          description: 'Документ отображается во встроенном безопасном просмотрщике.',
        },
        {
          step: 2,
          title: 'Создайте подпись',
          description: 'Нарисуйте пером, напечатайте рукописным шрифтом или загрузите изображение.',
        },
        {
          step: 3,
          title: 'Разместите и сохраните',
          description: 'Поместите подпись на нужную строку документа и скачайте подписанный файл.',
        },
      ],
      faqs: [
        {
          question: 'Сохраняется ли моя подпись на сервере?',
          answer: 'Нет, подпись хранится только во временной памяти вкладки браузера.',
        },
      ],
    },
  },
};
