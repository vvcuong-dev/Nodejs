import dotenv from 'dotenv';
import express, { Application, Request, Response} from 'express';
import mysql from 'mysql2/promise';

const app: Application = express();
const port: number = 3000;
dotenv.config();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req: Request, res: Response) => {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || '123456',
        port: Number(process.env.DB_PORT) || 3306,
        database: process.env.DB_NAME || 'nodejs'
    });
    const [rows] = await connection.execute('SELECT * FROM users');
    console.log(rows);

    res.send('Hello, World!');
});

app.get('/about', (req: Request, res: Response) => {
    res.send('This is an Express server written in TypeScript.');
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});