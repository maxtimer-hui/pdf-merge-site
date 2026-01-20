import {Metadata} from 'next';
import {getTranslations} from 'next-intl/server';
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
      url: `https://combinepdffree.net/${locale}/merge`,
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
  };
}

export default function MergePage({ params }: { params: Promise<{ locale: string }> }) {
  return <MergeClient params={params} />;
}
