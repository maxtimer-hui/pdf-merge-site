/**
 * 博客文章与工具的映射关系
 * 定义每篇博客文章的 CTA 按钮配置和目标工具页面
 */

export interface BlogCTAConfig {
  // CTA 在文章中的位置
  position: 'after-intro' | 'after-section' | 'before-conclusion';
  // 目标工具路由
  toolPath: string;
  // CTA 标题（可翻译 key）
  titleKey: string;
  // CTA 描述（可翻译 key）
  descriptionKey: string;
  // 是否为主要 CTA（影响样式）
  primary?: boolean;
  // 如果是 after-section，指定在哪个小节后
  afterSectionIndex?: number;
}

export interface BlogToolMapping {
  // 博客 slug
  slug: string;
  // 主工具路由
  primaryTool: string;
  // 所有 CTA 配置
  ctas: BlogCTAConfig[];
}

/**
 * 现有博客文章的工具映射配置
 */
export const blogToolMappings: BlogToolMapping[] = [
  {
    slug: 'how-to-merge-pdfs-efficiently',
    primaryTool: 'merge',
    ctas: [
      {
        position: 'after-intro',
        toolPath: '/merge',
        titleKey: 'blog.cta.mergeNow',
        descriptionKey: 'blog.cta.mergeNowDesc',
        primary: true,
      },
      {
        position: 'after-section',
        toolPath: '/compress',
        titleKey: 'blog.cta.compressMerged',
        descriptionKey: 'blog.cta.compressMergedDesc',
        primary: false,
        afterSectionIndex: 1, // 在 "Best Practices" 部分后
      },
      {
        position: 'before-conclusion',
        toolPath: '/split',
        titleKey: 'blog.cta.trySplit',
        descriptionKey: 'blog.cta.trySplitDesc',
        primary: false,
      },
    ],
  },
  {
    slug: 'pdf-vs-word-when-to-use',
    primaryTool: 'merge',
    ctas: [
      {
        position: 'after-intro',
        toolPath: '/merge',
        titleKey: 'blog.cta.convertToPdf',
        descriptionKey: 'blog.cta.convertToPdfDesc',
        primary: true,
      },
      {
        position: 'after-section',
        toolPath: '/compress',
        titleKey: 'blog.cta.compressPdf',
        descriptionKey: 'blog.cta.compressPdfDesc',
        primary: false,
        afterSectionIndex: 2, // 在 "Conversion Tips" 部分后
      },
      {
        position: 'before-conclusion',
        toolPath: '/merge',
        titleKey: 'blog.cta.startMerging',
        descriptionKey: 'blog.cta.startMergingDesc',
        primary: true,
      },
    ],
  },
  {
    slug: '10-pdf-compression-tips',
    primaryTool: 'compress',
    ctas: [
      {
        position: 'after-intro',
        toolPath: '/compress',
        titleKey: 'blog.cta.compressNow',
        descriptionKey: 'blog.cta.compressNowDesc',
        primary: true,
      },
      {
        position: 'after-section',
        toolPath: '/merge',
        titleKey: 'blog.cta.mergeThenCompress',
        descriptionKey: 'blog.cta.mergeThenCompressDesc',
        primary: false,
        afterSectionIndex: 4, // 在技巧 5 (Remove Embedded Fonts) 后
      },
      {
        position: 'before-conclusion',
        toolPath: '/compress',
        titleKey: 'blog.cta.tryCompressor',
        descriptionKey: 'blog.cta.tryCompressorDesc',
        primary: true,
      },
    ],
  },
  {
    slug: 'split-pdf-files-complete-guide',
    primaryTool: 'split',
    ctas: [
      {
        position: 'after-intro',
        toolPath: '/split',
        titleKey: 'blog.cta.splitNow',
        descriptionKey: 'blog.cta.splitNowDesc',
        primary: true,
      },
      {
        position: 'after-section',
        toolPath: '/extract',
        titleKey: 'blog.cta.extractPages',
        descriptionKey: 'blog.cta.extractPagesDesc',
        primary: false,
        afterSectionIndex: 2, // 在 "Step-by-Step Guide" 后
      },
      {
        position: 'before-conclusion',
        toolPath: '/merge',
        titleKey: 'blog.cta.mergeSplit',
        descriptionKey: 'blog.cta.mergeSplitDesc',
        primary: false,
      },
    ],
  },
  {
    slug: 'extract-pdf-pages-efficiently',
    primaryTool: 'extract',
    ctas: [
      {
        position: 'after-intro',
        toolPath: '/extract',
        titleKey: 'blog.cta.extractNow',
        descriptionKey: 'blog.cta.extractNowDesc',
        primary: true,
      },
      {
        position: 'after-section',
        toolPath: '/split',
        titleKey: 'blog.cta.trySplit',
        descriptionKey: 'blog.cta.trySplitDesc',
        primary: false,
        afterSectionIndex: 2, // 在 "Step-by-Step Extraction Process" 后
      },
      {
        position: 'before-conclusion',
        toolPath: '/merge',
        titleKey: 'blog.cta.mergeExtracted',
        descriptionKey: 'blog.cta.mergeExtractedDesc',
        primary: false,
      },
    ],
  },
  {
    slug: 'rotate-pdf-fix-scanned-documents',
    primaryTool: 'rotate',
    ctas: [
      {
        position: 'after-intro',
        toolPath: '/rotate',
        titleKey: 'blog.cta.rotateNow',
        descriptionKey: 'blog.cta.rotateNowDesc',
        primary: true,
      },
      {
        position: 'after-section',
        toolPath: '/merge',
        titleKey: 'blog.cta.mergeRotated',
        descriptionKey: 'blog.cta.mergeRotatedDesc',
        primary: false,
        afterSectionIndex: 2, // 在 "Step-by-Step Rotation Guide" 后
      },
      {
        position: 'before-conclusion',
        toolPath: '/compress',
        titleKey: 'blog.cta.compressRotated',
        descriptionKey: 'blog.cta.compressRotatedDesc',
        primary: false,
      },
    ],
  },
  {
    slug: 'delete-pages-from-pdf-step-by-step',
    primaryTool: 'delete-pages',
    ctas: [
      {
        position: 'after-intro',
        toolPath: '/delete-pages',
        titleKey: 'blog.cta.deleteNow',
        descriptionKey: 'blog.cta.deleteNowDesc',
        primary: true,
      },
      {
        position: 'after-section',
        toolPath: '/extract',
        titleKey: 'blog.cta.extractInstead',
        descriptionKey: 'blog.cta.extractInsteadDesc',
        primary: false,
        afterSectionIndex: 2, // 在 "Step-by-Step Deletion Process" 后
      },
      {
        position: 'before-conclusion',
        toolPath: '/merge',
        titleKey: 'blog.cta.mergeCleaned',
        descriptionKey: 'blog.cta.mergeCleanedDesc',
        primary: false,
      },
    ],
  },
  {
    slug: 'pdf-watermarking-protect-documents',
    primaryTool: 'watermark',
    ctas: [
      {
        position: 'after-intro',
        toolPath: '/watermark',
        titleKey: 'blog.cta.watermarkNow',
        descriptionKey: 'blog.cta.watermarkNowDesc',
        primary: true,
      },
      {
        position: 'after-section',
        toolPath: '/merge',
        titleKey: 'blog.cta.mergeWatermarked',
        descriptionKey: 'blog.cta.mergeWatermarkedDesc',
        primary: false,
        afterSectionIndex: 2, // 在 "Step-by-Step Watermarking" 后
      },
      {
        position: 'before-conclusion',
        toolPath: '/compress',
        titleKey: 'blog.cta.compressWatermarked',
        descriptionKey: 'blog.cta.compressWatermarkedDesc',
        primary: false,
      },
    ],
  },
  {
    slug: 'reorder-pdf-pages-organize-documents',
    primaryTool: 'reorder',
    ctas: [
      {
        position: 'after-intro',
        toolPath: '/reorder',
        titleKey: 'blog.cta.reorderNow',
        descriptionKey: 'blog.cta.reorderNowDesc',
        primary: true,
      },
      {
        position: 'after-section',
        toolPath: '/split',
        titleKey: 'blog.cta.splitAfterReorder',
        descriptionKey: 'blog.cta.splitAfterReorderDesc',
        primary: false,
        afterSectionIndex: 2, // 在 "Step-by-Step Reordering Process" 后
      },
      {
        position: 'before-conclusion',
        toolPath: '/merge',
        titleKey: 'blog.cta.mergeReordered',
        descriptionKey: 'blog.cta.mergeReorderedDesc',
        primary: false,
      },
    ],
  },
  {
    slug: 'batch-pdf-processing-work-faster',
    primaryTool: 'batch',
    ctas: [
      {
        position: 'after-intro',
        toolPath: '/batch',
        titleKey: 'blog.cta.batchNow',
        descriptionKey: 'blog.cta.batchNowDesc',
        primary: true,
      },
      {
        position: 'after-section',
        toolPath: '/merge',
        titleKey: 'blog.cta.batchMerge',
        descriptionKey: 'blog.cta.batchMergeDesc',
        primary: false,
        afterSectionIndex: 2, // 在 "Step-by-Step Batch Processing" 后
      },
      {
        position: 'before-conclusion',
        toolPath: '/compress',
        titleKey: 'blog.cta.batchCompress',
        descriptionKey: 'blog.cta.batchCompressDesc',
        primary: false,
      },
    ],
  },
  {
    slug: 'pdf-security-encryption-password-protection',
    primaryTool: 'encrypt',
    ctas: [
      {
        position: 'after-intro',
        toolPath: '/encrypt',
        titleKey: 'blog.cta.encryptNow',
        descriptionKey: 'blog.cta.encryptNowDesc',
        primary: true,
      },
      {
        position: 'after-section',
        toolPath: '/watermark',
        titleKey: 'blog.cta.watermarkProtect',
        descriptionKey: 'blog.cta.watermarkProtectDesc',
        primary: false,
        afterSectionIndex: 2, // 在 "Step-by-Step Security Setup" 后
      },
      {
        position: 'before-conclusion',
        toolPath: '/decrypt',
        titleKey: 'blog.cta.tryDecrypt',
        descriptionKey: 'blog.cta.tryDecryptDesc',
        primary: false,
      },
    ],
  },
];

