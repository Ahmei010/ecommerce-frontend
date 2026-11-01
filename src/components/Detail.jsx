import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api, { getApiError, getImageUrl } from '../services/api';

const Detail = () => {
  const { id } = useParams();
  const [result, setResult] = useState({ id: '', product: null, error: '' });
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('Black');
  const [selectedSize, setSelectedSize] = useState('Large');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    let active = true;
    api.get(`/products/${id}`)
      .then(({ data }) => {
        if (active) setResult({ id, product: data.data.product, error: '' });
      })
      .catch((requestError) => {
        if (active) setResult({ id, product: null, error: getApiError(requestError) });
      });
    return () => { active = false; };
  }, [id]);

  const loading = result.id !== id;
  const product = loading ? null : result.product;
  const error = loading ? '' : result.error;

  const addToCart = () => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const item = {
      id: product._id,
      name: product.productName,
      price: product.price,
      originalPrice: product.originalPrice,
      image: getImageUrl(product.image),
      quantity,
      color: selectedColor,
      size: selectedSize,
    };
    const existing = savedCart.find((cartItem) => (
      cartItem.id === item.id && cartItem.color === item.color && cartItem.size === item.size
    ));
    const cart = existing
      ? savedCart.map((cartItem) => (
        cartItem === existing ? { ...cartItem, quantity: cartItem.quantity + quantity } : cartItem
      ))
      : [...savedCart, item];
    localStorage.setItem('cart', JSON.stringify(cart));
    setNotice('Added to your cart.');
  };

  if (loading) return <div className="mx-auto max-w-7xl px-4 py-16 text-center text-gray-500">Loading product...</div>;
  if (error || !product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center">
        <h2 className="text-2xl font-bold">{error ? 'Unable to load product' : 'Product not found'}</h2>
        {error && <p role="alert" className="mt-2 text-sm text-red-600">{error}</p>}
        <Link to="/category" className="mt-4 inline-block underline">Back to shop</Link>
      </div>
    );
  }

  const discount = product.originalPrice > product.price
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;
  const colors = [{ name: 'Black', value: '#000000' }, { name: 'White', value: '#FFFFFF' }, { name: 'Red', value: '#FF6B6B' }, { name: 'Teal', value: '#4ECDC4' }];
  const sizes = ['Small', 'Medium', 'Large', 'X-Large'];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <nav className="mb-6 text-sm text-gray-500">
        <Link to="/" className="hover:text-black">Home</Link><span className="mx-2">›</span>
        <Link to="/category" className="hover:text-black">Shop</Link><span className="mx-2">›</span>
        <span className="text-black">{product.productName}</span>
      </nav>
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="flex min-h-[320px] items-center justify-center rounded-2xl bg-gray-50 p-5 sm:min-h-[480px]">
          <img src={getImageUrl(product.image)} alt={product.productName} className="max-h-[520px] w-full object-contain" />
        </div>
        <div className="flex flex-col gap-5">
          <div>
            <p className="text-sm text-gray-500">{product.brand} · {product.category}</p>
            <h1 className="mt-2 text-3xl font-extrabold text-black sm:text-4xl">{product.productName}</h1>
          </div>
          <div className="flex items-center gap-2 text-yellow-500" aria-label="Product rating not available">
            ★★★★★ <span className="text-sm text-gray-500">Rating not yet available</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold">${product.price}</span>
            {product.originalPrice > product.price && (
              <>
                <span className="text-xl text-gray-400 line-through">${product.originalPrice}</span>
                <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-600">-{discount}%</span>
              </>
            )}
          </div>
          <p className="leading-relaxed text-gray-600">{product.description}</p>
          <p className={`text-sm font-medium ${product.stock > 0 ? 'text-green-700' : 'text-red-600'}`}>
            {product.stock > 0 ? `${product.stock} in stock` : 'Currently out of stock'}
          </p>
          <div className="border-t border-gray-200 pt-4">
            <h2 className="mb-3 text-sm font-semibold text-gray-700">Select color</h2>
            <div className="flex gap-3">
              {colors.map((color) => (
                <button key={color.name} type="button" onClick={() => setSelectedColor(color.name)} title={color.name}
                  aria-label={color.name} className={`grid h-10 w-10 place-items-center rounded-full border-2 ${selectedColor === color.name ? 'border-black' : 'border-gray-200'}`}
                  style={{ backgroundColor: color.value }}>
                  {selectedColor === color.name && <span className={color.name === 'White' ? 'text-black' : 'text-white'}>✓</span>}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h2 className="mb-3 text-sm font-semibold text-gray-700">Choose size</h2>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <button key={size} type="button" onClick={() => setSelectedSize(size)}
                  className={`rounded-full border px-5 py-2 text-sm ${selectedSize === size ? 'border-black bg-black text-white' : 'border-gray-300 text-gray-700'}`}>
                  {size}
                </button>
              ))}
            </div>
          </div>
          {notice && <p role="status" className="rounded-lg bg-green-50 p-3 text-sm text-green-700">{notice}</p>}
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <div className="flex items-center justify-center rounded-full bg-gray-100">
              <button type="button" onClick={() => setQuantity((current) => Math.max(1, current - 1))} className="px-5 py-3" aria-label="Decrease quantity">−</button>
              <span className="min-w-10 text-center font-semibold">{quantity}</span>
              <button type="button" onClick={() => setQuantity((current) => Math.min(product.stock, current + 1))} className="px-5 py-3" aria-label="Increase quantity" disabled={quantity >= product.stock}>+</button>
            </div>
            <button type="button" onClick={addToCart} disabled={!product.stock}
              className="flex-1 rounded-full bg-black px-8 py-3.5 font-semibold text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50">
              {product.stock ? 'Add to cart' : 'Out of stock'}
            </button>
          </div>
          <div className="border-t border-gray-200 pt-4 text-sm text-gray-600">
            <span className="mr-5">✓ Free Delivery</span><span className="mr-5">✓ Easy Returns</span><span>✓ Secure Payment</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
