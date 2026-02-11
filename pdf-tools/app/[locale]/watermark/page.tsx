import {Metadata} from 'next';
import {getTranslations} from 'next-intl/server';
import {generateFAQSchema, getToolFAQs} from '@/lib/schema-faq';
import {generateHowToSchema, watermarkHowTo} from '@/lib/schema-howto';
import {getPageAlternates} from '@/lib/canonical';
import WatermarkClient from './WatermarkClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string}> }): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'seo.watermark'});

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    alternates: getPageAlternates(locale, 'watermark'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `https://www.combinepdffree.net/${locale}/watermark`,
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
  };
}

export default async function WatermarkPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;

  const faqs = getToolFAQs('watermark', locale);
  const faqSchema = generateFAQSchema(faqs);

  const howToData = watermarkHowTo[locale as keyof typeof watermarkHowTo] || watermarkHowTo.en;
  const howToSchema = generateHowToSchema(howToData.name, howToData.steps);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [faqSchema, howToSchema],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <WatermarkClient params={params} />
    </>
  );
}
