import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import CustomerClient from './CustomerClient';
import { redirect } from 'next/navigation';

type JwtPayload = { name?: string; phone?: string; role?: string; iat?: number; exp?: number };

function isJwtPayload(obj: unknown): obj is JwtPayload {
  if (typeof obj !== 'object' || obj === null) return false;
  const o = obj as Record<string, unknown>;
  return 'name' in o || 'role' in o;
}

export const revalidate = 0;

export default async function Page() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;

  if (!token) {
    redirect('/unauthorized');
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error('[customer.page] JWT_SECRET missing in server environment');
    redirect('/unauthorized');
  }

  try {
    const verified = await jwtVerify(token, new TextEncoder().encode(secret));
    const payload = verified.payload as unknown;
    if (!isJwtPayload(payload)) {
      console.error('[customer.page] token payload unexpected shape');
      redirect('/unauthorized');
    }
    const user = { name: payload.name, phone: payload.phone, role: payload.role };
    // Render client component with user prop
    return <CustomerClient user={user} />;
  } catch (err) {
    console.error('[customer.page] token verification failed:', err);
    redirect('/unauthorized');
  }
}
