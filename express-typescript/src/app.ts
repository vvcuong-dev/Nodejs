import dotenv from 'dotenv';
import express, { Application, Request, Response} from 'express';
import { prisma } from './lib/prisma';

const app: Application = express();
const port: number = 3000;
dotenv.config();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req: Request, res: Response) => {
    const category = await prisma.category.findUnique({
        where: { id: 1 },
        include: { categories: true }, 
        // include để lấy thông tin của parent và categories liên quan đến category có id = 1
        // parent: true — lấy thông tin của category cha (nếu có)
        // categories: true — lấy thông tin của các category con (nếu có)
    });

    res.json(category);
});

app.get('/about', (req: Request, res: Response) => {
    res.send('This is an Express server written in TypeScript.');
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});