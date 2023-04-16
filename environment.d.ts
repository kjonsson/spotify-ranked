declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NEXT_CLIENT_ID: string;
            NEXT_CLIENT_SECRET: string;
        }
    }
}

export {};
