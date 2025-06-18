import express, { type Request, type Response } from 'express';
import authRouter from './routes/auth';

const app = express();

app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  res.send('second-brain-server');
});

app.use('/api/auth/', authRouter)

export default app;
