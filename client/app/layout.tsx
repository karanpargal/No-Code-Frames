import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

export const metadata = {
  title: 'Frames Creator',
  description: 'Create and share your own frames',
} as Metadata;

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
