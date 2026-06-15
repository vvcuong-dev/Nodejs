import dotenv from 'dotenv';
import express, { Application, Request, Response} from 'express';
import path from 'path';
// import { prisma } from './lib/prisma';

const app: Application = express();
const port: number = 3000;
dotenv.config();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', async (req: Request, res: Response) => {
    const title = 'Home Page';

    res.render('home', { title });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});