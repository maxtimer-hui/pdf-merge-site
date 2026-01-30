'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { blogPosts } from '@/lib/blog-posts';

interface BlogSectionProps {
  locale: string;
}

export default function BlogSection({ locale }: BlogSectionProps) {
  const t = useTranslations('compress');
  const tCommon = useTranslations('common');

  // 筛选当前语言的文章
  const localePosts = blogPosts.filter(post => post.locale === locale);

  // 优先显示与 compress 相关的文章（tags 中包含 'compress'）
  const compressRelatedPosts = localePosts.filter(post =>
    post.tags.some(tag => tag.toLowerCase() === 'compress')
  );

  // 如果 compress 相关文章不足 3 篇，用其他文章补充
  const otherPosts = localePosts.filter(post =>
    !post.tags.some(tag => tag.toLowerCase() === 'compress')
  );

  const displayPosts = [...compressRelatedPosts, ...otherPosts].slice(0, 3);

  // 如果没有当前语言的文章，就不显示这个组件
  if (displayPosts.length === 0) {
    return null;
  }

  return (
    <section className="mt-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900">
          {tCommon('relatedArticles')}
        </h2>
        <Link
          href={`/${locale}/blog`}
          className="text-purple-600 hover:text-purple-800 font-semibold flex items-center gap-1"
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
            <div className="h-40 bg-gradient-to-br from-purple-400 to-fuchsia-500 flex items-center justify-center">
              <span className="text-4xl">📄</span>
            </div>

            <div className="p-6">
              {/* 分类标签 */}
              <div className="inline-block px-3 py-1 text-xs font-semibold text-purple-600 bg-purple-50 rounded-full mb-3">
                {post.category}
              </div>

              {/* 标题 */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors line-clamp-2">
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
