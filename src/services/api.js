import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://ecommerce-backend-main-ten.vercel.app/api',
  withCredentials: true,
});

export function getImageUrl(image) {
  if (!image) return '';
  if (/^https?:\/\//i.test(image)) return image;

  const apiRoot = api.defaults.baseURL.replace(/\/api\/?$/, '');
  return `${apiRoot}${image.startsWith('/') ? image : `/${image}`}`;
}

export function getApiError(error) {
  return error.response?.data?.message || error.message || 'Something went wrong. Please try again.';
}

export default api;
