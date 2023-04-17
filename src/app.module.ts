import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MbsWorkModule } from './mbs-work/mbs-work.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MbsWorkModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
