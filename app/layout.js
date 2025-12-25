import './globals.css';
import SmoothScrollProvider from '../components/SmoothScrollProvider';

export const metadata = {
  title: 'CrochetStory - Handcrafted Crochet Products',
  description: 'Beautiful handmade crochet products crafted with love and expertise',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="lenis lenis-smooth">
      <body>
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
