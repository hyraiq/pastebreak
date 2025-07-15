import { Module } from '@nestjs/common';
import { BreakdownModule } from './breakdown/breakdown.module';
import { FrontendModule } from './frontend/frontend.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    BreakdownModule,
    FrontendModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env'] }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
