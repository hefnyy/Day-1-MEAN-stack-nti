declare namespace NodeJS{
    interface ProcessEnv{
        readonly PORT: any;
        readonly DB:string;
        readonly NODE_ENV: string;
        readonly BASE_URL: string;
    }
}