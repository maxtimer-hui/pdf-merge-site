'use client';

import { use } from 'react';
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

interface WatermarkClientProps {
  params: Promise<{ locale: string }>;
}

export default function WatermarkClient({ params }: WatermarkClientProps) {
  const { locale } = use(params);

  const breadcrumbItems = [
    { name: 'Home', href: '' },
    { name: 'Watermark PDF', href: '/watermark' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-teal-100">
      <Navbar currentLocale={locale} />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <Breadcrumb items={breadcrumbItems} locale={locale} />

          {/* 1. Hero Section */}
          <HeroSection locale={locale} />

          {/* 2. Tool Section */}
          <ToolSection locale={locale} />

          {/* 3. How-to Steps */}
          <HowToSection locale={locale} />

          {/* 4. Use Cases */}
          <UseCasesSection locale={locale} />

          {/* 5. SEO Content */}
          <SEOContentSection locale={locale} />

          {/* 6. Related Tools */}
          <RelatedTools currentTool="watermark" locale={locale} />

          {/* 7. Blog Articles */}
          <BlogSection locale={locale} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
