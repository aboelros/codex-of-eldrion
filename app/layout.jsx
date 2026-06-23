import './globals.css';
import MainNav from '@/components/layout/MainNav';
import Footer from '@/components/layout/Footer';

export const metadata = {
  title: 'The Codex of Eldrion',
  description: 'A complete record of the 13 Dimensions, cataloguing 120,000 years of history.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Cinzel:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Noto+Naskh+Arabic:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <div className="min-h-screen flex flex-col">
          <MainNav />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
