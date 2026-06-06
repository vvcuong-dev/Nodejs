import http from 'http';
import url from 'url';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
// fileURLtoPath() sử dụng để chuyển đổi URL thành đường dẫn tệp hệ thống: Ví dụ: file:///C:/path/to/file.txt -> C:\path\to\file.txt
const __dirname = path.dirname(__filename);
const viewPath = path.join(__dirname, 'views');

const renderError = (res, statusCode) => {
    res.statusCode = statusCode;
    res.end(fs.readFileSync(path.join(viewPath, 'error.html'), 'utf-8'));
}

const renderView = (res, viewName = 'index') => {
    fs.readFile(path.join(viewPath, `${viewName}.html`), 'utf-8', (err, data) => {
        if (err) {
            renderError(res, 500);
        } else {
            res.write(data);
            res.end();
        }
    });

}

const server = http.createServer((req, res) => {
    const urlParse = url.parse(req.url);
    const pathName = urlParse.pathname;
    res.setHeader('Content-Type', 'text/html');

    if (pathName === '/') {
       renderView(res, 'index');
    } else if (pathName === '/about') {
        renderView(res, 'about');
    } else if (pathName === '/contact') {
        renderView(res, 'contact');
    } else {
        renderError(res, 404);
        return;
    }

});

    server.listen(3000, () => {
        console.log('Server is running on http://localhost:3000');
    });