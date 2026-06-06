import express from "express";
import { StatusCodes } from 'http-status-codes';
const router = express.Router();

// router.use((req, res, next) => {
//     if (req.path === '/users' && req.method === 'POST') {
//         res.status(StatusCodes.FORBIDDEN).send('Access denied. You cannot create a new user.');
//     }
//     req.user = { name: 'John Doe', role: 'admin' };

//     next();
// });

router.get('/users', (req, res) => {
    const { sort, keyword } = req.query;
    // res.send(`
    //     <h1>Users List</h1>
    //     <h2>Sort: ${sort || 'none'}</h2>
    //     <h2>Keyword: ${keyword || 'none'}</h2>
    //     <h2>User: ${req.user.name} (${req.user.role})</h2>
    //     <form action="/users" method="POST">
    //         <input type="text" name="username" placeholder="Enter username" required>
    //         <button type="submit">Create User</button>
    //     </form>
    //     `);
    // res.status(StatusCodes.OK).json({
    //     data: {
    //         name: 'John Doe',
    //         role: 'admin'
    //     },
    //     messages: "Get users successfully!"
    // });

    res.sendFile('public/demo.html', { root: process.cwd() });
});

router.post('/users', (req, res) => {
    res.status(StatusCodes.CREATED).json({
        data: {
            name: 'John Doe',
            role: 'admin'
        },
        messages: "User created successfully!"
    });
});

// PUT: là cập nhật một tài nguyên đã tồn tại (tất cả thông tin của tài nguyên sẽ bị thay thế bằng thông tin mới)
// PATCH: là cập nhật một phần của tài nguyên đã tồn tại (thông tin của tài nguyên sẽ được giữ lại nếu không được cung cấp trong yêu cầu cập nhật)

router.patch('/users/1', (req, res) => {
    res.status(StatusCodes.OK).json({
        data: {
            name: 'John Doe',
            role: 'admin'
        },
        messages: "User updated successfully!"
    });
});

router.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    res.status(StatusCodes.OK).json({
        data: {
            id: userId,
            name: 'John Doe',
            role: 'admin'
        },
        messages: "User retrieved successfully!"
    });
});

export default router;