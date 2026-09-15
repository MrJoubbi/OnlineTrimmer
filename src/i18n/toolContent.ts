import { SupportedLanguage } from './types';
import { ToolId, FAQItem, HowItWorksStep } from '../types';

interface LocalizedToolData {
  h1: string;
  subheading: string;
  howItWorks: HowItWorksStep[];
  faqs: FAQItem[];
}

export const LOCALIZED_TOOL_CONTENT: Partial<Record<SupportedLanguage, Partial<Record<ToolId, LocalizedToolData>>>> = {
  en: {}, // Falls back to tools.ts default English content

  es: {
    'video-trimmer': {
      h1: 'Cortador de Video Online Gratis',
      subheading: 'Corta y recorta clips de video al instante en tu navegador. 100% privado, sin subir archivos a ningún servidor.',
      howItWorks: [
        {
          step: 1,
          title: 'Selecciona o arrastra tu video',
          description: 'Sube un archivo MP4, MOV, WebM, AVI o MKV. El archivo permanece seguro en tu dispositivo.',
        },
        {
          step: 2,
          title: 'Establece los puntos de corte con precisión',
          description: 'Ajusta los tiradores en la línea de tiempo o escribe marcas de tiempo exactas al milisegundo.',
        },
        {
          step: 3,
          title: 'Previsualiza y descarga de inmediato',
          description: 'Comprueba el video recortado en bucle y descárgalo sin marcas de agua ni costes.',
        },
      ],
      faqs: [
        {
          question: '¿Se suben mis videos a servidores externos?',
          answer: 'Nunca. OnlineTrimmer se ejecuta al 100% en tu navegador usando WebAssembly. Nada sale de tu ordenador.',
        },
        {
          question: '¿Qué formatos de video son compatibles?',
          answer: 'Soportamos todos los formatos populares: MP4, MOV, WebM, AVI y MKV.',
        },
        {
          question: '¿Hay marcas de agua o límites ocultos?',
          answer: 'Sin marcas de agua, sin suscripciones y sin tarifas ocultas. Puedes recortar videos de gran tamaño con fluidez.',
        },
        {
          question: '¿Puedo cortar con precisión milimétrica?',
          answer: 'Sí, puedes ajustar horas, minutos, segundos y milisegundos para cortes exactos a nivel de fotograma.',
        },
      ],
    },

    'audio-trimmer': {
      h1: 'Cortador de Audio y Canciones MP3 Online',
      subheading: 'Corta canciones, crea tonos de llamada personalizados y edita audios con una forma de onda interactiva directamente en el navegador.',
      howItWorks: [
        {
          step: 1,
          title: 'Carga tu pista de audio o canción',
          description: 'Sube MP3, WAV, AAC u OGG. La onda de audio se dibuja al instante en la memoria local.',
        },
        {
          step: 2,
          title: 'Selecciona el fragmento deseado',
          description: 'Activa la entrada (Fade In) o salida progresiva (Fade Out) para evitar chasquidos bruscos.',
        },
        {
          step: 3,
          title: 'Exporta tu tono o corte',
          description: 'Escucha la selección en bucle y descarga tu nuevo archivo de audio al instante.',
        },
      ],
      faqs: [
        {
          question: '¿Puedo crear tonos de llamada para iPhone y Android?',
          answer: 'Sí, usa el modo Tono de llamada (29 segundos), activa los fundidos y descarga el archivo listo para configurar.',
        },
        {
          question: '¿Cómo funcionan los filtros de fundido (Fade)?',
          answer: 'Aumentan suavemente el volumen al inicio y lo atenúan al final, eliminando cortes molestos.',
        },
      ],
    },

    'split-pdf': {
      h1: 'Dividir PDF y Extraer Páginas Gratis',
      subheading: 'Extrae páginas específicas o elimina hojas de tus documentos PDF en segundos con total privacidad.',
      howItWorks: [
        {
          step: 1,
          title: 'Carga tu archivo PDF',
          description: 'Genera miniaturas visuales de cada página directamente en el navegador.',
        },
        {
          step: 2,
          title: 'Selecciona las páginas que necesitas',
          description: 'Haz clic en las miniaturas o escribe intervalos como 1-3, 5, 8-10.',
        },
        {
          step: 3,
          title: 'Descarga el nuevo PDF',
          description: 'Obtén al instante un documento con las páginas seleccionadas y calidad vectorial perfecta.',
        },
      ],
      faqs: [
        {
          question: '¿Están protegidos mis documentos confidenciales?',
          answer: 'Totalmente. Ninguna página se envía a la nube. Todo el procesamiento se realiza localmente con pdf-lib.',
        },
      ],
    },

    'sign-pdf': {
      h1: 'Firmar PDF Online Gratis (Firma Electrónica)',
      subheading: 'Añade tu firma digital o escribe tu nombre en contratos y documentos PDF en segundos.',
      howItWorks: [
        {
          step: 1,
          title: 'Abre el documento PDF',
          description: 'Visualiza las hojas en el visor seguro integrado.',
        },
        {
          step: 2,
          title: 'Crea tu firma manuscrita',
          description: 'Dibuja con el dedo o ratón, escribe con tipografía caligráfica o sube una imagen.',
        },
        {
          step: 3,
          title: 'Ubica la firma y guarda',
          description: 'Coloca la firma sobre la línea requerida y descarga el PDF firmado.',
        },
      ],
      faqs: [
        {
          question: '¿Se almacena mi firma en algún servidor?',
          answer: 'No, tu firma reside exclusivamente en la memoria temporal del navegador y se borra al cerrar.',
        },
      ],
    },
  },

  de: {
    'video-trimmer': {
      h1: 'Kostenloser Online Video Cutter & Trimmer',
      subheading: 'Schneiden und kürzen Sie Videoclips sofort im Browser. 100% vertraulich ohne Server-Upload.',
      howItWorks: [
        {
          step: 1,
          title: 'Videodatei auswählen oder hineinziehen',
          description: 'Unterstützung für MP4, MOV, WebM, AVI und MKV. Die Datei verbleibt auf Ihrem PC.',
        },
        {
          step: 2,
          title: 'Schnittpunkte präzise festlegen',
          description: 'Verschieben Sie die Regler oder geben Sie Zeitmarken auf die Millisekunde genau ein.',
        },
        {
          step: 3,
          title: 'Vorschau & sofortiger Download',
          description: 'Prüfen Sie den Clip in einer Schleife und laden Sie das getrimmte Video ohne Wasserzeichen herunter.',
        },
      ],
      faqs: [
        {
          question: 'Werden meine Videos auf Server übertragen?',
          answer: 'Nein, niemals. OnlineTrimmer nutzt WebAssembly direkt im Browser für maximale Datensicherheit.',
        },
        {
          question: 'Gibt es störende Wasserzeichen?',
          answer: 'Nein, alle Exporte sind frei von Werbung, Logos und versteckten Gebühren.',
        },
      ],
    },

    'audio-trimmer': {
      h1: 'Kostenloser Audio-Trimmer & MP3-Cutter Online',
      subheading: 'Schneiden Sie Lieder, Podcasts und Sprachnotizen direkt im Webbrowser mit interaktiver Wellenform.',
      howItWorks: [
        {
          step: 1,
          title: 'Audiodatei hochladen',
          description: 'Laden Sie MP3, WAV oder M4A; die Wellenform wird lokal in Sekundenschnelle visualisiert.',
        },
        {
          step: 2,
          title: 'Ausschnitt und Fade wählen',
          description: 'Aktivieren Sie Ein- und Ausblenden für harmonische Übergänge ohne Knacken.',
        },
        {
          step: 3,
          title: 'Klingelton oder MP3 speichern',
          description: 'Hören Sie die Auswahl im Loop und laden Sie die Datei herunter.',
        },
      ],
      faqs: [
        {
          question: 'Kann ich Klingeltöne für iPhone und Android erstellen?',
          answer: 'Ja, wählen Sie den 29-Sekunden-Modus und weisen Sie die Datei als Klingelton zu.',
        },
      ],
    },

    'split-pdf': {
      h1: 'PDF Dokumente Online Teilen & Seiten Extrahieren',
      subheading: 'Trennen Sie Seiten aus PDF-Dateien ohne Cloud-Upload und mit visueller Seitenvorschau.',
      howItWorks: [
        {
          step: 1,
          title: 'PDF-Datei auswählen',
          description: 'Miniaturansichten aller Seiten werden sofort im Browser dargestellt.',
        },
        {
          step: 2,
          title: 'Seiten anklicken oder Bereich angeben',
          description: 'Wählen Sie Einzelseiten oder tippen Sie Bereiche wie 1-3, 5, 8-10 ein.',
        },
        {
          step: 3,
          title: 'Neues PDF herunterladen',
          description: 'Erhalten Sie ein sauberes, kompaktes Dokument mit allen Vektoren.',
        },
      ],
      faqs: [
        {
          question: 'Sind vertrauliche Verträge geschützt?',
          answer: 'Ja, 100% client-seitig. Ihre sensiblen Dokumente verlassen Ihren Computer zu keinem Zeitpunkt.',
        },
      ],
    },

    'sign-pdf': {
      h1: 'PDF Online Signieren (Kostenlose E-Signatur)',
      subheading: 'Fügen Sie digitale Unterschriften zu Dokumenten sekundenschnell und rechtssicher hinzu.',
      howItWorks: [
        {
          step: 1,
          title: 'PDF öffnen',
          description: 'Sehen Sie das Dokument im sicheren Browser-Viewer ein.',
        },
        {
          step: 2,
          title: 'Unterschrift erstellen',
          description: 'Zeichnen Sie per Maus/Touch, tippen Sie den Namen oder laden Sie ein Signaturfoto hoch.',
        },
        {
          step: 3,
          title: 'Platzieren & Herunterladen',
          description: 'Setzen Sie die Signatur an die richtige Stelle und laden Sie die Datei herunter.',
        },
      ],
      faqs: [
        {
          question: 'Wird meine Unterschrift auf einem Server gespeichert?',
          answer: 'Nein, alle Unterschriften verbleiben im flüchtigen Browserspeicher und werden nicht gespeichert.',
        },
      ],
    },
  },

  zh: {
    'video-trimmer': {
      h1: '免费在线视频裁剪与剪辑工具',
      subheading: '在浏览器中即刻完成视频剪切与片段提取。100% 隐私安全，零服务器上传。',
      howItWorks: [
        {
          step: 1,
          title: '拖入或选择视频文件',
          description: '支持 MP4、MOV、WebM、AVI、MKV。文件纯本地处理，绝不上传云端。',
        },
        {
          step: 2,
          title: '毫秒级精准定位剪辑点',
          description: '拖动时间轴手柄或输入精确到毫秒的时间戳，实现逐帧级别的精准裁剪。',
        },
        {
          step: 3,
          title: '循环预览并即刻下载',
          description: '试看截取效果后一键导出，没有任何水印，也不压缩原片清晰度。',
        },
      ],
      faqs: [
        {
          question: '我的视频会被上传到远程服务器吗？',
          answer: '绝不会。OnlineTrimmer 基于现代 WebAssembly 技术完全在您的本地浏览器中运行。',
        },
        {
          question: '是否有水印或收费套路？',
          answer: '永久免费，绝无水印，无需注册登录，也不存在隐藏收费。',
        },
      ],
    },

    'audio-trimmer': {
      h1: '免费在线音频剪切与 MP3 音乐裁剪',
      subheading: '无需安装复杂软件，基于交互式声波图在浏览器中快速剪切歌曲、制作手机铃声。',
      howItWorks: [
        {
          step: 1,
          title: '上传音乐或音频文件',
          description: '支持 MP3、WAV、AAC、M4A 等，声学波形即刻在本地呈现。',
        },
        {
          step: 2,
          title: '圈选高潮片段与淡入淡出',
          description: '开启淡入淡出平滑过渡，彻底告别开头结尾突兀刺耳的杂音。',
        },
        {
          step: 3,
          title: '一键导出并设为手机铃声',
          description: '循环试听满意后一键下载，完美适配 iPhone 与各大安卓手机。',
        },
      ],
      faqs: [
        {
          question: '可以制作 iPhone 和安卓铃声吗？',
          answer: '可以，直接点击“铃声模式”（29秒），导出即可设置为个性来电铃声。',
        },
      ],
    },

    'split-pdf': {
      h1: '在线拆分 PDF 与页面提取工具',
      subheading: '提取指定页面或剔除多余页码，全程本地处理保护商业机密与个人隐私。',
      howItWorks: [
        {
          step: 1,
          title: '选择 PDF 文件',
          description: '浏览器本地快速解析每一页并生成高清缩略图。',
        },
        {
          step: 2,
          title: '勾选页面或输入页码区间',
          description: '单选页面或输入“1-3, 5, 8-10”等格式自由搭配。',
        },
        {
          step: 3,
          title: '导出崭新 PDF 文件',
          description: '保留全部矢量路径与文字清晰度，生成干净新文件。',
        },
      ],
      faqs: [
        {
          question: '机密文件是否会被泄露？',
          answer: '完全不会。所有页面数据仅存在于您本机的内存中，无任何联网上传。',
        },
      ],
    },

    'sign-pdf': {
      h1: '在线免费为 PDF 添加电子签名',
      subheading: '数秒内为合同和表格签入个人专属签名，无需打印即可完成签署。',
      howItWorks: [
        {
          step: 1,
          title: '打开 PDF 文档',
          description: '在安全视图中浏览文档页面。',
        },
        {
          step: 2,
          title: '生成或绘制专属签名',
          description: '支持触控板手绘、艺术签名字体输入或导入透明底图片。',
        },
        {
          step: 3,
          title: '放置签名并下载成品',
          description: '拖拽签名至指定横线处，立即下载完成签署的 PDF。',
        },
      ],
      faqs: [
        {
          question: '签名数据会被存储在云端吗？',
          answer: '不会，一旦关闭浏览器页面，所有签名数据将彻底销毁。',
        },
      ],
    },
  },

  ja: {
    'video-trimmer': {
      h1: '無料オンライン動画トリマー＆ビデオカッター',
      subheading: 'ブラウザ上で動画をすばやくカット・トリミング。完全ローカル処理で外部サーバー送信ゼロ。',
      howItWorks: [
        {
          step: 1,
          title: '動画ファイルを選択またはドロップ',
          description: 'MP4, MOV, WebM, AVI, MKV に対応。ファイルはお使いの端末内に留まります。',
        },
        {
          step: 2,
          title: 'ミリ秒単位でカット区間を指定',
          description: 'タイムラインのハンドルを動かすか正確な数値を入力してコマ送りで調整。',
        },
        {
          step: 3,
          title: 'ループ再生で確認して保存',
          description: '透かしロゴなし、画質劣化なしで即座にダウンロードできます。',
        },
      ],
      faqs: [
        {
          question: '動画は外部サーバーにアップロードされますか？',
          answer: 'いいえ、一切アップロードされません。最新の WebAssembly 技術によりすべて端末内で処理されます。',
        },
      ],
    },

    'audio-trimmer': {
      h1: '無料オンライン音声トリマー＆MP3カッター',
      subheading: '楽曲やボイスメモを波形を見ながら直感的にカット。iPhone・Android 着信音も数秒で作成。',
      howItWorks: [
        {
          step: 1,
          title: '音楽ファイルを読み込む',
          description: 'MP3, WAV, AAC, M4A などの波形を端末内ですぐに描画します。',
        },
        {
          step: 2,
          title: 'サビの範囲とフェードを設定',
          description: 'フェードイン・フェードアウトを有効にして耳障りなノイズを防ぎます。',
        },
        {
          step: 3,
          title: '切り出した音声を保存',
          description: 'ループ再生で試聴し、ワンクリックでダウンロードします。',
        },
      ],
      faqs: [
        {
          question: 'iPhone用の着信音を作れますか？',
          answer: 'はい、「着信音モード」（29秒）で書き出し、GarageBand 経由で簡単に設定できます。',
        },
      ],
    },

    'split-pdf': {
      h1: 'PDF 分割＆ページ抽出ツール（無料）',
      subheading: 'ページのサムネイルを確認しながら必要なページだけを安全に切り出せます。',
      howItWorks: [
        {
          step: 1,
          title: 'PDF を読み込む',
          description: 'ブラウザ上で各ページのプレビューが瞬時に生成されます。',
        },
        {
          step: 2,
          title: '必要なページを選択',
          description: 'サムネイルをクリックするかページ範囲（例: 1-3, 5）を入力します。',
        },
        {
          step: 3,
          title: '新しい PDF を書き出す',
          description: '文字やベクターの解像度を保ったまま新しいファイルが生成されます。',
        },
      ],
      faqs: [
        {
          question: '機密書類のセキュリティは大丈夫ですか？',
          answer: 'はい、完全クライアントサイド実行のためネットワーク上に書類が流出することはありません。',
        },
      ],
    },

    'sign-pdf': {
      h1: 'PDF オンライン電子署名（無料・プライベート）',
      subheading: '契約書や申請書に手書きサインや印影をすばやく追加できます。',
      howItWorks: [
        {
          step: 1,
          title: 'PDF を開く',
          description: '安全な内蔵ビューアでページを表示します。',
        },
        {
          step: 2,
          title: 'サインを作成',
          description: 'マウスやタッチで描画するか、手書き風文字を入力します。',
        },
        {
          step: 3,
          title: '配置して保存',
          description: '署名を所定の位置にドラッグして完了ファイルを保存します。',
        },
      ],
      faqs: [
        {
          question: 'サイン画像はサーバーに保存されますか？',
          answer: 'いいえ、タブを閉じるとブラウザのメモリから完全に消去されます。',
        },
      ],
    },
  },

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
