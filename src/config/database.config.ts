import { registerAs } from '@nestjs/config';
import * as process from "process";

export default registerAs('database', () => ({
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  database: process.env.POSTGRES_DB || 'resume',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: process.env.POSTGRES_SYNCHRONIZE === 'true',
  autoLoadEntities: true,
  logging: process.env.NODE_ENV !== 'production',
})); 