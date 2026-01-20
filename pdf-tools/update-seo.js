const fs = require('fs');
const path = require('path');

const languages = ['ja', 'de', 'fr', 'pt', 'ar', 'ko', 'zh-tw'];

const seoTemplates = {
  ja: {
    home: {
      title: 'PDFファイル無料結合 - 無料PDF結合ツールオンライン | PDF結合無料 登録不要',
      description: 'PDFファイルを無料で結合する安全なツール。結合、分割、圧縮オンライン。登録不要、制限なし、透かしなし。100% 無料PDF結合ツール。',
      keywords: 'PDFファイル無料結合,PDF結合無料,無料PDF結合ツール,PDF結合オンライン,PDFマージ無料,PDF結合ツール'
    },
    appName: '無料PDF結合ツール - PDFファイル無料結合',
    tagline: 'PDFファイルを無料で結合オンライン。高速で安全なPDF結合ツール、登録不要。'
  },
  de: {
    home: {
      title: 'Kostenlos PDF Dateien Zusammenfügen - Kostenloser PDF Combiner Online | PDF Zusammenfügen Kostenlos',
      description: 'PDF Dateien kostenlos mit unserem sicheren PDF Combiner zusammenfügen. Zusammenfügen, teilen, komprimieren online. Keine Registrierung, keine Limits, keine Wasserzeichen.',
      keywords: 'kostenlos pdf dateien zusammenfügen, pdf zusammenfügen kostenlos, pdf combiner kostenlos, pdf online zusammenfügen, pdfs zusammenfügen'
    },
    appName: 'Kostenloser PDF Combiner - PDF Dateien Kostenlos Zusammenfügen',
    tagline: 'PDF Dateien kostenlos online zusammenfügen. Schneller, sicherer PDF Combiner ohne Registrierung.'
  },
  fr: {
    home: {
      title: 'Fusionner PDF Gratuitement - Outil PDF Combiner Gratuit en Ligne | Fusion PDF Gratuit',
      description: 'Fusionnez des fichiers PDF gratuitement avec notre outil PDF combiner sécurisé. Fusionner, diviser, compresser en ligne. Pas d\'inscription, pas de limites, pas de filigrane.',
      keywords: 'fusionner pdf gratuitement, combiner pdf gratuit, fusionner fichiers pdf, outil pdf gratuit, combiner pdf en ligne'
    },
    appName: 'Outil PDF Combiner Gratuit - Fusionner PDF Gratuitement',
    tagline: 'Fusionnez des fichiers PDF gratuitement en ligne. Outil PDF combiner rapide et sécurisé sans inscription.'
  },
  pt: {
    home: {
      title: 'Combinar Arquivos PDF Grátis - Combinador PDF Grátis Online | Juntar PDF Grátis',
      description: 'Combine arquivos PDF grátis com nosso combinador PDF seguro. Combinar, dividir, comprimir online. Sem registro, sem limites, sem marca d\'água.',
      keywords: 'combinar arquivos pdf grátis, combinar pdf grátis, combinador pdf grátis, juntar pdf grátis, unir pdf online'
    },
    appName: 'Combinador PDF Grátis - Combinar Arquivos PDF Grátis',
    tagline: 'Combinar arquivos PDF grátis online. Combinador PDF rápido e seguro sem registro.'
  },
  ar: {
    home: {
      title: 'دمج ملفات PDF مجاناً - أداة دمج PDF مجانية أونلاين | دمج PDF مجانًا',
      description: 'ادمج ملفات PDF مجانًا مع أداة دمج PDF الآمنة. دمج، تقسيم، ضغط أونلاين. بدون تسجيل، بدون حدود، بدون علامة مائية.',
      keywords: 'دمج ملفات pdf مجانا, دمج pdf مجانى, أداة دمج pdf مجانية, دمج pdf أونلاين, جمع ملفات pdf'
    },
    appName: 'أداة دمج PDF مجانية - دمج ملفات PDF مجاناً',
    tagline: 'ادمج ملفات PDF مجانًا أونلاين. أداة دمج PDF سريعة وآمنة بدون تسجيل.'
  },
  ko: {
    home: {
      title: 'PDF 파일 무료 병합 - 무료 PDF 병합 도구 온라인 | PDF 병합 무료',
      description: '보안 PDF 병합 도구로 PDF 파일을 무료로 병합하세요. 병합, 분할, 압축 온라인. 등록 불필요, 제한 없음, 워터마크 없음.',
      keywords: 'pdf 파일 무료 병합, pdf 병합 무료, 무료 pdf 병합 도구, pdf 온라인 병합, pdf 합치기'
    },
    appName: '무료 PDF 병합 도구 - PDF 파일 무료 병합',
    tagline: 'PDF 파일을 온라인에서 무료로 병합하세요. 빠르고 안전한 PDF 병합 도구, 등록 불필요.'
  },
  'zh-tw': {
    home: {
      title: '免費合併PDF檔案 - 免費PDF合併工具線上 | 合併PDF免費 無需註冊',
      description: '免費合併PDF檔案，使用我們安全的PDF合併工具。線上合併、分割、壓縮PDF。無需註冊，無限制，無浮水印。100% 免費PDF合併工具。',
      keywords: '免費合併pdf檔案, 合併pdf免費, pdf合併工具免費, 免費pdf合併, pdf免費合併, 線上合併pdf免費'
    },
    appName: '免費PDF合併工具 - 免費合併PDF檔案',
    tagline: '免費合併PDF檔案線上工具。快速、安全的PDF合併工具，無需註冊。'
  }
};

const defaultSeoContent = {
  en: {
    title: 'How to Combine PDF Files Free Online',
    subtitle: 'The Best Free PDF Combiner for All Your Needs',
    intro: 'Looking to combine PDF files free? Our secure PDF combiner free online tool lets you merge multiple PDFs instantly without any registration.',
    features: {
      title: 'Why Use Our Free PDF Combiner?',
      feature1: 'Combine PDF files free with unlimited merges',
      feature2: 'PDF combiner free online - secure browser processing',
      feature3: 'Combine PDF online free with drag & drop',
      feature4: 'Free PDF combiner that maintains quality'
    },
    howTo: {
      title: 'How to Combine PDF Files in 3 Steps',
      step1: 'Upload your PDF files',
      step2: 'Arrange the files in order',
      step3: 'Click Combine PDF and download'
    },
    useCases: {
      title: 'Common Use Cases',
      case1: 'Combine multiple reports',
      case2: 'Merge PDF chapters',
      case3: 'Combine scanned pages',
      case4: 'Join multiple invoices'
    },
    conclusion: 'Start combining PDF files free today - no registration, completely free PDF combiner.'
  }
};

languages.forEach(lang => {
  const filePath = path.join(__dirname, 'messages', `${lang}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // Add home SEO if missing
  if (!data.seo.home) {
    data.seo.home = seoTemplates[lang].home;
  }

  // Update appName and tagline
  if (seoTemplates[lang].appName) {
    data.common.appName = seoTemplates[lang].appName;
  }
  if (seoTemplates[lang].tagline) {
    data.common.tagline = seoTemplates[lang].tagline;
  }

  // Add seoContent if missing
  if (!data.common.seoContent) {
    data.common.seoContent = defaultSeoContent.en;
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(`Updated ${lang}.json`);
});

console.log('All language files updated successfully!');
