interface RelatedTool {
  name: string;
  href: string;
  description: string;
  icon: string;
}

export const relatedTools: Record<string, RelatedTool[]> = {
  merge: [
    {
      name: 'split',
      href: '/split',
      description: 'splitAfterMerge',
      icon: '✂️',
    },
    {
      name: 'compress',
      href: '/compress',
      description: 'compressAfterMerge',
      icon: '🗜️',
    },
    {
      name: 'rotate',
      href: '/rotate',
      description: 'rotateAfterMerge',
      icon: '🔄',
    },
  ],
  split: [
    {
      name: 'merge',
      href: '/merge',
      description: 'mergeAfterSplit',
      icon: '🔗',
    },
    {
      name: 'extract',
      href: '/extract',
      description: 'extractFromSplit',
      icon: '📄',
    },
    {
      name: 'reorder',
      href: '/reorder',
      description: 'reorderAfterSplit',
      icon: '🔀',
    },
  ],
  compress: [
    {
      name: 'merge',
      href: '/merge',
      description: 'mergeBeforeCompress',
      icon: '🔗',
    },
    {
      name: 'split',
      href: '/split',
      description: 'splitBeforeCompress',
      icon: '✂️',
    },
  ],
  extract: [
    {
      name: 'merge',
      href: '/merge',
      description: 'mergeExtracted',
      icon: '🔗',
    },
    {
      name: 'split',
      href: '/split',
      description: 'splitBeforeExtract',
      icon: '✂️',
    },
  ],
  rotate: [
    {
      name: 'merge',
      href: '/merge',
      description: 'mergeRotated',
      icon: '🔗',
    },
    {
      name: 'compress',
      href: '/compress',
      description: 'compressAfterRotate',
      icon: '🗜️',
    },
  ],
  'delete-pages': [
    {
      name: 'merge',
      href: '/merge',
      description: 'mergeAfterDelete',
      icon: '🔗',
    },
    {
      name: 'extract',
      href: '/extract',
      description: 'extractInsteadOfDelete',
      icon: '📄',
    },
  ],
  reorder: [
    {
      name: 'merge',
      href: '/merge',
      description: 'mergeReordered',
      icon: '🔗',
    },
    {
      name: 'split',
      href: '/split',
      description: 'splitBeforeReorder',
      icon: '✂️',
    },
  ],
  watermark: [
    {
      name: 'merge',
      href: '/merge',
      description: 'mergeWatermarked',
      icon: '🔗',
    },
    {
      name: 'compress',
      href: '/compress',
      description: 'compressAfterWatermark',
      icon: '🗜️',
    },
  ],
  batch: [
    {
      name: 'merge',
      href: '/merge',
      description: 'mergeBatch',
      icon: '🔗',
    },
    {
      name: 'compress',
      href: '/compress',
      description: 'compressBatch',
      icon: '🗜️',
    },
  ],
  encrypt: [
    {
      name: 'merge',
      href: '/merge',
      description: 'mergeAndEncrypt',
      icon: '🔗',
    },
    {
      name: 'decrypt',
      href: '/decrypt',
      description: 'decryptEncrypted',
      icon: '🔓',
    },
  ],
  decrypt: [
    {
      name: 'merge',
      href: '/merge',
      description: 'mergeDecrypted',
      icon: '🔗',
    },
    {
      name: 'encrypt',
      href: '/encrypt',
      description: 'encryptDecrypted',
      icon: '🔐',
    },
  ],
};
