import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { vendorAPI } from '../api/auth';
import VendorCard from '../components/vendors/VendorCard';
import { Search, SlidersHorizontal, X } from 'lucide-react';

export const Route = createFileRoute('/vendors')({
  component: VendorsPage,
});

function VendorsPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [location, setLocation] = useState('');

  const { data: catData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => vendorAPI.getCategories(),
  });

  const { data, isLoading } = useQuery({
    queryKey: ['vendors', search, selectedCategory, location],
    queryFn: () => vendorAPI.getAll({
      search: search || undefined,
      category: selectedCategory || undefined,
      location: location || undefined,
    }),
    keepPreviousData: true,
  });

  const categories = catData?.data?.categories || [];
  const vendors = data?.data?.vendors || [];

  const clearFilters = () => {
    setSearch('');
    setSelectedCategory('');
    setLocation('');
  };

  const hasFilters = search || selectedCategory || location;

  return (
    <div className="min-h-screen bg-cream pt-20">
      {/* Hero Banner */}
      <div className="bg-charcoal py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-serif text-gold-400 italic mb-2">Discover & Connect</p>
          <h1 className="font-display text-4xl md:text-5xl text-white mb-4">Find Your Dream Vendors</h1>
          <p className="font-sans text-gray-400 text-sm mb-8">
            Browse 200+ verified wedding vendors across India
          </p>

          {/* Search Bar */}
          <div className="flex gap-3 max-w-2xl mx-auto">
            <div className="flex-1 relative">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search photographers, venues, caterers..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl font-sans text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
              />
            </div>
            <input
              type="text"
              placeholder="City"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-32 px-4 py-3 rounded-xl font-sans text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Category Filter */}
        <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2">
          <SlidersHorizontal size={16} className="text-gray-400 flex-shrink-0" />
          <button
            onClick={() => setSelectedCategory('')}
            className={`px-4 py-2 rounded-full font-sans text-sm font-medium flex-shrink-0 transition-all ${
              !selectedCategory ? 'bg-gold-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            All Services
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.name)}
              className={`px-4 py-2 rounded-full font-sans text-sm font-medium flex-shrink-0 transition-all ${
                selectedCategory === cat.name ? 'bg-gold-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
          {hasFilters && (
            <button onClick={clearFilters} className="flex items-center gap-1 text-red-400 text-sm font-sans hover:text-red-500 flex-shrink-0">
              <X size={14} /> Clear
            </button>
          )}
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="font-sans text-sm text-gray-500">
            {vendors.length} vendor{vendors.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-80 bg-gray-200 rounded-2xl animate-pulse"></div>
            ))}
          </div>
        ) : vendors.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="font-display text-2xl text-charcoal mb-2">No Vendors Found</h3>
            <p className="font-sans text-gray-500 text-sm">Try adjusting your search or filters</p>
            <button onClick={clearFilters} className="btn-primary mt-6 text-sm">Clear Filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {vendors.map((v) => <VendorCard key={v.id} vendor={v} />)}
          </div>
        )}
      </div>
    </div>
  );
}