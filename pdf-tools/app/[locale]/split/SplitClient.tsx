'use client';

import { use } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from './components/HeroSection';
import ToolSection from './components/ToolSection';
import HowToSection from './components/HowToSection';
import UseCasesSection from './components/UseCasesSection';
import SEOContentSection from './components/SEOContentSection';
import BlogSection from './components/BlogSection';

export default function SplitClient({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  const tc = useTranslations('common');

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <Navbar currentLocale={locale} />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center text-green-600 hover:text-green-800 mb-6"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {tc('backToHome')}
          </Link>

          <HeroSection locale={locale} />
          <ToolSection locale={locale} />
          <HowToSection locale={locale} />
          <UseCasesSection locale={locale} />
          <SEOContentSection locale={locale} />
          <BlogSection locale={locale} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
