import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import CustomerClient from './CustomerClient';
import { redirect } from 'next/navigation';

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
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
    const user = {
      name: (payload as any).name,
      phone: (payload as any).phone,
      role: (payload as any).role,
    };
    // Render client component with user prop
    return <CustomerClient user={user} />;
  } catch (err) {
    console.error('[customer.page] token verification failed:', err);
    redirect('/unauthorized');
  }
}
