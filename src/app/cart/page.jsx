'use client';

import Link from 'next/link';
import { FaTrash, FaMinus, FaPlus, FaArrowLeft, FaShoppingBag } from 'react-icons/fa';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/data/products';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  const getCategoryEmoji = (cat) => {
    const emojis = { badminton: '🏸', football: '⚽', basketball: '🏀', tennis: '🎾', accessories: '🎒' };
    return emojis[cat] || '🏅';
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center animate-fade-in">
        <p className="text-8xl mb-6">🛒</p>
        <h1 className="text-3xl font-bold mb-4">Giỏ hàng trống</h1>
        <p className="text-gray-400 mb-8">Bạn chưa có sản phẩm nào trong giỏ hàng</p>
        <Link href="/products" className="btn-primary inline-flex items-center gap-2">
          <FaShoppingBag /> Mua sắm ngay
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
      <Link href="/products" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors">
        <FaArrowLeft /> Tiếp tục mua sắm
      </Link>

      <h1 className="text-3xl font-bold mb-8">Giỏ Hàng ({cartItems.length} sản phẩm)</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map(item => (
            <div key={item.id} className="glass rounded-xl p-4 flex gap-4">
              {/* Image */}
              <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-dark to-dark-light flex items-center justify-center text-4xl shrink-0">
                {getCategoryEmoji(item.category)}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <Link href={`/products/${item.id}`} className="font-semibold hover:text-primary transition-colors line-clamp-1">
                  {item.name}
                </Link>
                <p className="text-sm text-gray-400 mb-2">{item.brand}</p>
                <p className="text-secondary font-bold">{formatPrice(item.price)}</p>
              </div>

              {/* Quantity */}
              <div className="flex flex-col items-end gap-2">
                <button onClick={() => removeFromCart(item.id)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                  <FaTrash />
                </button>
                <div className="flex items-center gap-2">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 rounded-lg glass flex items-center justify-center hover:bg-white/10 text-sm">
                    <FaMinus />
                  </button>
                  <span className="w-8 text-center font-semibold">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 rounded-lg glass flex items-center justify-center hover:bg-white/10 text-sm">
                    <FaPlus />
                  </button>
                </div>
              </div>
            </div>
          ))}

          <button onClick={clearCart} className="text-gray-400 hover:text-red-500 transition-colors text-sm">
            Xóa tất cả
          </button>
        </div>

        {/* Summary */}
        <div className="glass rounded-xl p-6 h-fit sticky top-24">
          <h2 className="text-xl font-bold mb-4">Tổng đơn hàng</h2>

          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-gray-400">
              <span>Tạm tính</span>
              <span>{formatPrice(getCartTotal())}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Phí vận chuyển</span>
              <span className="text-green-400">Miễn phí</span>
            </div>
            <div className="border-t border-white/10 pt-3 flex justify-between text-lg font-bold">
              <span>Tổng cộng</span>
              <span className="text-secondary">{formatPrice(getCartTotal())}</span>
            </div>
          </div>

          {/* Coupon */}
          <div className="mb-6">
            <div className="flex gap-2">
              <input type="text" placeholder="Mã giảm giá"
                className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-primary" />
              <button className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                Áp dụng
              </button>
            </div>
          </div>

          <Link href="/checkout" className="btn-primary w-full text-center block">
            Thanh Toán
          </Link>

          <p className="text-xs text-gray-400 text-center mt-4">
            Miễn phí vận chuyển cho đơn hàng từ 500.000₫
          </p>
        </div>
      </div>
    </div>
  );
}
