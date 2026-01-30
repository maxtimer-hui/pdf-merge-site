import {Metadata} from 'next';
import Link from 'next/link';
import {getTutorials} from '@/lib/tutorials';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';

export async function generateMetadata({ params }: { params: Promise<{ locale: string}> }): Promise<Metadata> {
  return {
    title: 'PDF Tutorials & Guides',
    description: 'Step-by-step tutorials for working with PDF files',
    openGraph: {
      title: 'PDF Tutorials & Guides',
      description: 'Step-by-step tutorials for working with PDF files',
    },
  };
}

export default async function TutorialsPage({ params }: { params: Promise<{ locale: string }> }) {
  const {locale} = await params;
  const tutorials = getTutorials(locale);

  const difficulties = ['Beginner', 'Intermediate', 'Advanced'] as const;

  const breadcrumbItems = [
    {name: 'Home', href: ''},
    {name: 'Tutorials', href: '/tutorials'},
  ];

  const difficultyIcons = {
    Beginner: '🟢',
    Intermediate: '🟡',
    Advanced: '🔴',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar currentLocale={locale} />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <Breadcrumb items={breadcrumbItems} locale={locale} />

          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="text-6xl">📚</span>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              PDF Tutorials & Guides
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Master PDF processing with our comprehensive step-by-step tutorials
            </p>
          </div>

          {/* Tutorials Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tutorials.map((tutorial) => (
              <Link
                key={tutorial.slug}
                href={`/${locale}/tutorials/${tutorial.slug}`}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group flex flex-col h-full"
              >
                {/* Tutorial Image/Icon */}
                <div className="h-32 bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center relative overflow-hidden">
                  <span className="text-5xl transform group-hover:scale-110 transition-transform duration-300">
                    {difficultyIcons[tutorial.difficulty]}
                  </span>
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      tutorial.difficulty === 'Beginner' ? 'bg-green-500 text-white' :
                      tutorial.difficulty === 'Intermediate' ? 'bg-yellow-500 text-white' :
                      'bg-red-500 text-white'
                    }`}>
                      {tutorial.difficulty}
                    </span>
                  </div>
                </div>

                {/* Tutorial Content */}
                <div className="p-6 flex-1 flex flex-col">
                  {/* Category */}
                  <div className="text-sm text-blue-600 font-semibold mb-2">
                    {tutorial.category}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {tutorial.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 flex-1 line-clamp-3">
                    {tutorial.description}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t">
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{tutorial.readTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      <span>{tutorial.steps.length} Steps</span>
                    </div>
                  </div>

                  {/* Learn More Button */}
                  <div className="mt-4">
                    <span className="text-blue-600 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                      Start Learning
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Empty State */}
          {tutorials.length === 0 && (
            <div className="text-center py-16">
              <span className="text-6xl mb-4 block">📝</span>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">No tutorials available yet</h2>
              <p className="text-gray-600">We're working on creating comprehensive tutorials for you.</p>
            </div>
          )}

          {/* Back to Home */}
          <div className="text-center mt-16">
            <Link
              href={`/${locale}`}
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold px-6 py-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
