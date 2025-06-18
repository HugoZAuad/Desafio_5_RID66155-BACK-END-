import { Request, Response, NextFunction } from 'express';

const allowedOrigins = [
  'https://desafio-5-rid-66155-front-end.vercel.app',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
];

export function CorsMiddleware(req: Request, res: Response, next: NextFunction): void {
  const origin = req.headers.origin as string;
  console.log('CorsMiddleware origin:', origin);
  if (!origin || allowedOrigins.indexOf(origin) !== -1) {
    res.header('Access-Control-Allow-Origin', origin || '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    if (req.method === 'OPTIONS') {
      res.sendStatus(204);
      return;
    }
    next();
  } else {
    res.status(403).send('Not allowed by CORS');
  }
}
