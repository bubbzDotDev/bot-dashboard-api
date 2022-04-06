import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GuildConfiguration } from 'src/utils/typeorm/entities/GuildConfiguration';
import { Repository } from 'typeorm';
import { IGuildsService } from '../interfaces/guilds';

@Injectable()
export class GuildsService implements IGuildsService {
  constructor(
    @InjectRepository(GuildConfiguration)
    private readonly guildConfigRepository: Repository<GuildConfiguration>,
  ) {}

  getGuildConfig(guildId: string) {
    return this.guildConfigRepository.findOne({ guildId });
  }

  async updateGuildPrefix(guildId: string, prefix: string) {
    const guildConfig = await this.getGuildConfig(guildId);
    if (!guildConfig)
      throw new HttpException('Guild config not found', HttpStatus.BAD_REQUEST);
    return this.guildConfigRepository.save({
      ...guildConfig,
      prefix,
    });
  }

  async updateWelcomeChannel(guildId: string, welcomeChannelId: string) {
    const guildConfig = await this.getGuildConfig(guildId);
    if (!guildConfig)
      throw new HttpException('Guild config not found', HttpStatus.BAD_REQUEST);
    return this.guildConfigRepository.save({
      ...guildConfig,
      welcomeChannelId,
    });
  }
}
