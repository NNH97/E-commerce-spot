'use client';

import Link from 'next/link';
import { FaShoppingCart, FaStar, FaFire } from 'react-icons/fa';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/data/products';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const discountPercent = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const getCategoryEmoji = (cat) => {
    const emojis = { badminton: '🏸', football: '⚽', basketball: '🏀', tennis: '🎾', accessories: '🎒' };
    return emojis[cat] || '🏅';
  };

  return (
    <Link href={`/products/${product.id}`}>
      <div className="group glass rounded-2xl overflow-hidden card-hover cursor-pointer">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-dark to-dark-light">
          <div className="w-full h-full flex items-center justify-center text-6xl">
            {getCategoryEmoji(product.category)}
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && (
              <span className="px-3 py-1 text-xs font-bold bg-primary rounded-full flex items-center gap-1">
                <FaFire /> MỚI
              </span>
            )}
            {product.isSale && discountPercent > 0 && (
              <span className="px-3 py-1 text-xs font-bold bg-secondary rounded-full">-{discountPercent}%</span>
            )}
          </div>

          {/* Add to Cart */}
          <button onClick={handleAddToCart}
            className="absolute bottom-3 right-3 p-3 rounded-xl bg-primary text-white
                     opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0
                     transition-all duration-300 hover:bg-primary-dark hover:scale-110">
            <FaShoppingCart />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="text-xs text-primary font-medium mb-1">{product.brand}</p>
          <h3 className="font-semibold text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1 text-yellow-400">
              <FaStar className="text-sm" />
              <span className="text-sm font-medium">{product.rating}</span>
            </div>
            <span className="text-xs text-gray-400">({product.reviews} đánh giá)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-secondary">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
