'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaArrowLeft, FaCheck, FaCreditCard, FaMoneyBillWave, FaUniversity } from 'react-icons/fa';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/data/products';

export default function CheckoutPage() {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const getCategoryEmoji = (cat) => {
    const emojis = { badminton: '🏸', football: '⚽', basketball: '🏀', tennis: '🎾', accessories: '🎒' };
    return emojis[cat] || '🏅';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    clearCart();
  };

  if (isSubmitted) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center animate-fade-in">
        <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
          <FaCheck className="text-4xl text-green-500" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Đặt hàng thành công!</h1>
        <p className="text-gray-400 mb-8">Cảm ơn bạn đã mua hàng. Chúng tôi sẽ liên hệ xác nhận đơn hàng sớm nhất.</p>
        <Link href="/" className="btn-primary">Về trang chủ</Link>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center animate-fade-in">
        <p className="text-6xl mb-4">🛒</p>
        <h1 className="text-2xl font-bold mb-4">Giỏ hàng trống</h1>
        <Link href="/products" className="btn-primary">Mua sắm ngay</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
      <Link href="/cart" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors">
        <FaArrowLeft /> Quay lại giỏ hàng
      </Link>

      <h1 className="text-3xl font-bold mb-8">Thanh Toán</h1>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Shipping Info */}
          <div className="glass rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4">Thông tin giao hàng</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Họ tên *</label>
                <input type="text" required
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Số điện thoại *</label>
                <input type="tel" required
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-primary" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-400 mb-2">Email</label>
                <input type="email"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-primary" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-400 mb-2">Địa chỉ *</label>
                <input type="text" required
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-primary" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-400 mb-2">Ghi chú</label>
                <textarea rows="3"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-primary resize-none" />
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="glass rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4">Phương thức thanh toán</h2>
            <div className="space-y-3">
              {[
                { id: 'cod', icon: <FaMoneyBillWave />, label: 'Thanh toán khi nhận hàng (COD)' },
                { id: 'bank', icon: <FaUniversity />, label: 'Chuyển khoản ngân hàng' },
                { id: 'card', icon: <FaCreditCard />, label: 'Thẻ tín dụng / Ghi nợ' },
              ].map(method => (
                <label key={method.id}
                  className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-all ${
                    paymentMethod === method.id ? 'border-primary bg-primary/10' : 'border-white/20 hover:border-white/40'
                  }`}>
                  <input type="radio" name="payment" value={method.id}
                    checked={paymentMethod === method.id}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="accent-primary" />
                  <span className="text-xl text-primary">{method.icon}</span>
                  <span>{method.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="glass rounded-xl p-6 h-fit sticky top-24">
          <h2 className="text-xl font-bold mb-4">Đơn hàng của bạn</h2>

          <div className="space-y-3 mb-6 max-h-60 overflow-y-auto">
            {cartItems.map(item => (
              <div key={item.id} className="flex gap-3">
                <div className="w-12 h-12 rounded-lg bg-dark-light flex items-center justify-center text-xl shrink-0">
                  {getCategoryEmoji(item.category)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm line-clamp-1">{item.name}</p>
                  <p className="text-xs text-gray-400">x{item.quantity}</p>
                </div>
                <p className="text-sm font-semibold">{formatPrice(item.price * item.quantity)}</p>
              </div>
            ))}
          </div>

          <div className="space-y-3 border-t border-white/10 pt-4 mb-6">
            <div className="flex justify-between text-gray-400">
              <span>Tạm tính</span>
              <span>{formatPrice(getCartTotal())}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Phí vận chuyển</span>
              <span className="text-green-400">Miễn phí</span>
            </div>
            <div className="flex justify-between text-lg font-bold pt-3 border-t border-white/10">
              <span>Tổng cộng</span>
              <span className="text-secondary">{formatPrice(getCartTotal())}</span>
            </div>
          </div>

          <button type="submit" className="btn-primary w-full">
            Đặt Hàng
          </button>
        </div>
      </form>
    </div>
  );
}
