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
];

export function getTutorials(locale: string = 'en'): Tutorial[] {
  return tutorials.filter(t => t.locale === locale);
}

export function getTutorial(slug: string, locale: string = 'en'): Tutorial | undefined {
  return tutorials.find(t => t.slug === slug && t.locale === locale);
}

export function getTutorialsByDifficulty(difficulty: Tutorial['difficulty'], locale: string = 'en'): Tutorial[] {
  return tutorials.filter(t => t.difficulty === difficulty && t.locale === locale);
}

export function getTutorialsByCategory(category: string, locale: string = 'en'): Tutorial[] {
  return tutorials.filter(t => t.category === category && t.locale === locale);
}
