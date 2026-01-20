import {Metadata} from 'next';
import {getTranslations} from 'next-intl/server';
import RotateClient from './RotateClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string}> }): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'seo.rotate'});

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `https://combinepdffree.net/${locale}/rotate`,
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
  };
}

export default function RotatePage({ params }: { params: Promise<{ locale: string }> }) {
  return <RotateClient params={params} />;
}
