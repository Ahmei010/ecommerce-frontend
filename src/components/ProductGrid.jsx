import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api, { getApiError, getImageUrl } from '../services/api';

export default function ProductGrid({ title, query = '', limit = 0 }) {
  const [result, setResult] = useState({ key: '', products: [], error: '' });
  const requestQuery = query || 'newest';

  useEffect(() => {
    let active = true;

    api.get('/products', { params: { sort: requestQuery } })
      .then(({ data }) => {
        if (active) {
          setResult({
            key: requestQuery,
            products: limit ? data.data.products.slice(0, limit) : data.data.products,
            error: '',
          });
        }
      })
      .catch((requestError) => {
        if (active) setResult({ key: requestQuery, products: [], error: getApiError(requestError) });
      });

    return () => { active = false; };
  }, [requestQuery, limit]);

  const loading = result.key !== requestQuery;
  const products = loading ? [] : result.products;
  const error = loading ? '' : result.error;

  return (
    <section className="w-full px-3 py-4 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12">
      {title && (
        <div className="mb-6 text-center sm:mb-8">
          <h2 className="relative inline-block text-xl font-bold uppercase tracking-wide sm:text-2xl lg:text-4xl">
            {title}
            <span className="absolute -bottom-2 left-1/2 h-0.5 w-12 -translate-x-1/2 bg-black" />
          </h2>
        </div>
      )}
      {loading && <p className="py-10 text-center text-sm text-gray-500">Loading products...</p>}
      {error && <p role="alert" className="py-6 text-center text-sm text-red-600">{error}</p>}
      {!loading && !error && products.length === 0 && (
        <p className="py-10 text-center text-sm text-gray-500">No products are available yet. Please check back soon.</p>
      )}
      {!loading && !error && products.length > 0 && (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
          {products.map((product) => {
            const discount = product.originalPrice && product.originalPrice > product.price
              ? Math.round((1 - product.price / product.originalPrice) * 100)
              : 0;
            return (
              <Link
                key={product._id}
                to={`/product/${product._id}`}
                className="group overflow-hidden rounded-lg transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="relative flex h-40 items-center justify-center overflow-hidden bg-gray-100 sm:h-52 lg:h-60">
                  <img
                    src={getImageUrl(product.image)}
                    alt={product.productName}
                    className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                  {discount > 0 && (
                    <span className="absolute right-2 top-2 rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white">
                      -{discount}%
                    </span>
                  )}
                  {product.stock === 0 && (
                    <span className="absolute bottom-2 left-2 rounded-full bg-white px-2 py-1 text-xs font-medium text-gray-700">
                      Out of stock
                    </span>
                  )}
                </div>
                <div className="p-2 sm:p-3">
                  <p className="text-xs text-gray-500">{product.brand}</p>
                  <h3 className="mt-1 line-clamp-2 text-sm font-semibold text-gray-900 sm:text-base">
                    {product.productName}
                  </h3>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="font-bold">${product.price}</span>
                    {product.originalPrice > product.price && (
                      <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}
