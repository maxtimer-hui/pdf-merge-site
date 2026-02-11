import {Metadata} from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {getPageAlternates} from '@/lib/canonical';

export async function generateMetadata({ params }: { params: Promise<{locale: string}> }): Promise<Metadata> {
  const {locale} = await params;
  const t = await import(`@/messages/${locale}.json`);

  return {
    title: t.seo.terms.title,
    description: t.seo.terms.description,
    alternates: getPageAlternates(locale, 'terms'),
  };
}

export default function TermsPage({params}: {params: Promise<{locale: string}>}) {
  return (
    <PromiseWrapper params={params} />
  );
}

function PromiseWrapper({params}: {params: Promise<{locale: string}>}) {
  const {locale} = require('react').use(params);
  const t = require('next-intl').useTranslations('terms');

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

          {/* Service Description */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('service.title')}</h2>
            <p className="text-gray-700 mb-3">{t('service.description')}</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>{t('service.availability')}</li>
              <li>{t('service.changes')}</li>
            </ul>
          </section>

          {/* User Responsibilities */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('responsibilities.title')}</h2>

            <div className="mb-4">
              <h3 className="text-lg font-medium text-green-700 mb-2">✅ {t('responsibilities.allowed.title')}</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>{t('responsibilities.allowed.personal')}</li>
                <li>{t('responsibilities.allowed.commercial')}</li>
                <li>{t('responsibilities.allowed.legal')}</li>
              </ul>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-4">
              <h3 className="text-lg font-medium text-red-700 mb-2">❌ {t('responsibilities.prohibited.title')}</h3>
              <ul className="list-disc list-inside space-y-1 text-red-900">
                <li>{t('responsibilities.prohibited.illegal')}</li>
                <li>{t('responsibilities.prohibited.infringement')}</li>
                <li>{t('responsibilities.prohibited.abuse')}</li>
                <li>{t('responsibilities.prohibited.automation')}</li>
                <li>{t('responsibilities.prohibited.malware')}</li>
              </ul>
            </div>
          </section>

          {/* Intellectual Property */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('ip.title')}</h2>
            <div className="space-y-3 text-gray-700">
              <p><strong>{t('ip.website.title')}:</strong> {t('ip.website.content')}</p>
              <p><strong>{t('ip.userFiles.title')}:</strong> {t('ip.userFiles.content')}</p>
              <p><strong>{t('ip.opensource.title')}:</strong> {t('ip.opensource.content')}</p>
            </div>
          </section>

          {/* Disclaimer */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('disclaimer.title')}</h2>
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
              <p className="font-semibold text-yellow-900 mb-2">{t('disclaimer.service.title')}</p>
              <ul className="list-disc list-inside space-y-1 text-yellow-900">
                <li>{t('disclaimer.service.noWarranty')}</li>
                <li>{t('disclaimer.service.noGuarantee')}</li>
              </ul>

              <p className="font-semibold text-yellow-900 mt-4 mb-2">{t('disclaimer.files.title')}</p>
              <ul className="list-disc list-inside space-y-1 text-yellow-900">
                <li>{t('disclaimer.files.noResponsibility')}</li>
                <li>{t('disclaimer.files.backup')}</li>
                <li>{t('disclaimer.files.risk')}</li>
              </ul>

              <p className="font-semibold text-yellow-900 mt-4 mb-2">{t('disclaimer.liability.title')}</p>
              <ul className="list-disc list-inside space-y-1 text-yellow-900">
                <li>{t('disclaimer.liability.direct')}</li>
                <li>{t('disclaimer.liability.indirect')}</li>
                <li>{t('disclaimer.liability.profit')}</li>
                <li>{t('disclaimer.liability.data')}</li>
              </ul>
            </div>
          </section>

          {/* Service Limits */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('limits.title')}</h2>
            <div className="space-y-3 text-gray-700">
              <p><strong>{t('limits.usage.title')}:</strong> {t('limits.usage.content')}</p>
              <p><strong>{t('limits.filesize.title')}:</strong> {t('limits.filesize.content')}</p>
              <p><strong>{t('limits.termination.title')}:</strong> {t('limits.termination.content')}</p>
            </div>
          </section>

          {/* Privacy */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('privacy.title')}</h2>
            <p className="text-gray-700">
              {t('privacy.content')} <Link href={`/${locale}/privacy`} className="text-blue-600 hover:underline">{t('privacy.link')}</Link>
            </p>
          </section>

          {/* Third-Party Links */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('thirdParty.title')}</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>{t('thirdParty.links')}</li>
              <li>{t('thirdParty.responsibility')}</li>
              <li>{t('thirdParty.terms')}</li>
            </ul>
          </section>

          {/* Indemnification */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('indemnity.title')}</h2>
            <p className="text-gray-700">{t('indemnity.content')}</p>
          </section>

          {/* Dispute Resolution */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('dispute.title')}</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li><strong>{t('dispute.law')}:</strong> {t('dispute.lawContent')}</li>
              <li><strong>{t('dispute.resolution')}:</strong> {t('dispute.resolutionContent')}</li>
              <li><strong>{t('dispute.court')}:</strong> {t('dispute.courtContent')}</li>
            </ul>
          </section>

          {/* Changes */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('changes.title')}</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>{t('changes.anytime')}</li>
              <li>{t('changes.notification')}</li>
              <li>{t('changes.acceptance')}</li>
              <li>{t('changes.check')}</li>
            </ul>
          </section>

          {/* Contact */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('contact.title')}</h2>
            <p className="text-gray-700">
              {t('contact.email')}: <a href="mailto:contact@pdftools.com" className="text-blue-600 hover:underline">contact@pdftools.com</a>
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
