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

export const mergeFAQs = {
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
};
