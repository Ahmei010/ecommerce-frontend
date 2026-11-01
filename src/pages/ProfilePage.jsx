import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import api, { getApiError } from '../services/api';

export default function ProfilePage() {
  const { user, refreshProfile, logout } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [logoutError, setLogoutError] = useState('');

  const saveProfile = async (event) => {
    event.preventDefault();
    setSaving(true);
    setMessage('');
    setError('');
    try {
      await api.put('/auth/profile', { name, email });
      await refreshProfile();
      setMessage('Your profile was updated.');
    } catch (requestError) {
      setError(getApiError(requestError));
    } finally {
      setSaving(false);
    }
  };

  const signOut = async () => {
    setLogoutError('');
    try {
      await logout();
      navigate('/');
    } catch (requestError) {
      setLogoutError(getApiError(requestError));
    }
  };

  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <div className="rounded-2xl border border-gray-200 p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">MY ACCOUNT</p>
        <h1 className="mt-2 text-3xl font-black">Profile</h1>
        <p className="mt-2 text-sm text-gray-500">Account created {new Date(user.createdAt).toLocaleDateString()}.</p>
        <form onSubmit={saveProfile} className="mt-8 space-y-5">
          {message && <p role="status" className="rounded-lg bg-green-50 p-3 text-sm text-green-700">{message}</p>}
          {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
          {logoutError && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{logoutError}</p>}
          <label className="block text-sm font-medium">Name
            <input value={name} onChange={(event) => setName(event.target.value)} required minLength={2}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 font-normal" />
          </label>
          <label className="block text-sm font-medium">Email
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 font-normal" />
          </label>
          <div className="flex flex-wrap gap-3">
            <button disabled={saving} className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white disabled:opacity-60">
              {saving ? 'Saving...' : 'Save changes'}
            </button>
            <button type="button" onClick={signOut} className="rounded-full border border-gray-300 px-6 py-3 text-sm font-semibold">
              Log out
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
