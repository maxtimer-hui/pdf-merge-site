import {Metadata} from 'next';
import {getTranslations} from 'next-intl/server';
import ExtractClient from './ExtractClient';

// 生成页面 metadata
export async function generateMetadata({ params }: { params: Promise<{ locale: string}> }): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'seo.extract'});

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `https://combinepdffree.net/${locale}/extract`,
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
  };
}

export default function ExtractPage({ params }: { params: Promise<{ locale: string }> }) {
  return <ExtractClient params={params} />;
}
