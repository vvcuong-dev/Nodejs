import * as z from "zod";

export const userSchema = z.object({
    body: z.object({
        name: z.string()
                .min(1, 'Name must be at least 1 character long'),
        email: z.string()
                .min(1, 'Email is required')
                .pipe(z.email('Invalid email format')),
    }),
    query: z.object({
        s: z.string().optional()
    }),
});