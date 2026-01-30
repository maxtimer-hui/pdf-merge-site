'use client';

import FAQ from '@/components/FAQ';
import { toolFAQs } from '@/lib/schema-faq';

interface FAQSectionProps {
  locale: string;
}

export default function FAQSection({ locale }: FAQSectionProps) {
  return (
    <FAQ faqs={toolFAQs.merge[locale as keyof typeof toolFAQs.merge] || toolFAQs.merge.en} />
  );
}
