// import { Request, Response, NextFunction } from 'express';
// import { ZodError, ZodObject } from 'zod';
// import { ParsedQs } from 'qs'; 
// import { ParamsDictionary } from 'express-serve-static-core';

// export const validate = (schema: ZodObject ) => async (req: Request, res: Response, next: NextFunction) => {

//      Object.defineProperty(req, "query", {
//         ...Object.getOwnPropertyDescriptor(req, "query"),
//         writable: true,  
//         value: req.query,
//     });

//     // Object.defineProperty được sử dụng để định nghĩa lại thuộc tính "query" của đối tượng req, cho phép chúng ta gán giá trị mới cho 
//     // req.query sau khi đã được xác thực và chuyển đổi bởi Zod. Điều này giúp đảm bảo rằng req.query có thể được cập nhật với dữ liệu đã được xác

//     // Object.getOwnPropertyDescriptor(req, "query") được sử dụng để lấy mô tả thuộc tính hiện tại của req.query, 
//     // bao gồm các đặc tính như enumerable, configurable, và writable. Chúng ta giữ nguyên các đặc tính này khi định nghĩa lại thuộc tính query 
//     // để đảm bảo rằng req.query vẫn hoạt động như mong đợi sau khi được gán giá trị mới.
//     // không viết ra nghĩa là chúng ta đang giữ nguyên các đặc tính của thuộc tính query trong req, 
//     // nhưng cho phép nó trở nên writable để chúng ta có thể gán giá trị mới sau khi xác thực và chuyển đổi dữ liệu bằng Zod.

//     try {
//         const parsedData = await schema.parseAsync({
//             body: req.body,
//             query: req.query,
//             params: req.params
//         });

//         req.body = parsedData.body;
//         req.params = parsedData.params as ParamsDictionary;
//         req.query = parsedData.query as ParsedQs;

        

//         return next();
//     }catch (error) {
//         if (error instanceof ZodError) {
//             return res.status(400).json({ 
//                 status: 'error',
//                 message: 'Validation failed',
//                 errors: error.issues.map((err) => ({
//                     path: err.path[1],
//                     message: err.message
//                 }))     
//             });
//         };

//         console.error('Unexpected error during validation:', error);
//         return res.status(500).json({
//             status: 'error',
//             message: 'Internal server error'
//         });
//     }
//     next();
// }