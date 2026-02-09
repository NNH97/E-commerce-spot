'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { FaFilter, FaTh, FaList, FaTimes } from 'react-icons/fa';
import ProductCard from '@/components/ProductCard';
import { products, categories, formatPrice } from '@/data/products';

function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const saleParam = searchParams.get('sale');
  const newParam = searchParams.get('new');

  const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'all');
  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [sortBy, setSortBy] = useState('featured');
  const [showFilter, setShowFilter] = useState(false);
  const [viewMode, setViewMode] = useState('grid');

  const brands = [...new Set(products.map(p => p.brand))];
  const [selectedBrands, setSelectedBrands] = useState([]);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];
    if (selectedCategory !== 'all') filtered = filtered.filter(p => p.category === selectedCategory);
    if (saleParam === 'true') filtered = filtered.filter(p => p.isSale);
    if (newParam === 'true') filtered = filtered.filter(p => p.isNew);
    if (selectedBrands.length > 0) filtered = filtered.filter(p => selectedBrands.includes(p.brand));
    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    switch (sortBy) {
      case 'price-low': filtered.sort((a, b) => a.price - b.price); break;
      case 'price-high': filtered.sort((a, b) => b.price - a.price); break;
      case 'rating': filtered.sort((a, b) => b.rating - a.rating); break;
      case 'newest': filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
    }
    return filtered;
  }, [selectedCategory, selectedBrands, priceRange, sortBy, saleParam, newParam]);

  const toggleBrand = (brand) => {
    setSelectedBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]);
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedBrands([]);
    setPriceRange([0, 10000000]);
    setSortBy('featured');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            {categoryParam ? categories.find(c => c.id === categoryParam)?.name || 'Sản Phẩm'
              : saleParam === 'true' ? '🔥 Đang Giảm Giá'
              : newParam === 'true' ? '✨ Sản Phẩm Mới' : 'Tất Cả Sản Phẩm'}
          </h1>
          <p className="text-gray-400">{filteredProducts.length} sản phẩm</p>
        </div>

        <div className="flex items-center gap-4">
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 rounded-lg glass border border-white/20 bg-transparent text-white focus:outline-none focus:border-primary">
            <option value="featured" className="bg-dark">Nổi bật</option>
            <option value="newest" className="bg-dark">Mới nhất</option>
            <option value="price-low" className="bg-dark">Giá thấp → cao</option>
            <option value="price-high" className="bg-dark">Giá cao → thấp</option>
            <option value="rating" className="bg-dark">Đánh giá cao</option>
          </select>

          <div className="hidden md:flex items-center gap-2 glass rounded-lg p-1">
            <button onClick={() => setViewMode('grid')} className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-primary' : 'hover:bg-white/10'}`}><FaTh /></button>
            <button onClick={() => setViewMode('list')} className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-primary' : 'hover:bg-white/10'}`}><FaList /></button>
          </div>

          <button onClick={() => setShowFilter(!showFilter)} className="md:hidden p-3 rounded-lg glass hover:bg-white/10">
            <FaFilter />
          </button>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Sidebar */}
        <aside className={`${showFilter ? 'fixed inset-0 z-50 bg-black/80 md:relative md:bg-transparent' : 'hidden'} md:block w-full md:w-64 shrink-0`}>
          <div className={`${showFilter ? 'absolute right-0 top-0 h-full w-80 bg-dark p-6 overflow-y-auto' : ''} md:relative md:w-full md:bg-transparent md:p-0`}>
            {showFilter && (
              <div className="flex items-center justify-between mb-6 md:hidden">
                <h2 className="text-xl font-bold">Bộ Lọc</h2>
                <button onClick={() => setShowFilter(false)} className="p-2"><FaTimes /></button>
              </div>
            )}

            {/* Categories */}
            <div className="glass rounded-xl p-4 mb-4">
              <h3 className="font-semibold mb-3">Danh Mục</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="category" checked={selectedCategory === 'all'} onChange={() => setSelectedCategory('all')} className="accent-primary" />
                  <span className="text-gray-300">Tất cả</span>
                </label>
                {categories.map(cat => (
                  <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="category" checked={selectedCategory === cat.id} onChange={() => setSelectedCategory(cat.id)} className="accent-primary" />
                    <span className="text-gray-300">{cat.icon} {cat.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Brands */}
            <div className="glass rounded-xl p-4 mb-4">
              <h3 className="font-semibold mb-3">Thương Hiệu</h3>
              <div className="space-y-2">
                {brands.map(brand => (
                  <label key={brand} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={selectedBrands.includes(brand)} onChange={() => toggleBrand(brand)} className="accent-primary" />
                    <span className="text-gray-300">{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="glass rounded-xl p-4 mb-4">
              <h3 className="font-semibold mb-3">Khoảng Giá</h3>
              <input type="range" min="0" max="10000000" step="500000" value={priceRange[1]}
                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])} className="w-full accent-primary" />
              <div className="flex justify-between text-sm text-gray-400 mt-2">
                <span>{formatPrice(priceRange[0])}</span>
                <span>{formatPrice(priceRange[1])}</span>
              </div>
            </div>

            <button onClick={clearFilters} className="w-full py-2 text-center text-secondary hover:underline">
              Xóa bộ lọc
            </button>
          </div>
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          {filteredProducts.length > 0 ? (
            <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
              {filteredProducts.map(product => <ProductCard key={product.id} product={product} />)}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-6xl mb-4">😢</p>
              <h3 className="text-xl font-semibold mb-2">Không tìm thấy sản phẩm</h3>
              <p className="text-gray-400 mb-4">Thử thay đổi bộ lọc</p>
              <button onClick={clearFilters} className="btn-primary">Xóa bộ lọc</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="text-center py-20">Đang tải...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
