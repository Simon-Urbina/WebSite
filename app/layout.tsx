import type { Metadata } from 'next';
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import { Inter, Poppins } from 'next/font/google';
import SiteNavbar from '@/components/SiteNavbar';
import SiteFooter from '@/components/SiteFooter';
import StickyPlayer from '@/components/StickyPlayer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600', '700'], variable: '--font-poppins' });

export const metadata: Metadata = {
  title: 'Disociando — Podcast USTA Tunja',
  description: 'Podcast del Semillero PIXELES — Universidad Santo Tomás de Aquino (Tunja). Ciencia, cultura y tecnología con estilo.',
  icons: [{ rel: 'icon', url: '/favicon.ico' }]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} ${poppins.variable}`}>
      <body>
        <SiteNavbar />
        <main className="pb-5">
          {children}
        </main>
        <SiteFooter />
        <StickyPlayer />
      </body>
    </html>
  );
}
