import {Metadata} from 'next';
import {getTranslations} from 'next-intl/server';
import Link from 'next/link';
import {getBlogPosts} from '@/lib/blog-posts';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';

// 生成页面 metadata
export async function generateMetadata({ params }: { params: Promise<{ locale: string}> }): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'blog'});

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `https://combinepdffree.net/${locale}/blog`,
    },
  };
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const {locale} = await params;
  const posts = getBlogPosts(locale);

  const breadcrumbItems = [
    {name: 'Home', href: ''},
    {name: 'Blog', href: '/blog'},
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar currentLocale={locale} />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <Breadcrumb items={breadcrumbItems} locale={locale} />

          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              PDF Tools Blog
            </h1>
            <p className="text-xl text-gray-600">
              Tips, tutorials, and guides for working with PDF files
            </p>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/${locale}/blog/${post.slug}`}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className="p-6">
                  <div className="text-sm text-blue-600 font-semibold mb-2">
                    {post.category}
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {post.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{post.readTime}</span>
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Categories Section */}
          <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="border rounded-lg p-4 hover:border-blue-500 transition-colors">
                <h3 className="font-semibold text-lg mb-2">📚 Tutorials</h3>
                <p className="text-sm text-gray-600">Step-by-step guides for PDF tasks</p>
              </div>
              <div className="border rounded-lg p-4 hover:border-blue-500 transition-colors">
                <h3 className="font-semibold text-lg mb-2">⚖️ Comparisons</h3>
                <p className="text-sm text-gray-600">Format and tool comparisons</p>
              </div>
              <div className="border rounded-lg p-4 hover:border-blue-500 transition-colors">
                <h3 className="font-semibold text-lg mb-2">💡 Tips</h3>
                <p className="text-sm text-gray-600">Productivity and optimization tips</p>
              </div>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-lg p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Stay Updated
            </h2>
            <p className="text-blue-100 mb-8">
              Get the latest PDF tips and tutorials delivered to your inbox
            </p>
            <div className="max-w-md mx-auto flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
