import express, { Application, Request, Response} from 'express';

const app: Application = express();

const port: number = 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
});

app.get('/about', (req: Request, res: Response) => {
    res.send('This is an Express server written in TypeScript.');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});