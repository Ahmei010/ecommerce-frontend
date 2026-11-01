import { useState } from 'react';
import { FiChevronDown, FiMenu, FiSearch, FiShoppingCart, FiUser, FiX } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();
  const accountPath = user ? (user.role === 'admin' ? '/admin' : '/profile') : '/login';

  const submitSearch = (event) => {
    event.preventDefault();
    const query = search.trim();
    navigate(query ? `/category?search=${encodeURIComponent(query)}` : '/category');
    setMenuOpen(false);
  };

  const navigation = (
    <>
      <Link to="/category" className="flex items-center gap-1 whitespace-nowrap text-sm text-gray-800 hover:text-black">
        Shop <FiChevronDown />
      </Link>
      <Link to="/category?sort=priceAsc" className="whitespace-nowrap text-sm text-gray-800 hover:text-black">On Sale</Link>
      <Link to="/category?sort=newest" className="whitespace-nowrap text-sm text-gray-800 hover:text-black">New Arrivals</Link>
      <Link to="/category" className="whitespace-nowrap text-sm text-gray-800 hover:text-black">Brands</Link>
    </>
  );

  return (
    <nav className="w-full border-t-[3px] border-black bg-white">
      <div className="flex min-h-[68px] w-full items-center px-4 sm:px-6 md:px-8 lg:px-10 xl:px-16">
        <button type="button" onClick={() => setMenuOpen((open) => !open)}
          className="mr-3 text-[23px] lg:hidden" aria-label="Toggle menu">
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
        <Link to="/" className="shrink-0 text-[25px] font-black tracking-[-1.5px] sm:text-[28px]">SHOP.CO</Link>
        <div className="ml-8 hidden shrink-0 items-center gap-6 lg:flex">{navigation}</div>
        <form onSubmit={submitSearch} className="ml-auto hidden min-w-0 max-w-[520px] flex-1 items-center rounded-full bg-[#f2f2f2] px-4 lg:ml-8 lg:flex">
          <FiSearch className="mr-3 shrink-0 text-xl text-gray-500" />
          <input value={search} onChange={(event) => setSearch(event.target.value)} type="search" placeholder="Search for products..."
            aria-label="Search products" className="h-[42px] min-w-0 w-full bg-transparent text-sm outline-none placeholder:text-gray-400" />
        </form>
        <div className="ml-auto flex shrink-0 items-center gap-4 lg:ml-6">
          <button type="button" onClick={() => navigate(`/category${search.trim() ? `?search=${encodeURIComponent(search.trim())}` : ''}`)}
            className="text-xl lg:hidden" aria-label="Search products"><FiSearch /></button>
          <Link to="/cardpage" className="text-xl" aria-label="Shopping cart"><FiShoppingCart /></Link>
          <Link to={accountPath} className="text-xl" aria-label={user ? 'My account' : 'Sign in'}><FiUser /></Link>
        </div>
      </div>
      {menuOpen && (
        <div className="border-t border-gray-200 px-5 py-5 lg:hidden">
          <div className="flex flex-col gap-5">{navigation}</div>
          <form onSubmit={submitSearch} className="mt-5 flex items-center rounded-full bg-[#f2f2f2] px-4">
            <FiSearch className="mr-3 shrink-0 text-gray-500" />
            <input value={search} onChange={(event) => setSearch(event.target.value)} type="search" placeholder="Search for products..."
              className="h-11 min-w-0 w-full bg-transparent text-sm outline-none" />
          </form>
          {!user && <Link to="/register" onClick={() => setMenuOpen(false)} className="mt-5 inline-block text-sm font-semibold underline">Create an account</Link>}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
