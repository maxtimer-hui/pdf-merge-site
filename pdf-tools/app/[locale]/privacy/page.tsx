import {useTranslations} from 'next-intl';
import {Metadata} from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {getPageAlternates} from '@/lib/canonical';

export async function generateMetadata({ params }: { params: Promise<{locale: string}> }): Promise<Metadata> {
  const {locale} = await params;
  const t = await import(`@/messages/${locale}.json`);

  return {
    title: t.seo.privacy.title,
    description: t.seo.privacy.description,
    keywords: t.seo.privacy.keywords,
    alternates: getPageAlternates(locale, 'privacy'),
  };
}

export default function PrivacyPage({params}: {params: Promise<{locale: string}>}) {
  return (
    <PromiseWrapper params={params} />
  );
}

function PromiseWrapper({params}: {params: Promise<{locale: string}>}) {
  const {locale} = require('react').use(params);
  const t = require('next-intl').useTranslations('privacy');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentLocale={locale} />

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('title')}</h1>
          <p className="text-sm text-gray-600 mb-8">{t('lastUpdated')}: {new Date().toLocaleDateString()}</p>

          {/* Introduction */}
          <section className="mb-8">
            <p className="text-gray-700 leading-relaxed">{t('intro')}</p>
          </section>

          {/* Information We Collect */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('infoCollect.title')}</h2>

            <h3 className="text-xl font-medium text-gray-800 mb-3">{t('infoCollect.autoCollect.title')}</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li>{t('infoCollect.autoCollect.browser')}</li>
              <li>{t('infoCollect.autoCollect.device')}</li>
              <li>{t('infoCollect.autoCollect.access')}</li>
              <li>{t('infoCollect.autoCollect.ip')}</li>
            </ul>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
              <p className="font-semibold text-blue-900">{t('infoCollect.files.title')}</p>
              <ul className="list-disc list-inside space-y-1 text-blue-800 mt-2">
                <li>{t('infoCollect.files.point1')}</li>
                <li>{t('infoCollect.files.point2')}</li>
                <li>{t('infoCollect.files.point3')}</li>
              </ul>
            </div>
          </section>

          {/* How We Use Information */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('howUse.title')}</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>{t('howUse.improve')}</li>
              <li>{t('howUse.analyze')}</li>
              <li>{t('howUse.security')}</li>
              <li>{t('howUse.legal')}</li>
            </ul>
          </section>

          {/* Cookies */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('cookies.title')}</h2>
            <p className="text-gray-700 mb-3">{t('cookies.intro')}</p>
            <p className="text-gray-700">
              {t('cookies.detail')} <Link href={`/${locale}/cookies`} className="text-blue-600 hover:underline">{t('cookies.cookiePolicy')}</Link>
            </p>
          </section>

          {/* Third-Party Services */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('thirdParty.title')}</h2>
            <ul className="space-y-3 text-gray-700">
              <li><strong>Google Analytics:</strong> {t('thirdParty.analytics')}</li>
              <li><strong>Google AdSense:</strong> {t('thirdParty.adsense')}</li>
              <li><strong>Vercel/Netlify:</strong> {t('thirdParty.hosting')}</li>
            </ul>
            <p className="text-gray-600 mt-3">{t('thirdParty.privacy')}</p>
          </section>

          {/* Data Security */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('security.title')}</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>{t('security.https')}</li>
              <li>{t('security.noStorage')}</li>
              <li>{t('security.audit')}</li>
            </ul>
          </section>

          {/* User Rights */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('rights.title')}</h2>
            <p className="text-gray-700 mb-3">{t('rights.intro')}</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li><strong>{t('rights.access.title')}:</strong> {t('rights.access.desc')}</li>
              <li><strong>{t('rights.delete.title')}:</strong> {t('rights.delete.desc')}</li>
              <li><strong>{t('rights.correct.title')}:</strong> {t('rights.correct.desc')}</li>
              <li><strong>{t('rights.object.title')}:</strong> {t('rights.object.desc')}</li>
            </ul>
            <p className="text-gray-700 mt-3">{t('rights.contact')}</p>
          </section>

          {/* Children's Privacy */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('children.title')}</h2>
            <p className="text-gray-700">{t('children.content')}</p>
          </section>

          {/* Policy Updates */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('updates.title')}</h2>
            <p className="text-gray-700">{t('updates.content')}</p>
          </section>

          {/* Contact */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('contact.title')}</h2>
            <p className="text-gray-700">
              {t('contact.email')}: <a href="mailto:contact@pdftools.com" className="text-blue-600 hover:underline">contact@pdftools.com</a>
            </p>
            <p className="text-gray-700 mt-2">{t('contact.response')}</p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
