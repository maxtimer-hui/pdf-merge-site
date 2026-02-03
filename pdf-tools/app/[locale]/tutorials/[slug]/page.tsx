import {Metadata} from 'next';
import {notFound} from 'next/navigation';
import Link from 'next/link';
import {getTutorial, getTutorials} from '@/lib/tutorials';

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const {locale, slug} = await params;
  const tutorial = getTutorial(slug, locale);

  if (!tutorial) {
    return { title: 'Tutorial Not Found' };
  }

  return {
    title: tutorial.title,
    description: tutorial.description,
    openGraph: {
      title: tutorial.title,
      description: tutorial.description,
      type: 'article',
    },
  };
}

export default async function TutorialPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const {locale, slug} = await params;
  const tutorial = getTutorial(slug, locale);
  const relatedTutorials = getTutorials(locale)
    .filter(t => t.slug !== slug && t.category === tutorial?.category)
    .slice(0, 3);

  if (!tutorial) {
    notFound();
  }

  const difficultyColors = {
    Beginner: 'bg-green-100 text-green-800',
    Intermediate: 'bg-yellow-100 text-yellow-800',
    Advanced: 'bg-red-100 text-red-800',
  };

  return (
    <>
      {/* How-to Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": tutorial.title,
            "description": tutorial.description,
            "step": tutorial.steps.map((step, index) => ({
              "@type": "HowToStep",
              "position": index + 1,
              "name": step.title,
              "text": step.content,
            })),
          }),
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="mb-8 text-sm">
              <ol className="flex items-center space-x-2">
                <li>
                  <Link href={`/${locale}`} className="text-blue-600 hover:text-blue-800">Home</Link>
                </li>
                <li className="text-gray-400">/</li>
                <li>
                  <Link href={`/${locale}/tutorials`} className="text-blue-600 hover:text-blue-800">Tutorials</Link>
                </li>
                <li className="text-gray-400">/</li>
                <li className="text-gray-600">{tutorial.title}</li>
              </ol>
            </nav>

            {/* Tutorial Header */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${difficultyColors[tutorial.difficulty]}`}>
                  {tutorial.difficulty}
                </span>
                <span className="text-sm text-gray-500">{tutorial.readTime}</span>
                <span className="text-sm text-blue-600 font-medium">
                  {tutorial.category}
                  {locale !== 'en' && (
                    <span className="ml-2 inline-block px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full">
                      English
                    </span>
                  )}
                </span>
              </div>

              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {tutorial.title}
              </h1>
              <p className="text-xl text-gray-600">
                {tutorial.description}
              </p>
            </div>

            {/* Tutorial Steps */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Tutorial Steps</h2>
              <div className="space-y-8">
                {tutorial.steps.map((step, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-6">
                    <div className="flex items-start">
                      <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0 font-bold">
                        {index + 1}
                      </span>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">{step.content}</p>
                        {step.code && (
                          <pre className="mt-4 bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                            <code>{step.code}</code>
                          </pre>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Tutorials */}
            {relatedTutorials.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Tutorials</h2>
                <div className="space-y-4">
                  {relatedTutorials.map((related) => (
                    <Link
                      key={related.slug}
                      href={`/${locale}/tutorials/${related.slug}`}
                      className="block border rounded-lg p-4 hover:border-blue-500 hover:shadow-md transition-all"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 flex-1">
                          {related.title}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded text-xs ${difficultyColors[related.difficulty]}`}>
                            {related.difficulty}
                          </span>
                          {locale !== 'en' && (
                            <span className="inline-block px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full">
                              English
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{related.description}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Back to Tutorials */}
            <div className="text-center">
              <Link
                href={`/${locale}/tutorials`}
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Tutorials
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
