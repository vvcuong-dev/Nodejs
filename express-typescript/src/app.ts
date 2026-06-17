import dotenv from 'dotenv';
import express, { Application } from 'express';
import path from 'path';
import expressLayouts from 'express-ejs-layouts';
import routerWeb from './routes/web.route';
import { errorHandlerLingMiddleware, notFoundMiddleware } from './middlewares/error.middleware';
import routerApi from './routes/api.route';

const app: Application = express();
const port: number = 3000;
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Config view engine EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Config layouts
app.set('layout', 'layouts/main.layout.ejs');
app.set('layout extractScripts', true);

// Use layouts sau cùng
app.use(expressLayouts);



// Routes
app.use(routerWeb);
app.use('/api', routerApi);
app.use(notFoundMiddleware);
app.use(errorHandlerLingMiddleware);


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});