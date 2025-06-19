import express, { type Request, type Response } from 'express';
import authRouter from './routes/auth';
import tagRouter from './routes/tags';
import { ALLOWED_ORIGIN } from './config';
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: ALLOWED_ORIGIN,
    methods: ["GET", "POST"],
    credentials: true,
  }),
);

app.get('/', (_req: Request, res: Response) => {
  res.send('second-brain-server');
});

app.use('/api/auth/', authRouter)
app.use('/api/tags/', tagRouter)

export default app;
