'use client';

import { useState, useMemo } from 'react';
import { Search, ShoppingBag, Menu, ArrowRight, X, ChevronRight, ChevronLeft } from 'lucide-react';
import { useTektonTheme } from '@/hooks/useTektonTheme';

const SQUARE_MINIMAL_FALLBACK = {
  '--tekton-bg-canvas': '#FFFFFF',
  '--tekton-bg-surface': '#F9F9F9',
  '--tekton-text-primary': '#000000',
  '--tekton-text-secondary': '#666666',
  '--tekton-border-default': '#E5E5E5',
  '--tekton-radius-none': '0px',
};

const CATEGORIES = ['All', 'Outerwear', 'Tops', 'Bottoms', 'Accessories', 'Footwear'];

const ALL_PRODUCTS = [
  // Page 1
  {
    id: 1,
    title: 'Minimal Shell Jacket',
    category: 'Outerwear',
    price: '$295.00',
    image:
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 2,
    title: 'Boxy Cotton Tee',
    category: 'Tops',
    price: '$45.00',
    image:
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 3,
    title: 'Pleated Wool Trousers',
    category: 'Bottoms',
    price: '$180.00',
    image:
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 4,
    title: 'Cashmere Scarf',
    category: 'Accessories',
    price: '$120.00',
    image:
      'https://images.unsplash.com/photo-1520903923011-807d9bb60b23?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 5,
    title: 'Leather Chelsea Boots',
    category: 'Footwear',
    price: '$350.00',
    image:
      'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 6,
    title: 'Oversized Poplin Shirt',
    category: 'Tops',
    price: '$85.00',
    image:
      'https://images.unsplash.com/photo-1598033129183-c4f50c717658?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 7,
    title: 'Technical Knit Sweater',
    category: 'Tops',
    price: '$145.00',
    image:
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 8,
    title: 'Cargo Utility Pants',
    category: 'Bottoms',
    price: '$130.00',
    image:
      'https://images.unsplash.com/photo-1517423568366-8b83523034fd?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 9,
    title: 'Canvas Tote Bag',
    category: 'Accessories',
    price: '$60.00',
    image:
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80',
  },

  // Page 2
  {
    id: 10,
    title: 'Hooded Parka',
    category: 'Outerwear',
    price: '$420.00',
    image:
      'https://images.unsplash.com/photo-1539533377285-b3df044f15df?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 11,
    title: 'Relaxed Linen Shirt',
    category: 'Tops',
    price: '$95.00',
    image:
      'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 12,
    title: 'Tapered Chinos',
    category: 'Bottoms',
    price: '$110.00',
    image:
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 13,
    title: 'Structured Bucket Hat',
    category: 'Accessories',
    price: '$55.00',
    image:
      'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 14,
    title: 'Minimal Leather Sneakers',
    category: 'Footwear',
    price: '$220.00',
    image:
      'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 15,
    title: 'Quilted Down Vest',
    category: 'Outerwear',
    price: '$180.00',
    image:
      'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 16,
    title: 'Merino Turtleneck',
    category: 'Tops',
    price: '$110.00',
    image:
      'https://images.unsplash.com/photo-1556905055-8f358a7a4bb4?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 17,
    title: 'Selvedge Denim Jacket',
    category: 'Outerwear',
    price: '$240.00',
    image:
      'https://images.unsplash.com/photo-1576995811123-5399567c9b01?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 18,
    title: 'Smooth Leather Belt',
    category: 'Accessories',
    price: '$75.00',
    image:
      'https://images.unsplash.com/photo-1554992257-233bb963666d?auto=format&fit=crop&w=600&q=80',
  },

  // Page 3
  {
    id: 19,
    title: 'Double Breasted Trench',
    category: 'Outerwear',
    price: '$450.00',
    image:
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 20,
    title: 'Mock Neck Long Sleeve',
    category: 'Tops',
    price: '$65.00',
    image:
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 21,
    title: 'Straight Leg Jeans',
    category: 'Bottoms',
    price: '$150.00',
    image:
      'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 22,
    title: 'Fisherman Beanie',
    category: 'Accessories',
    price: '$35.00',
    image:
      'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 23,
    title: 'Technical Mesh Sandals',
    category: 'Footwear',
    price: '$140.00',
    image:
      'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 24,
    title: 'MA-1 Bomber Jacket',
    category: 'Outerwear',
    price: '$280.00',
    image:
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 25,
    title: 'Chunky Knit Cardigan',
    category: 'Tops',
    price: '$195.00',
    image:
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 26,
    title: 'A-Line Midi Skirt',
    category: 'Bottoms',
    price: '$135.00',
    image:
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 27,
    title: 'Architectural Crossbody',
    category: 'Accessories',
    price: '$220.00',
    image:
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80',
  },
];

const ITEMS_PER_PAGE = 9;

