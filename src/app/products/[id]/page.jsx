'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { FaShoppingCart, FaStar, FaMinus, FaPlus, FaArrowLeft, FaTruck, FaShieldAlt, FaUndo } from 'react-icons/fa';
import { useCart } from '@/context/CartContext';
import { products, formatPrice } from '@/data/products';
import ProductCard from '@/components/ProductCard';

export default function ProductDetailPage() {
  const params = useParams();
  const product = products.find(p => p.id === parseInt(params.id));
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-6xl mb-4">😢</p>
        <h1 className="text-2xl font-bold mb-4">Không tìm thấy sản phẩm</h1>
        <Link href="/products" className="btn-primary">Quay lại cửa hàng</Link>
      </div>
    );
  }

  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const discountPercent = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;

  const getCategoryEmoji = (cat) => {
    const emojis = { badminton: '🏸', football: '⚽', basketball: '🏀', tennis: '🎾', accessories: '🎒' };
    return emojis[cat] || '🏅';
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setQuantity(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
      {/* Breadcrumb */}
      <Link href="/products" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors">
        <FaArrowLeft /> Quay lại
      </Link>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {/* Image */}
        <div className="glass rounded-2xl overflow-hidden">
          <div className="aspect-square flex items-center justify-center bg-gradient-to-br from-dark to-dark-light text-9xl">
            {getCategoryEmoji(product.category)}
          </div>
        </div>

        {/* Info */}
        <div>
          <p className="text-primary font-medium mb-2">{product.brand}</p>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center gap-1 text-yellow-400">
              <FaStar />
              <span className="font-medium">{product.rating}</span>
            </div>
            <span className="text-gray-400">({product.reviews} đánh giá)</span>
            <span className={`px-3 py-1 rounded-full text-sm ${product.stock > 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
              {product.stock > 0 ? `Còn ${product.stock} sản phẩm` : 'Hết hàng'}
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-4xl font-bold text-secondary">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <>
                <span className="text-xl text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
                <span className="px-3 py-1 bg-secondary rounded-full text-sm font-bold">-{discountPercent}%</span>
              </>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-300 mb-6">{product.description}</p>

          {/* Specs */}
          {product.specs && (
            <div className="glass rounded-xl p-4 mb-6">
              <h3 className="font-semibold mb-3">Thông số kỹ thuật</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-gray-400 capitalize">{key}:</span>
                    <span>{Array.isArray(value) ? value.join(', ') : value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-gray-400">Số lượng:</span>
            <div className="flex items-center gap-2">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-lg glass flex items-center justify-center hover:bg-white/10 transition-colors">
                <FaMinus />
              </button>
              <span className="w-12 text-center text-xl font-semibold">{quantity}</span>
              <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="w-10 h-10 rounded-lg glass flex items-center justify-center hover:bg-white/10 transition-colors">
                <FaPlus />
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="flex gap-4 mb-8">
            <button onClick={handleAddToCart} disabled={product.stock === 0}
              className="flex-1 btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
              <FaShoppingCart /> Thêm vào giỏ hàng
            </button>
            <Link href="/cart" onClick={handleAddToCart}
              className="flex-1 btn-secondary text-center">Mua ngay</Link>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: <FaTruck />, text: 'Miễn phí ship' },
              { icon: <FaShieldAlt />, text: 'Chính hãng 100%' },
              { icon: <FaUndo />, text: 'Đổi trả 30 ngày' },
            ].map((item, i) => (
              <div key={i} className="glass rounded-lg p-3 text-center">
                <span className="text-primary text-xl mb-1 block">{item.icon}</span>
                <span className="text-xs text-gray-400">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Sản phẩm liên quan</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </div>
  );
}
