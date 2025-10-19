import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// GET /auth/redirect?token=...&next=customer
// Sets a secure HttpOnly cookie with the token and redirects to FRONTEND_URL/next
router.get('/redirect', (req, res) => {
  const { token, next: nextPath = '' } = req.query;
  const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

  if (!token) return res.status(400).send('token required');

  // Cookie options: HttpOnly, Secure in production, SameSite Lax to allow cross-site
  const isProd = process.env.NODE_ENV === 'production';
  const maxAge = 60 * 60; // 1 hour

  const cookieOptions = [
    `HttpOnly`,
    `Max-Age=${maxAge}`,
    `Path=/`,
    `SameSite=Lax`,
  ];

  if (isProd) cookieOptions.push('Secure');

  // Set cookie name auth_token
  res.setHeader('Set-Cookie', `auth_token=${encodeURIComponent(token)}; ${cookieOptions.join('; ')}`);

  // Redirect to frontend path
  const sanitizedNext = String(nextPath).replace(/^\//, '');
  return res.redirect(`${FRONTEND_URL.replace(/\/$/, '')}/${sanitizedNext}`);
});

export default router;
