const fs = require('fs');
const path = require('path');

// 为每个语言定义本地化的 seoContent
const seoContentTranslations = {
  ja: {
    title: 'PDFファイルを無料で結合する方法 オンライン',
    subtitle: 'すべてのニーズに対応する最高の無料PDF結合ツール',
    intro: 'PDFファイルを無料で結合したいですか？私たちの安全なPDF結合ツールオンライン版は、登録なしで即座に複数のPDFを結合できます。',
    features: {
      title: '私たちの無料PDF結合ツールを選ぶ理由',
      feature1: 'PDFファイルを無料で無制限に結合 - 隠された制限や制約はありません',
      feature2: 'PDF結合ツール無料オンライン処理 - すべてのファイルはブラウザに残り、最大の安全性を確保',
      feature3: 'ドラッグ＆ドロップでオンライン無料PDF結合 - ドキュメントを結合する最も簡単な方法',
      feature4: '品質を維持する無料PDF結合ツール - 解像度の低下や透かしの追加なし'
    },
    howTo: {
      title: 'PDFファイルを結合する3つの簡単なステップ',
      step1: 'クリックまたはドラッグでPDFファイルを結合ツールにアップロード',
      step2: 'ドラッグ＆ドロップを使用して希望の順序でファイルを整理',
      step3: '「PDF結合」をクリックして、結合されたPDFファイルを即座にダウンロード'
    },
    useCases: {
      title: 'PDF結合ツール無料の一般的な使用例',
      case1: '複数のレポートを1つのドキュメントに結合して専門的なプレゼンテーションを作成',
      case2: 'PDFチャプターやセクションを結合して完全な電子書籍やマニュアルを作成',
      case3: 'スキャンしたページやレシートを1つの整理されたPDFファイルに結合',
      case4: '複数の請求書や明細書を結合して記録管理を容易に'
    },
    conclusion: '私たちのPDF結合ツールオンライン版は世界中の数千人のユーザーに信頼されています。今日からPDFファイルを無料で結合しましょう - 登録不要、待機時間なし、完全無料のPDF結合ツール。'
  },
  de: {
    title: 'Kostenlos PDF Dateien Zusammenfügen Online',
    subtitle: 'Der Beste Kostenlose PDF Combiner für Alle Ihre Bedürfnisse',
    intro: 'Suchen Sie nach kostenlosem PDF zusammenfügen? Unser sicherer PDF Combiner Online lässt Sie mehrere PDFs sofort ohne Registrierung zusammenfügen.',
    features: {
      title: 'Warum Unseren Kostenlosen PDF Combiner Nutzen?',
      feature1: 'PDF Dateien kostenlos mit unbegrenzten Zusammenführungen - keine versteckten Limits',
      feature2: 'PDF Combiner kostenlos Online-Verarbeitung - alle Dateien bleiben in Ihrem Browser',
      feature3: 'PDF online kostenlos zusammenführen mit Drag & Drop - einfachste Methode',
      feature4: 'Kostenloser PDF Combiner der Qualität erhält - kein Qualitätsverlust'
    },
    howTo: {
      title: 'PDF Dateien in 3 Einfachen Schritten Zusammenfügen',
      step1: 'Laden Sie Ihre PDF Dateien hoch durch Klicken oder Ziehen',
      step2: 'Ordnen Sie die Dateien in gewünschter Reihenfolge mit Drag & Drop',
      step3: 'Klicken Sie \"PDF Zusammenfügen\" und laden Sie sofort herunter'
    },
    useCases: {
      title: 'Häufige Anwendungsfälle für PDF Combiner Kostenlos',
      case1: 'Mehrere Berichte zu einem Dokument für professionelle Präsentationen zusammenfügen',
      case2: 'PDF Kapitel zusammenfügen um vollständige E-Books oder Handbücher zu erstellen',
      case3: 'Gescannte Seiten oder Belege in einer organisierten PDF Datei zusammenfügen',
      case4: 'Mehrere Rechnungen oder Kontoauszüge für einfache Aufbewahrung zusammenfügen'
    },
    conclusion: 'Unser PDF Combiner Online wird von tausenden Benutzern weltweit vertraut. Starten Sie heute PDF Dateien kostenlos zusammenzufügen - keine Registrierung, völlig kostenloser PDF Combiner.'
  },
  fr: {
    title: 'Fusionner PDF Gratuitement en Ligne',
    subtitle: 'Le Meilleur Outil PDF Combiner Gratuit pour Tous Vos Besoins',
    intro: 'Cherchez-vous à fusionner des PDF gratuitement ? Notre outil PDF combiner sécurisé vous permet de fusionner plusieurs PDFs instantanément sans inscription.',
    features: {
      title: 'Pourquoi Utiliser Notre Outil PDF Combiner Gratuit ?',
      feature1: 'Fusionner des fichiers PDF gratuitement avec des fusions illimitées',
      feature2: 'Outil PDF combiner gratuit traitement en ligne - tous les fichiers restent dans votre navigateur',
      feature3: 'Fusionner PDF en ligne gratuit avec glisser-déposer - méthode la plus simple',
      feature4: 'Outil PDF combiner gratuit qui maintient la qualité - aucune perte de résolution'
    },
    howTo: {
      title: 'Comment Fusionner des Fichiers PDF en 3 Étapes Simples',
      step1: 'Téléchargez vos fichiers PDF en cliquant ou en les faisant glisser',
      step2: 'Organisez les fichiers dans l\'ordre souhaité avec glisser-déposer',
      step3: 'Cliquez sur \"Fusionner PDF\" et téléchargez instantanément'
    },
    useCases: {
      title: 'Cas d\'Usage Courants pour Outil PDF Combiner Gratuit',
      case1: 'Fusionner plusieurs rapports en un seul document pour des présentations professionnelles',
      case2: 'Fusionner des chapitres PDF pour créer des livres électroniques ou manuels complets',
      case3: 'Fusionner des pages scannées ou des reçus dans un fichier PDF organisé',
      case4: 'Fusionner plusieurs factures ou relevés pour une tenue de records facile'
    },
    conclusion: 'Notre outil PDF combiner en ligne est approuvé par des milliers d\'utilisateurs dans le monde. Commencez à fusionner des fichiers PDF gratuitement aujourd\'hui - pas d\'inscription, outil PDF combiner entièrement gratuit.'
  },
  pt: {
    title: 'Combinar Arquivos PDF Grátis Online',
    subtitle: 'O Melhor Combinador PDF Grátis para Todas as Suas Necessidades',
    intro: 'Procurando combinar arquivos PDF grátis? Nosso combinador PDF online seguro permite combinar múltiplos PDFs instantaneamente sem registro.',
    features: {
      title: 'Por Que Usar Nosso Combinador PDF Grátis?',
      feature1: 'Combinar arquivos PDF grátis com combinações ilimitadas - sem limites ocultos',
      feature2: 'Combinador PDF grátis processamento online - todos os arquivos ficam no seu navegador',
      feature3: 'Combinar PDF online grátis com arrastar e soltar - método mais fácil',
      feature4: 'Combinador PDF grátis que mantém qualidade - sem perda de resolução'
    },
    howTo: {
      title: 'Como Combinar Arquivos PDF em 3 Passos Simples',
      step1: 'Carregue seus arquivos PDF clicando ou arrastando',
      step2: 'Organize os arquivos na ordem desejada com arrastar e soltar',
      step3: 'Clique em \"Combinar PDF\" e baixe instantaneamente'
    },
    useCases: {
      title: 'Casos de Uso Comuns para Combinador PDF Grátis',
      case1: 'Combinar múltiplos relatórios em um único documento para apresentações profissionais',
      case2: 'Combinar capítulos PDF para criar e-books ou manuais completos',
      case3: 'Combinar páginas escaneadas ou recibos em um arquivo PDF organizado',
      case4: 'Combinar múltiplas faturas ou extratos para fácil manutenção de registros'
    },
    conclusion: 'Nosso combinador PDF online é confiado por milhares de usuários em todo o mundo. Comece a combinar arquivos PDF grátis hoje - sem registro, completamente grátis combinador PDF.'
  },
  ar: {
    title: 'كيفية دمج ملفات PDF مجانًا أونلاين',
    subtitle: 'أفضل أداة دمج PDF مجانية لجميع احتياجاتك',
    intro: 'هل تبحث عن دمج ملفات PDF مجانًا؟ أداة دمج PDF الآمنة لدينا تتيح لك دمج ملفات PDF متعددة فورًا بدون تسجيل.',
    features: {
      title: 'لماذا استخدام أداة دمج PDF المجانية لدينا؟',
      feature1: 'ادمج ملفات PDF مجانًا مع عمليات دمج غير محدودة - بدون حدود مخفية',
      feature2: 'أداة دمج PDF مجانية معالجة أونلاين - جميع الملفات تتبقى في متصفحك',
      feature3: 'ادمج PDF أونلاين مجانًا مع السحب والإفلات - أسهل طريقة',
      feature4: 'أداة دمج PDF مجانية تحافظ على الجودة - بدون فقدان في الدقة'
    },
    howTo: {
      title: 'كيفية دمج ملفات PDF في 3 خطوات بسيطة',
      step1: 'قم بتحميل ملفات PDF الخاصة بك بالنقر أو السحب',
      step2: 'رتب الملفات بالترتيب المطلوب باستخدام السحب والإفلات',
      step3: 'انقر فوق \"دمج PDF\" وقم بالتنزيل فورًا'
    },
    useCases: {
      title: 'حالات الاستخدام الشائعة لأداة دمج PDF المجانية',
      case1: 'دمج تقارير متعددة في مستند واحد للعروض التقديمية الاحترافية',
      case2: 'دمج فصول PDF لإنشاء كتب إلكترونية أو أدلة كاملة',
      case3: 'دمج صفحات ممسوحة ضوئيًا أو إيصالات في ملف PDF منظم',
      case4: 'دمج فواتير أو كشوف حسابات متعددة للحفاظ على السجلات بسهولة'
    },
    conclusion: 'أداة دمج PDF الأونلاين الخاصة بنا موثوقة من قبل آلاف المستخدمين حول العالم. ابدأ في دمج ملفات PDF مجانًا اليوم - بدون تسجيل، أداة دمج PDF مجانية بالكامل.'
  },
  ko: {
    title: '온라인에서 PDF 파일을 무료로 병합하는 방법',
    subtitle: '모든 요구사항을 위한 최고의 무료 PDF 병합 도구',
    intro: 'PDF 파일을 무료로 병합하고 싶으신가요? 우리의 안전한 PDF 병합 도구 온라인은 등록 없이 즉시 여러 PDF를 병합할 수 있습니다.',
    features: {
      title: '우리의 무료 PDF 병합 도구를 사용하는 이유는?',
      feature1: '무제한 병합으로 PDF 파일을 무료로 병합 - 숨겨진 제한 없음',
      feature2: 'PDF 병합 도구 무료 온라인 처리 - 모든 파일이 브라우저에 유지됨',
      feature3: '드래그 앤 드롭으로 온라인에서 PDF를 무료로 병합 - 가장 쉬운 방법',
      feature4: '품질을 유지하는 무료 PDF 병합 도구 - 해상도 손실 없음'
    },
    howTo: {
      title: '3가지 간단한 단계로 PDF 파일 병합',
      step1: '클릭하거나 드래그하여 PDF 파일 업로드',
      step2: '드래그 앤 드롭을 사용하여 원하는 순서대로 파일 정렬',
      step3: '\'PDF 병합\'을 클릭하고 즉시 다운로드'
    },
    useCases: {
      title: '무료 PDF 병합 도구의 일반적인 사용 사례',
      case1: '여러 보고서를 하나의 문서로 병합하여 전문 프레젠테이션 만들기',
      case2: 'PDF 장을 병합하여 완전한 전자책 또는 매뉴얼 만들기',
      case3: '스캔한 페이지 또는 영수증을 정리된 PDF 파일로 병합',
      case4: '여러 송장 또는 명세서를 병합하여 쉬운 기록 유지'
    },
    conclusion: '우리의 PDF 병합 도구 온라인은 전 세계 수천 명의 사용자에게 신뢰를 받습니다. 오늘 PDF 파일을 무료로 병합을 시작하세요 - 등록 불필요, 완전히 무료 PDF 병합 도구.'
  },
  'zh-tw': {
    title: '如何免費合併PDF檔案 線上工具',
    subtitle: '最佳免費PDF合併工具 滿足您所有需求',
    intro: '想要免費合併PDF檔案？我們安全的PDF合併工具線上版讓您無需註冊即可即時合併多個PDF。',
    features: {
      title: '為什麼選擇我們的免費PDF合併工具？',
      feature1: '免費合併PDF檔案，無限制合併 - 沒有隱藏限制或約束',
      feature2: 'PDF合併工具免費線上處理 - 所有檔案保留在您的瀏覽器中以確保最大安全性',
      feature3: '線上合併PDF免費，使用拖放介面 - 合併文件最簡單的方法',
      feature4: '免費PDF合併工具保持品質 - 無解析度損失或添加浮水印'
    },
    howTo: {
      title: '如何合併PDF檔案 3個簡單步驟',
      step1: '通過點擊或拖曳將PDF檔案上傳到合併工具',
      step2: '使用拖放功能按所需順序排列檔案',
      step3: '點擊「合併PDF」並立即下載合併後的PDF檔案'
    },
    useCases: {
      title: 'PDF合併工具免費 常見用途',
      case1: '將多個報告合併為一個文件以進行專業演示',
      case2: '合併PDF章節或章節以創建完整的電子書或手冊',
      case3: '將掃描的頁面或收據合併到一個有組織的PDF檔案中',
      case4: '合併多個發票或對帳單以便於記錄保存'
    },
    conclusion: '我們的PDF合併工具線上版受到全球數千名用戶的信賴。今天開始免費合併PDF檔案 - 無需註冊，無需等待，完全免費的PDF合併工具。'
  }
};

const languages = ['ja', 'de', 'fr', 'pt', 'ar', 'ko', 'zh-tw'];

console.log('🔄 更新所有语言版本的 seoContent...\n');

languages.forEach(lang => {
  const filePath = path.join(__dirname, 'messages', `${lang}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // 更新 seoContent
  data.common.seoContent = seoContentTranslations[lang];

  // 保存文件
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(`✅ 已更新 ${lang.toUpperCase()}.json`);
});

console.log('\n✅ 所有语言版本的 seoContent 已更新！');
console.log('\n📝 更新内容:');
console.log('   - 日语');
console.log('   - 德语');
console.log('   - 法语');
console.log('   - 葡萄牙语');
console.log('   - 阿拉伯语');
console.log('   - 韩语');
console.log('   - 繁体中文');
