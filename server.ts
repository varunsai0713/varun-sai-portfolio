import 'dotenv/config';
import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
  const isProd = process.env.NODE_ENV === 'production';

  app.use(express.json());

  const springApiUrl = (process.env.SPRING_API_URL || 'http://localhost:8080').replace(/\/$/, '');

  app.post('/api/contact', async (req: Request, res: Response) => {
    const { name, email, message } = req.body ?? {};

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return res.status(400).json({ success: false, error: 'Valid name is required (min 2 characters).' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      return res.status(400).json({ success: false, error: 'Valid email address is required.' });
    }

    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      return res.status(400).json({ success: false, error: 'Message must be at least 10 characters.' });
    }

    try {
      const backendResponse = await fetch(`${springApiUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
      const responseBody = await backendResponse.text();

      return res
        .status(backendResponse.status)
        .type(backendResponse.headers.get('content-type') || 'application/json')
        .send(responseBody);
    } catch (err: unknown) {
      console.error('Spring Boot contact API is unavailable:', err);
      return res.status(503).json({
        success: false,
        error: 'The email service is unavailable. Start the Spring Boot backend and try again.',
      });
    }
  });

  // Health check endpoint
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ status: 'UP', service: 'portfolio-backend-service', timestamp: new Date().toISOString() });
  });

  if (!isProd) {
    // Mount Vite dev middlewares
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true',
        watch: process.env.DISABLE_HMR === 'true' ? null : {},
      },
      appType: 'spa',
    });

    app.use(vite.middlewares);
  } else {
    // Serve production static assets
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Portfolio Full-Stack server running at http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
