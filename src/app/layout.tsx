import './globals.css';
import { Poppins} from 'next/font/google';
import { Metadata } from 'next';
import Navbar from '../components/Navbar';
import { Toaster } from 'react-hot-toast';
import ClientLayout from './ClientLayout';
import Footer from '@/components/Footer';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600', '700'] });

export const metadata: Metadata = {
  title: 'Trekwise – AI Trip Planner',
  description: 'Plan smart, travel smarter.', 
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <link rel="shortcut icon" href="/logo.png" type="image/x-icon" />
      <body className={`${poppins.className} text-black`}>
        <div className="fixed inset-0 -z-10 bg-cover bg-center brightness-[0.5]"
          style={{ backgroundImage: "url('/bg.jpg')" }}>
        </div>
        <ClientLayout>
          <Navbar />
          <Toaster position="top-center" reverseOrder={false} />
          <main className="min-h-screen p-20">{children}</main>
          <Footer />
        </ClientLayout>
      </body>
    </html>
  );
}
