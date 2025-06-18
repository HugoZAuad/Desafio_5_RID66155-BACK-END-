import { Request, Response, NextFunction } from 'express';

const allowedOrigins = [
  'https://reliable-gumption-b4227c.netlify.app',
  'http://localhost:3000',
  'http://localhost:5173',
  'http://127.0.0.1:3000',
];

export function CorsMiddleware(req: Request, res: Response, next: NextFunction): void {
  const origin = req.headers.origin as string;

  if (origin && allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

    if (req.method === 'OPTIONS') {
      res.sendStatus(204);
      return;
    }
  }

  next();
}
