declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_SECRET: string;
      NEXT_PUBLIC_CLIENT_ID: string;
      NEXT_PUBLIC_CLIENT_SECRET: string;
    }
  }
}

export {};
