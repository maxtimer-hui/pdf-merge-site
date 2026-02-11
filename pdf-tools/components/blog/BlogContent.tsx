'use client';

import React from 'react';
import ToolCTA from './ToolCTA';
import { BlogCTAConfig } from '@/lib/blog-tool-mapping';

interface BlogContentProps {
  content: string;
  ctaConfigs: BlogCTAConfig[];
  locale: string;
}

/**
 * 渲染博客文章内容，自动插入 CTA 组件
 */
export default function BlogContent({ content, ctaConfigs, locale }: BlogContentProps) {
  // 将内容转换为 HTML
  const convertToHTML = (text: string) => {
    return text
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold text-gray-900 mb-4 mt-8">$1</h1>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-gray-900 mb-3 mt-6">$1</h2>')
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold text-gray-900 mb-2 mt-4">$1</h3>')
      .replace(/^\- (.*$)/gim, '<li class="ml-4 mb-2">$1</li>')
      .replace(/^(\d+)\. (.*$)/gim, '<li class="ml-4 mb-2"><span class="font-bold">$1.</span> $2</li>')
      .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
      .replace(/`(.*?)`/gim, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm">$1</code>')
      .replace(/\n\n/g, '</p><p class="mb-4 text-gray-700 leading-relaxed">');
  };

  // 分割内容并插入 CTA
  const renderContentWithCTAs = () => {
    const elements: React.ReactNode[] = [];
    const paragraphs = content.split(/\n\n+/);
    let insertedIntroCTA = false;

    for (let i = 0; i < paragraphs.length; i++) {
      const paragraph = paragraphs[i];

      // 在第一个二级标题后（简介后）插入主 CTA
      const introCTA = ctaConfigs.find(cta => cta.position === 'after-intro');
      if (!insertedIntroCTA && introCTA && (i > 1 || paragraph.startsWith('##'))) {
        // 添加之前的内容
        const beforeContent = paragraphs.slice(0, i).join('\n\n');
        if (beforeContent) {
          elements.push(
            <div
              key={`content-${i}`}
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: `<p class="mb-4 text-gray-700 leading-relaxed">${convertToHTML(beforeContent)}</p>` }}
            />
          );
        }

        // 添加 CTA
        elements.push(
          <ToolCTA
            key={`cta-intro`}
            toolPath={introCTA.toolPath}
            titleKey={introCTA.titleKey}
            descriptionKey={introCTA.descriptionKey}
            locale={locale}
            primary={introCTA.primary}
          />
        );

        insertedIntroCTA = true;
      }

      // 在中间位置插入次 CTA
      const middleCTA = ctaConfigs.find(cta => cta.position === 'after-section');
      if (middleCTA && i === Math.floor(paragraphs.length / 2) && insertedIntroCTA) {
        // 添加当前段落
        elements.push(
          <div
            key={`content-${i}`}
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: `<p class="mb-4 text-gray-700 leading-relaxed">${convertToHTML(paragraph)}</p>` }}
          />
        );

        // 添加 CTA
        elements.push(
          <ToolCTA
            key={`cta-middle`}
            toolPath={middleCTA.toolPath}
            titleKey={middleCTA.titleKey}
            descriptionKey={middleCTA.descriptionKey}
            locale={locale}
            primary={middleCTA.primary}
          />
        );

        continue;
      }

      // 在结尾前插入最终 CTA
      const conclusionCTA = ctaConfigs.find(cta => cta.position === 'before-conclusion');
      if (conclusionCTA && i === paragraphs.length - 2 && insertedIntroCTA) {
        // 添加当前段落
        elements.push(
          <div
            key={`content-${i}`}
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: `<p class="mb-4 text-gray-700 leading-relaxed">${convertToHTML(paragraph)}</p>` }}
          />
        );

        // 添加 CTA
        elements.push(
          <ToolCTA
            key={`cta-conclusion`}
            toolPath={conclusionCTA.toolPath}
            titleKey={conclusionCTA.titleKey}
            descriptionKey={conclusionCTA.descriptionKey}
            locale={locale}
            primary={conclusionCTA.primary}
          />
        );

        continue;
      }

      // 添加常规段落
      if (insertedIntroCTA || (introCTA && i === 0)) {
        // 已经插入过第一个 CTA，或者正在跳过第一个段落
        continue;
      }

      // 添加剩余内容
      if (i === paragraphs.length - 1 && !insertedIntroCTA) {
        elements.push(
          <div
            key={`content-final`}
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: `<p class="mb-4 text-gray-700 leading-relaxed">${convertToHTML(content)}</p>` }}
          />
        );
      }
    }

    // 如果没有插入任何 CTA，返回原始内容
    if (elements.length === 0) {
      return (
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: `<p class="mb-4 text-gray-700 leading-relaxed">${convertToHTML(content)}</p>` }}
        />
      );
    }

    return elements;
  };

  return <>{renderContentWithCTAs()}</>;
}
