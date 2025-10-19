// deliverybot/client/types/js-cookie.d.ts
declare module 'js-cookie' {
  interface CookieAttributes {
    expires?: number | Date;
    path?: string;
    domain?: string;
    secure?: boolean;
    sameSite?: 'lax' | 'strict' | 'none';
    httpOnly?: boolean;
    maxAge?: number;
  }

  function get(name: string): string | undefined;
  function set(name: string, value: string, attributes?: CookieAttributes): void;
  function remove(name: string, attributes?: CookieAttributes): void;

  const Cookies: { get: typeof get; set: typeof set; remove: typeof remove };
  export default Cookies;
}
