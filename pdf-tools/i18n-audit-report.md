# PDF Tools 国际化 (i18n) 审查报告

**审查日期**: 2026-01-29
**项目**: PDF Tools (pdf-tools/)
**审查人**: Claude Code

---

## 📊 总体评分: 7.5/10

### 优点 ✅
- 使用业界标准的 next-intl 框架
- 良好的翻译文件结构
- 完整的 SEO 翻译支持
- 支持 10 种语言(包括 RTL 语言阿拉伯语)

### 需要改进 ⚠️
- 存在硬编码字符串
- 缺少 RTL 布局支持
- 翻译文件大小不均衡
- 缺少某些翻译键

---

## 🔍 详细发现

### 1. 硬编码字符串问题 ❌

**严重性**: 高
**影响**: 用户切换语言时部分内容仍显示英文

#### 问题位置:

**components/Navbar.tsx:36-39**
```tsx
{href: `/${currentLocale}/blog`, label: 'Blog'},      // ❌ 硬编码
{href: `/${currentLocale}/tutorials`, label: 'Tutorials'}, // ❌ 硬编码
{href: `/${currentLocale}/resources`, label: 'Resources'},  // ❌ 硬编码
{href: `/${currentLocale}/compare`, label: 'Compare'},      // ❌ 硬编码
```

**components/Navbar.tsx:58-68**
```tsx
<Link href={`/${currentLocale}/blog`} ...>Blog</Link>          // ❌
<Link href={`/${currentLocale}/tutorials`} ...>Tutorials</Link> // ❌
<Link href={`/${currentLocale}/resources`} ...>Resources</Link> // ❌
<Link href={`/${currentLocale}/compare`} ...>Compare</Link>     // ❌
```

**app/[locale]/blog/page.tsx:31**
**app/[locale]/tutorials/page.tsx:27**
**app/[locale]/resources/page.tsx:29**
**app/[locale]/compare/page.tsx:25**

#### 修复建议:

1. **在所有语言文件中添加缺失的键** (messages/en.json 等):
```json
{
  "common": {
    "blog": "Blog",
    "tutorials": "Tutorials",
    "resources": "Resources",
    "compare": "Compare"
  }
}
```

2. **更新组件使用翻译键**:
```tsx
// components/Navbar.tsx
const navLinks = [
  {href: `/${currentLocale}`, label: t('home')},
  {href: `/${currentLocale}/blog`, label: t('blog')},        // ✅ 修复
  {href: `/${currentLocale}/tutorials`, label: t('tutorials')}, // ✅ 修复
  {href: `/${currentLocale}/resources`, label: t('resources')}, // ✅ 修复
  {href: `/${currentLocale}/compare`, label: t('compare')},    // ✅ 修复
  {href: `/${currentLocale}/about`, label: t('about')},
  {href: `/${currentLocale}/contact`, label: t('contact')},
];
```

---

### 2. RTL 布局支持缺失 ❌

**严重性**: 高
**影响**: 阿拉伯语用户界面显示不正确

#### 当前状态:
- 支持阿拉伯语(ar)locale
- 但没有实现 RTL 布局
- 没有动态 `dir` 属性设置

#### 问题:
- **app/[locale]/layout.tsx**: 不存在
- 没有为阿拉伯语设置 `dir="rtl"`
- CSS 没有使用逻辑属性(logical properties)

#### 修复建议:

**1. 创建 app/[locale]/layout.tsx**:
```tsx
import {ReactNode} from 'react';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {locales} from '@/i18n/request';

type Props = {
  children: ReactNode;
  params: Promise<{locale: string}>;
};

export async function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({
  children,
  params,
}: Props) {
  const {locale} = await params;

  // 验证 locale
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // 获取翻译消息
  const messages = await getMessages();

  // 检查是否为 RTL 语言
  const isRTL = locale === 'ar';

  return (
    <html lang={locale} dir={isRTL ? 'rtl' : 'ltr'}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

**2. 添加 RTL CSS 支持** (app/globals.css):
```css
/* 使用逻辑属性替代方向特定的属性 */
.navbar {
  margin-inline-start: 1rem;  /* 自动适配 RTL/LTR */
  padding-inline-end: 1rem;
  text-align: start;           /* 而不是 text-align: left */
}

