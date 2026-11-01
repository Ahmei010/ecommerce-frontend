import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { getApiError } from '../services/api';

function AuthForm({ mode }) {
  const isRegister = mode === 'register';
  const { user, loading, login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [values, setValues] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!loading && user) {
    return <Navigate to={user.role === 'admin' ? '/admin' : '/'} replace />;
  }

  const updateField = (event) => {
    setValues((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const signedInUser = isRegister
        ? await register(values)
        : await login({ email: values.email, password: values.password });
      const destination = signedInUser.role === 'admin' ? '/admin' : (location.state?.from?.pathname || '/');
      navigate(destination, { replace: true });
    } catch (requestError) {
      setError(getApiError(requestError));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="mx-auto flex min-h-[65vh] max-w-md items-center px-4 py-12">
      <form onSubmit={handleSubmit} className="w-full space-y-5 rounded-2xl border border-gray-200 p-6 shadow-sm sm:p-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">SHOP.CO ACCOUNT</p>
          <h1 className="mt-2 text-3xl font-black">{isRegister ? 'Create account' : 'Welcome back'}</h1>
          <p className="mt-2 text-sm text-gray-500">
            {isRegister ? 'Sign up to keep your profile up to date.' : 'Sign in to continue to your account.'}
          </p>
        </div>
        {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        {isRegister && (
          <label className="block text-sm font-medium">
            Name
            <input name="name" value={values.name} onChange={updateField} required minLength={2} maxLength={80}
              autoComplete="name" className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 font-normal" />
          </label>
        )}
        <label className="block text-sm font-medium">
          Email
          <input name="email" type="email" value={values.email} onChange={updateField} required maxLength={254}
            autoComplete="email" className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 font-normal" />
        </label>
        <label className="block text-sm font-medium">
          Password
          <input name="password" type="password" value={values.password} onChange={updateField} required minLength={8}
            autoComplete={isRegister ? 'new-password' : 'current-password'}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 font-normal" />
        </label>
        {isRegister && (
          <label className="block text-sm font-medium">
            Confirm password
            <input name="confirmPassword" type="password" value={values.confirmPassword} onChange={updateField}
              required minLength={8} autoComplete="new-password"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 font-normal" />
          </label>
        )}
        <button type="submit" disabled={submitting}
          className="w-full rounded-full bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60">
          {submitting ? 'Please wait...' : isRegister ? 'Create account' : 'Sign in'}
        </button>
        <p className="text-center text-sm text-gray-600">
          {isRegister ? 'Already have an account?' : 'New to SHOP.CO?'}{' '}
          <Link className="font-semibold text-black underline" to={isRegister ? '/login' : '/register'}>
            {isRegister ? 'Sign in' : 'Create an account'}
          </Link>
        </p>
      </form>
    </main>
  );
}

export function LoginPage() {
  return <AuthForm mode="login" />;
}

export function RegisterPage() {
  return <AuthForm mode="register" />;
}
