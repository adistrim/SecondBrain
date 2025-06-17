import express, { type Request, type Response } from 'express';
import authRouter from './routes/auth';

const app = express();

app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  res.send('second-brain-server');
});

app.use('/api/auth/', authRouter)

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
