import {MetadataRoute} from 'next';
import {locales} from '@/i18n/request';

const tools = ['merge', 'split', 'extract', 'compress', 'rotate', 'delete-pages', 'reorder', 'watermark', 'batch', 'encrypt', 'decrypt'];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://combinepdffree.net';
  const urls: MetadataRoute.Sitemap = [];

  // 为每种语言生成主页和工具页面 URL
  for (const locale of locales) {
    // 主页
    urls.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    });

    // 工具页面
    for (const tool of tools) {
      urls.push({
        url: `${baseUrl}/${locale}/${tool}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
      });
    }
  }

  return urls;
}
