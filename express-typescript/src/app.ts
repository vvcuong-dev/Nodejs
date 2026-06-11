import dotenv from 'dotenv';
import express, { Application, Request, Response} from 'express';
import { prisma } from './lib/prisma';

const app: Application = express();
const port: number = 3000;
dotenv.config();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req: Request, res: Response) => {
    res.send('Hello, World!');
});

app.get('/users', async (req: Request, res: Response) => {
    const users = await prisma.user.findUnique({
        where: {
            email: 'john.doe@example.com', 
        },
    });
    res.json(users); // trả về null nếu không tìm thấy user nào có email trên, hoặc trả về đối tượng user nếu tìm thấy.

    
    // findFirst là tìm kiếm một user đầu tiên có tên là "John Doe", nếu có nhiều user có tên này thì chỉ trả về một user đầu tiên được tìm thấy. 
    // Nếu không tìm thấy user nào có tên "John Doe", thì sẽ trả về null.
});


app.get('/about', (req: Request, res: Response) => {
    res.send('This is an Express server written in TypeScript.');
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});