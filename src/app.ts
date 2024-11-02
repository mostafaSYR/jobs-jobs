import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import pool from './db'; 

dotenv.config(); 
const app = express();
app.use(express.json()); 

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Jobs Jobs - Your Job Board!');
});

app.get('/db-check', async (req: Request, res: Response) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    client.release();
    res.send(`Database connected: ${result.rows[0].now}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Database connection error');
  }
});

export default app;