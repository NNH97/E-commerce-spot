import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CartProvider } from '@/context/CartContext';

const inter = Inter({ subsets: ['latin', 'vietnamese'] });

export const metadata = {
  title: 'EcommerSpot - Dụng Cụ Thể Thao Chính Hãng',
  description: 'Cửa hàng dụng cụ thể thao uy tín: vợt cầu lông, giày đá bóng, bóng rổ, tennis.',
  keywords: 'dụng cụ thể thao, vợt cầu lông, giày đá bóng, bóng rổ, Yonex, Nike, Adidas',
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <CartProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
