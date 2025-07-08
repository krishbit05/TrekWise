import './globals.css';
import { Inter } from 'next/font/google';
import { Metadata } from 'next';
import Navbar from '../components/Navbar';
import { Toaster } from 'react-hot-toast';
import ClientLayout from './ClientLayout';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Trekwise – AI Trip Planner',
  description: 'Plan smart, travel smarter.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-black`}>
        <ClientLayout>
          <Navbar />
          <Toaster position="top-center" reverseOrder={false} />
          <main className="min-h-screen p-20">{children}</main>
          <Footer/>
        </ClientLayout>
      </body>
    </html>
  );
}