/* 针对特定 RTL 调整 */
[dir="rtl"] .icon {
  transform: scaleX(-1);  /* 翻转图标 */
}

[dir="rtl"] .dropdown-menu {
  right: auto;
  left: 0;
}
```

**3. 更新 Tailwind 配置** (可选):
```js
// tailwind.config.js
module.exports = {
  // ...
  plugins: [
    require('@tailwindcss/typography'),
    // 添加 RTL 支持
  ],
}
```

---

### 3. 翻译文件大小不均衡 ⚠️

**严重性**: 中
**影响**: 部分语言缺少完整翻译

#### 当前状态:
```
en.json:    1112 行 (基准 - 100%)
zh.json:     496 行 (44.6%)
es.json:     380 行 (34.2%)
zh-tw.json:  377 行 (33.9%)
ja.json:     377 行 (33.9%)
ko.json:     377 行 (33.9%)
ar.json:     268 行 (24.1%)
de.json:     268 行 (24.1%)
fr.json:     268 行 (24.1%)
pt.json:     268 行 (24.1%)
```

#### 问题:
- 大多数语言文件只有英文内容的 24-44%
- 缺少大量翻译内容

#### 修复建议:

1. **创建翻译完整性检查脚本**:
```bash
# scripts/check-i18n-completeness.sh
#!/bin/bash
EN_KEYS=$(cat messages/en.json | grep -o '\"[^\"]*\":' | wc -l)

