import {Metadata} from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export async function generateMetadata({ params }: { params: Promise<{locale: string}> }): Promise<Metadata> {
  const {locale} = await params;
  const t = await import(`@/messages/${locale}.json`);

  return {
    title: t.seo.about.title,
    description: t.seo.about.description,
  };
}

export default function AboutPage({params}: {params: Promise<{locale: string}>}) {
  return (
    <PromiseWrapper params={params} />
  );
}

function PromiseWrapper({params}: {params: Promise<{locale: string}>}) {
  const {locale} = require('react').use(params);
  const t = require('next-intl').useTranslations('about');
  const tc = require('next-intl').useTranslations('common');

  const tools = [
    {icon: '🔗', name: tc('merge'), desc: t('tools.merge')},
    {icon: '✂️', name: tc('split'), desc: t('tools.split')},
    {icon: '📄', name: tc('extract'), desc: t('tools.extract')},
    {icon: '🗜️', name: tc('compress'), desc: t('tools.compress')},
    {icon: '🔄', name: tc('rotate'), desc: t('tools.rotate')},
    {icon: '🗑️', name: tc('deletePages'), desc: t('tools.deletePages')},
    {icon: '🔀', name: tc('reorder'), desc: t('tools.reorder')},
    {icon: '💧', name: tc('watermark'), desc: t('tools.watermark')},
    {icon: '📦', name: tc('batch'), desc: t('tools.batch')},
    {icon: '🔐', name: tc('encrypt'), desc: t('tools.encrypt')},
    {icon: '🔓', name: tc('decrypt'), desc: t('tools.decrypt')},
  ];

  const values = [
    {icon: '🔒', title: t('values.privacy.title'), desc: t('values.privacy.desc')},
    {icon: '⚡', title: t('values.speed.title'), desc: t('values.speed.desc')},
    {icon: '💰', title: t('values.free.title'), desc: t('values.free.desc')},
    {icon: '🌍', title: t('values.global.title'), desc: t('values.global.desc')},
    {icon: '🎨', title: t('values.simple.title'), desc: t('values.simple.desc')},
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar currentLocale={locale} />

      <main className="container mx-auto px-4 py-12">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">{t('title')}</h1>
          <p className="text-2xl text-gray-700">{t('subtitle')}</p>
        </div>

        {/* Our Story */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('story.title')}</h2>
          <p className="text-gray-700 leading-relaxed mb-4">{t('story.why')}</p>
          <p className="text-gray-700 leading-relaxed">{t('story.problem')}</p>
        </div>

        {/* Mission & Values */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('mission.title')}</h2>
          <p className="text-xl text-gray-700 mb-8">{t('mission.statement')}</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Our Tools */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('toolsTitle')}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {tools.map((tool, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-3">{tool.icon}</div>
                <h3 className="font-semibold text-gray-800 mb-2">{tool.name}</h3>
                <p className="text-sm text-gray-600">{tool.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('techStack.title')}</h2>
          <div className="grid md:grid-cols-2 gap-4 text-gray-700">
            <div>
              <strong className="text-gray-900">{t('techStack.framework')}:</strong> Next.js 14 (React)
            </div>
            <div>
              <strong className="text-gray-900">{t('techStack.pdf')}:</strong> pdf-lib
            </div>
            <div>
              <strong className="text-gray-900">{t('techStack.styling')}:</strong> Tailwind CSS
            </div>
            <div>
              <strong className="text-gray-900">{t('techStack.deployment')}:</strong> Vercel/Netlify
            </div>
            <div className="md:col-span-2">
              <strong className="text-gray-900">{t('techStack.openSource')}:</strong> {t('techStack.openSourceDesc')}
            </div>
          </div>
        </div>

        {/* Privacy Promise */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg shadow-lg p-8 mb-8 max-w-4xl mx-auto text-white">
          <h2 className="text-3xl font-bold mb-6">{t('privacy.title')}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-3">
              <div className="text-3xl">🔒</div>
              <div>
                <h3 className="font-semibold mb-1">{t('privacy.noCollection.title')}</h3>
                <p className="text-blue-100 text-sm">{t('privacy.noCollection.desc')}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="text-3xl">💻</div>
              <div>
                <h3 className="font-semibold mb-1">{t('privacy.localProcessing.title')}</h3>
                <p className="text-blue-100 text-sm">{t('privacy.localProcessing.desc')}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="text-3xl">🚫</div>
              <div>
                <h3 className="font-semibold mb-1">{t('privacy.noServer.title')}</h3>
                <p className="text-blue-100 text-sm">{t('privacy.noServer.desc')}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="text-3xl">⚡</div>
              <div>
                <h3 className="font-semibold mb-1">{t('privacy.immediateClear.title')}</h3>
                <p className="text-blue-100 text-sm">{t('privacy.immediateClear.desc')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Future Plans */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('future.title')}</h2>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">🚀 {t('future.short.title')}</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>{t('future.short.moreTools')}</li>
              <li>{t('future.short.translations')}</li>
              <li>{t('future.short.mobile')}</li>
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">⭐ {t('future.mid.title')}</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>{t('future.mid.userSystem')}</li>
              <li>{t('future.mid.forum')}</li>
              <li>{t('future.mid.performance')}</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">🎯 {t('future.long.title')}</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>{t('future.long.api')}</li>
              <li>{t('future.long.desktop')}</li>
              <li>{t('future.long.enterprise')}</li>
            </ul>
          </div>
        </div>

        {/* Team */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('team.title')}</h2>
          <div className="space-y-4 text-gray-700">
            <p>{t('team.who')}</p>
            <p>{t('team.expertise')}</p>
            <p>{t('team.philosophy')}</p>
            <p>
              {t('team.contact')}: <a href="mailto:contact@pdftools.com" className="text-blue-600 hover:underline">contact@pdftools.com</a>
            </p>
          </div>
        </div>

        {/* Support Us */}
        <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-lg shadow-lg p-8 mb-8 max-w-4xl mx-auto text-white text-center">
          <h2 className="text-3xl font-bold mb-4">{t('support.title')}</h2>
          <p className="text-xl mb-6">{t('support.subtitle')}</p>
          <ul className="list-none space-y-2 text-left max-w-md mx-auto">
            <li>✨ {t('support.tell')}</li>
            <li>💬 {t('support.share')}</li>
            <li>💡 {t('support.feedback')}</li>
            <li>⭐ {t('support.github')}</li>
            <li>📺 {t('support.ads')}</li>
          </ul>
        </div>

        {/* Quick FAQ */}
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('faq.title')}</h2>
          <div className="space-y-4 text-gray-700">
            <div>
              <h3 className="font-semibold text-gray-800">Q: {t('faq.free.q')}</h3>
              <p>A: {t('faq.free.a')}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Q: {t('faq.safe.q')}</h3>
              <p>A: {t('faq.safe.a')}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Q: {t('faq.register.q')}</h3>
              <p>A: {t('faq.register.a')}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Q: {t('faq.limit.q')}</h3>
              <p>A: {t('faq.limit.a')}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Q: {t('faq.mobile.q')}</h3>
              <p>A: {t('faq.mobile.a')}</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
