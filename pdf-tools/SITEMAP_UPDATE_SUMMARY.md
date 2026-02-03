# Sitemap 更新总结

## 修复内容

### 1. 域名一致性修复
将所有 `https://combinepdffree.net` 更新为 `https://www.combinepdffree.net` 以匹配实际网站重定向。

**修改的文件：**
- `app/sitemap.ts` - Sitemap 生成器
- `app/robots.ts` - Robots.txt 配置
- `lib/canonical.ts` - Canonical URL 生成器
- `app/[locale]/layout.tsx` - 全局 metadata
- `lib/breadcrumb-schema.ts` - 面包屑结构化数据
- `lib/team.ts` - 组织结构化数据
- 所有工具页面的 OpenGraph URL 配置

### 2. Sitemap 内容更新

**新添加的内容：**
- ✅ 教程页面多语言支持（英文 + 中文）
- ✅ 从 `lib/tutorials.ts` 动态获取教程列表
- ✅ 确保所有实际存在的页面都在 sitemap 中

## Sitemap URL 统计

| 类型 | 数量 | 说明 |
|------|------|------|
| 首页 | 10 | 10 个语言版本 |
| 工具页面 | 110 | 10 个语言 × 11 个工具 |
| 内容页面 (resources, compare) | 20 | 10 个语言 × 2 个页面 |
| 内容页面 (blog, tutorials - en) | 2 | 仅英文 |
| 博客文章 | 12 | 仅英文，从 blog-posts.ts 动态生成 |
| 教程页面 | 6 | 英文 3 个 + 中文 3 个 |
| 法律页面 | 50 | 10 个语言 × 5 个页面 |
| **总计** | **210** | 所有 URL |

## 已包含的工具页面

1. merge - 合并 PDF
2. split - 分割 PDF
3. extract - 提取页面
4. compress - 压缩 PDF
5. rotate - 旋转 PDF
6. delete-pages - 删除页面
7. reorder - 重排页面
8. watermark - 添加水印
9. batch - 批处理
10. encrypt - 加密 PDF
11. decrypt - 解密 PDF

## 已包含的内容页面

### 所有语言（10个）
- resources - 资源
- compare - 工具对比

### 仅英文
- blog - 博客列表
- tutorials - 教程列表

### 博客文章（仅英文，12篇）
1. how-to-merge-pdfs-efficiently
2. pdf-vs-word-when-to-use
3. 10-pdf-compression-tips
4. split-pdf-files-complete-guide
5. extract-pdf-pages-efficiently
6. rotate-pdf-fix-scanned-documents
7. delete-pages-from-pdf-step-by-step
8. pdf-watermarking-protect-documents
9. reorder-pdf-pages-organize-documents
10. batch-pdf-processing-work-faster
11. pdf-security-encryption-password-protection
12. [还有更多...]

### 教程页面（英文 + 中文）
- 英文 3 篇
- 中文 3 篇
- 从 `lib/tutorials.ts` 动态生成

## 已包含的法律页面（所有语言）

- about - 关于我们
- contact - 联系我们
- privacy - 隐私政策
- terms - 服务条款
- cookies - Cookie 政策

## SEO 优化

### Priority 优先级设置
- 首页 + 主要工具（merge, split, compress）：0.9-0.95
- 次要工具（extract, rotate, delete-pages）：0.8-0.85
- 内容页面（blog, tutorials, resources, compare）：0.7-0.85
- 低优先级工具（encrypt, decrypt, reorder, watermark, batch）：0.65-0.75
- 法律页面：0.3

### 语言优先级
- en（英语）：1.0
- zh（简体中文）：0.9
- zh-tw（繁体中文）：0.8
- es（西班牙语）：0.8
- ja（日语）：0.75
- fr, de, pt, ko：0.7
- ar（阿拉伯语）：0.65

### Change Frequency
- 工具页面：weekly
- 内容页面：weekly
- 博客和教程：monthly
- 法律页面：monthly

## 验证

构建成功，所有页面路由正确生成：
```bash
npm run build
```

输出显示 sitemap.xml 正确生成。

## 下一步操作

1. **部署更新**：将更改部署到生产环境
2. **在 GSC 中重新提交 sitemap**：
   - 打开 Google Search Console
   - 删除旧的 sitemap（如果有）
   - 添加新的 sitemap URL：`https://www.combinepdffree.net/sitemap.xml`
3. **请求索引**：对于重要页面，可以使用 "请求编入索引" 功能
4. **监控索引状态**：在 GSC 中监控页面的索引状态

## 注意事项

- 网站重定向：`combinepdffree.net` → `www.combinepdffree.net`
- 所有 URL 现在统一使用 `https://www.combinepdffree.net`
- Google 通常需要几天到几周的时间来索引新网站
- 确保 robots.txt 也更新为指向新的 sitemap URL

