import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/about', (req, res) => {
    res.send('This is the about page.');
});

app.get('/users', (req, res) => {
    res.send(`
        <h1>Users List</h1>
        <form action="/users" method="POST">
            <input type="text" name="username" placeholder="Enter username" required>
            <button type="submit">Create User</button>
        </form>
        `);
});

app.post('/users', (req, res) => {
    res.send('User created!');
});

// PUT: là cập nhật một tài nguyên đã tồn tại (tất cả thông tin của tài nguyên sẽ bị thay thế bằng thông tin mới)
// PATCH: là cập nhật một phần của tài nguyên đã tồn tại (thông tin của tài nguyên sẽ được giữ lại nếu không được cung cấp trong yêu cầu cập nhật)

app.put('/users/1', (req, res) => {
    res.send(`User with ID 1has been updated!`);
});

app.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`User with ID ${userId}`);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});