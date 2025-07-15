import { Module } from '@nestjs/common';
import { PasteController } from './controller/paste.controller';
import { PasteExtractorService } from './provider/paste-extractor.service';
import { PasteExtractorInterface } from './provider/paste-extractor.interface';

@Module({
  imports: [],
  controllers: [PasteController],
  providers: [
    {
      provide: PasteExtractorInterface,
      useClass: PasteExtractorService,
    },
  ],
})
export class BreakdownModule {}