/**
 * 获取指定博客文章的工具映射
 */
export function getBlogToolMapping(slug: string): BlogToolMapping | undefined {
  return blogToolMappings.find(mapping => mapping.slug === slug);
}

/**
 * 获取指定工具相关的所有标签
 * 用于在工具页面过滤相关博客文章
 */
export const toolBlogTags: Record<string, string[]> = {
  merge: ['merge', 'combine', 'pdf-merge', 'productivity'],
  split: ['split', 'divide', 'separate', 'pages'],
  extract: ['extract', 'pages', 'remove'],
  compress: ['compress', 'compression', 'optimization', 'size'],
  rotate: ['rotate', 'orientation', 'scanning'],
  'delete-pages': ['delete-pages', 'remove', 'organize'],
  reorder: ['reorder', 'organize', 'pages', 'sort'],
  watermark: ['watermark', 'protect', 'security', 'branding'],
  batch: ['batch', 'productivity', 'automation', 'bulk'],
  encrypt: ['encrypt', 'security', 'password', 'protect'],
  decrypt: ['decrypt', 'security', 'password', 'unlock'],
};

/**
 * 获取工具页面应显示的相关博客文章
 */
export function getRelatedBlogPostsForTool(tool: string, locale: string = 'en') {
  const { getBlogPosts } = require('./blog-posts');
  const allPosts = getBlogPosts(locale);
  const tags = toolBlogTags[tool] || [];

  // 按相关性排序（匹配标签数量）
  return allPosts
    .map((post: any) => ({
      post,
      relevance: post.tags.filter((tag: string) => tags.includes(tag)).length,
    }))
    .filter((item: any) => item.relevance > 0)
    .sort((a: any, b: any) => b.relevance - a.relevance)
    .slice(0, 5)
    .map((item: any) => item.post);
}
