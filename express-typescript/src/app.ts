import dotenv from 'dotenv';
import express, { Application, Request, Response} from 'express';
import { prisma } from './lib/prisma';

const app: Application = express();
const port: number = 3000;
dotenv.config();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req: Request, res: Response) => {
    const products = await prisma.product.create({
        data: {
            name: 'Sample Product',
            price: 19.99,
        },
    });
    res.json(products);
});

app.get('/about', (req: Request, res: Response) => {
    res.send('This is an Express server written in TypeScript.');
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});