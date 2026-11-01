import { FiBox, FiGrid, FiLogOut, FiPlus, FiUsers } from 'react-icons/fi';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';

const navigation = [
  { to: '/admin', label: 'Dashboard', icon: FiGrid, end: true },
  { to: '/admin/products', label: 'Products', icon: FiBox },
  { to: '/admin/products/new', label: 'Add product', icon: FiPlus },
  { to: '/admin/users', label: 'Users', icon: FiUsers },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#f7f7f7] md:flex">
      <aside className="bg-black px-4 py-4 text-white md:flex md:w-64 md:flex-col md:px-5 md:py-7">
        <div className="flex items-center justify-between md:block">
          <div>
            <p className="text-xl font-black tracking-tight">SHOP.CO</p>
            <p className="mt-1 text-xs text-gray-400">Admin workspace</p>
          </div>
          <NavLink to="/" className="text-xs text-gray-300 hover:text-white md:hidden">View store</NavLink>
        </div>
        <nav className="mt-5 flex gap-2 overflow-x-auto md:mt-10 md:flex-col">
          {navigation.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end}
              className={({ isActive }) => `flex shrink-0 items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${isActive ? 'bg-white text-black' : 'text-gray-300 hover:bg-white/10 hover:text-white'}`}>
              <Icon /> {label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-5 flex items-center justify-between border-t border-white/15 pt-4 md:mt-auto md:block">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{user.name}</p>
            <p className="truncate text-xs text-gray-400">{user.email}</p>
          </div>
          <div className="mt-3 hidden gap-3 md:flex">
            <NavLink to="/" className="text-xs text-gray-400 hover:text-white">View store</NavLink>
            <button type="button" onClick={handleLogout} className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-white">
              <FiLogOut /> Logout
            </button>
          </div>
          <button type="button" onClick={handleLogout} className="text-xs text-gray-300 hover:text-white md:hidden">Logout</button>
        </div>
      </aside>
      <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-10">
        <Outlet />
      </main>
    </div>
  );
}
