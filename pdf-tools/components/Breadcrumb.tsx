'use client';

import Link from 'next/link';
import {generateBreadcrumbSchema} from '@/lib/breadcrumb-schema';

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  locale: string;
}

export default function Breadcrumb({items, locale}: BreadcrumbProps) {
  const schema = generateBreadcrumbSchema(items);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex items-center space-x-2 text-sm">
          {items.map((item, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && <span className="text-gray-400 mx-2">/</span>}
              {index === items.length - 1 ? (
                <span className="text-gray-600 font-medium">{item.name}</span>
              ) : (
                <Link
                  href={`/${locale}${item.href}`}
                  className="text-blue-600 hover:text-blue-800"
                >
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
