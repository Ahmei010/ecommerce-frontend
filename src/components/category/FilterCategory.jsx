import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import api, { getApiError, getImageUrl } from '../../services/api';

const FilterCategory = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [result, setResult] = useState({ key: '', products: [], error: '' });
  const [categories, setCategories] = useState([]);
  const [categoriesError, setCategoriesError] = useState('');
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [sort, setSort] = useState(searchParams.get('sort') || 'newest');
  const search = searchParams.get('search') || '';
  const requestKey = JSON.stringify([category, sort, search]);

  useEffect(() => {
    api.get('/products/categories')
      .then(({ data }) => setCategories(data.data.categories))
      .catch((requestError) => setCategoriesError(getApiError(requestError)));
  }, []);

  useEffect(() => {
    let active = true;
    api.get('/products', { params: { category, sort, search } })
      .then(({ data }) => {
        if (active) setResult({ key: requestKey, products: data.data.products, error: '' });
      })
      .catch((requestError) => {
        if (active) setResult({ key: requestKey, products: [], error: getApiError(requestError) });
      });
    return () => { active = false; };
  }, [category, sort, search, requestKey]);

  const loading = result.key !== requestKey;
  const products = loading ? [] : result.products;
  const error = loading ? '' : result.error;

  const applyCategory = (event) => {
    const value = event.target.value;
    setCategory(value);
    const next = new URLSearchParams(searchParams);
    if (value) next.set('category', value);
    else next.delete('category');
    setSearchParams(next);
  };

  const applySort = (event) => {
    const value = event.target.value;
    setSort(value);
    const next = new URLSearchParams(searchParams);
    next.set('sort', value);
    setSearchParams(next);
  };

  return (
    <div className="min-h-screen bg-white px-4 py-6 md:px-8 lg:px-12">
      <div className="mb-6 text-xs text-gray-500">
        <Link to="/" className="hover:text-black">Home</Link><span className="mx-2">›</span>
        <span className="text-black">{category || 'All products'}</span>
      </div>
      <div className="flex flex-col gap-6 md:flex-row">
        <aside className="h-fit rounded-2xl border border-gray-200 p-5 md:w-60 md:shrink-0">
          <h2 className="border-b border-gray-200 pb-4 font-semibold">Filter products</h2>
          {categoriesError && <p role="alert" className="mt-3 text-xs text-red-600">{categoriesError}</p>}
          <label className="mt-4 block text-sm font-medium">Category
            <select value={category} onChange={applyCategory} className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm">
              <option value="">All categories</option>
              {categories.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>
          <label className="mt-5 block text-sm font-medium">Sort by
            <select value={sort} onChange={applySort} className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm">
              <option value="newest">Newest</option>
              <option value="priceAsc">Price: low to high</option>
              <option value="priceDesc">Price: high to low</option>
              <option value="name">Name</option>
            </select>
          </label>
          {(search || category) && (
            <button type="button" onClick={() => { setCategory(''); setSearchParams({}); }}
              className="mt-5 w-full rounded-full border border-gray-300 py-2 text-sm hover:bg-gray-50">
              Clear filters
            </button>
          )}
        </aside>
        <main className="min-w-0 flex-1">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold md:text-3xl">{search ? `Results for "${search}"` : category || 'All products'}</h1>
              <p className="mt-1 text-sm text-gray-500">{products.length} product{products.length === 1 ? '' : 's'}</p>
            </div>
          </div>
          {error && <p role="alert" className="mb-5 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
          {loading && <p className="py-12 text-center text-sm text-gray-500">Loading products...</p>}
          {!loading && !error && !products.length && (
            <div className="rounded-2xl border border-dashed border-gray-300 px-5 py-16 text-center">
              <h2 className="text-lg font-semibold">No products found</h2>
              <p className="mt-2 text-sm text-gray-500">Try another search or category, or check back later.</p>
            </div>
          )}
          {!loading && products.length > 0 && (
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
              {products.map((product) => (
                <Link key={product._id} to={`/product/${product._id}`} className="group min-w-0">
                  <div className="relative flex h-44 items-center justify-center overflow-hidden rounded-xl bg-[#f2f2f2] sm:h-56">
                    <img src={getImageUrl(product.image)} alt={product.productName} className="h-full w-full object-contain transition duration-300 group-hover:scale-105" />
                    {product.stock === 0 && <span className="absolute bottom-2 left-2 rounded-full bg-white px-2 py-1 text-xs">Out of stock</span>}
                  </div>
                  <p className="mt-3 text-xs text-gray-500">{product.brand}</p>
                  <h3 className="mt-1 truncate text-sm font-semibold">{product.productName}</h3>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="font-bold">${product.price}</span>
                    {product.originalPrice > product.price && <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default FilterCategory;
