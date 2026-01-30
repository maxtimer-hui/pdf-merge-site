'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { blogPosts } from '@/lib/blog-posts';

interface BlogSectionProps {
  locale: string;
}

export default function BlogSection({ locale }: BlogSectionProps) {
  const t = useTranslations('encrypt');
  const tCommon = useTranslations('common');

  // Filter posts for current locale
  const localePosts = blogPosts.filter(post => post.locale === locale);

  // Prioritize encrypt-related posts (tags contain 'encrypt')
  const encryptRelatedPosts = localePosts.filter(post =>
    post.tags.some(tag => tag.toLowerCase() === 'encrypt')
  );

  // If not enough encrypt posts, supplement with other posts
  const otherPosts = localePosts.filter(post =>
    !post.tags.some(tag => tag.toLowerCase() === 'encrypt')
  );

  const displayPosts = [...encryptRelatedPosts, ...otherPosts].slice(0, 3);

  // If no posts in current language, don't display this component
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
          className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
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
            {/* Article image placeholder with slate theme */}
            <div className="h-40 bg-gradient-to-br from-slate-400 to-zinc-500 flex items-center justify-center">
              <span className="text-4xl">🔐</span>
            </div>

            <div className="p-6">
              {/* Category tag */}
              <div className="inline-block px-3 py-1 text-xs font-semibold text-slate-600 bg-slate-50 rounded-full mb-3">
                {post.category}
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-slate-600 transition-colors line-clamp-2">
                {post.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {post.description}
              </p>

              {/* Meta info */}
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
