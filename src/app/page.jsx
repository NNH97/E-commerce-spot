import Link from 'next/link';
import { FaArrowRight, FaTruck, FaShieldAlt, FaHeadset, FaUndo } from 'react-icons/fa';
import ProductCard from '@/components/ProductCard';
import CategoryCard from '@/components/CategoryCard';
import { products, categories } from '@/data/products';

export default function Home() {
  const saleProducts = products.filter(p => p.isSale).slice(0, 4);
  const newProducts = products.filter(p => p.isNew).slice(0, 4);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="gradient-text">Dụng Cụ Thể Thao</span><br />
            <span className="text-white">Chính Hãng</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Khám phá bộ sưu tập vợt cầu lông, giày đá bóng, bóng rổ và phụ kiện từ các thương hiệu hàng đầu thế giới.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products" className="btn-primary inline-flex items-center gap-2 text-lg">
              Khám Phá Ngay <FaArrowRight />
            </Link>
            <Link href="/products?sale=true" className="btn-secondary inline-flex items-center gap-2 text-lg">
              🔥 Đang Giảm Giá
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 px-4 border-y border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: <FaTruck />, title: 'Miễn Phí Ship', desc: 'Đơn từ 500K' },
            { icon: <FaShieldAlt />, title: 'Chính Hãng 100%', desc: 'Cam kết hoàn tiền' },
            { icon: <FaUndo />, title: 'Đổi Trả 30 Ngày', desc: 'Miễn phí đổi size' },
            { icon: <FaHeadset />, title: 'Hỗ Trợ 24/7', desc: 'Tư vấn nhiệt tình' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-4 glass rounded-xl">
              <span className="text-3xl text-primary">{item.icon}</span>
              <div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Danh Mục Sản Phẩm</h2>
              <p className="text-gray-400">Khám phá các môn thể thao yêu thích</p>
            </div>
            <Link href="/products" className="text-primary hover:underline flex items-center gap-2">
              Xem tất cả <FaArrowRight />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map(cat => <CategoryCard key={cat.id} category={cat} />)}
          </div>
        </div>
      </section>

      {/* Sale Products */}
      <section className="py-16 px-4 bg-gradient-to-r from-secondary/10 to-primary/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">🔥 Đang Giảm Giá</h2>
              <p className="text-gray-400">Ưu đãi hấp dẫn - Số lượng có hạn</p>
            </div>
            <Link href="/products?sale=true" className="text-secondary hover:underline flex items-center gap-2">
              Xem tất cả <FaArrowRight />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {saleProducts.map(product => <ProductCard key={product.id} product={product} />)}
          </div>
        </div>
      </section>

      {/* New Products */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">✨ Sản Phẩm Mới</h2>
              <p className="text-gray-400">Cập nhật xu hướng mới nhất</p>
            </div>
            <Link href="/products?new=true" className="text-primary hover:underline flex items-center gap-2">
              Xem tất cả <FaArrowRight />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {newProducts.map(product => <ProductCard key={product.id} product={product} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto glass rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20" />
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Đăng Ký Nhận Ưu Đãi</h2>
            <p className="text-gray-300 mb-6 max-w-xl mx-auto">
              Nhận ngay voucher giảm 10% cho đơn hàng đầu tiên
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input type="email" placeholder="Email của bạn"
                className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-primary" />
              <button className="btn-primary whitespace-nowrap">Đăng Ký</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
