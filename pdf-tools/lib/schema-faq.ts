interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchema {
  "@context": string;
  "@type": string;
  mainEntity: Array<{
    "@type": string;
    name: string;
    acceptedAnswer: {
      "@type": string;
      text: string;
    };
  }>;
}

export function generateFAQSchema(faqs: FAQItem[]): FAQSchema {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export const toolFAQs = {
  merge: {
    en: [
      {
        question: "How to combine PDF files free?",
        answer: "Upload your PDF files, arrange them in desired order, and click 'Combine PDF'. Your merged PDF will be ready instantly.",
      },
      {
        question: "Is there a limit on how many PDFs I can combine?",
        answer: "No, you can combine unlimited PDF files. There's no restriction on the number or size of files.",
      },
      {
        question: "Can I combine password-protected PDFs?",
        answer: "Yes, but you'll need to remove the password first using our Decrypt PDF tool.",
      },
    ],
    zh: [
      {
        question: "如何免费合并PDF文件？",
        answer: "上传您的PDF文件，按所需顺序排列，然后点击'合并PDF'。合并后的PDF将立即可用。",
      },
      {
        question: "合并PDF文件有限制吗？",
        answer: "没有限制，您可以合并无限数量的PDF文件。对文件数量或大小没有限制。",
      },
      {
        question: "可以合并受密码保护的PDF吗？",
        answer: "可以，但您需要先使用我们的PDF解密工具删除密码。",
      },
    ],
    ar: [
      {
        question: "كيف يمكنني دمج ملفات PDF مجاناً؟",
        answer: "قم بتحميل ملفات PDF الخاصة بك، رتبها بالترتيب المطلوب، ثم انقر على 'دمج PDF'. سيكون ملف PDF المدمج جاهزاً فوراً.",
      },
      {
        question: "هل هناك حد لعدد ملفات PDF التي يمكن دمجها؟",
        answer: "لا، يمكنك دمج عدد غير محدود من ملفات PDF. لا توجد قيود على عدد أو حجم الملفات.",
      },
      {
        question: "هل يمكنني دمج ملفات PDF المحمية بكلمة مرور؟",
        answer: "نعم، ولكن ستحتاج إلى إزالة كلمة المرور أولاً باستخدام أداة فك تشفير PDF الخاصة بنا.",
      },
    ],
    pt: [
      {
        question: "Como combinar arquivos PDF gratuitamente?",
        answer: "Carregue seus arquivos PDF, organize-os na ordem desejada e clique em 'Combinar PDF'. Seu PDF combinado ficará pronto instantaneamente.",
      },
      {
        question: "Existe um limite de quantos PDFs posso combinar?",
        answer: "Não, você pode combinar arquivos PDF ilimitados. Não há restrições sobre o número ou tamanho dos arquivos.",
      },
      {
        question: "Posso combinar PDFs protegidos por senha?",
        answer: "Sim, mas você precisará remover a senha primeiro usando nossa ferramenta Descriptografar PDF.",
      },
    ],
    'zh-tw': [
      {
        question: "如何免費合併 PDF 檔案？",
        answer: "上傳您的 PDF 檔案，按所需順序排列，然後點擊「合併 PDF」。合併後的 PDF 將立即可用。",
      },
      {
        question: "合併 PDF 檔案有限制嗎？",
        answer: "沒有限制，您可以合併無限數量的 PDF 檔案。對檔案數量或大小沒有限制。",
      },
      {
        question: "可以合併受密碼保護的 PDF 嗎？",
        answer: "可以，但您需要先使用我們的 PDF 解密工具刪除密碼。",
      },
    ],
  },
  split: {
    en: [
      {
        question: "How to split a PDF file?",
        answer: "Upload your PDF, choose split mode (page range, single pages, or every N pages), and click 'Split PDF'.",
      },
      {
        question: "Can I split specific pages from a PDF?",
        answer: "Yes, use the page range mode to specify which pages to extract (e.g., 1-3, 5, 7-9).",
      },
      {
        question: "Is the split quality preserved?",
        answer: "Absolutely. Our tool maintains the original quality of all pages during splitting.",
      },
    ],
    zh: [
      {
        question: "如何分割PDF文件？",
        answer: "上传您的PDF，选择分割模式（页面范围、单页或每N页），然后点击'分割PDF'。",
      },
      {
        question: "可以从PDF中提取特定页面吗？",
        answer: "可以，使用页面范围模式指定要提取的页面（例如：1-3, 5, 7-9）。",
      },
      {
        question: "分割后页面质量会保留吗？",
        answer: "当然。我们的工具在分割过程中保持所有页面的原始质量。",
      },
    ],
    ar: [
      {
        question: "كيف يمكنني تقسيم ملف PDF؟",
        answer: "قم بتحميل ملف PDF الخاص بك، اختر وضع التقسيم (نطاق الصفحات، صفحات فردية، أو كل N صفحة)، ثم انقر على 'تقسيم PDF'.",
      },
      {
        question: "هل يمكنني تقسيم صفحات محددة من ملف PDF؟",
        answer: "نعم، استخدم وضع نطاق الصفحات لتحديد الصفحات التي تريد استخراجها (على سبيل المثال: 1-3، 5، 7-9).",
      },
      {
        question: "هل يتم الحفاظ على الجودة بعد التقسيم؟",
        answer: "بالتأكيد. تحافظ أداةنا على الجودة الأصلية لجميع الصفحات أثناء التقسيم.",
      },
    ],
    pt: [
      {
        question: "Como dividir um arquivo PDF?",
        answer: "Carregue seu PDF, escolha o modo de divisão (intervalo de páginas, páginas individuais ou a cada N páginas) e clique em 'Dividir PDF'.",
      },
      {
        question: "Posso dividir páginas específicas de um PDF?",
        answer: "Sim, use o modo de intervalo de páginas para especificar quais páginas extrair (por exemplo, 1-3, 5, 7-9).",
      },
      {
        question: "A qualidade é preservada após a divisão?",
        answer: "Absolutamente. Nossa ferramenta mantém a qualidade original de todas as páginas durante a divisão.",
      },
    ],
    'zh-tw': [
      {
        question: "如何分割 PDF 檔案？",
        answer: "上傳您的 PDF，選擇分割模式（頁面範圍、單頁或每 N 頁），然後點擊「分割 PDF」。",
      },
      {
        question: "可以從 PDF 中提取特定頁面嗎？",
        answer: "可以，使用頁面範圍模式指定要提取的頁面（例如：1-3, 5, 7-9）。",
      },
      {
        question: "分割後頁面品質會保留嗎？",
        answer: "當然。我們的工具在分割過程中保持所有頁面的原始品質。",
      },
    ],
  },
  extract: {
    en: [
      {
        question: "How to extract pages from PDF?",
        answer: "Upload your PDF, select pages you want to extract (by range or individually), and click 'Extract Pages'.",
      },
      {
        question: "Can I extract non-consecutive pages?",
        answer: "Yes, you can select specific pages like 1, 3, 5, 7-9 to extract any combination you need.",
      },
      {
        question: "Will extracting pages affect the original PDF?",
        answer: "No, the original file remains unchanged. You'll get a new PDF with the extracted pages.",
      },
    ],
    zh: [
      {
        question: "如何从PDF中提取页面？",
        answer: "上传您的PDF，选择要提取的页面（按范围或单独选择），然后点击'提取页面'。",
      },
      {
        question: "可以提取不连续的页面吗？",
        answer: "可以，您可以选择特定页面如 1, 3, 5, 7-9 来提取您需要的任何组合。",
      },
      {
        question: "提取页面会影响原始PDF吗？",
        answer: "不会，原始文件保持不变。您将获得一个包含提取页面的新PDF。",
      },
    ],
    ar: [
      {
        question: "كيف يمكنني استخراج صفحات من ملف PDF؟",
        answer: "قم بتحميل ملف PDF الخاص بك، حدد الصفحات التي تريد استخراجها (حسب النطاق أو بشكل فردي)، ثم انقر على 'استخراج الصفحات'.",
      },
      {
        question: "هل يمكنني استخراج صفحات غير متتالية؟",
        answer: "نعم، يمكنك تحديد صفحات محددة مثل 1، 3، 5، 7-9 لاستخراج أي مجموعة تحتاجها.",
      },
      {
        question: "هل سيؤثر استخراج الصفحات على ملف PDF الأصلي؟",
        answer: "لا، يظل الملف الأصلي دون تغيير. ستحصل على ملف PDF جديد يحتوي على الصفحات المستخرجة.",
      },
    ],
    pt: [
      {
        question: "Como extrair páginas de um PDF?",
        answer: "Carregue seu PDF, selecione as páginas que deseja extrair (por intervalo ou individualmente) e clique em 'Extrair Páginas'.",
      },
      {
        question: "Posso extrair páginas não consecutivas?",
        answer: "Sim, você pode selecionar páginas específicas como 1, 3, 5, 7-9 para extrair qualquer combinação que precisar.",
      },
      {
        question: "A extração de páginas afetará o PDF original?",
        answer: "Não, o arquivo original permanece inalterado. Você receberá um novo PDF com as páginas extraídas.",
      },
    ],
    'zh-tw': [
      {
        question: "如何從 PDF 中提取頁面？",
        answer: "上傳您的 PDF，選擇要提取的頁面（按範圍或單獨選擇），然後點擊「提取頁面」。",
      },
      {
        question: "可以提取不連續的頁面嗎？",
        answer: "可以，您可以選擇特定頁面如 1, 3, 5, 7-9 來提取您需要的任何組合。",
      },
      {
        question: "提取頁面會影響原始 PDF 嗎？",
        answer: "不會，原始檔案保持不變。您將獲得一個包含提取頁面的新 PDF。",
      },
    ],
  },
  compress: {
    en: [
      {
        question: "How does PDF compression work?",
        answer: "Our tool removes unused objects and optimizes PDF structure to reduce file size while maintaining quality.",
      },
      {
        question: "Will compressing affect image quality?",
        answer: "We focus on removing unnecessary data rather than compressing images, so quality loss is minimal.",
      },
      {
        question: "What's the maximum compression achievable?",
        answer: "Compression results vary by file. Some PDFs can be reduced by 50% or more depending on their content.",
      },
    ],
    zh: [
      {
        question: "PDF压缩是如何工作的？",
        answer: "我们的工具删除未使用的对象并优化PDF结构以减小文件大小，同时保持质量。",
      },
      {
        question: "压缩会影响图像质量吗？",
        answer: "我们专注于删除不必要的数据而不是压缩图像，因此质量损失很小。",
      },
      {
        question: "最大能压缩多少？",
        answer: "压缩结果因文件而异。某些PDF可以根据其内容减少50%或更多。",
      },
    ],
    ar: [
      {
        question: "كيف يعمل ضغط PDF؟",
        answer: "تقوم أداةنا بإزالة الكائنات غير المستخدمة وتحسين هيكل PDF لتقليل حجم الملف مع الحفاظ على الجودة.",
      },
      {
        question: "هل سيؤثر الضغط على جودة الصورة؟",
        answer: "نحن نركز على إزالة البيانات غير الضرورية بدلاً من ضغط الصور، لذا فإن فقدان الجودة ضئيل.",
      },
      {
        question: "ما هو أقصى ضغط يمكن تحقيقه؟",
        answer: "تختلف نتائج الضغط حسب الملف. يمكن تقليل بعض ملفات PDF بنسبة 50% أو أكثر حسب محتواها.",
      },
    ],
    pt: [
      {
        question: "Como funciona a compressão de PDF?",
        answer: "Nossa ferramenta remove objetos não utilizados e otimiza a estrutura do PDF para reduzir o tamanho mantendo a qualidade.",
      },
      {
        question: "A compressão afetará a qualidade da imagem?",
        answer: "Focamos na remoção de dados desnecessários em vez de comprimir imagens, então a perda de qualidade é mínima.",
      },
      {
        question: "Qual é a compressão máxima alcançável?",
        answer: "Os resultados de compressão variam de acordo com o arquivo. Alguns PDFs podem ser reduzidos em 50% ou mais, dependendo do seu conteúdo.",
      },
    ],
    'zh-tw': [
      {
        question: "PDF 壓縮是如何運作的？",
        answer: "我們的工具刪除未使用的物件並優化 PDF 結構以減小檔案大小，同時保持品質。",
      },
      {
        question: "壓縮會影響影像品質嗎？",
        answer: "我們專注於刪除不必要的資料而不是壓縮影像，因此品質損失很小。",
      },
      {
        question: "最大能壓縮多少？",
        answer: "壓縮結果因檔案而異。某些 PDF 可以根據其內容減少 50% 或更多。",
      },
    ],
  },
  rotate: {
    en: [
      {
        question: "How to rotate PDF pages?",
        answer: "Upload your PDF, select rotation angle for each page (90°, 180°, 270°), and click 'Rotate PDF'.",
      },
      {
        question: "Can I rotate specific pages only?",
        answer: "Yes, you can select different rotation angles for individual pages as needed.",
      },
      {
        question: "Will rotating affect PDF quality?",
        answer: "No, rotation is a lossless operation. Your PDF quality remains exactly the same.",
      },
    ],
    zh: [
      {
        question: "如何旋转PDF页面？",
        answer: "上传您的PDF，为每页选择旋转角度（90°、180°、270°），然后点击'旋转PDF'。",
      },
      {
        question: "可以只旋转特定页面吗？",
        answer: "可以，您可以根据需要为单个页面选择不同的旋转角度。",
      },
      {
        question: "旋转会影响PDF质量吗？",
        answer: "不会，旋转是无损操作。您的PDF质量保持完全相同。",
      },
    ],
    ar: [
      {
        question: "كيف يمكنني تدوير صفحات PDF؟",
        answer: "قم بتحميل ملف PDF الخاص بك، حدد زاوية التدوير لكل صفحة (90°، 180°، 270°)، ثم انقر على 'تدوير PDF'.",
      },
      {
        question: "هل يمكنني تدوير صفحات محددة فقط؟",
        answer: "نعم، يمكنك تحديد زوايا تدوير مختلفة للصفحات الفردية حسب الحاجة.",
      },
      {
        question: "هل سيؤثر التدوير على جودة PDF؟",
        answer: "لا، التدوير عملية بدون فقدان. تظل جودة PDF الخاصة بك تماماً كما هي.",
      },
    ],
    pt: [
      {
        question: "Como rotacionar páginas PDF?",
        answer: "Carregue seu PDF, selecione o ângulo de rotação para cada página (90°, 180°, 270°) e clique em 'Rotacionar PDF'.",
      },
      {
        question: "Posso rotacionar apenas páginas específicas?",
        answer: "Sim, você pode selecionar diferentes ângulos de rotação para páginas individuais conforme necessário.",
      },
      {
        question: "A rotação afetará a qualidade do PDF?",
        answer: "Não, a rotação é uma operação sem perdas. A qualidade do seu PDF permanece exatamente a mesma.",
      },
    ],
    'zh-tw': [
      {
        question: "如何旋轉 PDF 頁面？",
        answer: "上傳您的 PDF，為每頁選擇旋轉角度（90°、180°、270°），然後點擊「旋轉 PDF」。",
      },
      {
        question: "可以只旋轉特定頁面嗎？",
        answer: "可以，您可以根據需要為單個頁面選擇不同的旋轉角度。",
      },
      {
        question: "旋轉會影響 PDF 品質嗎？",
        answer: "不會，旋轉是無損操作。您的 PDF 品質保持完全相同。",
      },
    ],
  },
  'delete-pages': {
    en: [
      {
        question: "How to delete pages from PDF?",
        answer: "Upload your PDF, select the pages you want to remove, and click 'Delete Pages'.",
      },
      {
        question: "Can I delete multiple pages at once?",
        answer: "Yes, you can select multiple pages to delete them all at once.",
      },
      {
        question: "Is the original PDF kept?",
        answer: "Yes, you'll download a new PDF without the deleted pages. The original file remains unchanged.",
      },
    ],
    zh: [
      {
        question: "如何从PDF中删除页面？",
        answer: "上传您的PDF，选择要删除的页面，然后点击'删除页面'。",
      },
      {
        question: "可以一次删除多个页面吗？",
        answer: "可以，您可以选择多个页面一次性删除它们。",
      },
      {
        question: "原始PDF会保留吗？",
        answer: "会，您将下载一个没有已删除页面的新PDF。原始文件保持不变。",
      },
    ],
    ar: [
      {
        question: "كيف يمكنني حذف صفحات من ملف PDF؟",
        answer: "قم بتحميل ملف PDF الخاص بك، حدد الصفحات التي تريد إزالتها، ثم انقر على 'حذف الصفحات'.",
      },
      {
        question: "هل يمكنني حذف صفحات متعددة دفعة واحدة؟",
        answer: "نعم، يمكنك تحديد صفحات متعددة لحذفها جميعاً دفعة واحدة.",
      },
      {
        question: "هل يتم الاحتفاظ بملف PDF الأصلي؟",
        answer: "نعم، ستحصل على ملف PDF جديد بدون الصفحات المحذوفة. يظل الملف الأصلي دون تغيير.",
      },
    ],
    pt: [
      {
        question: "Como excluir páginas de um PDF?",
        answer: "Carregue seu PDF, selecione as páginas que deseja remover e clique em 'Excluir Páginas'.",
      },
      {
        question: "Posso excluir várias páginas de uma vez?",
        answer: "Sim, você pode selecionar várias páginas para excluí-las todas de uma vez.",
      },
      {
        question: "O PDF original é mantido?",
        answer: "Sim, você receberá um novo PDF sem as páginas excluídas. O arquivo original permanece inalterado.",
      },
    ],
    'zh-tw': [
      {
        question: "如何從 PDF 中刪除頁面？",
        answer: "上傳您的 PDF，選擇要刪除的頁面，然後點擊「刪除頁面」。",
      },
      {
        question: "可以一次刪除多個頁面嗎？",
        answer: "可以，您可以選擇多個頁面一次性刪除它們。",
      },
      {
        question: "原始 PDF 會保留嗎？",
        answer: "會，您將下載一個沒有已刪除頁面的新 PDF。原始檔案保持不變。",
      },
    ],
  },
  reorder: {
    en: [
      {
        question: "How to reorder PDF pages?",
        answer: "Upload your PDF, then drag and drop pages to rearrange them in your desired order.",
      },
      {
        question: "Is there a limit to how many pages I can reorder?",
        answer: "No, you can reorder any number of pages in your PDF.",
      },
      {
        question: "Can I save the reordered PDF?",
        answer: "Yes, click 'Apply' to download your PDF with the new page order.",
      },
    ],
    zh: [
      {
        question: "如何重新排序PDF页面？",
        answer: "上传您的PDF，然后拖放页面按您想要的顺序重新排列它们。",
      },
      {
        question: "重新排序的页面数量有限制吗？",
        answer: "没有，您可以重新排序PDF中的任意数量的页面。",
      },
      {
        question: "可以保存重新排序的PDF吗？",
        answer: "可以，点击'应用'下载具有新页面顺序的PDF。",
      },
    ],
    ar: [
      {
        question: "كيف يمكنني إعادة ترتيب صفحات PDF؟",
        answer: "قم بتحميل ملف PDF الخاص بك، ثم اسحب وأفلت الصفحات لإعادة ترتيبها بالترتيب المطلوب.",
      },
      {
        question: "هل هناك حد لعدد الصفحات التي يمكنني إعادة ترتيبها؟",
        answer: "لا، يمكنك إعادة ترتيب أي عدد من الصفحات في ملف PDF الخاص بك.",
      },
      {
        question: "هل يمكنني حفظ ملف PDF المعاد ترتيبه؟",
        answer: "نعم، انقر على 'تطبيق' لتحميل ملف PDF الخاص بك بالترتيب الجديد للصفحات.",
      },
    ],
    pt: [
      {
        question: "Como reordenar páginas PDF?",
        answer: "Carregue seu PDF e arraste e solte as páginas para reorganizá-las na ordem desejada.",
      },
      {
        question: "Existe um limite de quantas páginas posso reordenar?",
        answer: "Não, você pode reordenar qualquer número de páginas no seu PDF.",
      },
      {
        question: "Posso salvar o PDF reordenado?",
        answer: "Sim, clique em 'Aplicar' para baixar seu PDF com a nova ordem de páginas.",
      },
    ],
    'zh-tw': [
      {
        question: "如何重新排序 PDF 頁面？",
        answer: "上傳您的 PDF，然後拖放頁面按您想要的順序重新排列它們。",
      },
      {
        question: "重新排序的頁面數量有限制嗎？",
        answer: "沒有，您可以重新排序 PDF 中的任意數量的頁面。",
      },
      {
        question: "可以儲存重新排序的 PDF 嗎？",
        answer: "可以，點擊「套用」下載具有新頁面順序的 PDF。",
      },
    ],
  },
  watermark: {
    en: [
      {
        question: "How to add watermark to PDF?",
        answer: "Upload your PDF, enter watermark text, customize appearance, and click 'Add Watermark'.",
      },
      {
        question: "Can I use Chinese text in watermarks?",
        answer: "Yes, our tool supports Chinese characters and automatically loads the required fonts.",
      },
      {
        question: "Can I adjust watermark transparency?",
        answer: "Yes, you can customize opacity, rotation, size, and position of your watermark.",
      },
    ],
    zh: [
      {
        question: "如何为PDF添加水印？",
        answer: "上传您的PDF，输入水印文本，自定义外观，然后点击'添加水印'。",
      },
      {
        question: "可以在水印中使用中文吗？",
        answer: "可以，我们的工具支持中文字符并自动加载所需的字体。",
      },
      {
        question: "可以调整水印透明度吗？",
        answer: "可以，您可以自定义水印的不透明度、旋转、大小和位置。",
      },
    ],
    ar: [
      {
        question: "كيف يمكنني إضافة علامة مائية إلى ملف PDF؟",
        answer: "قم بتحميل ملف PDF الخاص بك، أدخل نص العلامة المائية، قم بتخصيص المظهر، ثم انقر على 'إضافة علامة مائية'.",
      },
      {
        question: "هل يمكنني استخدام نص صيني في العلامات المائية؟",
        answer: "نعم، تدعم أداةنا الأحرف الصينية وتقوم تلقائياً بتحميل الخطوط المطلوبة.",
      },
      {
        question: "هل يمكنني ضبط شفافية العلامة المائية؟",
        answer: "نعم، يمكنك تخصيص الشفافية والتدوير والحجم وموضع العلامة المائية الخاصة بك.",
      },
    ],
    pt: [
      {
        question: "Como adicionar marca d'água ao PDF?",
        answer: "Carregue seu PDF, insira o texto da marca d'água, personalize a aparência e clique em 'Adicionar Marca D'água'.",
      },
      {
        question: "Posso usar texto chinês nas marcas d'água?",
        answer: "Sim, nossa ferramenta suporta caracteres chineses e carrega automaticamente as fontes necessárias.",
      },
      {
        question: "Posso ajustar a transparência da marca d'água?",
        answer: "Sim, você pode personalizar a opacidade, rotação, tamanho e posição da sua marca d'água.",
      },
    ],
    'zh-tw': [
      {
        question: "如何為 PDF 新增浮水印？",
        answer: "上傳您的 PDF，輸入浮水印文字，自訂外觀，然後點擊「新增浮水印」。",
      },
      {
        question: "可以在浮水印中使用中文嗎？",
        answer: "可以，我們的工具支援中文字符並自動載入所需的字型。",
      },
      {
        question: "可以調整浮水印透明度嗎？",
        answer: "可以，您可以自訂浮水印的不透明度、旋轉、大小和位置。",
      },
    ],
  },
  batch: {
    en: [
      {
        question: "How does batch processing work?",
        answer: "Upload multiple PDFs, select operations (merge, split, compress), and process all files at once.",
      },
      {
        question: "Is there a limit on batch size?",
        answer: "No, you can process as many files as you need simultaneously.",
      },
      {
        question: "Can I apply different operations to different files?",
        answer: "Currently, batch mode applies the same operation(s) to all uploaded files.",
      },
    ],
    zh: [
      {
        question: "批量处理如何工作？",
        answer: "上传多个PDF，选择操作（合并、分割、压缩），然后一次性处理所有文件。",
      },
      {
        question: "批量大小有限制吗？",
        answer: "没有，您可以同时处理任意数量的文件。",
      },
      {
        question: "可以对不同的文件应用不同的操作吗？",
        answer: "目前，批量模式对所有上传的文件应用相同的操作。",
      },
    ],
    ar: [
      {
        question: "كيف يعمل المعالجة المجمعة؟",
        answer: "قم بتحميل ملفات PDF متعددة، حدد العمليات (دمج، تقسيم، ضغط)، ثم عالج جميع الملفات دفعة واحدة.",
      },
      {
        question: "هل هناك حد لحجم المجموعة؟",
        answer: "لا، يمكنك معالجة أي عدد من الملفات تحتاجه في وقت واحد.",
      },
      {
        question: "هل يمكنني تطبيق عمليات مختلفة على ملفات مختلفة؟",
        answer: "حالياً، يقوم وضع المجموعة بتطبيق نفس العمليات على جميع الملفات المحملة.",
      },
    ],
    pt: [
      {
        question: "Como funciona o processamento em lote?",
        answer: "Carregue vários PDFs, selecione operações (combinar, dividir, comprimir) e processe todos os arquivos de uma vez.",
      },
      {
        question: "Existe um limite para o tamanho do lote?",
        answer: "Não, você pode processar quantos arquivos precisar simultaneamente.",
      },
      {
        question: "Posso aplicar operações diferentes a arquivos diferentes?",
        answer: "Atualmente, o modo em lote aplica a(s) mesma(s) operação(ões) a todos os arquivos carregados.",
      },
    ],
    'zh-tw': [
      {
        question: "批次處理如何運作？",
        answer: "上傳多個 PDF，選擇操作（合併、分割、壓縮），然後一次性處理所有檔案。",
      },
      {
        question: "批次大小有限制嗎？",
        answer: "沒有，您可以同時處理任意數量的檔案。",
      },
      {
        question: "可以對不同的檔案套用不同的操作嗎？",
        answer: "目前，批次模式對所有上傳的檔案套用相同的操作。",
      },
    ],
  },
  encrypt: {
    en: [
      {
        question: "How to encrypt a PDF file?",
        answer: "Note: PDF encryption is not yet supported by pdf-lib. This feature is planned for future updates.",
      },
      {
        question: "Is encryption secure?",
        answer: "When implemented, we'll use industry-standard AES encryption for PDF protection.",
      },
    ],
    zh: [
      {
        question: "如何加密PDF文件？",
        answer: "注意：pdf-lib 尚不支持 PDF 加密。此功能计划在未来的更新中实现。",
      },
      {
        question: "加密安全吗？",
        answer: "实现后，我们将使用行业标准的 AES 加密来保护 PDF。",
      },
    ],
    ar: [
      {
        question: "كيف يمكنني تشفير ملف PDF؟",
        answer: "ملاحظة: تشفير PDF غير مدعوم حتى الآن من pdf-lib. هذه الميزة مخطط لها في التحديثات المستقبلية.",
      },
      {
        question: "هل التشفير آمن؟",
        answer: "عند التنفيذ، سنستخدم تشفير AES القياسي في الصناعة لحماية PDF.",
      },
    ],
    pt: [
      {
        question: "Como criptografar um arquivo PDF?",
        answer: "Nota: Criptografia de PDF ainda não é suportada pelo pdf-lib. Este recurso está planejado para futuras atualizações.",
      },
      {
        question: "A criptografia é segura?",
        answer: "Quando implementado, usaremos criptografia AES padrão da indústria para proteção de PDF.",
      },
    ],
    'zh-tw': [
      {
        question: "如何加密 PDF 檔案？",
        answer: "注意：pdf-lib 尚不支援 PDF 加密。此功能計畫在未來的更新中實作。",
      },
      {
        question: "加密安全嗎？",
        answer: "實作後，我們將使用業界標準的 AES 加密來保護 PDF。",
      },
    ],
  },
  decrypt: {
    en: [
      {
        question: "How to decrypt a PDF file?",
        answer: "Note: PDF decryption is not yet supported by pdf-lib. This feature is planned for future updates.",
      },
      {
        question: "Can I remove password protection?",
        answer: "When implemented, you'll be able to remove passwords if you know the original password.",
      },
    ],
    zh: [
      {
        question: "如何解密PDF文件？",
        answer: "注意：pdf-lib 尚不支持 PDF 解密。此功能计划在未来的更新中实现。",
      },
      {
        question: "可以删除密码保护吗？",
        answer: "实现后，如果您知道原始密码，就可以删除密码。",
      },
    ],
    ar: [
      {
        question: "كيف يمكنني فك تشفير ملف PDF؟",
        answer: "ملاحظة: فك تشفير PDF غير مدعوم حتى الآن من pdf-lib. هذه الميزة مخطط لها في التحديثات المستقبلية.",
      },
      {
        question: "هل يمكنني إزالة حماية كلمة المرور؟",
        answer: "عند التنفيذ، ستتمكن من إزالة كلمات المرور إذا كنت تعرف كلمة المرور الأصلية.",
      },
    ],
    pt: [
      {
        question: "Como descriptografar um arquivo PDF?",
        answer: "Nota: Descriptografia de PDF ainda não é suportada pelo pdf-lib. Este recurso está planejado para futuras atualizações.",
      },
      {
        question: "Posso remover a proteção por senha?",
        answer: "Quando implementado, você poderá remover senhas se souber a senha original.",
      },
    ],
    'zh-tw': [
      {
        question: "如何解密 PDF 檔案？",
        answer: "注意：pdf-lib 尚不支援 PDF 解密。此功能計畫在未來的更新中實作。",
      },
      {
        question: "可以刪除密碼保護嗎？",
        answer: "實作後，如果您知道原始密碼，就可以刪除密碼。",
      },
    ],
  },
};

// Helper function to get FAQs for a specific tool and locale
export function getToolFAQs(toolName: string, locale: string): FAQItem[] {
  const faqs = toolFAQs[toolName as keyof typeof toolFAQs];
  if (!faqs) return [];
  return faqs[locale as keyof typeof faqs] || faqs.en || [];
}

// Export mergeFAQs for backward compatibility
export const mergeFAQs = toolFAQs.merge;
