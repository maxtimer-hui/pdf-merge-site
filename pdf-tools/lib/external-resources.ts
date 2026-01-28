interface ExternalResource {
  category: string;
  title: string;
  url: string;
  description: string;
  lang: string;
}

export const externalResources: ExternalResource[] = [
  {
    category: 'Official Documentation',
    title: 'Adobe PDF Documentation',
    url: 'https://www.adobe.com/devnet/pdf/pdf_reference.html',
    description: 'Official PDF reference documentation from Adobe, the creator of PDF format.',
    lang: 'en',
  },
  {
    category: 'Official Documentation',
    title: 'PDF Association',
    url: 'https://www.pdfa.org/',
    description: 'International association for PDF standards and best practices.',
    lang: 'en',
  },
  {
    category: 'Tools & Libraries',
    title: 'PDF.js - Mozilla',
    url: 'https://mozilla.github.io/pdf.js/',
    description: 'Mozilla\'s JavaScript library for rendering PDFs in the browser.',
    lang: 'en',
  },
  {
    category: 'Standards',
    title: 'ISO 32000 (PDF Standard)',
    url: 'https://www.iso.org/standard/75839.html',
    description: 'Official ISO standard for PDF file format specification.',
    lang: 'en',
  },
  {
    category: 'Best Practices',
    title: 'PDF Accessibility Guide',
    url: 'https://www.pdfa.org/pdf-ua/',
    description: 'Guidelines for creating accessible PDF documents (PDF/UA).',
    lang: 'en',
  },
];

export function getResourcesByCategory(category: string): ExternalResource[] {
  return externalResources.filter(r => r.category === category);
}

export function getResourceCategories(): string[] {
  return Array.from(new Set(externalResources.map(r => r.category)));
}
