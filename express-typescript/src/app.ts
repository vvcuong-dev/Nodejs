import dotenv from 'dotenv';
import express, { Application, Request, Response} from 'express';
import { prisma } from './lib/prisma';

const app: Application = express();
const port: number = 3000;
dotenv.config();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req: Request, res: Response) => {
    const user = await prisma.user.update({
        where: {
            email: 'cuong.vu@gmail.com'
        },
        data: {
            userInfo: {
                update: {
                    address: '123 Main St',
                    province: 'Hanoi'
                }
            }
        }
    });
    res.json(user);
});

app.get('/about', (req: Request, res: Response) => {
    res.send('This is an Express server written in TypeScript.');
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});