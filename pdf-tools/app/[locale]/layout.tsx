import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {locales} from '@/i18n/request';
import {getCanonicalUrl, getAlternateUrls} from '@/lib/canonical';
import {getOrganizationSchema} from '@/lib/team';
import type {Metadata} from 'next';
import '../globals.css';

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

// 生成全局 SEO metadata
export async function generateMetadata({ params }: { params: Promise<{locale: string}> }): Promise<Metadata> {
  const {locale} = await params;

  return {
    metadataBase: new URL('https://combinepdffree.net'),
    title: {
      default: 'Free PDF Tools - Merge, Split, Compress PDF Online',
      template: '%s | PDF Tools'
    },
    description: 'Free online PDF tools: merge, split, compress, rotate, encrypt, decrypt and more. All processing happens in your browser - no files uploaded.',
    alternates: {
      canonical: getCanonicalUrl(locale),
      languages: getAlternateUrls(locales, locale),
    },
    openGraph: {
      type: 'website',
      locale: locale,
      siteName: 'PDF Tools',
      images: [{
        url: '/og-image.png',
        width: 1200,
        height: 630,
      }]
    },
    twitter: {
      card: 'summary_large_image',
    },
    robots: {
      index: true,
      follow: true,
    },
    verification: {
      google: 'aIKWZxW44rguvtrGMisoRaBhjyOVbSRuHGsSEKvjbDY',
    },
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;

  // Ensure that the incoming `locale` is valid
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages({locale});

  const organizationSchema = getOrganizationSchema();

  return (
    <html lang={locale}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages} locale={locale}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
