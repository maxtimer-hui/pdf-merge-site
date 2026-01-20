import {Metadata} from 'next';
import {getTranslations} from 'next-intl/server';
import DeletePagesClient from './DeletePagesClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string}> }): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'seo.deletePages'});

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `https://combinepdffree.net/${locale}/delete-pages`,
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
  };
}

export default function DeletePagesPage({ params }: { params: Promise<{ locale: string }> }) {
  return <DeletePagesClient params={params} />;
}
