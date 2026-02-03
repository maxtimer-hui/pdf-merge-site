import {Metadata} from 'next';
import {getTranslations} from 'next-intl/server';
import {generateFAQSchema, getToolFAQs} from '@/lib/schema-faq';
import {generateHowToSchema, batchHowTo} from '@/lib/schema-howto';
import BatchClient from './BatchClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string}> }): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'seo.batch'});

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `https://www.combinepdffree.net/${locale}/batch`,
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
  };
}

export default async function BatchPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;

  const faqs = getToolFAQs('batch', locale);
  const faqSchema = generateFAQSchema(faqs);

  const howToData = batchHowTo[locale as keyof typeof batchHowTo] || batchHowTo.en;
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
      <BatchClient params={params} />
    </>
  );
}
