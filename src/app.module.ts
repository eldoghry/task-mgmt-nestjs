import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { typeOrmConfig } from './config/typeorm.config';
import { TasksModule } from './tasks/tasks.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    // TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: +config.get('DB_PORT'),
        database: config.get('DB_NAME'),
        username: config.get('DB_USER'),
        password: config.get('DB_PASS'),
        entities: [path.join(__dirname, '/**/*.entity.js')],
        // autoLoadEntities: true,
        synchronize: Boolean(config.get('DB_SYNCHRONIZATION')),
      }),
      inject: [ConfigService],
    }),
    TasksModule,
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
