'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { blogPosts } from '@/lib/blog-posts';

interface BlogSectionProps {
  locale: string;
}

export default function BlogSection({ locale }: BlogSectionProps) {
  const t = useTranslations('merge');

  // 筛选当前语言的文章
  const localePosts = blogPosts.filter(post => post.locale === locale);

  // 优先显示与 merge 相关的文章（tags 中包含 'merge'）
  const mergeRelatedPosts = localePosts.filter(post =>
    post.tags.some(tag => tag.toLowerCase() === 'merge')
  );

  // 如果 merge 相关文章不足 3 篇，用其他文章补充
  const otherPosts = localePosts.filter(post =>
    !post.tags.some(tag => tag.toLowerCase() === 'merge')
  );

  const displayPosts = [...mergeRelatedPosts, ...otherPosts].slice(0, 3);

  // 如果没有当前语言的文章，就不显示这个组件
  if (displayPosts.length === 0) {
    return null;
  }

  return (
    <section className="mt-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900">
          Related Articles
        </h2>
        <Link
          href={`/${locale}/blog`}
          className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
        >
          View All
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
            <div className="h-40 bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center">
              <span className="text-4xl">📄</span>
            </div>

            <div className="p-6">
              {/* 分类标签 */}
              <div className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-50 rounded-full mb-3">
                {post.category}
              </div>

              {/* 标题 */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
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
