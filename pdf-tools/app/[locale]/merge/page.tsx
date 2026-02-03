import {Metadata} from 'next';
import {getTranslations} from 'next-intl/server';
import {generateFAQSchema, mergeFAQs} from '@/lib/schema-faq';
import {generateHowToSchema, mergeHowTo} from '@/lib/schema-howto';
import MergeClient from './MergeClient';

// 生成页面 metadata
export async function generateMetadata({ params }: { params: Promise<{ locale: string}> }): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'seo.merge'});

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `https://www.combinepdffree.net/${locale}/merge`,
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
  };
}

export default async function MergePage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;

  const faqs = mergeFAQs[locale as keyof typeof mergeFAQs] || mergeFAQs.en;
  const faqSchema = generateFAQSchema(faqs);

  const howToData = mergeHowTo[locale as keyof typeof mergeHowTo] || mergeHowTo.en;
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
      <MergeClient params={params} />
    </>
  );
}
