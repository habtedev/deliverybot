// deliverybot/server/serc/middleware/requireAuth.js
import jwt from 'jsonwebtoken';

export default function requireAuth(req, res, next) {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    // In production this should never happen. Fail-open is dangerous, so fail closed.
    console.error('[requireAuth] JWT_SECRET is not set in environment');
    return res.status(500).json({ error: 'server misconfiguration' });
  }

  const authHeader = (req.headers.authorization || '').toString();
  let token = null;
  if (authHeader && authHeader.toLowerCase().startsWith('bearer ')) {
    token = authHeader.slice(7).trim();
  }

  // Fallback to cookie if not present in header
  if (!token && req.cookies && req.cookies.auth_token) {
    token = req.cookies.auth_token;
  }

  // Development convenience: allow ?token= on localhost/dev only
  if (!token && req.hostname && (req.hostname === 'localhost' || req.hostname === '127.0.0.1')) {
    if (req.query && req.query.token) token = req.query.token;
  }

  if (!token) {
    return res.status(401).json({ error: 'token required' });
  }

  try {
    const payload = jwt.verify(token, secret);
    // attach both decoded payload and raw token for downstream handlers
    req.user = payload;
    req.token = token;
    return next();
  } catch (err) {
    console.error('[requireAuth] token verification failed:', err && err.message);
    return res.status(401).json({ error: 'invalid token' });
  }
}
