declare namespace NodeJS{
    interface ProcessEnv{
        readonly PORT: any;
        readonly DB:string;
        readonly NODE_ENV: string;
        readonly BASE_URL: string;
        readonly Jwt_PRIVATE_KEY: string;
        readonly JWT_EXPIRED_TIME: string;
    }
}