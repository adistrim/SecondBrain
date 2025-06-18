import express, { type Request, type Response } from 'express';
import authRouter from './routes/auth';
import tagRouter from './routes/tags';

const app = express();

app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  res.send('second-brain-server');
});

app.use('/api/auth/', authRouter)
app.use('/api/tags/', tagRouter)

export default app;
