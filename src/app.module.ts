import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from './utils/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PassportModule } from '@nestjs/passport';
import { DiscordModule } from './discord/discord.module';
import { GuildsModule } from './guilds/guilds.module';
import { WebSocketModule } from './websocket/websocket.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    PassportModule.register({ session: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_DB_HOST,
      port: +process.env.MYSQL_DB_PORT,
      username: process.env.MYSQL_DB_USERNAME,
      password: process.env.MYSQL_DB_PASSWORD,
      database: process.env.MYSQL_DB_DATABASE,
      synchronize: JSON.parse(process.env.MYSQL_DB_SYNCHRONIZE),
      entities: entities,
      ssl: {
        rejectUnauthorized: true,
      },
      dropSchema: true,
    }),
    AuthModule,
    UserModule,
    DiscordModule,
    GuildsModule,
    WebSocketModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
