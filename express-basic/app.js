import express from 'express';
import userRouter from './routers/user-route.js';
import morgan from 'morgan';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { 
    FILE_LIMITS, 
    UPLOAD_PATHS, 
} from './constants/file-upload-constans.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads'))); 

/**
 * app.use('/uploads', express.static(path.join(__dirname, 'public/uploads'))); 
 *  - nghĩa là khi có yêu cầu đến đường dẫn bắt đầu bằng /uploads, Express sẽ tìm kiếm file trong thư mục public/uploads.
 *  - Ví dụ: nếu có yêu cầu GET /uploads/123e4567-e89b-12d3-a456-426614174000.jpg, Express sẽ tìm file public/uploads/123e4567-e89b-12d3-a456-426614174000.jpg và trả về cho client.
 *  - Điều này cho phép bạn truy cập trực tiếp các file đã được tải lên thông qua URL mà không cần phải tạo route riêng biệt để phục vụ từng file.
 *  - tham số '/uploads' ở đầu tiên của app.use() chỉ định rằng middleware này sẽ được áp dụng cho tất cả các yêu cầu bắt đầu bằng /uploads. 
 *    hiểu đơn giản là khi có yêu cầu đến đường dẫn bắt đầu bằng /uploads, Express sẽ sử dụng middleware express.static để tìm kiếm file trong thư mục public/uploads 
 *    và trả về cho client nếu tìm thấy.
 */

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

const myPromise = () => Promise.reject(new Error('This is a test error from myPromise.'));
app.get('/debug', async (req, res) => {
   const data = await myPromise();
   throw new Error('This is a test error from /debug route.');
});

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, UPLOAD_PATHS.UPLOAD_DIR);
    },
    filename: (req, file, callback) => {
        const ext = path.extname(file.originalname); // lấy đuôi .jpg, .png...
        const newFilename = crypto.randomUUID() + ext; // tên ngẫu nhiên + đuôi VD: 123e4567-e89b-12d3-a456-426614174000.jpg
        callback(null, newFilename);
    }
});

// 2. Tao middleware multer với cấu hình storage đã định nghĩa ở trên
const upload = multer({ 
    storage: storage,
    limits: { fileSize: FILE_LIMITS.MAX_SINGLE_FILE_SIZE },
    fileFilter: (req, file, callback) => {
        const ext = path.extname(file.originalname); // ext là phần mở rộng của file, ví dụ: .jpg, .png
        const mimeType = file.mimetype; // mimeType là loại MIME của file, ví dụ: image/jpeg, image/png
        const fileTypes = /jpg|jpeg|png|gif/; // định nghĩa các loại file được phép upload

        if (fileTypes.test(ext.toLowerCase()) && fileTypes.test(mimeType)) {
            callback(null, true); // chấp nhận file
        }else {
            const error = new Error('Invalid file type. Only JPG, JPEG, PNG, and GIF files are allowed.');
            error.status = 400;
            callback(error); // từ chối file và trả về lỗi
        }

    
    }
 });


app.post('/uploads', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded.' });
    }

    res.send({ success: true, message: 'File uploaded successfully.', filename:  `http://localhost:3000/uploads/${req.file.filename}` });
});


app.get('/uploads-multiple', (req, res) => {
    res.send(
        `<form action="/uploads-multiple" method="post" enctype="multipart/form-data">
            <input type="file" name="images" multiple />
            <button type="submit">Upload Multiple</button>
        </form>`
    )
});

app.post('/uploads-multiple', upload.array('images', FILE_LIMITS.MAX_MULTIPLE_FILES), (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ success: false, message: 'No files uploaded.' });
    }
    
    const fileUrls = req.files.map(file => `http://localhost:3000/uploads/${file.filename}`);
    res.send({ success: true, message: 'Files uploaded successfully.', files: fileUrls });
});

app.get('/uploads', (req, res) => {
    res.send(
        `<form action="/uploads" method="post" enctype="multipart/form-data">
            <input type="file" name="image" />
            <button type="submit">Upload</button>
        </form>`
    )
});

app.use((req, res, next) => {
    const error = new Error('Not Found - The requested resource was not found on this server.');
    error.status = 404;
    next(error);
});



app.use((err, req, res, next) => {
    // Kiểm tra error thuộc MulterError (lỗi liên quan đến multer)
    if (err instanceof multer.MulterError) {
        return res.json({ 
            success: false, 
            message: err.message 
        });
    }

    const status = err.status || 500;

    res.status(status).json({ 
        success: false,
        status: status,
        message: err.message || 'Internal Server Error',
     });
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


// bình thường khi sử dụng middleware, chúng ta sẽ đặt nó ở cấp độ ứng dụng (app.use) để áp dụng cho tất cả các route. 
// Tuy nhiên, nếu bạn muốn áp dụng middleware chỉ cho một số route cụ thể, bạn có thể đặt nó trực tiếp vào route đó. 
// Ví dụ: app.get('/about', timeCheck, (req, res) => { ... }) sẽ chỉ áp dụng middleware timeCheck cho route /about.