import {Metadata} from 'next';
import {getTranslations} from 'next-intl/server';
import {generateFAQSchema, getToolFAQs} from '@/lib/schema-faq';
import {generateHowToSchema, splitHowTo} from '@/lib/schema-howto';
import {getPageAlternates} from '@/lib/canonical';
import SplitClient from './SplitClient';

// 生成页面 metadata
export async function generateMetadata({ params }: { params: Promise<{ locale: string}> }): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'seo.split'});

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    alternates: getPageAlternates(locale, 'split'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `https://www.combinepdffree.net/${locale}/split`,
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
  };
}

export default async function SplitPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;

  const faqs = getToolFAQs('split', locale);
  const faqSchema = generateFAQSchema(faqs);

  const howToData = splitHowTo[locale as keyof typeof splitHowTo] || splitHowTo.en;
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
      <SplitClient params={params} />
    </>
  );
}
