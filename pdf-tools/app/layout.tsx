import {ReactNode} from 'react';
import type {Metadata} from 'next';

type Props = {
  children: ReactNode;
};

// Google Search Console 验证
export const metadata: Metadata = {
  verification: {
    google: 'aIKWZxW44rguvtrGMisoRaBhjyOVbSRuHGsSEKvjbDY',
  },
};

// Since we have a root layout, we must include <html> and <body> tags
export default function RootLayout({children}: Props) {
  return children;
}
