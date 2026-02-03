'use client';

import { use } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import RelatedTools from '@/components/RelatedTools';
import HeroSection from './components/HeroSection';
import ToolSection from './components/ToolSection';
import HowToSection from './components/HowToSection';
import UseCasesSection from './components/UseCasesSection';
import SEOContentSection from './components/SEOContentSection';
import BlogSection from './components/BlogSection';

export default function SplitClient({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  const tc = useTranslations('common');

  const breadcrumbItems = [
    { name: 'Home', href: '' },
    { name: 'Split PDF', href: '/split' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <Navbar currentLocale={locale} />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <Breadcrumb items={breadcrumbItems} locale={locale} />

          {/* Hero Section */}
          <HeroSection locale={locale} />

          {/* Tool Section */}
          <ToolSection locale={locale} />

          {/* How To Section */}
          <HowToSection locale={locale} />

          {/* Use Cases Section */}
          <UseCasesSection locale={locale} />

          {/* SEO Content Section */}
          <SEOContentSection locale={locale} />

          {/* Related Tools */}
          <RelatedTools currentTool="split" locale={locale} />

          {/* Blog Section */}
          <BlogSection locale={locale} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
