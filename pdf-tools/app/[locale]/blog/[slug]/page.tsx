import {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {getTranslations} from 'next-intl/server';
import Link from 'next/link';
import {getBlogPost, getBlogPosts} from '@/lib/blog-posts';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';

// 生成页面 metadata
export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const {locale, slug} = await params;
  const post = getBlogPost(slug, locale);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      url: `https://combinepdffree.net/${locale}/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const {locale, slug} = await params;
  const post = getBlogPost(slug, locale);
  const relatedPosts = getBlogPosts(locale).filter(p => p.slug !== slug && p.category === post?.category).slice(0, 3);

  if (!post) {
    notFound();
  }

  const breadcrumbItems = [
    {name: 'Home', href: ''},
    {name: 'Blog', href: '/blog'},
    {name: post.title, href: `/blog/${slug}`},
  ];

  // Convert markdown-like content to HTML (simplified version)
  const contentHtml = post.content
    .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold text-gray-900 mb-4 mt-8">$1</h1>')
    .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-gray-900 mb-3 mt-6">$1</h2>')
    .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold text-gray-900 mb-2 mt-4">$1</h3>')
    .replace(/^\- (.*$)/gim, '<li class="ml-4 mb-2">$1</li>')
    .replace(/^(\d+)\. (.*$)/gim, '<li class="ml-4 mb-2"><span class="font-bold">$1.</span> $2</li>')
    .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
    .replace(/`(.*?)`/gim, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm">$1</code>')
    .replace(/\n\n/g, '</p><p class="mb-4 text-gray-700 leading-relaxed">')
    .replace(/\|(.*)\|/gim, (match) => {
      // Simple table handling
      return '<div class="overflow-x-auto my-6">' + match + '</div>';
    });

  return (
    <>
      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": post.title,
            "description": post.description,
            "author": {
              "@type": "Organization",
              "name": post.author,
            },
            "datePublished": post.date,
            "dateModified": post.date,
            "publisher": {
              "@type": "Organization",
              "name": "PDF Tools",
              "logo": {
                "@type": "ImageObject",
                "url": "https://combinepdffree.net/logo.png",
              },
            },
          }),
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Navbar currentLocale={locale} />

        <main className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <Breadcrumb items={breadcrumbItems} locale={locale} />

            {/* Article Header */}
            <article className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <div className="text-sm text-blue-600 font-semibold mb-3">
                {post.category}
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {post.title}
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                {post.description}
              </p>
              <div className="flex items-center justify-between text-sm text-gray-500 border-t border-b py-4 mb-8">
                <div>
                  <span className="font-medium">By {post.author}</span>
                  <span className="mx-2">•</span>
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>
                <div>
                  <span>{post.readTime}</span>
                </div>
              </div>

              {/* Article Content */}
              <div className="prose prose-lg max-w-none">
                <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
              </div>

              {/* Tags */}
              <div className="mt-12 pt-8 border-t">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
                <div className="space-y-4">
                  {relatedPosts.map((relatedPost) => (
                    <Link
                      key={relatedPost.slug}
                      href={`/${locale}/blog/${relatedPost.slug}`}
                      className="block border rounded-lg p-4 hover:border-blue-500 hover:shadow-md transition-all"
                    >
                      <div className="text-sm text-blue-600 font-semibold mb-1">
                        {relatedPost.category}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {relatedPost.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Back to Blog */}
            <div className="text-center mt-8">
              <Link
                href={`/${locale}/blog`}
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Blog
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
