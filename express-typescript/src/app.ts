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

app.get('/users-update', async (req: Request, res: Response) => {
   const users = await prisma.user.updateMany({
    where: {
        name: {
            contains: "John" 
            // nghĩa là tìm kiếm tất cả các user có tên chứa chuỗi "John". Ví dụ: "John Doe", "Johnny", "Johnson" đều sẽ được tìm thấy. 
            // Nếu bạn muốn tìm kiếm chính xác tên "John", bạn có thể sử dụng equals thay vì contains, như sau: name: { equals: "John"
        }
    },
    data: {
        name: "Cường đẹp trai"
    }
   })

   res.json(users);

    // findFirst là tìm kiếm một user đầu tiên có tên là "John Doe", nếu có nhiều user có tên này thì chỉ trả về một user đầu tiên được tìm thấy. 
    // Nếu không tìm thấy user nào có tên "John Doe", thì sẽ trả về null.
});


app.get('/users-upsert', async (req: Request, res: Response) => {

     const user = await prisma.user.upsert({
        where: { 
            email: "john.doe@example.com" 
        },
        update: { 
            name: "Ahihi 11111",
        },
        create: { 
            email: "john.doe@example.com", 
            name: "Ahihi",
            password: "123456"
        }
    });
    res.json(user);
});

app.get('/users-create', async (req: Request, res: Response) => {
    
    const user = await prisma.user.createMany({
        data: [ 
            {
                name: "Jane Smith",
                email: "cc@gmail.com",
                password: "123456"
            },
            {
                name: "John Doe",
                email: "john.doe@example.com",
                password: "123456"
            },
            {
                name: "dta",
                email: "dta@gmail.com",
                password: "123456"
            },
        ],
        skipDuplicates: true,
    });
    res.json(user);
});


app.get('/users-delete', async (req: Request, res: Response) => {
    
    const user = await prisma.user.delete({
        where: { 
            id: 1,
        },
    });
    res.json(user);
});

app.get('/users', async (req: Request, res: Response) => {
    const users = await prisma.user.findMany({
        where: {
            email: {
                startsWith: "john",
            }
        }
    });
    res.json(users);
});

app.get('/about', (req: Request, res: Response) => {
    res.send('This is an Express server written in TypeScript.');
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});