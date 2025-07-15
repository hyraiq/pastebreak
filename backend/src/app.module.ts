import { Module } from '@nestjs/common';
import { BreakdownModule } from './breakdown/breakdown.module';
import { FrontendModule } from './frontend/frontend.module';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';

@Module({
  imports: [
    BreakdownModule,
    FrontendModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env'] }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}
