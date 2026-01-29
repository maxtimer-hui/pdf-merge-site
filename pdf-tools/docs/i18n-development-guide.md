# PDF Tools 国际化(i18n)开发指南

本文档说明如何在 PDF Tools 项目中正确使用 i18n 功能。

## 技术栈

- **框架**: next-intl (https://next-intl-docs.vercel.app/)
- **支持语言**: zh, zh-tw, en, es, fr, de, ar, pt, ja, ko
- **RTL 语言**: ar (阿拉伯语)

## 基本用法

### 服务端组件

```tsx
import {getTranslations} from 'next-intl/server';

export default async function Page() {
  const t = await getTranslations('common');
  return <h1>{t('home')}</h1>;
}
```

### 客户端组件

```tsx
'use client';

import {useTranslations} from 'next-intl';

export default function Component() {
  const t = useTranslations('common');
  return <h1>{t('home')}</h1>;
}
```

## 添加新的翻译键

### 1. 在英文文件中添加键

编辑 `messages/en.json`:

```json
{
  "common": {
    "newKey": "New English Text"
  }
}
```

### 2. 为所有语言添加翻译

在所有 `messages/*.json` 文件中添加相同的键,翻译成对应语言。

### 3. 在组件中使用

```tsx
const t = useTranslations('common');
return <div>{t('newKey')}</div>;
```

## 禁止事项

### ❌ 硬编码用户可见文本

```tsx
// 错误: 硬编码英文文本
<button>Submit</button>

// 正确: 使用翻译键
<button>{t('submit')}</button>
```

### ❌ 拼接翻译字符串

```tsx
// 错误: 字符串拼接
<div>{t('hello')} {userName}!</div>

// 正确: 使用 ICU 消息格式
// messages/en.json: "helloUser": "Hello {userName}!"
<div>{t('helloUser', {userName})}</div>
```

## RTL 支持

阿拉伯语需要从右到左(RTL)布局。

### 使用逻辑属性

```css
/* ❌ 避免使用方向特定的属性 */
.button {
  margin-left: 1rem;
  padding-right: 1rem;
}

/* ✅ 使用逻辑属性 */
.button {
  margin-inline-start: 1rem;
  padding-inline-end: 1rem;
}
```

### Tailwind CSS

```tsx
/* Tailwind v3+ 支持逻辑属性 */
<div className="ms-4 pe-4">  /* margin-start, padding-end */
```

## 验证工具

### 检查翻译完整性

```bash
npm run check-i18n
```

### 检查硬编码字符串

```bash
npm run check-hardcoded
```

### 类型检查

```bash
npx tsc --noEmit
```

## 添加新语言

### 1. 更新 i18n 配置

编辑 `i18n/request.ts`:

```ts
export const locales = ['zh', 'zh-tw', 'en', 'es', 'fr', 'de', 'ar', 'pt', 'ja', 'ko', 'new-locale'] as const;
```

### 2. 创建翻译文件

复制 `messages/en.json` 为 `messages/new-locale.json`

### 3. 翻译所有内容

编辑 `messages/new-locale.json`,翻译所有键

### 4. 更新 sitemap

编辑 `app/sitemap.ts`,添加新语言的优先级

### 5. 测试

```bash
npm run dev
# 访问 http://localhost:3000/new-locale
```

## SEO 最佳实践

### 页面 metadata

```tsx
export async function generateMetadata({params}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'seo.myPage'});

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `https://combinepdffree.net/${locale}/my-page`,
    },
  };
}
```

### 结构化数据

```tsx
const faqs = mergeFAQs[locale as keyof typeof mergeFAQs] || mergeFAQs.en;
const faqSchema = generateFAQSchema(faqs);
```

## 常见问题

### Q: 如何处理复数形式?

使用 next-intl 的复数支持:

```json
{
  "fileCount": "{count, plural, =0 {No files} =1 {1 file} other {# files}}"
}
```

```tsx
<div>{t('fileCount', {count: files.length})}</div>
```

### Q: 如何格式化日期和数字?

使用 JavaScript Intl API:

```tsx
const locale = useLocale();
const date = new Intl.DateTimeFormat(locale, {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
}).format(new Date());

const number = new Intl.NumberFormat(locale, {
  style: 'unit',
  unit: 'megabyte'
}).format(size);
```

### Q: 如何调试翻译问题?

1. 检查浏览器控制台是否有翻译键缺失警告
2. 验证翻译文件 JSON 格式正确
3. 运行 `npm run check-i18n` 检查完整性
4. 运行 `npm run check-hardcoded` 检查硬编码字符串

## 参考资料

- [next-intl 文档](https://next-intl-docs.vercel.app/)
- [MDN: Intl API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)
- [W3C: 国际化最佳实践](https://www.w3.org/International/)
- [Google: 翻译最佳实践](https://support.google.com/webmasters/answer/7145698)
