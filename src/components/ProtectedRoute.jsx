import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/authContext';

export default function ProtectedRoute({ adminOnly = false }) {
  const { user, loading, authError, refreshProfile } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="grid min-h-screen place-items-center text-sm text-gray-500">Checking your account...</div>;
  }

  if (authError) {
    return (
      <div className="grid min-h-screen place-items-center px-4 text-center">
        <div>
          <p role="alert" className="text-sm text-red-700">{authError}</p>
          <button type="button" onClick={refreshProfile} className="mt-4 rounded-full bg-black px-5 py-2 text-sm text-white">Retry</button>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
