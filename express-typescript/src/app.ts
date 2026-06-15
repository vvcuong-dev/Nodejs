import dotenv from 'dotenv';
import express, { Application, NextFunction, Request, Response} from 'express';
import path from 'path';
import expressLayouts from 'express-ejs-layouts';

const app: Application = express();
const port: number = 3000;
dotenv.config();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('layout', 'layouts/main.layout.ejs');
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use((req: Request, res: Response, next: NextFunction) => {
    const url = req.url;
    if (url.startsWith('/admin')) {
        app.set("layout", 'layouts/admin.layout.ejs');
    }
    next();
});


app.get('/', async (req: Request, res: Response) => {
    const title = '<i>Welcome to Express with TypeScript!</i>';
    const status = false;
    const users = [
        { id: 1, name: 'Alice', email: 'alice@example.com' },
        { id: 2, name: 'Bob', email: 'bob@example.com' },
        { id: 3, name: 'Charlie', email: 'charlie@example.com' }
    ]

    const utils = {
        doSomething: () => {
            return 'Doing something...';
        }
    }

    res.render('home', { title, status, users, utils });
});

app.get('/product', async (req: Request, res: Response) => {
    res.render('product');
});

app.get('/admin', async (req: Request, res: Response) => {
    res.render('admin/dashboard');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});