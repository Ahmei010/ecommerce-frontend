import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { FiEdit2, FiPlus, FiTrash2 } from 'react-icons/fi';
import api, { getApiError, getImageUrl } from '../../services/api';

function PageHeader({ title, description, action }) {
  return (
    <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">SHOP.CO ADMIN</p>
        <h1 className="mt-2 text-2xl font-bold sm:text-3xl">{title}</h1>
        {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
      </div>
      {action}
    </div>
  );
}

function ErrorMessage({ children }) {
  return children ? <p role="alert" className="mb-5 rounded-lg bg-red-50 p-3 text-sm text-red-700">{children}</p> : null;
}

export function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/admin/stats')
      .then(({ data }) => setStats(data.data))
      .catch((requestError) => setError(getApiError(requestError)));
  }, []);

  const cards = [
    ['Total products', stats?.totalProducts],
    ['Registered users', stats?.totalUsers],
    ['Available products', stats?.availableProducts],
    ['Out of stock', stats?.outOfStockProducts],
  ];

  return (
    <>
      <PageHeader title="Dashboard" description="A quick overview of your store." />
      <ErrorMessage>{error}</ErrorMessage>
      {!stats && !error && <p className="text-sm text-gray-500">Loading dashboard statistics...</p>}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">{label}</p>
            <p className="mt-3 text-3xl font-bold">{value ?? '—'}</p>
          </div>
        ))}
      </div>
      <div className="mt-7 rounded-2xl border border-gray-200 bg-white p-5 sm:p-7">
        <h2 className="text-lg font-semibold">Store management</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">Manage your catalog and review registered customer accounts. Product changes appear in the storefront as soon as they are saved.</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link to="/admin/products" className="rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white">Manage products</Link>
          <Link to="/admin/products/new" className="rounded-full border border-gray-300 px-5 py-2.5 text-sm font-semibold">Add a product</Link>
        </div>
      </div>
    </>
  );
}

