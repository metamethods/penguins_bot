declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // Edit me!

      TOKEN: string;
      ID: string;

      GOOGLE_API_KEY: string;
      GOOGLE_CX: string;
      DATABASE_URL: string
    }
  }
}

export {}