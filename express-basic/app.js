import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/about', (req, res) => {
    res.send('This is the about page.');
});

app.get('/contact', (req, res) => {
    res.json([
        {
            name: 'John Doe',
            email: 'abc@example.com'
        },
        {
            name: 'Jane Doe',
            email: 'jane@gmail.com'
        }
    ])
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});