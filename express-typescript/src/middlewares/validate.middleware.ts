import { Request, Response, NextFunction } from 'express';
import { ZodError, ZodObject } from 'zod';
import { ParsedQs } from 'qs'; 
import { ParamsDictionary } from 'express-serve-static-core';

export const validate = (schema: ZodObject ) => async (req: Request, res: Response, next: NextFunction) => {

     Object.defineProperty(req, "query", {
        ...Object.getOwnPropertyDescriptor(req, "query"),
        writable: true,  
        value: req.query,
    });

    try {
        const parsedData = await schema.parseAsync({
            body: req.body,
            query: req.query,
            params: req.params
        });

        req.body = parsedData.body;
        req.params = parsedData.params as ParamsDictionary;
        req.query = parsedData.query as ParsedQs;

        

        return next();
    }catch (error) {
        if (error instanceof ZodError) {

            if (req.baseUrl.startsWith('/api')) {
                return res.status(400).json({ 
                    status: 'error',
                    message: 'Validation failed',
                    errors: error.issues.map((err) => ({
                        path: err.path[1],
                        message: err.message
                    }))     
                });   
            }

            console.log('Validation failed:', error.issues);
            return res.redirect(req.header('Referer') || '/');
        };

        console.error('Unexpected error during validation:', error);
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
    next();
}