import {Metadata} from 'next';
import {getTranslations} from 'next-intl/server';
import EncryptClient from './EncryptClient';

// 生成页面 metadata
export async function generateMetadata({ params }: { params: Promise<{ locale: string}> }): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'seo.encrypt'});

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `https://combinepdffree.net/${locale}/encrypt`,
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
  };
}

export default function EncryptPage({ params }: { params: Promise<{ locale: string }> }) {
  return <EncryptClient params={params} />;
}
