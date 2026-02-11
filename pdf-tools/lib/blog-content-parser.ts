import { BlogCTAConfig } from './blog-tool-mapping';

/**
 * 解析博客文章内容，识别 CTA 插入位置
 */
export interface ParsedContentSection {
  type: 'content' | 'cta';
  content?: string;
  ctaConfig?: BlogCTAConfig;
}

/**
 * 解析博客文章内容，根据 CTA 配置分割内容
 */
export function parseBlogContentWithCTAs(
  content: string,
  ctaConfigs: BlogCTAConfig[]
): ParsedContentSection[] {
  const sections: ParsedContentSection[] = [];

  // 按行分割内容
  const lines = content.split('\n');

  let currentSection = '';
  let headerCount = 0;
  let sectionIndex = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // 检测标题行
    const isHeader = line.startsWith('#');
    if (isHeader) {
      headerCount++;
    }

    // 检测二级标题（##）以确定章节
    if (line.startsWith('## ')) {
      sectionIndex++;
    }

    // 检查是否需要在当前位置插入 CTA
    const ctaToInsert = ctaConfigs.find(cta => {
      if (cta.position === 'after-intro' && headerCount === 2) {
        // 在第一个二级标题后（简介部分）
        return true;
      }
      if (cta.position === 'after-section' && cta.afterSectionIndex === sectionIndex) {
        // 在指定章节后
        return true;
      }
      return false;
    });

    if (ctaToInsert) {
      // 保存当前内容部分
      if (currentSection.trim()) {
        sections.push({
          type: 'content',
          content: currentSection.trim(),
        });
      }

      // 添加 CTA 部分
      sections.push({
        type: 'cta',
        ctaConfig: ctaToInsert,
      });

      // 重置当前部分
      currentSection = '';
    }

    // 继续构建内容
    currentSection += line + '\n';
  }

  // 添加最后的"结尾前"CTA
  const beforeConclusionCTA = ctaConfigs.find(cta => cta.position === 'before-conclusion');
  if (beforeConclusionCTA && currentSection.trim()) {
    // 移除最后的内容，添加 CTA，然后再添加
    const lastParagraphIndex = currentSection.lastIndexOf('\n\n');
    if (lastParagraphIndex > 0) {
      const mainContent = currentSection.substring(0, lastParagraphIndex);
      const conclusion = currentSection.substring(lastParagraphIndex);

      sections.push({
        type: 'content',
        content: mainContent.trim(),
      });

      sections.push({
        type: 'cta',
        ctaConfig: beforeConclusionCTA,
      });

      sections.push({
        type: 'content',
        content: conclusion.trim(),
      });
    } else {
      sections.push({
        type: 'content',
        content: currentSection.trim(),
      });
    }
  } else if (currentSection.trim()) {
    sections.push({
      type: 'content',
      content: currentSection.trim(),
    });
  }

  return sections;
}

/**
 * 简化版本：在简介后和结尾前插入 CTA
 * 适用于大多数博客文章
 */
export function parseBlogContentSimple(
  content: string,
  ctaConfigs: BlogCTAConfig[]
): ParsedContentSection[] {
  const sections: ParsedContentSection[] = [];

  // 按段落分割（双换行符）
  const paragraphs = content.split(/\n\n+/);

  let insertedIntroCTA = false;

  for (let i = 0; i < paragraphs.length; i++) {
    const paragraph = paragraphs[i];

    // 在第一个二级标题后（简介后）插入主 CTA
    const introCTA = ctaConfigs.find(cta => cta.position === 'after-intro');
    if (!insertedIntroCTA && introCTA && (i > 1 || paragraph.startsWith('##'))) {
      sections.push({
        type: 'content',
        content: paragraphs.slice(0, i).join('\n\n'),
      });

      sections.push({
        type: 'cta',
        ctaConfig: introCTA,
      });

      insertedIntroCTA = true;
    }

    // 在中间位置插入次 CTA
    const middleCTA = ctaConfigs.find(cta => cta.position === 'after-section');
    if (middleCTA && i === Math.floor(paragraphs.length / 2) && insertedIntroCTA) {
      sections.push({
        type: 'content',
        content: paragraph,
      });

      sections.push({
        type: 'cta',
        ctaConfig: middleCTA,
      });

      continue;
    }

    // 在结尾前插入最终 CTA
    const conclusionCTA = ctaConfigs.find(cta => cta.position === 'before-conclusion');
    if (conclusionCTA && i === paragraphs.length - 2 && insertedIntroCTA) {
      sections.push({
        type: 'content',
        content: paragraph,
      });

      sections.push({
        type: 'cta',
        ctaConfig: conclusionCTA,
      });

      continue;
    }
  }

  // 添加剩余内容
  if (paragraphs.length > 0 && (!insertedIntroCTA || paragraphs.length > 3)) {
    sections.push({
      type: 'content',
      content: paragraphs.slice(insertedIntroCTA ? 0 : 0).join('\n\n'),
    });
  }

  // 如果没有插入任何 CTA，返回原始内容
  if (sections.length === 0) {
    sections.push({
      type: 'content',
      content: content,
    });
  }

  return sections;
}
