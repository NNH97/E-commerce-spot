'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FaShoppingCart, FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { getCartCount } = useCart();

  const navLinks = [
    { href: '/', label: 'Trang Chủ' },
    { href: '/products', label: 'Sản Phẩm' },
    { href: '/products?category=badminton', label: 'Cầu Lông' },
    { href: '/products?category=football', label: 'Bóng Đá' },
    { href: '/products?category=basketball', label: 'Bóng Rổ' },
  ];

  return (
    <header className="sticky top-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="text-3xl">🏆</span>
            <span className="text-2xl font-bold gradient-text hidden sm:block">EcommerSpot</span>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xl mx-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-12 rounded-xl bg-white/10 border border-white/20 
                         text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-all"
              />
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}
                className="text-gray-300 hover:text-white transition-colors relative 
                         after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 
                         after:bg-primary after:transition-all hover:after:w-full">
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Cart & Menu */}
          <div className="flex items-center gap-4">
            <Link href="/cart" className="relative p-3 rounded-xl glass hover:bg-white/10 transition-all">
              <FaShoppingCart className="text-xl" />
              {getCartCount() > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-secondary rounded-full 
                               flex items-center justify-center text-xs font-bold animate-pulse">
                  {getCartCount()}
                </span>
              )}
            </Link>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-3 rounded-xl glass hover:bg-white/10 transition-all">
              {isMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 p-4 rounded-xl glass animate-fade-in">
            <div className="relative mb-4">
              <input type="text" placeholder="Tìm kiếm..."
                className="w-full px-4 py-3 pl-12 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400" />
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
