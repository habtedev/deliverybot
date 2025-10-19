import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// GET /auth/redirect?token=...&next=customer
// Redirects to FRONTEND_URL/next with the token in the query string so the
// frontend middleware can verify the token and set a cookie on the frontend domain.
// Example: /auth/redirect?token=...&next=customer  -> redirects to
// https://your-frontend.example.com/customer?token=...
router.get('/redirect', (req, res) => {
  const { token, next: nextPath = '' } = req.query;
  const FRONTEND_URL = (process.env.FRONTEND_URL || 'http://localhost:3000').replace(/\/$/, '');

  if (!token) return res.status(400).send('token required');

  const sanitizedNext = String(nextPath).replace(/^\//, '');
  const target = `${FRONTEND_URL}/${sanitizedNext}?token=${encodeURIComponent(String(token))}`;

  console.log(`[auth] redirect -> ${target}`);
  return res.redirect(target);
});

export default router;
