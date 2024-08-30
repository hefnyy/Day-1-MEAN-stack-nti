declare namespace NodeJS{
    interface ProcessEnv{
        readonly PORT: any;
        readonly DB:string;
        readonly NODE_ENV: string;
        readonly BASE_URL: string;
        readonly Jwt_PRIVATE_KEY: string;
        readonly JWT_EXPIRED_TIME: string;
        readonly JWT_EXPIRED_RESET_CODE_TIME: string;
        readonly APP_NAME: string;
        readonly EMAIL_PASSWORD : string;
        readonly EMAIL_USERNAME:String;
        readonly EMAIL_HOST:String;
    }
}