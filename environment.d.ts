import { z } from 'zod';

const environmentSchema = z.object({
    NEXT_CLIENT_ID: z.string(),
    NEXT_CLIENT_SECRET: z.string(),
});

environmentSchema.parse(process.env);

declare global {
    namespace NodeJS {
        interface ProcessEnv extends z.infer<typeof environmentSchema> {}
    }
}

export {};
