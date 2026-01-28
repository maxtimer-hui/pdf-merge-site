import {Metadata} from 'next';
import {getTranslations} from 'next-intl/server';
import Link from 'next/link';
import {externalResources, getResourceCategories} from '@/lib/external-resources';

export async function generateMetadata({ params }: { params: Promise<{ locale: string}> }): Promise<Metadata> {
  const {locale} = await params;

  return {
    title: 'PDF Resources & Links',
    description: 'Curated list of useful PDF resources and tools',
    openGraph: {
      title: 'PDF Resources & Links',
      description: 'Curated list of useful PDF resources and tools',
      url: `https://combinepdffree.net/${locale}/resources`,
    },
  };
}

export default async function ResourcesPage({ params }: { params: Promise<{ locale: string }> }) {
  const {locale} = await params;
  const categories = getResourceCategories();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              PDF Resources & Links
            </h1>
            <p className="text-xl text-gray-600">
              Curated resources from authoritative sources in the PDF industry
            </p>
          </div>

          {/* Resources by Category */}
          {categories.map((category) => (
            <div key={category} className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{category}</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {externalResources
                  .filter(r => r.category === category)
                  .map((resource, index) => (
                    <div
                      key={index}
                      className="border rounded-lg p-6 hover:border-blue-500 hover:shadow-md transition-all"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="nofollow noopener"
                          className="hover:text-blue-600"
                        >
                          {resource.title}
                          <svg className="inline-block w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">{resource.description}</p>
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="nofollow noopener"
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Visit Resource →
                      </a>
                    </div>
                  ))}
              </div>
            </div>
          ))}

          {/* Disclaimer */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">📌 Note</h3>
            <p className="text-gray-700 text-sm">
              These are external resources provided for informational purposes. We do not endorse or guarantee the content of third-party websites.
              Always evaluate the accuracy and relevance of information for your specific needs.
            </p>
          </div>

          {/* Back to Home */}
          <div className="text-center mt-8">
            <Link
              href={`/${locale}`}
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
