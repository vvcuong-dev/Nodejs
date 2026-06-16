import dotenv from 'dotenv';
import express, { Application, NextFunction, Request, Response } from 'express';
import path from 'path';
import expressLayouts from 'express-ejs-layouts';
import * as z from "zod"

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

app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Hello, World!' });
});

const userSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string()
            .min(1, "Email is required")
            .pipe(z.email("Invalid email format")), // pipe nghia la sau khi validate xong chuoi thi se tiep tuc validate email
    age: z.number().int().positive("Age must be a positive integer")
});

app.post('/users', (req: Request, res: Response) => {
    try {

        const { name = "", email = "", age } = req.body;
        const body = userSchema.parse({ name, email, age }); // userSchema.parse nghia la validate du lieu theo schema, neu du lieu khong hop le thi se throw ra loi va vao catch

        res.json({ message: 'User created successfully', user: body });
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ errors: error.issues });
        } else {
            res.status(500).json({ message: 'Internal Server Error' });
        }
 
    }
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});