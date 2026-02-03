interface Tutorial {
  slug: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  readTime: string;
  category: string;
  steps: Array<{
    title: string;
    content: string;
    code?: string;
  }>;
  locale: string;
}

export const tutorials: Tutorial[] = [
  {
    slug: 'batch-process-pdf-files',
    title: 'How to Batch Process PDF Files',
    description: 'Learn how to process multiple PDF files at once using our batch processing tools.',
    difficulty: 'Intermediate',
    readTime: '8 min read',
    category: 'Productivity',
    locale: 'en',
    steps: [
      {
        title: 'Understanding Batch Processing',
        content: 'Batch processing allows you to perform operations on multiple PDF files simultaneously, saving significant time when working with large numbers of documents.',
      },
      {
        title: 'Available Batch Operations',
        content: 'Our tools support batch merging, splitting, compression, and more. Each operation is performed locally in your browser for maximum security.',
      },
      {
        title: 'Step-by-Step Guide',
        content: '1. Navigate to the batch tool\n2. Select or drag multiple PDF files\n3. Choose your operation\n4. Click process\n5. Download all processed files',
      },
      {
        title: 'Best Practices',
        content: 'Organize files beforehand, use consistent naming conventions, and test with a small batch first before processing large numbers of files.',
      },
    ],
  },
  {
    slug: 'pdf-security-guide',
    title: 'PDF Security Guide: Encryption and Decryption',
    description: 'Complete guide to securing your PDF files with passwords and removing security when needed.',
    difficulty: 'Beginner',
    readTime: '6 min read',
    category: 'Security',
    locale: 'en',
    steps: [
      {
        title: 'Why Secure PDFs?',
        content: 'PDF security protects sensitive information, prevents unauthorized editing, and controls who can view your documents.',
      },
      {
        title: 'Types of PDF Security',
        content: 'Password protection (user/owner passwords), encryption levels (128-bit, 256-bit AES), and permission controls.',
      },
      {
        title: 'How to Encrypt',
        content: 'Use our Encrypt PDF tool to add password protection. Choose a strong password and select encryption level.',
      },
      {
        title: 'How to Decrypt',
        content: 'If you know the password, use our Decrypt PDF tool to remove security and enable full access to the document.',
      },
    ],
  },
  {
    slug: 'optimize-pdf-file-size',
    title: 'PDF File Size Optimization Techniques',
    description: 'Master the art of reducing PDF file sizes while maintaining quality.',
    difficulty: 'Advanced',
    readTime: '10 min read',
    category: 'Optimization',
    locale: 'en',
    steps: [
      {
        title: 'Understanding File Size',
        content: 'PDF size depends on images, fonts, embedded content, and compression methods used.',
      },
      {
        title: 'Image Optimization',
        content: 'Reduce image resolution, use appropriate formats, and compress images before embedding.',
      },
      {
        title: 'Font Subsetting',
        content: 'Only embed necessary characters and use standard fonts when possible.',
      },
      {
        title: 'Using Compression Tools',
        content: 'Our compression tool automatically optimizes PDF structure and content while preserving quality.',
      },
    ],
  },
  {
    slug: 'batch-process-pdf-files',
    title: '如何批量处理 PDF 文件',
    description: '学习如何使用我们的批量处理工具一次性处理多个 PDF 文件。',
    difficulty: 'Intermediate',
    readTime: '8 分钟阅读',
    category: '效率',
    locale: 'zh',
    steps: [
      {
        title: '了解批量处理',
        content: '批量处理允许您同时对多个 PDF 文件执行操作，在处理大量文档时可节省大量时间。',
      },
      {
        title: '可用的批量操作',
        content: '我们的工具支持批量合并、拆分、压缩等操作。所有操作都在您的浏览器中本地执行，确保最大安全性。',
      },
      {
        title: '分步指南',
        content: '1. 导航到批量工具\n2. 选择或拖动多个 PDF 文件\n3. 选择您的操作\n4. 点击处理\n5. 下载所有处理后的文件',
      },
      {
        title: '最佳实践',
        content: '事先整理文件，使用一致的命名约定，在处理大量文件之前先用小批量测试。',
      },
    ],
  },
  {
    slug: 'pdf-security-guide',
    title: 'PDF 安全指南：加密与解密',
    description: '使用密码保护 PDF 文件以及在需要时移除安全设置的完整指南。',
    difficulty: 'Beginner',
    readTime: '6 分钟阅读',
    category: '安全',
    locale: 'zh',
    steps: [
      {
        title: '为什么要保护 PDF？',
        content: 'PDF 安全保护可保护敏感信息，防止未经授权的编辑，并控制谁可以查看您的文档。',
      },
      {
        title: 'PDF 安全类型',
        content: '密码保护（用户/所有者密码）、加密级别（128 位、256 位 AES）和权限控制。',
      },
      {
        title: '如何加密',
        content: '使用我们的 PDF 加密工具添加密码保护。选择强密码并选择加密级别。',
      },
      {
        title: '如何解密',
        content: '如果您知道密码，可以使用我们的 PDF 解密工具移除安全设置并启用对文档的完全访问。',
      },
    ],
  },
  {
    slug: 'optimize-pdf-file-size',
    title: 'PDF 文件大小优化技巧',
    description: '掌握在保持质量的同时减小 PDF 文件大小的艺术。',
    difficulty: 'Advanced',
    readTime: '10 分钟阅读',
    category: '优化',
    locale: 'zh',
    steps: [
      {
        title: '了解文件大小',
        content: 'PDF 大小取决于图像、字体、嵌入内容和使用的压缩方法。',
      },
      {
        title: '图像优化',
        content: '降低图像分辨率，使用适当的格式，并在嵌入前压缩图像。',
      },
      {
        title: '字体子集化',
        content: '仅嵌入必要的字符，尽可能使用标准字体。',
      },
      {
        title: '使用压缩工具',
        content: '我们的压缩工具会自动优化 PDF 结构和内容，同时保持质量。',
      },
    ],
  },
];

export function getTutorials(locale: string = 'en'): Tutorial[] {
  const localeTutorials = tutorials.filter(t => t.locale === locale);

  // 如果当前语言没有教程，返回英语教程作为 fallback
  if (localeTutorials.length === 0 && locale !== 'en') {
    return tutorials.filter(t => t.locale === 'en');
  }

  return localeTutorials;
}

export function getTutorial(slug: string, locale: string = 'en'): Tutorial | undefined {
  // 先尝试查找当前语言的教程
  const tutorial = tutorials.find(t => t.slug === slug && t.locale === locale);

  // 如果当前语言没有该教程，尝试查找英语版本
  if (!tutorial && locale !== 'en') {
    return tutorials.find(t => t.slug === slug && t.locale === 'en');
  }

  return tutorial;
}

export function getTutorialsByDifficulty(difficulty: Tutorial['difficulty'], locale: string = 'en'): Tutorial[] {
  const localeTutorials = tutorials.filter(t => t.difficulty === difficulty && t.locale === locale);

  // 如果当前语言没有该难度的教程，返回英语教程
  if (localeTutorials.length === 0 && locale !== 'en') {
    return tutorials.filter(t => t.difficulty === difficulty && t.locale === 'en');
  }

  return localeTutorials;
}

export function getTutorialsByCategory(category: string, locale: string = 'en'): Tutorial[] {
  const localeTutorials = tutorials.filter(t => t.category === category && t.locale === locale);

  // 如果当前语言没有该分类的教程，返回英语教程
  if (localeTutorials.length === 0 && locale !== 'en') {
    return tutorials.filter(t => t.category === category && t.locale === 'en');
  }

  return localeTutorials;
}
