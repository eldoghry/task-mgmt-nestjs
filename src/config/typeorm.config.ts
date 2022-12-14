import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'task-mgmt',
  username: 'postgres',
  password: 'postgres',
  entities: [path.join(__dirname, '/../**/*.entity.js')],
  //   autoLoadEntities: true,
  synchronize: true,
};
