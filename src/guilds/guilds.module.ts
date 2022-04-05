import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SERVICES } from 'src/utils/constants';
import { GuildConfiguration } from 'src/utils/typeorm/entities/GuildConfiguration';
import { GuildsController } from './controllers/guilds.controller';
import { GuildsService } from './services/guilds.service';

@Module({
  imports: [TypeOrmModule.forFeature([GuildConfiguration])],
  controllers: [GuildsController],
  providers: [
    {
      provide: SERVICES.GUILDS,
      useClass: GuildsService,
    },
  ],
})
export class GuildsModule {}
