import Link from 'next/link';
import { FaFacebook, FaInstagram, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🏆</span>
              <span className="text-2xl font-bold gradient-text">EcommerSpot</span>
            </Link>
            <p className="text-gray-400 mb-4">
              Cửa hàng dụng cụ thể thao hàng đầu Việt Nam. Cam kết sản phẩm chính hãng, giá tốt nhất.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors"><FaFacebook className="text-xl" /></a>
              <a href="#" className="text-gray-400 hover:text-secondary transition-colors"><FaInstagram className="text-xl" /></a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors"><FaYoutube className="text-xl" /></a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-bold mb-4">Danh Mục</h3>
            <ul className="space-y-2">
              {['badminton', 'football', 'basketball', 'tennis', 'accessories'].map(cat => (
                <li key={cat}>
                  <Link href={`/products?category=${cat}`} className="text-gray-400 hover:text-white transition-colors">
                    {cat === 'badminton' ? '🏸 Cầu Lông' : cat === 'football' ? '⚽ Bóng Đá' : 
                     cat === 'basketball' ? '🏀 Bóng Rổ' : cat === 'tennis' ? '🎾 Tennis' : '🎒 Phụ Kiện'}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-bold mb-4">Hỗ Trợ</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Chính sách đổi trả</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Chính sách bảo hành</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Hướng dẫn mua hàng</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Câu hỏi thường gặp</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Liên Hệ</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-400">
                <FaPhone className="text-primary" /><span>1900 1234 56</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <FaEnvelope className="text-primary" /><span>support@ecommerspot.vn</span>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <FaMapMarkerAlt className="text-primary mt-1" /><span>123 Nguyễn Văn Linh, Q7, TP.HCM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center text-gray-400">
          <p>© {new Date().getFullYear()} EcommerSpot. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
