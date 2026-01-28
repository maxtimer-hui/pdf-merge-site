interface RelatedTool {
  name: string;
  href: string;
  description: string;
  icon: string;
}

export const relatedTools: Record<string, RelatedTool[]> = {
  merge: [
    {
      name: 'Split PDF',
      href: '/split',
      description: 'After merging, you might need to extract specific pages from your combined PDF',
      icon: '✂️',
    },
    {
      name: 'Compress PDF',
      href: '/compress',
      description: 'Reduce your merged PDF file size without losing quality',
      icon: '🗜️',
    },
    {
      name: 'Rotate PDF',
      href: '/rotate',
      description: 'Fix page orientation issues in your merged PDF',
      icon: '🔄',
    },
  ],
  split: [
    {
      name: 'Merge PDF',
      href: '/merge',
      description: 'Combine split pages back into a single PDF document',
      icon: '🔗',
    },
    {
      name: 'Extract Pages',
      href: '/extract',
      description: 'Extract specific pages from your PDF files',
      icon: '📄',
    },
    {
      name: 'Reorder Pages',
      href: '/reorder',
      description: 'Rearrange pages in your PDF after splitting',
      icon: '🔀',
    },
  ],
  compress: [
    {
      name: 'Merge PDF',
      href: '/merge',
      description: 'Combine multiple PDFs before compressing them',
      icon: '🔗',
    },
    {
      name: 'Split PDF',
      href: '/split',
      description: 'Split large files before compression for better results',
      icon: '✂️',
    },
  ],
  extract: [
    {
      name: 'Merge PDF',
      href: '/merge',
      description: 'Combine extracted pages into a new PDF',
      icon: '🔗',
    },
    {
      name: 'Split PDF',
      href: '/split',
      description: 'Split PDF before extracting specific pages',
      icon: '✂️',
    },
  ],
  rotate: [
    {
      name: 'Merge PDF',
      href: '/merge',
      description: 'Combine rotated PDFs into one document',
      icon: '🔗',
    },
    {
      name: 'Compress PDF',
      href: '/compress',
      description: 'Compress PDF after rotating pages',
      icon: '🗜️',
    },
  ],
  'delete-pages': [
    {
      name: 'Merge PDF',
      href: '/merge',
      description: 'Combine PDFs after deleting unwanted pages',
      icon: '🔗',
    },
    {
      name: 'Extract Pages',
      href: '/extract',
      description: 'Extract specific pages instead of deleting others',
      icon: '📄',
    },
  ],
  reorder: [
    {
      name: 'Merge PDF',
      href: '/merge',
      description: 'Combine reordered PDFs with other files',
      icon: '🔗',
    },
    {
      name: 'Split PDF',
      href: '/split',
      description: 'Split PDF before reordering pages',
      icon: '✂️',
    },
  ],
  watermark: [
    {
      name: 'Merge PDF',
      href: '/merge',
      description: 'Combine watermarked PDFs into one file',
      icon: '🔗',
    },
    {
      name: 'Compress PDF',
      href: '/compress',
      description: 'Compress PDF after adding watermark',
      icon: '🗜️',
    },
  ],
  batch: [
    {
      name: 'Merge PDF',
      href: '/merge',
      description: 'Combine multiple PDFs at once',
      icon: '🔗',
    },
    {
      name: 'Compress PDF',
      href: '/compress',
      description: 'Compress multiple PDFs in batch',
      icon: '🗜️',
    },
  ],
  encrypt: [
    {
      name: 'Merge PDF',
      href: '/merge',
      description: 'Combine and encrypt PDFs together',
      icon: '🔗',
    },
    {
      name: 'Decrypt PDF',
      href: '/decrypt',
      description: 'Remove password from encrypted PDFs',
      icon: '🔓',
    },
  ],
  decrypt: [
    {
      name: 'Merge PDF',
      href: '/merge',
      description: 'Combine decrypted PDFs into one file',
      icon: '🔗',
    },
    {
      name: 'Encrypt PDF',
      href: '/encrypt',
      description: 'Add password protection to your PDFs',
      icon: '🔐',
    },
  ],
};
