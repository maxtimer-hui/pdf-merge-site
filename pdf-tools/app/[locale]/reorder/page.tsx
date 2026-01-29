import {Metadata} from 'next';
import {getTranslations} from 'next-intl/server';
import {generateFAQSchema, getToolFAQs} from '@/lib/schema-faq';
import {generateHowToSchema, reorderHowTo} from '@/lib/schema-howto';
import ReorderClient from './ReorderClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string}> }): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'seo.reorder'});

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `https://combinepdffree.net/${locale}/reorder`,
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
  };
}

export default async function ReorderPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;

  const faqs = getToolFAQs('reorder', locale);
  const faqSchema = generateFAQSchema(faqs);

  const howToData = reorderHowTo[locale as keyof typeof reorderHowTo] || reorderHowTo.en;
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
      <ReorderClient params={params} howToData={howToData} />
    </>
  );
}
