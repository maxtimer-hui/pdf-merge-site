import {Metadata} from 'next';
import Link from 'next/link';
import {getTutorials} from '@/lib/tutorials';

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              PDF Tutorials & Guides
            </h1>
            <p className="text-xl text-gray-600">
              Master PDF processing with our comprehensive tutorials
            </p>
          </div>

          {/* Tutorials by Difficulty */}
          {difficulties.map((difficulty) => {
            const difficultyTutorials = tutorials.filter(t => t.difficulty === difficulty);
            if (difficultyTutorials.length === 0) return null;

            const difficultyColors = {
              Beginner: 'bg-green-100 text-green-800',
              Intermediate: 'bg-yellow-100 text-yellow-800',
              Advanced: 'bg-red-100 text-red-800',
            };

            return (
              <div key={difficulty} className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className={`px-3 py-1 rounded-full text-sm mr-3 ${difficultyColors[difficulty]}`}>
                    {difficulty}
                  </span>
                  {difficulty} Tutorials
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {difficultyTutorials.map((tutorial) => (
                    <Link
                      key={tutorial.slug}
                      href={`/${locale}/tutorials/${tutorial.slug}`}
                      className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all p-6 group"
                    >
                      <div className="text-sm text-blue-600 font-semibold mb-2">
                        {tutorial.category}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600">
                        {tutorial.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {tutorial.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{tutorial.readTime}</span>
                        <span>{tutorial.steps.length} Steps</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Categories */}
          <div className="bg-white rounded-lg shadow-lg p-8 mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="border rounded-lg p-4 hover:border-blue-500 transition-colors cursor-pointer">
                <h3 className="font-semibold text-lg mb-2">🔒 Security</h3>
                <p className="text-sm text-gray-600">Protect and secure your PDFs</p>
              </div>
              <div className="border rounded-lg p-4 hover:border-blue-500 transition-colors cursor-pointer">
                <h3 className="font-semibold text-lg mb-2">⚡ Productivity</h3>
                <p className="text-sm text-gray-600">Work faster with batch operations</p>
              </div>
              <div className="border rounded-lg p-4 hover:border-blue-500 transition-colors cursor-pointer">
                <h3 className="font-semibold text-lg mb-2">📉 Optimization</h3>
                <p className="text-sm text-gray-600">Reduce file sizes efficiently</p>
              </div>
            </div>
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
