import {ReactNode} from 'react';
import type {Metadata} from 'next';
import './globals.css';

type Props = {
  children: ReactNode;
};

// Google Search Console 验证
export const metadata: Metadata = {
  verification: {
    google: 'aIKWZxW44rguvtrGMisoRaBhjyOVbSRuHGsSEKvjbDY',
  },
};

export default function RootLayout({children}: Props) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
