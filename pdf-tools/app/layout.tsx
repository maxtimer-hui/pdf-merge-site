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

// Root layout 只返回 children,因为 locale layout 处理 html/body
export default function RootLayout({children}: Props) {
  return children;
}
