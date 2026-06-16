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
    name: z.string().trim().min(1, "Name is required"),
    email: z.string()
            .trim()
            .min(1, "Email is required")
            .pipe(z.email("Invalid email format")), // pipe nghia la sau khi validate xong chuoi thi se tiep tuc validate email
    age: z.number()
            .gte(18, "Age must be greater than 18")
            .lt(50, "Age must be less than 50")
            .positive("tuổi phải là số dương")
            .int("Age must be an integer"),
    url: z.url("Invalid URL format").optional(),
    birthday: z.string()
                .trim()
                .min(1, "Birthday is required")
                .pipe(
                    z.iso.date(
                        { message: "Invalid date format, expected ISO 8601 (YYYY-MM-DD)" }
                    )
                ),
    phone: z.string()
            .trim()
            .min(1, "Phone is required")
            .regex(/^0\d{9}$/,  { message: "Phone number must start with 0 and be followed by 9 digits" }),
    status: z.enum(["active", "inactive"], { message: "Status must be either 'active' or 'inactive'" }),
    bio: z.string().nullable().optional(),
    address: z.object({
        province: z.string().trim().optional(),
        ward: z.string().trim().optional(),
        something: z.array(
            z.object({
                value: z.boolean()
            })
        ).min(1, "At least one item is required in something array")
    }).optional()
    });

    /**
     *  trong regex: ^ co nghia la bat dau chuoi, 0 co nghia la chu so 0, \d co nghia la mot chu so, {9} co nghia la lap lai 9 lan, $ co nghia la ket thuc chuoi
      => regex /^0\d{9}$/ co nghia la chuoi phai bat dau bang 0, sau do phai co 9 chu so, va ket thuc chuoi
     */



app.post('/users', (req: Request, res: Response) => {
    try {

        const { name = "", email = "", age, url, birthday = "", phone = "", status = "inactive", bio, address } = req.body;
        const body = userSchema.parse({ name, email, age, url, birthday, phone, status, bio, address }); // userSchema.parse nghia la validate du lieu theo schema, neu du lieu khong hop le thi se throw ra loi va vao catch

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