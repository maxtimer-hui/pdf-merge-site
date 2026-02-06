# Bing IndexNow 集成指南

本文档说明如何在项目中使用 Bing IndexNow API。

## 什么是 IndexNow？

IndexNow 是一种实时索引通知协议，可以让搜索引擎（Bing、Yandex 等）更快地知道你网站内容的变化。

## 已完成的配置

### 1. API Key
- **Key**: `e528b0165e56992a3b9cf8e98d169fa1`
- **Key 文件位置**: `public/e528b0165e56992a3b9cf8e98d169fa1.txt`
- **验证 URL**: `https://combinepdffree.net/e528b0165e56992a3b9cf8e98d169fa1.txt`

### 2. API 路由
- **POST /api/indexnow**: 提交 URL 到 IndexNow
- **GET /api/indexnow**: 检查 API 状态

### 3. 核心库
- **lib/indexnow.ts**: IndexNow API 集成函数

## 使用方法

### 方法 1: 通过 API 路由

#### 提交单个 URL
```bash
curl -X POST https://combinepdffree.net/api/indexnow \
  -H "Content-Type: application/json" \
  -d '{"urls": "https://combinepdffree.net/en/merge"}'
```

#### 批量提交多个 URL
```bash
curl -X POST https://combinepdffree.net/api/indexnow \
  -H "Content-Type: application/json" \
  -d '{"urls": ["https://combinepdffree.net/en/merge", "https://combinepdffree.net/zh/merge"]}'
```

### 方法 2: 在代码中直接调用

```typescript
import { submitToIndexNow, submitBatchToIndexNow } from '@/lib/indexnow';

// 提交单个 URL
const result = await submitToIndexNow('https://combinepdffree.net/en/merge');
if (result.success) {
  console.log('URL 已成功提交到 IndexNow');
}

// 批量提交
const urls = [
  'https://combinepdffree.net/en/merge',
  'https://combinepdffree.net/zh/merge',
  'https://combinepdffree.net/es/merge'
];
const batchResult = await submitBatchToIndexNow(urls);
```

### 方法 3: 使用 GET 方法（简单但功能较少）

```typescript
import { submitToIndexNowGET } from '@/lib/indexnow';

const result = await submitToIndexNowGET('https://combinepdffree.net/en/merge');
```

## 何时提交 URL

根据 IndexNow 最佳实践：

✅ **应该提交的情况**:
- 新发布的内容（新博客文章、新教程）
- 已更新内容的重要修改
- 删除的页面（通知搜索引擎移除索引）

❌ **不应该提交的情况**:
- 过去的内容（仅提交开始使用 IndexNow 之后的变更）
- 小幅度的内容更新
- 频繁提交相同 URL（避免被标记为垃圾）

## 自动集成建议

### 1. 在内容管理系统中自动触发

当发布新博客文章时：
```typescript
// app/api/blog/route.ts
export async function POST(request: NextRequest) {
  const { title, content, locale } = await request.json();

  // 保存博客文章...

  // 自动通知 IndexNow
  const blogUrl = `https://combinepdffree.net/${locale}/blog/${slug}`;
  await submitToIndexNow(blogUrl);

  return NextResponse.json({ success: true });
}
```

### 2. 使用 Server Actions

```typescript
// app/actions.ts
'use server'

import { submitToIndexNow } from '@/lib/indexnow';

export async function publishContent(url: string) {
  // 发布逻辑...

  // 通知 IndexNow
  const result = await submitToIndexNow(url);

  return { published: true, indexed: result.success };
}
```

## 验证设置

### 1. 验证 API Key 文件
访问: `https://combinepdffree.net/e528b0165e56992a3b9cf8e98d169fa1.txt`

应该只看到: `e528b0165e56992a3b9cf8e98d169fa1`

### 2. 测试 API
```bash
curl https://combinepdffree.net/api/indexnow
```

应该返回:
```json
{
  "status": "IndexNow API is ready",
  "configured": true,
  "keyLocation": "https://combinepdffree.net/e528b0165e56992a3b9cf8e98d169fa1.txt"
}
```

### 3. 测试提交
```bash
curl -X POST https://combinepdffree.net/api/indexnow \
  -H "Content-Type: application/json" \
  -d '{"urls": "https://combinepdffree.net/en/merge"}'
```

### 4. 在 Bing Webmaster Tools 验证

1. 访问 [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. 添加并验证你的网站
3. 查看 "IndexNow" 报告
4. 确认 URL 已被接收

## 响应代码说明

| 代码 | 说明 |
|------|------|
| 200 | 提交成功 |
| 400 | 请求格式无效 |
| 403 | API Key 无效或未找到 key 文件 |
| 422 | URL 不属于该域名或 key 不匹配 |
| 429 | 请求过多（可能被标记为垃圾） |

## 重要提示

1. **环境变量**: 确保 `INDEXNOW_API_KEY` 在 `.env.local` 和 Vercel 环境变量中都已设置
2. **Key 文件**: public 目录下的 `.txt` 文件必须在部署后可访问
3. **速率限制**: 避免频繁提交，建议在有内容变更时才提交
4. **批量提交**: 对于大量 URL，使用批量提交而不是多次单独提交

## 生产环境配置

在 Vercel 中设置环境变量：

1. 进入 Vercel 项目设置
2. 添加环境变量: `INDEXNOW_API_KEY = e528b0165e56992a3b9cf8e98d169fa1`
3. 重新部署项目

## 监控和调试

启用 IndexNow 后，可以通过以下方式监控：

1. **Bing Webmaster Tools**: 查看 IndexNow 报告
2. **API 响应**: 检查 API 调用的响应状态
3. **日志**: 在应用中记录提交结果

```typescript
const result = await submitToIndexNow(url);
if (!result.success) {
  console.error('IndexNow 提交失败:', result.message);
  // 发送错误通知...
}
```

## 参考文档

- [IndexNow 官方文档](https://www.indexnow.org/documentation)
- [Bing IndexNow 入门](https://www.bing.com/indexnow/getstarted)
- [IndexNow FAQ](https://www.indexnow.org/faq)
