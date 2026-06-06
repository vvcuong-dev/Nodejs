import express from 'express';
import userRouter from './routers/user-route.js';
import morgan from 'morgan';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

const timeCheck = (req, res, next) => {
    const currentHour = new Date().getHours();
    if (currentHour >= 9 && currentHour <= 17) {
        next();
    } else {
        res.status(403).send('Access denied. Please visit during working hours (9 AM - 5 PM).');
    }
}

app.use(morgan('dev')); // Sử dụng morgan để ghi log chi tiết về các yêu cầu HTTP
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.get('/buy', timeCheck, (req, res) => {
    res.send('This is the buy page.');
});

app.get('/about', (req, res) => {
    res.send('This is the about page.');
});

app.use(userRouter);


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


// bình thường khi sử dụng middleware, chúng ta sẽ đặt nó ở cấp độ ứng dụng (app.use) để áp dụng cho tất cả các route. 
// Tuy nhiên, nếu bạn muốn áp dụng middleware chỉ cho một số route cụ thể, bạn có thể đặt nó trực tiếp vào route đó. 
// Ví dụ: app.get('/about', timeCheck, (req, res) => { ... }) sẽ chỉ áp dụng middleware timeCheck cho route /about.