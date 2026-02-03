'use client';

import { use } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import RelatedTools from '@/components/RelatedTools';
import HeroSection from './components/HeroSection';
import ToolSection from './components/ToolSection';
import HowToSection from './components/HowToSection';
import UseCasesSection from './components/UseCasesSection';
import BlogSection from './components/BlogSection';
import SEOContentSection from './components/SEOContentSection';

export default function ExtractClient({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);

  const breadcrumbItems = [
    { name: 'Home', href: '' },
    { name: 'Extract PDF', href: '/extract' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100">
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

          {/* Blog Section */}
          <BlogSection locale={locale} />

          {/* SEO Content Section */}
          <SEOContentSection locale={locale} />

          {/* Related Tools */}
          <RelatedTools currentTool="extract" locale={locale} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
