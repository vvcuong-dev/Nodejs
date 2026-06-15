import dotenv from 'dotenv';
import express, { Application, NextFunction, Request, Response } from 'express';
import path from 'path';
import expressLayouts from 'express-ejs-layouts';

const app: Application = express();
const port: number = 3000;
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Config view engine EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Config layouts
app.set('layout', 'layouts/main.layout.ejs');
app.set('layout extractScripts', true);

// Use layouts sau cùng
app.use(expressLayouts);

app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.url.startsWith('/admin')) {
        res.locals.layout = 'layouts/admin.layout.ejs';
    } else {
        res.locals.layout = 'layouts/main.layout.ejs';
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