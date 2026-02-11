import {Metadata} from 'next';
import Link from 'next/link';
import {getAllComparisons} from '@/lib/comparisons';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import {getPageAlternates} from '@/lib/canonical';

export async function generateMetadata({ params }: { params: Promise<{ locale: string}> }): Promise<Metadata> {
  const {locale} = await params;
  return {
    title: 'PDF Tools Comparison',
    description: 'Compare PDF tools and formats to make the right choice',
    alternates: getPageAlternates(locale, 'compare'),
    openGraph: {
      title: 'PDF Tools Comparison',
      description: 'Compare PDF tools and formats to make the right choice',
    },
  };
}

export default async function ComparePage({ params }: { params: Promise<{ locale: string }> }) {
  const {locale} = await params;
  const comparisons = getAllComparisons();

  const breadcrumbItems = [
    {name: 'Home', href: ''},
    {name: 'Compare', href: '/compare'},
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar currentLocale={locale} />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <Breadcrumb items={breadcrumbItems} locale={locale} />

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              PDF Tools Comparison
            </h1>
            <p className="text-xl text-gray-600">
              Make informed decisions with our detailed comparisons
            </p>
          </div>

          {/* Comparisons */}
          {comparisons.map((comparison) => (
            <div key={comparison.id} className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{comparison.title}</h2>
              <p className="text-gray-600 mb-8">{comparison.description}</p>

              {/* Features Comparison */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Features</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
                    <h4 className="font-semibold text-green-800 mb-4">✅ PDF Tools</h4>
                    <ul className="space-y-2">
                      {comparison.features.ourTool.map((feature, i) => (
                        <li key={i} className="flex items-start text-green-700 text-sm">
                          <span className="mr-2">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
                    <h4 className="font-semibold text-red-800 mb-4">❌ Others</h4>
                    <ul className="space-y-2">
                      {comparison.features.competitors.map((feature, i) => (
                        <li key={i} className="flex items-start text-red-700 text-sm">
                          <span className="mr-2">✗</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Pricing Comparison */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Pricing</h3>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <span className="font-semibold text-gray-900">PDF Tools:</span>
                      <span className="ml-2 text-green-700 font-medium">{comparison.pricing.ourTool}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-900">Others:</span>
                      <span className="ml-2 text-gray-600 text-sm">{comparison.pricing.competitors.join(', ')}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Comparison */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Security</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-blue-900 text-sm font-medium">{comparison.security.ourTool}</p>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <p className="text-gray-700 text-sm">{comparison.security.competitors[0]}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Quick Comparison Table */}
          <div className="bg-white rounded-lg shadow-lg p-8 mt-12 overflow-x-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Comparison</h2>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-4 py-3 text-left">Feature</th>
                  <th className="border border-gray-200 px-4 py-3 text-left bg-green-50">PDF Tools</th>
                  <th className="border border-gray-200 px-4 py-3 text-left bg-red-50">Desktop Software</th>
                  <th className="border border-gray-200 px-4 py-3 text-left bg-red-50">Other Online Tools</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-200 px-4 py-3 font-medium">Installation</td>
                  <td className="border border-gray-200 px-4 py-3 bg-green-50 text-green-700">✓ Not Required</td>
                  <td className="border border-gray-200 px-4 py-3 bg-red-50 text-red-700">✗ Required</td>
                  <td className="border border-gray-200 px-4 py-3 bg-red-50 text-green-700">✓ Not Required</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-4 py-3 font-medium">Privacy</td>
                  <td className="border border-gray-200 px-4 py-3 bg-green-50 text-green-700">✓ 100% Private</td>
                  <td className="border border-gray-200 px-4 py-3 bg-red-50 text-yellow-600">⚠ Local Only</td>
                  <td className="border border-gray-200 px-4 py-3 bg-red-50 text-red-700">✗ Uploads Data</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-4 py-3 font-medium">Cost</td>
                  <td className="border border-gray-200 px-4 py-3 bg-green-50 text-green-700">✓ Free Forever</td>
                  <td className="border border-gray-200 px-4 py-3 bg-red-50 text-red-700">✗ $50-$500</td>
                  <td className="border border-gray-200 px-4 py-3 bg-red-50 text-yellow-600">⚠ Freemium</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-4 py-3 font-medium">Cross-Platform</td>
                  <td className="border border-gray-200 px-4 py-3 bg-green-50 text-green-700">✓ Any Device</td>
                  <td className="border border-gray-200 px-4 py-3 bg-red-50 text-red-700">✗ Platform-Specific</td>
                  <td className="border border-gray-200 px-4 py-3 bg-green-50 text-green-700">✓ Any Device</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-lg p-12 mt-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-blue-100 mb-8">
              Experience the difference with our free, secure PDF tools
            </p>
            <Link
              href={`/${locale}/merge`}
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Try Our Tools Now
            </Link>
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

      <Footer />
    </div>
  );
}
