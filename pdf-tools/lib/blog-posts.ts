interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  locale: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'how-to-merge-pdfs-efficiently',
    title: 'How to Merge PDF Files Efficiently',
    description: 'Learn the most efficient ways to combine multiple PDF files into one document. Tips, tricks, and best practices.',
    content: `
# How to Merge PDF Files Efficiently

Merging PDF files is a common task for professionals and students alike. Whether you're combining reports, assembling documentation, or organizing scanned documents, efficiency matters.

## Why Merge PDFs?

- **Organization**: Keep related documents together
- **Sharing**: Single file is easier to share
- **Professional**: Clean, consolidated presentations
- **Archive**: Simplified long-term storage

## Best Practices

1. **Order Matters**: Arrange files in logical sequence before merging
2. **Check Quality**: Ensure all PDFs are readable and complete
3. **Remove Duplicates**: Don't merge unnecessary pages
4. **Consistent Formatting**: Try to merge similar formatted documents

## Common Use Cases

- Business reports and presentations
- Academic research papers
- Legal documentation
- Financial statements
- Project documentation

## Tools and Methods

Our online PDF merger offers:
- Instant browser-based processing
- No file uploads to servers
- Unlimited file merging
- Cross-platform compatibility

Start merging your PDFs efficiently today!
    `,
    author: 'PDF Tools Team',
    date: '2025-01-15',
    readTime: '5 min read',
    category: 'Tutorials',
    tags: ['merge', 'pdf', 'productivity', 'tips'],
    locale: 'en',
  },
  {
    slug: 'pdf-vs-word-when-to-use',
    title: 'PDF vs Word: When to Use Each Format',
    description: 'Understand the key differences between PDF and Word documents, and when to choose each format for your needs.',
    content: `
# PDF vs Word: When to Use Each Format

Choosing between PDF and Word formats depends on your specific needs. Both formats serve different purposes in document management.

## PDF Format

### Best For:
- Final documents and contracts
- Professional presentations
- Forms that need consistent formatting
- Documents that will be printed
- Long-term archiving

### Advantages:
- Universal compatibility
- Preserves formatting across devices
- Security features (password protection)
- Smaller file sizes
- Professional appearance

## Word Format

### Best For:
- Collaborative editing
- Drafts and working documents
- Documents requiring frequent updates
- Content creation phase

### Advantages:
- Easy to edit
- Track changes feature
- Collaboration tools
- Template flexibility
- Auto-formatting options

## Conversion Tips

1. **Convert Word to PDF** when finalizing documents
2. **Keep Word files** for ongoing projects
3. **Use PDF** for sharing and presentations
4. **Test formatting** after conversion

## Which to Choose?

| Scenario | Recommended Format |
|----------|-------------------|
| Sending contracts | PDF |
| Collaborative writing | Word |
| Professional presentations | PDF |
| Draft documents | Word |
| Long-term storage | PDF |
| Forms to fill | PDF |
| Content creation | Word |

Both formats have their place in professional document workflows.
    `,
    author: 'PDF Tools Team',
    date: '2025-01-10',
    readTime: '4 min read',
    category: 'Comparison',
    tags: ['pdf', 'word', 'comparison', 'format'],
    locale: 'en',
  },
  {
    slug: '10-pdf-compression-tips',
    title: '10 PDF Compression Tips to Reduce File Size',
    description: 'Discover effective techniques to compress PDF files without compromising quality. Essential tips for everyone.',
    content: `
# 10 PDF Compression Tips to Reduce File Size

Large PDF files can be challenging to share and store. Here are ten proven techniques to reduce PDF file size effectively.

## 1. Remove Unwanted Objects

Delete unnecessary images, annotations, and embedded fonts from your PDF.

## 2. Compress Images

Use image compression before inserting into PDFs. Aim for 150-200 DPI for documents.

## 3. Use Grayscale

Color images take more space. Convert to grayscale when color isn't essential.

## 4. Downsample Images

Reduce image resolution for web viewing. Print quality (300 DPI) isn't always necessary.

## 5. Remove Embedded Fonts

Subset fonts or use standard fonts that don't need embedding.

## 6. Flatten Layers

Merge layers and forms into a single layer to reduce complexity.

## 7. Use PDF Standards

Save as PDF/A-1b for optimal compression while maintaining quality.

## 8. Remove Metadata

Strip document properties, author info, and hidden data.

## 9. Rebuild PDF

Sometimes recreating the PDF from source results in smaller file size.

## 10. Use Professional Tools

Our online PDF compressor uses advanced algorithms for optimal compression.

## Compression Best Practices

- **Always keep original**: Save compressed versions as copies
- **Test before sharing**: Verify content remains readable
- **Balance size vs quality**: Don't over-compress important documents

## When to Compress

- Email attachments (keep under 25MB)
- Web uploads
- Mobile devices
- Archive storage

## What NOT to Compress

- Legal documents requiring exact fidelity
- Print-ready materials
- Documents with security requirements

Use our PDF compression tool for optimal results with quality preservation.
    `,
    author: 'PDF Tools Team',
    date: '2025-01-05',
    readTime: '6 min read',
    category: 'Tips',
    tags: ['compress', 'pdf', 'optimization', 'size'],
    locale: 'en',
  },
];

export function getBlogPosts(locale: string = 'en'): BlogPost[] {
  return blogPosts.filter(post => post.locale === locale);
}

export function getBlogPost(slug: string, locale: string = 'en'): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug && post.locale === locale);
}

export function getBlogPostsByCategory(category: string, locale: string = 'en'): BlogPost[] {
  return blogPosts.filter(post => post.category === category && post.locale === locale);
}

export function getBlogPostsByTag(tag: string, locale: string = 'en'): BlogPost[] {
  return blogPosts.filter(post => post.tags.includes(tag) && post.locale === locale);
}
