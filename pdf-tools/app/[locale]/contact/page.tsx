import {Metadata} from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {getPageAlternates} from '@/lib/canonical';

export async function generateMetadata({ params }: { params: Promise<{locale: string}> }): Promise<Metadata> {
  const {locale} = await params;
  const t = await import(`@/messages/${locale}.json`);

  return {
    title: t.seo.contact.title,
    description: t.seo.contact.description,
    alternates: getPageAlternates(locale, 'contact'),
  };
}

export default function ContactPage({params}: {params: Promise<{locale: string}>}) {
  return (
    <PromiseWrapper params={params} />
  );
}

function PromiseWrapper({params}: {params: Promise<{locale: string}>}) {
  const {locale} = require('react').use(params);
  const t = require('next-intl').useTranslations('contact');
  const tc = require('next-intl').useTranslations('common');

  const faqs = [
    {q: t('faq.howToUse.q'), link: `#`},
    {q: t('faq.formats.q'), link: `#`},
    {q: t('faq.filesize.q'), link: `#`},
    {q: t('faq.isFree.q'), link: `#`},
    {q: t('faq.safe.q'), link: `#`},
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar currentLocale={locale} />

      <main className="container mx-auto px-4 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">{t('title')}</h1>
          <p className="text-2xl text-gray-700">{t('subtitle')}</p>
          <p className="text-gray-600 mt-2">{t('intro')}</p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
          {/* Contact Methods */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('contactMethods')}</h2>

              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-2xl">📧</span>
                    <h3 className="font-semibold text-gray-800">{t('general.title')}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{t('general.desc')}</p>
                  <a href="mailto:contact@pdftools.com" className="text-blue-600 hover:underline text-sm">contact@pdftools.com</a>
                  <p className="text-xs text-gray-500 mt-1">{t('response')}: {t('general.response')}</p>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-2xl">💼</span>
                    <h3 className="font-semibold text-gray-800">{t('business.title')}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{t('business.desc')}</p>
                  <a href="mailto:business@pdftools.com" className="text-blue-600 hover:underline text-sm">business@pdftools.com</a>
                  <p className="text-xs text-gray-500 mt-1">{t('response')}: {t('business.response')}</p>
                </div>

                <div className="border-l-4 border-red-500 pl-4">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-2xl">🔐</span>
                    <h3 className="font-semibold text-gray-800">{t('security.title')}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{t('security.desc')}</p>
                  <a href="mailto:security@pdftools.com" className="text-blue-600 hover:underline text-sm">security@pdftools.com</a>
                  <p className="text-xs text-gray-500 mt-1">{t('response')}: {t('security.response')}</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">{t('social.title')}</h2>
              <div className="space-y-2">
                <a href="https://twitter.com/pdftools" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors">
                  <span>🐦</span>
                  <span>Twitter</span>
                </a>
                <a href="https://github.com/pdftools" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors">
                  <span>💻</span>
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('form.title')}</h2>

              <form
                action="https://formspree.io/f/your-form-id"
                method="POST"
                className="space-y-6"
              >
                {/* Name (Optional) */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('form.name')} <span className="text-gray-500">({t('optional')})</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder={t('form.namePlaceholder')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Email (Required) */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('form.email')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder={t('form.emailPlaceholder')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Subject (Required) */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('form.subject')} <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">{t('form.selectSubject')}</option>
                    <option value="general">{t('form.subjects.general')}</option>
                    <option value="bug">{t('form.subjects.bug')}</option>
                    <option value="feature">{t('form.subjects.feature')}</option>
                    <option value="business">{t('form.subjects.business')}</option>
                    <option value="privacy">{t('form.subjects.privacy')}</option>
                    <option value="other">{t('form.subjects.other')}</option>
                  </select>
                </div>

                {/* Message (Required) */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('form.message')} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    maxLength={1000}
                    placeholder={t('form.messagePlaceholder')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  ></textarea>
                  <p className="text-sm text-gray-500 mt-1">{t('form.maxChars')}: 1000</p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  {t('form.submit')}
                </button>

                <p className="text-sm text-gray-600 text-center">
                  {t('form.privacy')}{' '}
                  <Link href={`/${locale}/privacy`} className="text-blue-600 hover:underline">
                    {t('form.privacyLink')}
                  </Link>
                </p>
              </form>
            </div>

            {/* Business Collaboration */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-lg p-6 mt-6 text-white">
              <h3 className="text-xl font-bold mb-3">{t('business.title')}</h3>
              <p className="mb-3">{t('business.collab')}</p>
              <ul className="space-y-2 text-sm">
                <li>📢 {t('business.ads')}</li>
                <li>🔌 {t('business.api')}</li>
                <li>🏢 {t('business.whiteLabel')}</li>
              </ul>
              <p className="mt-4 text-sm">
                {t('business.contactUs')}: <a href="mailto:business@pdftools.com" className="underline hover:text-blue-200">business@pdftools.com</a>
              </p>
            </div>

            {/* Quick FAQ Links */}
            <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">{t('faq.title')}</h3>
              <p className="text-gray-600 mb-4">{t('faq.subtitle')}</p>
              <ul className="space-y-2">
                {faqs.map((faq, index) => (
                  <li key={index}>
                    <Link href={faq.link} className="text-blue-600 hover:underline">
                      {faq.q}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Working Hours */}
            <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">{t('hours.title')}</h3>
              <div className="space-y-2 text-gray-700">
                <p><strong>{t('hours.responseTime')}:</strong></p>
                <ul className="list-disc list-inside ml-4">
                  <li>{t('hours.general')}: {t('hours.generalTime')}</li>
                  <li>{t('hours.security')}: {t('hours.securityTime')}</li>
                  <li>{t('hours.business')}: {t('hours.businessTime')}</li>
                </ul>
                <p className="mt-3"><strong>{t('hours.workdays')}:</strong> {t('hours.days')}</p>
                <p><strong>{t('hours.timezone')}:</strong> UTC+8</p>
              </div>
            </div>

            {/* Privacy Note */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-6">
              <h4 className="font-semibold text-blue-900 mb-2">{t('privacyNote.title')}</h4>
              <p className="text-sm text-blue-800">{t('privacyNote.collect')}</p>
              <p className="text-sm text-blue-800">{t('privacyNote.use')}</p>
              <p className="text-sm text-blue-800">{t('privacyNote.share')}</p>
              <p className="text-sm text-blue-800">{t('privacyNote.retain')}</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