export function AdminProducts() {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState(location.state?.notice || '');

  useEffect(() => {
    let active = true;
    api.get('/products/admin')
      .then(({ data }) => {
        if (active) setProducts(data.data.products);
      })
      .catch((requestError) => {
        if (active) setError(getApiError(requestError));
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, []);

  const removeProduct = async (product) => {
    if (!window.confirm(`Delete "${product.productName}"? This cannot be undone.`)) return;
    setError('');
    setNotice('');
    try {
      await api.delete(`/products/${product._id}`);
      setProducts((current) => current.filter((item) => item._id !== product._id));
      setNotice('Product deleted successfully.');
    } catch (requestError) {
      setError(getApiError(requestError));
    }
  };

  return (
    <>
      <PageHeader title="Products" description="Create, update and manage your product inventory."
        action={<Link to="/admin/products/new" className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white"><FiPlus /> Add product</Link>} />
      <ErrorMessage>{error}</ErrorMessage>
      {notice && <p role="status" className="mb-5 rounded-lg bg-green-50 p-3 text-sm text-green-700">{notice}</p>}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        {loading ? <p className="p-6 text-sm text-gray-500">Loading products...</p> : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-5 py-4">Product</th><th className="px-5 py-4">Price</th>
                  <th className="px-5 py-4">Category</th><th className="px-5 py-4">Stock</th>
                  <th className="px-5 py-4">Status</th><th className="px-5 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.map((product) => (
                  <tr key={product._id}>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <img src={getImageUrl(product.image)} alt="" className="h-12 w-12 rounded-lg bg-gray-100 object-contain" />
                        <div><p className="font-semibold">{product.productName}</p><p className="text-xs text-gray-500">{product.brand}</p></div>
                      </div>
                    </td>
                    <td className="px-5 py-3 font-medium">${product.price}</td>
                    <td className="px-5 py-3">{product.category}</td>
                    <td className="px-5 py-3">{product.stock}</td>
                    <td className="px-5 py-3"><span className={`rounded-full px-2.5 py-1 text-xs ${product.status === 'active' ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-600'}`}>{product.status}</span></td>
                    <td className="px-5 py-3">
                      <div className="flex gap-2">
                        <Link to={`/admin/products/${product._id}/edit`} aria-label={`Edit ${product.productName}`} className="rounded-lg border border-gray-200 p-2 hover:bg-gray-50"><FiEdit2 /></Link>
                        <button onClick={() => removeProduct(product)} aria-label={`Delete ${product.productName}`} className="rounded-lg border border-gray-200 p-2 text-red-600 hover:bg-red-50"><FiTrash2 /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {!products.length && <tr><td colSpan="6" className="px-5 py-12 text-center text-gray-500">No products yet. Add your first product to populate the store.</td></tr>}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

const initialForm = {
  productName: '', description: '', price: '', originalPrice: '', category: '',
  brand: '', stock: '0', status: 'active',
};

export function AdminProductForm() {
  const { id } = useParams();
  const editing = Boolean(id);
  const navigate = useNavigate();
  const [values, setValues] = useState(initialForm);
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(editing);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!editing) return;
    api.get(`/products/${id}`)
      .then(({ data }) => {
        const { product } = data.data;
        setValues({
          productName: product.productName,
          description: product.description,
          price: String(product.price),
          originalPrice: product.originalPrice == null ? '' : String(product.originalPrice),
          category: product.category,
          brand: product.brand,
          stock: String(product.stock),
          status: product.status,
        });
        setCurrentImage(product.image);
      })
      .catch((requestError) => setError(getApiError(requestError)))
      .finally(() => setLoading(false));
  }, [editing, id]);

  const updateField = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  };

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    setSaving(true);
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => formData.append(key, value));
    if (image) formData.append('image', image);

    try {
      if (editing) await api.put(`/products/${id}`, formData);
      else await api.post('/products', formData);
      navigate('/admin/products', { state: { notice: editing ? 'Product updated successfully.' : 'Product created successfully.' } });
    } catch (requestError) {
      setError(getApiError(requestError));
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-sm text-gray-500">Loading product...</p>;

  return (
    <>
      <PageHeader title={editing ? 'Edit product' : 'Add product'} description={editing ? 'Update product information and inventory.' : 'Add a product to your MongoDB catalog.'} />
      <ErrorMessage>{error}</ErrorMessage>
      <form onSubmit={submit} className="max-w-4xl space-y-5 rounded-2xl border border-gray-200 bg-white p-5 sm:p-8">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="text-sm font-medium sm:col-span-2">Product name
            <input name="productName" value={values.productName} onChange={updateField} required minLength={2} maxLength={160} className="admin-input" />
          </label>
          <label className="text-sm font-medium sm:col-span-2">Description
            <textarea name="description" value={values.description} onChange={updateField} required maxLength={5000} rows={4} className="admin-input" />
          </label>
          <label className="text-sm font-medium">Price
            <input name="price" type="number" value={values.price} onChange={updateField} required min="0" step="0.01" className="admin-input" />
          </label>
          <label className="text-sm font-medium">Original price (optional)
            <input name="originalPrice" type="number" value={values.originalPrice} onChange={updateField} min="0" step="0.01" className="admin-input" />
          </label>
          <label className="text-sm font-medium">Category
            <input name="category" value={values.category} onChange={updateField} required maxLength={80} className="admin-input" />
          </label>
          <label className="text-sm font-medium">Brand
            <input name="brand" value={values.brand} onChange={updateField} required maxLength={80} className="admin-input" />
          </label>
          <label className="text-sm font-medium">Stock quantity
            <input name="stock" type="number" value={values.stock} onChange={updateField} required min="0" step="1" className="admin-input" />
          </label>
          <label className="text-sm font-medium">Status
            <select name="status" value={values.status} onChange={updateField} className="admin-input">
              <option value="active">Active</option><option value="inactive">Inactive</option>
            </select>
          </label>
          <label className="text-sm font-medium sm:col-span-2">Product image {editing && '(choose a new image to replace the current one)'}
            <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" required={!editing}
              onChange={(event) => setImage(event.target.files?.[0] || null)} className="admin-input file:mr-3 file:rounded-full file:border-0 file:bg-gray-100 file:px-4 file:py-2" />
            {currentImage && <img src={getImageUrl(currentImage)} alt="Current product" className="mt-3 h-28 w-28 rounded-xl bg-gray-100 object-contain" />}
            {image && <p className="mt-2 text-xs text-gray-500">Selected: {image.name}</p>}
          </label>
        </div>
        <div className="flex flex-wrap gap-3 border-t border-gray-100 pt-5">
          <button disabled={saving} className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white disabled:opacity-60">
            {saving ? 'Saving...' : editing ? 'Save changes' : 'Add product'}
          </button>
          <Link to="/admin/products" className="rounded-full border border-gray-300 px-6 py-3 text-sm font-semibold">Cancel</Link>
        </div>
      </form>
    </>
  );
}

export function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/users')
      .then(({ data }) => setUsers(data.data.users))
      .catch((requestError) => setError(getApiError(requestError)))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <PageHeader title="Users" description="Registered customer accounts." />
      <ErrorMessage>{error}</ErrorMessage>
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        {loading ? <p className="p-6 text-sm text-gray-500">Loading users...</p> : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                <tr><th className="px-5 py-4">Name</th><th className="px-5 py-4">Email</th><th className="px-5 py-4">Registered</th></tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.map((user) => (
                  <tr key={user._id}>
                    <td className="px-5 py-4 font-medium">{user.name}</td>
                    <td className="px-5 py-4">{user.email}</td>
                    <td className="px-5 py-4">{new Date(user.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
                {!users.length && <tr><td colSpan="3" className="px-5 py-12 text-center text-gray-500">No customer accounts have registered yet.</td></tr>}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