export default function SquareMinimalismEcom() {
  const { loaded: themeLoaded } = useTektonTheme('square-minimalism', {
    fallback: SQUARE_MINIMAL_FALLBACK,
  });

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Filter and Paginate Logic
  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') {
      return ALL_PRODUCTS;
    }
    return ALL_PRODUCTS.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  return (
    <div
      className={`flex flex-col min-h-screen bg-[var(--tekton-bg-canvas)] text-[var(--tekton-text-primary)] font-sans transition-opacity duration-700 ${themeLoaded ? 'opacity-100' : 'opacity-0'}`}
    >
      {/* Top Navigation - Architectural & Sticky (Respects Global Sidebar) */}
      <nav className="sticky top-0 w-full h-20 bg-white/95 backdrop-blur-md z-40 px-6 md:px-12 flex items-center justify-between border-b border-[var(--tekton-border-default)]">
        <div className="flex items-center gap-12">
          <div className="text-2xl font-black tracking-tighter uppercase leading-none border-2 border-black px-2 py-1">
            AX
          </div>

          {/* Desktop Menu Links */}
          <div className="hidden lg:flex items-center gap-8">
            {['Collections', 'Archive', 'Projects', 'Studio', 'Store'].map((item) => (
              <button
                key={item}
                className="text-xs font-bold uppercase tracking-[0.2em] hover:text-neutral-400 transition-colors"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button className="p-2 hover:bg-neutral-50 transition-colors">
            <Search size={20} />
          </button>
          <button className="p-2 hover:bg-neutral-50 transition-colors relative">
            <ShoppingBag size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-black"></span>
          </button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 hover:bg-neutral-50 transition-colors"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Main Content Layout */}
      <div className="flex flex-1">
        {/* Left Sidebar - Categories (Clothing Concept) */}
        <aside className="hidden lg:block w-72 h-[calc(100vh-80px)] sticky top-20 p-12 overflow-y-auto border-r border-[var(--tekton-border-default)]">
          <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-neutral-400 mb-10">
            Categories
          </h3>
          <nav className="flex flex-col gap-6">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentPage(1);
                }}
                className={`text-left text-sm font-bold uppercase tracking-widest transition-all ${
                  selectedCategory === cat
                    ? 'text-black translate-x-2'
                    : 'text-neutral-400 hover:text-black hover:translate-x-1'
                }`}
              >
                {cat}
              </button>
            ))}
          </nav>

          <div className="mt-24 pt-12 border-t border-neutral-100">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-300 mb-4">
              Newsletter
            </h4>
            <div className="relative">
              <input
                type="text"
                placeholder="EMAIL@STORE-AX.COM"
                className="w-full bg-transparent border-b border-black py-2 text-[10px] font-bold tracking-widest outline-none placeholder:text-neutral-200"
              />
              <button className="absolute right-0 bottom-2">
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </aside>

        {/* Right Content - Product Gallery Grid */}
        <main className="flex-1 p-6 md:p-12 overflow-y-auto">
          {/* Section Header */}
          <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-2 block">
                Season' 24
              </span>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-none">
                {selectedCategory === 'All' ? 'New Arrivals' : selectedCategory}
              </h2>
            </div>
            <div className="text-xs font-bold uppercase tracking-widest text-neutral-500">
              Showing {paginatedProducts.length} of {filteredProducts.length} Items
            </div>
          </div>

          {/* Gallery Grid (Strict Radius 0) */}
          {paginatedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-12 gap-y-20">
              {paginatedProducts.map((product) => (
                <div key={product.id} className="group cursor-pointer">
                  {/* Image Container (Radius 0) */}
                  <div className="aspect-[3/4] bg-neutral-100 mb-6 relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500"></div>

                    {/* Overlay Info */}
                    <div className="absolute top-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-black text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest">
                        Limited Edition
                      </div>
                    </div>
                  </div>

                  {/* Typography (Gutter as Divider) */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-mono text-neutral-300">
                        {product.category}
                      </span>
                      <span className="text-xs font-bold tracking-widest">{product.price}</span>
                    </div>
                    <h4 className="text-lg font-black tracking-tight uppercase group-hover:underline underline-offset-4 decoration-2">
                      {product.title}
                    </h4>
                    <div className="pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2 group/btn">
                        Discover Piece{' '}
                        <ArrowRight
                          size={12}
                          className="group-hover/btn:translate-x-1 transition-transform"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-96 flex items-center justify-center border border-dashed border-neutral-200">
              <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">
                No items found in this section
              </p>
            </div>
          )}

          {/* Pagination - Minimal & Functional */}
          {totalPages > 1 && (
            <div className="mt-32 pt-12 border-t-2 border-black flex justify-between items-center text-xs font-bold uppercase tracking-[0.2em]">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className={`flex items-center gap-2 transition-colors ${currentPage === 1 ? 'text-neutral-200 cursor-not-allowed' : 'text-neutral-400 hover:text-black'}`}
              >
                <ChevronLeft size={16} /> Prev
              </button>
              <div className="flex gap-6">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`transition-all ${currentPage === i + 1 ? 'text-black underline underline-offset-8 decoration-2' : 'text-neutral-300 hover:text-neutral-600'}`}
                  >
                    {(i + 1).toString().padStart(2, '0')}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className={`flex items-center gap-2 transition-colors ${currentPage === totalPages ? 'text-neutral-200 cursor-not-allowed' : 'text-neutral-400 hover:text-black'}`}
              >
                Next <ChevronRight size={16} />
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-[60] p-12 flex flex-col pt-32">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-8 right-12 text-black"
          >
            <X size={32} />
          </button>
          <nav className="flex flex-col gap-8">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentPage(1);
                  setIsMenuOpen(false);
                }}
                className="text-4xl font-black uppercase tracking-tighter text-left"
              >
                {cat}
              </button>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
