/**
 * IndexNow 使用示例
 * 演示如何在项目中集成 IndexNow API
 */

import { submitToIndexNow, submitBatchToIndexNow } from '@/lib/indexnow';

// ========================================
// 示例 1: 在 Server Actions 中使用
// ========================================

'use server'

import { revalidatePath } from 'next/cache';

export async function publishBlogPost(postData: {
  slug: string;
  locale: string;
}) {
  // 1. 保存博客文章到数据库
  // await db.blogPosts.create({ ...postData });

  // 2. 重新验证缓存
  revalidatePath(`/${postData.locale}/blog/${postData.slug}`);

  // 3. 通知 IndexNow
  const url = `https://combinepdffree.net/${postData.locale}/blog/${postData.slug}`;
  const result = await submitToIndexNow(url);

  if (result.success) {
    console.log(`✅ 博客文章已通知搜索引擎: ${url}`);
  } else {
    console.error(`❌ IndexNow 提交失败: ${result.message}`);
  }

  return {
    success: true,
    indexed: result.success
  };
}

// ========================================
// 示例 2: 在 API Route 中使用
// ========================================

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { action, data } = await request.json();

  if (action === 'publish') {
    // 处理发布逻辑...

    // 提交到 IndexNow
    const urls = data.locales.map((locale: string) =>
      `https://combinepdffree.net/${locale}/${data.slug}`
    );

    const result = await submitBatchToIndexNow(urls);

    return NextResponse.json({
      published: true,
      indexed: result.success
    });
  }

  return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
}

// ========================================
// 示例 3: 批量提交所有语言版本
// ========================================

const SUPPORTED_LOCALES = ['en', 'zh', 'zh-tw', 'es', 'fr', 'de', 'ar', 'pt', 'ja', 'ko'];

export async function publishAllLanguages(toolSlug: string) {
  const urls = SUPPORTED_LOCALES.map(locale =>
    `https://combinepdffree.net/${locale}/${toolSlug}`
  );

  const result = await submitBatchToIndexNow(urls);

  console.log(`批量提交 ${urls.length} 个 URL:`, result.message);

  return result;
}

// ========================================
// 示例 4: 在 Webhook 中使用
// ========================================

export async function handleContentWebhook(payload: {
  type: 'created' | 'updated' | 'deleted';
  url: string;
}) {
  // 只在创建或重要更新时通知
  if (payload.type === 'created' || payload.type === 'updated') {
    const result = await submitToIndexNow(payload.url);

    // 可以在这里添加错误处理和重试逻辑
    if (!result.success) {
      // 记录到监控系统
      // await monitoring.logError('IndexNow failed', result);
    }

    return result;
  }

  return { success: true, message: 'No indexing needed' };
}

// ========================================
// 示例 5: 使用后台任务（避免阻塞响应）
// ========================================

export async function publishWithBackgroundNotification(contentData: {
  url: string;
}) {
  // 1. 立即返回响应
  const response = { success: true, message: 'Content published' };

  // 2. 在后台异步通知 IndexNow
  submitToIndexNow(contentData.url).then(result => {
    if (result.success) {
      console.log(`IndexNow 成功: ${contentData.url}`);
    } else {
      console.error(`IndexNow 失败: ${result.message}`);
    }
  }).catch(error => {
    console.error(`IndexNow 错误: ${error.message}`);
  });

  return response;
}

// ========================================
// 示例 6: 定期批量提交（用于新网站）
// ========================================

export async function submitSitemapToIndexNow() {
  // 读取 sitemap 或重要页面列表
  const importantPages = [
    'https://combinepdffree.net/en/merge',
    'https://combinepdffree.net/zh/merge',
    'https://combinepdffree.net/en/split',
    'https://combinepdffree.net/zh/split',
    // ... 更多重要页面
  ];

  // 分批提交（每批最多 10,000 个 URL）
  const batchSize = 100;
  for (let i = 0; i < importantPages.length; i += batchSize) {
    const batch = importantPages.slice(i, i + batchSize);
    const result = await submitBatchToIndexNow(batch);

    console.log(`提交批次 ${i / batchSize + 1}:`, result.message);

    // 添加延迟避免速率限制
    if (i + batchSize < importantPages.length) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
}

// ========================================
// 示例 7: 带错误处理和重试
// ========================================

async function submitWithRetry(
  url: string,
  maxRetries = 3,
  delay = 1000
): Promise<boolean> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    const result = await submitToIndexNow(url);

    if (result.success) {
      return true;
    }

    // 如果是 429 (Too Many Requests)，等待更长时间
    if (result.statusCode === 429) {
      const waitTime = delay * attempt * 2;
      console.log(`速率限制，等待 ${waitTime}ms 后重试...`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
      continue;
    }

    // 其他错误，等待后重试
    if (attempt < maxRetries) {
      console.log(`提交失败 (${attempt}/${maxRetries}): ${result.message}`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  return false;
}

// ========================================
// 示例 8: 监控和日志记录
// ========================================

interface IndexNowLog {
  url: string;
  success: boolean;
  statusCode?: number;
  message: string;
  timestamp: Date;
}

const indexNowLogs: IndexNowLog[] = [];

export async function submitWithLogging(url: string) {
  const result = await submitToIndexNow(url);

  const log: IndexNowLog = {
    url,
    success: result.success,
    statusCode: result.statusCode,
    message: result.message,
    timestamp: new Date()
  };

  indexNowLogs.push(log);

  // 只保留最近 100 条日志
  if (indexNowLogs.length > 100) {
    indexNowLogs.shift();
  }

  // 如果失败，发送告警
  if (!result.success) {
    // await sendAlert('IndexNow submission failed', log);
  }

  return result;
}

// ========================================
// 使用建议
// ========================================

/*
1. 何时提交:
   ✅ 新内容发布
   ✅ 重要内容更新
   ✅ 页面删除
   ❌ 小幅修改
   ❌ 频繁提交相同 URL

2. 提交频率:
   - 单个 URL: 需要更新时立即提交
   - 批量提交: 每天最多 1-2 次
   - 避免在短时间内重复提交

3. 错误处理:
   - 始终检查 result.success
   - 实现重试机制
   - 记录失败日志

4. 性能优化:
   - 使用异步处理避免阻塞
   - 批量提交代替多次单独提交
   - 在后台任务中处理
*/
