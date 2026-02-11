import {Metadata} from 'next';
import {getTranslations} from 'next-intl/server';
import {generateFAQSchema, getToolFAQs} from '@/lib/schema-faq';
import {generateHowToSchema, encryptHowTo} from '@/lib/schema-howto';
import {getPageAlternates} from '@/lib/canonical';
import EncryptClient from './EncryptClient';

// 生成页面 metadata
export async function generateMetadata({ params }: { params: Promise<{ locale: string}> }): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'seo.encrypt'});

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    alternates: getPageAlternates(locale, 'encrypt'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `https://www.combinepdffree.net/${locale}/encrypt`,
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
  };
}

export default async function EncryptPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;

  const faqs = getToolFAQs('encrypt', locale);
  const faqSchema = generateFAQSchema(faqs);

  const howToData = encryptHowTo[locale as keyof typeof encryptHowTo] || encryptHowTo.en;
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
      <EncryptClient params={params} />
    </>
  );
}
