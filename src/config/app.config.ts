process.loadEnvFile('.env') // node 20.12.0 required >=

export interface EnvConfigProps {
  APP_NAME: string;
  APP_VERSION: string;
  APP_PROD: boolean;
  APP_URL: string;
  FRONTEND_URL: string;
  PORT: number;
  DB_CONNECTION: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_DATABASE: string;
  DB_HOST: string;
  DB_PORT: number;
  JWT_SECRET: string;
  JWT_EXPIRATION: string;
  SALT_ROUNDS: number;
}

export const EnvConfig: EnvConfigProps = {
  APP_NAME: process.env.APP_NAME ?? 'nodejs-api',
  APP_VERSION: process.env.APP_VERSION ?? '0.0.1',
  APP_PROD: process.env.APP_PROD === 'true' ? true : false,
  APP_URL: process.env.APP_URL ?? 'http://localhost:4000',
  FRONTEND_URL: process.env.FRONTEND_URL ?? 'http://localhost:5173',
  PORT: process.env.PORT ? Number(process.env.PORT) : 3000,
  DB_CONNECTION: process.env.DB_CONNECTION ?? '',
  DB_USER: process.env.DB_USER ?? '',
  DB_PASSWORD: process.env.DB_PASSWORD ?? '',
  DB_DATABASE: process.env.DB_DATABASE ?? '',
  DB_HOST: process.env.DB_HOST ?? 'localhost',
  DB_PORT: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
  JWT_SECRET: process.env.JWT_SECRET ?? '',
  JWT_EXPIRATION: process.env.JWT_EXPIRATION ?? '',
  SALT_ROUNDS: process.env.SALT_ROUNDS ? Number(process.env.SALT_ROUNDS) : 8,
};
