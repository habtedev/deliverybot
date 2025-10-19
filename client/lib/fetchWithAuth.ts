// deliverybot/cllient/lib/fetchWithAuth.ts
import Cookies from 'js-cookie';

export async function fetchWithAuth(input: RequestInfo, init: RequestInit = {}) {
  const token = Cookies.get('auth_token');
  const headers = new Headers(init.headers || {});
  if (token) headers.set('Authorization', `Bearer ${token}`);
  return fetch(input, { ...init, credentials: 'include', headers });
}
