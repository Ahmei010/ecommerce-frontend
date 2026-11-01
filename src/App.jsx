import { Navigate, Route, Routes } from 'react-router-dom';
import AdminLayout from './components/admin/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer';
import MiniNavbar from './components/home/MiniNavbar';
import Navbar from './components/Navbar';
import { useAuth } from './context/authContext';
import CardPage from './pages/CardPage';
import Category from './pages/Category';
import Home from './pages/Home';
import { LoginPage, RegisterPage } from './pages/AuthPages';
import ProductDetail from './pages/ProductDetail';
import ProfilePage from './pages/ProfilePage';
import {
  AdminDashboard,
  AdminProductForm,
  AdminProducts,
  AdminUsers,
} from './pages/admin/AdminPages';

function StoreShell({ children }) {
  return (
    <>
      <MiniNavbar />
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

function HomePage() {
  return <Home />;
}

function AuthShell({ children }) {
  return <StoreShell>{children}</StoreShell>;
}

function AdminIndexRedirect() {
  const { user } = useAuth();
  return <Navigate to={user?.role === 'admin' ? '/admin' : '/'} replace />;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/category" element={<Category />} />
      <Route path="/cardpage" element={<CardPage />} />
      <Route path="/login" element={<AuthShell><LoginPage /></AuthShell>} />
      <Route path="/register" element={<AuthShell><RegisterPage /></AuthShell>} />

      <Route element={<ProtectedRoute />}>
        <Route path="/profile" element={<AuthShell><ProfilePage /></AuthShell>} />
      </Route>

      <Route element={<ProtectedRoute adminOnly />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="products/new" element={<AdminProductForm />} />
          <Route path="products/:id/edit" element={<AdminProductForm />} />
          <Route path="users" element={<AdminUsers />} />
        </Route>
      </Route>

      <Route path="*" element={<AdminIndexRedirect />} />
    </Routes>
  );
}

export default App;
