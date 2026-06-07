import React, { useState, useMemo } from 'react';
import { Search, ShoppingCart, TrendingDown } from 'lucide-react';

const PriceComparer = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Sample product data - replace with real data later
  const products = [
    {
      id: 1,
      name: 'Ordinary Retinol 0.2% in Squalane',
      retailers: [
        { name: 'Adore Beauty', price: 15.95, delivery: 10 },
        { name: 'W Cosmetics', price: 14.99, delivery: 8 },
        { name: 'Amazon', price: 16.50, delivery: 0 },
        { name: 'Chemist Warehouse', price: 15.49, delivery: 9 },
        { name: 'Lila Beauty', price: 17.00, delivery: 12 }
      ]
    },
    {
      id: 2,
      name: 'Cetaphil Gentle Skin Cleanser 500ml',
      retailers: [
        { name: 'Adore Beauty', price: 12.50, delivery: 10 },
        { name: 'W Cosmetics', price: 11.99, delivery: 8 },
        { name: 'Amazon', price: 13.00, delivery: 0 },
        { name: 'Chemist Warehouse', price: 11.25, delivery: 9 },
        { name: 'Lila Beauty', price: 13.50, delivery: 12 }
      ]
    },
    {
      id: 3,
      name: 'Maybelline Fit Me Foundation',
      retailers: [
        { name: 'Adore Beauty', price: 18.99, delivery: 10 },
        { name: 'W Cosmetics', price: 16.99, delivery: 8 },
        { name: 'Amazon', price: 17.50, delivery: 0 },
        { name: 'Chemist Warehouse', price: 17.99, delivery: 9 },
        { name: 'Lila Beauty', price: 19.99, delivery: 12 }
      ]
    },
    {
      id: 4,
      name: 'CeraVe Facial Moisturising Lotion',
      retailers: [
        { name: 'Adore Beauty', price: 22.50, delivery: 10 },
        { name: 'W Cosmetics', price: 21.00, delivery: 8 },
        { name: 'Amazon', price: 23.50, delivery: 0 },
        { name: 'Chemist Warehouse', price: 20.99, delivery: 9 },
        { name: 'Lila Beauty', price: 24.00, delivery: 12 }
      ]
    },
    {
      id: 5,
      name: 'Niacinamide 10% + Zinc 1%',
      retailers: [
        { name: 'Adore Beauty', price: 14.50, delivery: 10 },
        { name: 'W Cosmetics', price: 13.50, delivery: 8 },
        { name: 'Amazon', price: 15.00, delivery: 0 },
        { name: 'Chemist Warehouse', price: 13.99, delivery: 9 },
        { name: 'Lila Beauty', price: 16.00, delivery: 12 }
      ]
    }
  ];

  const filteredProducts = useMemo(() => {
    return products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const ProductCard = ({ product }) => {
    const options = product.retailers.map(r => ({
      ...r,
      total: r.price + r.delivery
    }));

    const cheapest = options.reduce((min, opt) =>
      opt.total < min.total ? opt : min
    );

    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
        <div className="p-6 border-b border-gray-50">
          <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-6 py-3 font-semibold text-gray-700">Retailer</th>
                <th className="text-right px-6 py-3 font-semibold text-gray-700">Price</th>
                <th className="text-right px-6 py-3 font-semibold text-gray-700">Delivery</th>
                <th className="text-right px-6 py-3 font-semibold text-gray-700">Total</th>
              </tr>
            </thead>
            <tbody>
              {options.map((option, idx) => (
                <tr
                  key={idx}
                  className={`border-b border-gray-50 transition-colors ${
                    option.name === cheapest.name
                      ? 'bg-green-50'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <td className="px-6 py-4 text-gray-900 font-medium">
                    {option.name === cheapest.name && (
                      <div className="flex items-center gap-2">
                        <TrendingDown className="w-4 h-4 text-green-600" />
                        <span>{option.name}</span>
                      </div>
                    )}
                    {option.name !== cheapest.name && option.name}
                  </td>
                  <td className="px-6 py-4 text-right text-gray-700">${option.price.toFixed(2)}</td>
                  <td className="px-6 py-4 text-right text-gray-600">
                    {option.delivery === 0 ? (
                      <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
                        FREE
                      </span>
                    ) : (
                      `$${option.delivery.toFixed(2)}`
                    )}
                  </td>
                  <td
                    className={`px-6 py-4 text-right font-bold ${
                      option.name === cheapest.name
                        ? 'text-green-600'
                        : 'text-gray-900'
                    }`}
                  >
                    ${option.total.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Header */}
      <div className="border-b border-gray-100 sticky top-0 z-10 bg-white/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3 mb-6">
            <ShoppingCart className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Beauty Price Finder</h1>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for a product..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No products found. Try a different search.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}

            <div className="mt-12 p-6 bg-blue-50 rounded-lg border border-blue-100">
              <p className="text-sm text-gray-600">
                💡 <strong>Tip:</strong> Prices and delivery fees are updated periodically. Always verify current prices on the retailer's website before purchasing.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PriceComparer;