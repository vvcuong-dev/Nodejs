import { Request, Response, NextFunction } from 'express';
import { ZodError, ZodObject } from 'zod';

export const validate = (schema: ZodObject ) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const parsedData = await schema.parseAsync({
            body: req.body,
            query: req.query,
            params: req.params
        });

        req.body = parsedData.body;
        (req as any).validateQuery = parsedData.query as any ?? {};
        req.params = parsedData.params as any ?? {};
  

        return next();
    }catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({ 
                status: 'error',
                message: 'Validation failed',
                errors: error.issues.map((err) => ({
                    path: err.path[1],
                    message: err.message
                }))     
            });
        };

        console.error('Unexpected error during validation:', error);
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
    next();
}