import express from "express";

const router = express.Router();
router.use((req, res, next) => {
    if (req.path === '/users' && req.method === 'POST') {
        res.status(403).send('Access denied. You cannot create a new user.');
    }
    req.user = { name: 'John Doe', role: 'admin' };

    next();
});

router.get('/users', (req, res) => {
    const { sort, keyword } = req.query;
    res.send(`
        <h1>Users List</h1>
        <h2>Sort: ${sort || 'none'}</h2>
        <h2>Keyword: ${keyword || 'none'}</h2>
        <h2>User: ${req.user.name} (${req.user.role})</h2>
        <form action="/users" method="POST">
            <input type="text" name="username" placeholder="Enter username" required>
            <button type="submit">Create User</button>
        </form>
        `);
});

router.post('/users', (req, res) => {
    console.log('Request body:', req.body);
    console.log('Request Headers:', req.headers);
    res.send('User created!');
});

// PUT: là cập nhật một tài nguyên đã tồn tại (tất cả thông tin của tài nguyên sẽ bị thay thế bằng thông tin mới)
// PATCH: là cập nhật một phần của tài nguyên đã tồn tại (thông tin của tài nguyên sẽ được giữ lại nếu không được cung cấp trong yêu cầu cập nhật)

router.patch('/users/1', (req, res) => {
    res.send(`User with ID 1has been updated!`);
});

router.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`User with ID ${userId}`);
});

export default router;