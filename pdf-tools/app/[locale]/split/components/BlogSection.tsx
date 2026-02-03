'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { blogPosts } from '@/lib/blog-posts';

interface BlogSectionProps {
  locale: string;
}

export default function BlogSection({ locale }: BlogSectionProps) {
  const t = useTranslations('split');
  const tCommon = useTranslations('common');

  // 筛选当前语言的文章
  const localePosts = blogPosts.filter(post => post.locale === locale);

  // 如果当前语言没有文章，使用英语文章作为 fallback
  const fallbackPosts = localePosts.length === 0 ? blogPosts.filter(post => post.locale === 'en') : [];
  const postsSource = localePosts.length > 0 ? localePosts : fallbackPosts;
  const isFallback = localePosts.length === 0;

  // 优先显示与 split 相关的文章（tags 中包含 'split'）
  const splitRelatedPosts = postsSource.filter(post =>
    post.tags.some(tag => tag.toLowerCase() === 'split')
  );

  // 如果 split 相关文章不足 3 篇，用其他文章补充
  const otherPosts = postsSource.filter(post =>
    !post.tags.some(tag => tag.toLowerCase() === 'split')
  );

  const displayPosts = [...splitRelatedPosts, ...otherPosts].slice(0, 3);

  return (
    <section className="mt-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900">
          {tCommon('relatedArticles')}
        </h2>
        <Link
          href={`/${locale}/blog`}
          className="text-green-600 hover:text-green-800 font-semibold flex items-center gap-1"
        >
          {tCommon('viewAll')}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {displayPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/${locale}/blog/${post.slug}`}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden group"
          >
            {/* 文章图片占位符 */}
            <div className="h-40 bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
              <span className="text-4xl">📄</span>
            </div>

            <div className="p-6">
              {/* 分类标签 */}
              <div className="inline-block px-3 py-1 text-xs font-semibold text-green-600 bg-green-50 rounded-full mb-3">
                {post.category}
              </div>
              {isFallback && (
                <span className="ml-2 inline-block px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full">
                  English
                </span>
              )}

              {/* 标题 */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors line-clamp-2">
                {post.title}
              </h3>

              {/* 描述 */}
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {post.description}
              </p>

              {/* 元信息 */}
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{post.date}</span>
                <span>{post.readTime}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
