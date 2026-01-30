'use client';

import { use } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FAQ from '@/components/FAQ';
import { getToolFAQs } from '@/lib/schema-faq';
import HeroSection from './components/HeroSection';
import ToolSection from './components/ToolSection';
import HowToSection from './components/HowToSection';
import UseCasesSection from './components/UseCasesSection';
import SEOContentSection from './components/SEOContentSection';
import BlogSection from './components/BlogSection';

export default function DeletePagesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  const tc = useTranslations('common');

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-100">
      <Navbar currentLocale={locale} />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Link href={`/${locale}`} className="inline-flex items-center text-red-600 hover:text-red-800 mb-6">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            {tc('backToHome')}
          </Link>

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

          {/* Blog Section */}
          <BlogSection locale={locale} />
        </div>
      </main>

      {/* FAQ Section */}
      <FAQ faqs={getToolFAQs('delete-pages', locale)} />

      <Footer />
    </div>
  );
}
