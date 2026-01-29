import {Metadata} from 'next';
import HomeClient from './HomeClient';

export async function generateMetadata({ params }: { params: Promise<{locale: string}> }): Promise<Metadata> {
  const {locale} = await params;
  const t = await import(`@/messages/${locale}.json`);

  return {
    title: t.seo.home?.title || t.common.appName,
    description: t.seo.home?.description || t.common.tagline,
    keywords: t.seo.home?.keywords || 'pdf, tools, merge, split, compress',
  };
}

export default async function HomePage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await import(`@/messages/${locale}.json`);

  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `https://combinepdffree.net/${locale}`,
        "url": `https://combinepdffree.net/${locale}`,
        "name": t.seo.home?.title || "Free PDF Combiner",
        "description": t.seo.home?.description,
        "inLanguage": locale,
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://combinepdffree.net/#website",
          "url": "https://combinepdffree.net",
          "name": "PDF Tools - Free Online PDF Tools"
        }
      },
      {
        "@type": "SoftwareApplication",
        "name": "Free PDF Combiner",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Any (Web-based)",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "description": "Combine PDF files free with our secure online PDF combiner. No registration, no limits, no watermarks.",
        "featureList": [
          "Combine PDF files free",
          "PDF combiner free online",
          "No registration required",
          "Unlimited merges",
          "Secure browser-based processing",
          "Maintain PDF quality"
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "ratingCount": "1250",
          "bestRating": "5",
          "worstRating": "1"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How to combine PDF files free?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Simply upload your PDF files to our free PDF combiner, arrange them in the desired order, and click 'Combine PDF'. Your merged PDF will be ready instantly without any registration."
            }
          },
          {
            "@type": "Question",
            "name": "Is this PDF combiner free?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, our PDF combiner is completely free with no registration, no limits, and no watermarks. You can combine unlimited PDF files."
            }
          },
          {
            "@type": "Question",
            "name": "Is it safe to combine PDF files online?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Absolutely safe. All PDF processing happens locally in your browser. Your files are never uploaded to our servers, ensuring 100% privacy and security."
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HomeClient params={params} />
    </>
  );
}
