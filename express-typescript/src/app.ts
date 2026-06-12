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
    
    const post = await prisma.post.create({
        data: {
            title: "Post 2",
            content: "This is the content of post 2.",
            author: {
                connect: { email: "cuongvuive@gmail.com" } 
                // nghĩa là kết nối bài viết này với user có email = "cuongvuive@gmail.com". 
                // Điều này giả định rằng user với email = "cuongvuive@gmail.com" đã tồn tại trong cơ sở dữ liệu của bạn. 
                // Nếu user này không tồn tại, bạn sẽ nhận được lỗi khi cố gắng tạo bài viết này.
            }
        }
    })
    res.json(post);
});

app.get('/users-create-post', async (req: Request, res: Response) => {
    const user = await prisma.user.create({
        data: {
            name: "dganm",
            email: "da@example.com",
            password: "123456",
            posts: {
                create: [
                    {
                        title: "Post of user dganm 1",
                        content: "This is the content of post 1."
                    },
                    {
                        title: "Post of user dganm 2",
                        content: "This is the content of post 2."
                    }
                ]
            }
        }
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
        orderBy: {
            createdAt: 'desc'
        }
    });
    res.json(users);        
});

app.get('/user-posts', async (req: Request, res: Response) => {
    // const userWithPosts = await prisma.user.findMany({
    //     include: {
    //         posts: true 
    //         // nghĩa là khi truy vấn người dùng, Prisma sẽ tự động lấy tất cả các bài viết liên quan đến mỗi người dùng và bao gồm chúng trong kết quả trả về. 
    //         // Điều này giúp bạn dễ dàng quản lý dữ liệu liên quan mà không cần phải thực hiện nhiều truy vấn riêng biệt.
    //     },
    //     orderBy: {
    //         createdAt: 'desc'
    //     }
    // });
    // res.json(userWithPosts);        

    const postsWithAuthors = await prisma.post.findMany({
        select: {
            title: true,
            content: true,
            author: {
                select: {
                    name: true,
                    email: true
                }
            } 
        }
    });

    res.json(postsWithAuthors);

});

app.get('/about', async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1; 
    const limit = Number(req.query.limit) || 3; 
    const skip = (page - 1) * limit;

    const [data, count] = await Promise.all([
        prisma.user.findMany({
            skip,
            take: limit,
            orderBy: {
                id: 'desc'
            }
        }),
        prisma.user.count()
    ]);


    res.json({
        data: data,
        total: count,
        page: page,
        limit: limit,
        totalPages: Math.ceil(count / limit) 
    }); 
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});