for file in messages/*.json; do
  LOCALE=$(basename $file .json)
  KEYS=$(cat $file | grep -o '\"[^\"]*\":' | wc -l)
  PERCENT=$((KEYS * 100 / EN_KEYS))
  echo "$LOCALE: $KEYS keys ($PERCENT% complete)"
done
```

2. **使用专业翻译服务补充缺失翻译**:
   - 推荐使用: Lokalise, Crowdin, POEditor
   - 或使用 AI 翻译 + 人工审核

3. **优先级**:
   - 高优先级: zh, es, zh-tw (已配置主要市场)
   - 中优先级: ja, ko, pt, de, fr
   - 低优先级: ar (需要额外的 RTL 测试)

---

### 4. 缺少国际化实用功能 ⚠️

**严重性**: 中
**影响**: 用户体验不够本地化

#### 缺失功能:

1. **日期/时间格式化**:
```tsx
// ❌ 当前: 硬编码格式
const date = new Date().toLocaleDateString();

// ✅ 应该: 根据 locale 格式化
import {useLocale} from 'next-intl';
const locale = useLocale();
const date = new Intl.DateTimeFormat(locale, {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
}).format(new Date());
```

2. **数字格式化**:
```tsx
// ❌ 当前: 固定格式
const size = (file.size / 1024 / 1024).toFixed(2) + ' MB';

// ✅ 应该: 根据 locale 格式化
const size = new Intl.NumberFormat(locale, {
  style: 'unit',
  unit: 'megabyte',
  maximumFractionDigits: 2
}).format(file.size / 1024 / 1024);
```

3. **复数形式处理**:
```json
// messages/en.json
{
  "fileCount": "{count, plural, =0 {No files} =1 {1 file} other {# files}}"
}
```

---

### 5. SEO 翻译完整性 ✅

**严重性**: 无
**影响**: 良好

#### 优点:
- 所有页面都有 SEO metadata 翻译
- 结构化数据(JSON-LD)支持多语言
- Sitemap 支持所有 locale
- Canonical URL 正确配置

---

## 📋 改进优先级

### 🔴 高优先级 (立即修复)

1. **修复硬编码字符串**
   - 估计时间: 1-2 小时
   - 影响文件: 5-8 个
   - 用户体验影响: 高

2. **实现 RTL 支持**
   - 估计时间: 2-3 小时
   - 影响语言: 阿拉伯语
   - 用户体验影响: 高

### 🟡 中优先级 (1-2 周内)

3. **补充缺失翻译**
   - 估计时间: 根据翻译资源
   - 影响语言: 9 个
   - 用户体验影响: 中-高

4. **添加国际化实用功能**
   - 估计时间: 2-4 小时
   - 影响范围: 日期、数字显示
   - 用户体验影响: 中

### 🟢 低优先级 (长期改进)

5. **创建翻译管理工具**
   - 翻译键检查脚本
   - 翻译完整性监控
   - 自动化翻译更新流程

---

## 🎯 快速修复清单

### 第一步: 添加缺失的翻译键

需要在所有 `messages/*.json` 文件的 `common` 部分添加:

```json
{
  "blog": "Blog",
  "tutorials": "Tutorials",
  "resources": "Resources",
  "compare": "Compare Tools"
}
```

### 第二步: 更新 Navbar 组件

替换所有硬编码字符串为翻译键。

### 第三步: 创建 locale layout

添加动态 `dir` 属性支持 RTL 语言。

### 第四步: 测试

- 测试所有语言切换
- 特别测试阿拉伯语 RTL 布局
- 验证所有页面翻译显示正确

---

## 📚 最佳实践建议

### 1. 开发规范

- ✅ **使用翻译键**: 所有用户可见文本必须使用 `t()` 或 `useTranslations()`
- ✅ **命名空间管理**: 按功能模块组织翻译键
- ✅ **避免字符串拼接**: 使用 ICU 消息格式处理复杂字符串
- ❌ **禁止硬编码**: 代码中不应出现任何用户可见的硬编码文本

### 2. 翻译流程

1. 更新英文翻译文件 (en.json)
2. 运行完整性检查脚本
3. 提交给翻译团队/服务
4. 审核翻译质量
5. 部署前测试所有语言

### 3. 测试清单

- [ ] 所有语言切换正常
- [ ] 无硬编码字符串残留
- [ ] RTL 语言显示正确
- [ ] 日期/数字格式本地化
- [ ] SEO metadata 正确翻译
- [ ] 无控制台翻译错误

---

## 🔧 推荐工具

### 开发工具
- **i18n-ally (VS Code)**: 代码中显示翻译内容
- **@formatjs/cli**: 提取和管理翻译键
- **next-intl**: (已使用) 继续保持更新

### 翻译平台
- **Lokalise**: 专业翻译管理
- **Crowdin**: 社区翻译
- **POEditor**: 轻量级选项

### 验证工具
- **W3C Internationalization**: i18n 最佳实践检查
- **Lighthouse**: SEO 和可访问性测试(多语言)

---

## 📊 统计数据

| 指标 | 数值 |
|------|------|
| 支持语言数量 | 10 |
| RTL 语言 | 1 (ar) |
| 翻译键总数 | ~100+ (预估) |
| 硬编码字符串 | 5+ |
| 翻译完整性 | 24-100% |
| i18n 覆盖率 | ~85% |

---

## ✅ 结论

PDF Tools 项目已经建立了良好的 i18n 基础,使用了成熟的 next-intl 框架,并支持多种语言。主要问题集中在:

1. 少量硬编码字符串需要快速修复
2. RTL 布局支持需要实现
3. 翻译完整性需要提升

**建议采取渐进式改进**: 先修复高优先级问题(硬编码、RTL),再逐步补充翻译内容和实现高级功能。

**预计总修复时间**: 1-2 天开发 + 翻译时间

---

*报告生成者: Claude Code*
*项目路径: D:\pdf-merge-site\pdf-tools*
