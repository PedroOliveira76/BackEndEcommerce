import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { GamesModule } from './modules/games/games.module';
import { PrismaModule } from './prisma/prisma.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
  imports: [UsersModule, GamesModule, PrismaModule],
  providers:[AppService],
  controllers:[AppController]
})
export class AppModule {}
