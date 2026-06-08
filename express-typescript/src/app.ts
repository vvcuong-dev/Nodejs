import express, { Application, Request, Response} from 'express';
import path from 'path';
import fs from 'fs';

const app: Application = express();
const port: number = 3000;
const dataPath: string = path.join(__dirname, 'data', "db.json");

type User = {
    name: string;
    id: string;
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
});

app.get('/about', (req: Request, res: Response) => {
    res.send('This is an Express server written in TypeScript.');
});

app.get('/users', (req: Request, res: Response) => {
    const data = fs.readFileSync(dataPath, 'utf-8');
    const users = JSON.parse(data);

    res.send(`<h1>List of Users</h1>
    <a href="/users/create">Create User</a>
    <ul>
        ${users.map((user: User) => `<li>${user.name} - ${user.id}</li>`).join('')}
    </ul>
        
    `);
});

app.get('/users/create', (req: Request, res: Response) => {
    res.send(`
        <h1>Create User</h1>
        <form action="/users" method="POST">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required>
            <button type="submit">Create User</button>
        </form>
        `);
});


app.post('/users', (req: Request, res: Response) => {
    const data: User[] = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    data.push({
        id: crypto.randomUUID(),
        name: req.body.name
    });
    fs.writeFileSync(dataPath, JSON.stringify(data));
    res.redirect('/users');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});