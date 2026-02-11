import {Metadata} from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {getPageAlternates} from '@/lib/canonical';

export async function generateMetadata({ params }: { params: Promise<{locale: string}> }): Promise<Metadata> {
  const {locale} = await params;
  const t = await import(`@/messages/${locale}.json`);

  return {
    title: t.seo.cookies.title,
    description: t.seo.cookies.description,
    alternates: getPageAlternates(locale, 'cookies'),
  };
}

export default function CookiesPage({params}: {params: Promise<{locale: string}>}) {
  return (
    <PromiseWrapper params={params} />
  );
}

function PromiseWrapper({params}: {params: Promise<{locale: string}>}) {
  const {locale} = require('react').use(params);
  const t = require('next-intl').useTranslations('cookies');

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

          {/* What are Cookies */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('whatAre.title')}</h2>
            <p className="text-gray-700">{t('whatAre.content')}</p>
          </section>

          {/* Essential Cookies */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              🔴 {t('essential.title')}
            </h2>
            <div className="bg-red-50 border-l-4 border-red-500 p-4">
              <p className="font-semibold text-red-900 mb-2">{t('essential.purpose.title')}:</p>
              <ul className="list-disc list-inside space-y-1 text-red-900 mb-3">
                <li>{t('essential.purpose.session')}</li>
                <li>{t('essential.purpose.language')}</li>
                <li>{t('essential.purpose.security')}</li>
                <li>{t('essential.purpose.loadbalancing')}</li>
              </ul>
              <p className="text-red-900">
                <strong>{t('essential.count')}:</strong> 2-3 | {t('essential.duration')}: 1 {t('year')} | {t('essential.disable')}: ❌ {t('no')}
              </p>
            </div>
          </section>

          {/* Analytics Cookies */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              🟡 {t('analytics.title')}
            </h2>
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
              <p className="font-semibold text-yellow-900 mb-2">{t('analytics.purpose.title')}:</p>
              <ul className="list-disc list-inside space-y-1 text-yellow-900 mb-3">
                <li>{t('analytics.purpose.stats')}</li>
                <li>{t('analytics.purpose.behavior')}</li>
                <li>{t('analytics.purpose.performance')}</li>
                <li>{t('analytics.purpose.popular')}</li>
              </ul>
              <p className="text-yellow-900 mb-3">
                <strong>{t('analytics.provider')}:</strong> Google Analytics | <strong>{t('analytics.count')}:</strong> 3-5 | <strong>{t('analytics.duration')}:</strong> 2 {t('years')} | <strong>{t('analytics.disable')}:</strong> ✅ {t('yes')}
              </p>
              <p className="text-yellow-800 text-sm">
                <strong>{t('analytics.privacy')}:</strong> <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{t('analytics.privacyLink')}</a>
              </p>
            </div>
          </section>

          {/* Advertising Cookies */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              🟢 {t('advertising.title')}
            </h2>
            <div className="bg-green-50 border-l-4 border-green-500 p-4">
              <p className="font-semibold text-green-900 mb-2">{t('advertising.purpose.title')}:</p>
              <ul className="list-disc list-inside space-y-1 text-green-900 mb-3">
                <li>{t('advertising.purpose.relevant')}</li>
                <li>{t('advertising.purpose.track')}</li>
                <li>{t('advertising.purpose.frequency')}</li>
              </ul>
              <p className="text-green-900 mb-3">
                <strong>{t('advertising.provider')}:</strong> Google AdSense | <strong>{t('advertising.count')}:</strong> 3-4 | <strong>{t('advertising.duration')}:</strong> 1-2 {t('years')} | <strong>{t('advertising.disable')}:</strong> ✅ {t('yes')}
              </p>
              <p className="text-green-800 text-sm">
                <strong>{t('advertising.privacy')}:</strong> <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{t('advertising.privacyLink')}</a>
              </p>
            </div>
          </section>

          {/* Third-Party Cookies Table */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('thirdParty.title')}</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 border-b text-left">{t('thirdParty.table.name')}</th>
                    <th className="px-4 py-2 border-b text-left">{t('thirdParty.table.purpose')}</th>
                    <th className="px-4 py-2 border-b text-left">{t('thirdParty.table.privacy')}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-2 border-b">
                      <strong>Google Analytics</strong>
                      <br/><span className="text-xs text-gray-600">_ga, _gid, _gat</span>
                    </td>
                    <td className="px-4 py-2 border-b">{t('thirdParty.table.analyticsPurpose')}</td>
                    <td className="px-4 py-2 border-b">
                      <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">{t('thirdParty.table.policy')}</a>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border-b">
                      <strong>Google AdSense</strong>
                      <br/><span className="text-xs text-gray-600">IDE, DSID, id</span>
                    </td>
                    <td className="px-4 py-2 border-b">{t('thirdParty.table.adsPurpose')}</td>
                    <td className="px-4 py-2 border-b">
                      <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">{t('thirdParty.table.policy')}</a>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border-b">
                      <strong>Vercel/Netlify</strong>
                      <br/><span className="text-xs text-gray-600">__cfduid, __vercel</span>
                    </td>
                    <td className="px-4 py-2 border-b">{t('thirdParty.table.hostingPurpose')}</td>
                    <td className="px-4 py-2 border-b">
                      <span className="text-gray-500 text-sm">{t('thirdParty.table.seeWebsite')}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* How to Manage Cookies */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('manage.title')}</h2>

            <h3 className="text-xl font-medium text-gray-800 mb-3">{t('manage.browser.title')}</h3>
            <div className="space-y-3 text-gray-700">
              <div>
                <strong>Chrome:</strong> {t('manage.browser.chrome')}
              </div>
              <div>
                <strong>Firefox:</strong> {t('manage.browser.firefox')}
              </div>
              <div>
                <strong>Safari:</strong> {t('manage.browser.safari')}
              </div>
              <div>
                <strong>Edge:</strong> {t('manage.browser.edge')}
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-4">
              <p className="text-blue-900">{t('manage.warning')}</p>
            </div>
          </section>

          {/* Cookie Consent Banner */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('consent.title')}</h2>
            <p className="text-gray-700 mb-3">{t('consent.intro')}</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>✅ {t('consent.acceptAll')}</li>
              <li>⚙️ {t('consent.customize')}</li>
              <li>❌ {t('consent.necessaryOnly')}</li>
            </ul>
            <p className="text-gray-700 mt-3">{t('consent.change')}</p>
          </section>

          {/* Why We Use Cookies */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('whyUse.title')}</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li><strong>{t('whyUse.improve.title')}:</strong> {t('whyUse.improve.content')}</li>
              <li><strong>{t('whyUse.analyze.title')}:</strong> {t('whyUse.analyze.content')}</li>
              <li><strong>{t('whyUse.monetize.title')}:</strong> {t('whyUse.monetize.content')}</li>
              <li><strong>{t('whyUse.security.title')}:</strong> {t('whyUse.security.content')}</li>
            </ul>
          </section>

          {/* Cookie Security */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('cookieSecurity.title')}</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>{t('cookieSecurity.https')}</li>
              <li>{t('cookieSecurity.noSensitive')}</li>
              <li>{t('cookieSecurity.audit')}</li>
              <li>{t('cookieSecurity.compliance')}</li>
            </ul>
          </section>

          {/* GDPR/CCPA */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('rights.title')}</h2>

            <div className="mb-4">
              <h3 className="text-lg font-medium text-gray-800 mb-2">GDPR ({t('rights.eu')}):</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>{t('rights.gdpr.consent')}</li>
                <li>{t('rights.gdpr.inform')}</li>
                <li>{t('rights.gdpr.withdraw')}</li>
                <li>{t('rights.gdpr.access')}</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">CCPA ({t('rights.california')}):</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>{t('rights.ccpa.sell')}</li>
                <li>{t('rights.ccpa.track')}</li>
                <li>{t('rights.ccpa.delete')}</li>
              </ul>
            </div>
          </section>

          {/* Updates */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('updates.title')}</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>{t('updates.review')}</li>
              <li>{t('updates.thirdParty')}</li>
              <li>{t('updates.notify')}</li>
            </ul>
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
