import express from 'express';
import userRouter from './routers/user-route.js';

const app = express();
const port = 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
// đoạn này giúp phân tích dữ liệu từ form gửi lên dưới dạng URL-encoded, 
// nếu không có đoạn này, req.body sẽ là undefined khi gửi dữ liệu từ form.

app.use('/', userRouter);


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});