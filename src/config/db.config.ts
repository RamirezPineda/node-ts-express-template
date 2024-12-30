import { DataSource } from 'typeorm';
import { EnvConfig } from './app.config';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: EnvConfig.DB_HOST ?? 'localhost',
  port: EnvConfig.DB_PORT ?? 5432,
  username: EnvConfig.DB_USER ?? 'postgres',
  password: EnvConfig.DB_PASSWORD ?? 'mypassword',
  database: EnvConfig.DB_DATABASE ?? '',
  synchronize: EnvConfig.APP_PROD ? false : true, // deactivate in production
  logging: false,
  entities: [__dirname + '/../**/entities/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  subscribers: [],
});
