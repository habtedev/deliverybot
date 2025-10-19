import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { redirect } from "next/navigation";
import CustomerClient from "./CustomerClient";

type JwtPayload = { name?: string; phone?: string; role?: string; iat?: number; exp?: number };

function isJwtPayload(obj: unknown): obj is JwtPayload {
  return typeof obj === "object" && obj !== null && ("name" in obj || "role" in obj);
}

export const revalidate = 0;

export default async function Page() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    console.error("[customer.page] ❌ No token found in cookies");
    redirect("/unauthorized");
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error("[customer.page] ❌ Missing JWT_SECRET in environment");
    redirect("/unauthorized");
  }

  try {
    const verified = await jwtVerify(token, new TextEncoder().encode(secret));
    const payload = verified.payload as unknown;

    if (!isJwtPayload(payload)) {
      console.error("[customer.page] ⚠️ Invalid token payload structure");
      redirect("/unauthorized");
    }

    const user = { name: payload.name, phone: payload.phone, role: payload.role };
    console.log(`[customer.page] ✅ Verified user: ${user.name} (${user.phone})`);

    return <CustomerClient user={user} />;
  } catch (err) {
    console.error("[customer.page] 🔐 Token verification failed:", err);
    redirect("/unauthorized");
  }
}
