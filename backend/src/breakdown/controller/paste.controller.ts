import { Body, Controller, HttpCode, Inject, Post } from '@nestjs/common';
import { PasteExtractorService } from '../provider/paste-extractor.service';
import { ExtractPasteRequest } from '../model/extract-paste-request';
import { ExtractPasteResponse } from '../model/extract-paste-response';
import { PasteExtractorInterface } from '../provider/paste-extractor.interface';

@Controller('/api/paste')
export class PasteController {
  constructor(
    @Inject(PasteExtractorInterface)
    private readonly pasteExtractorService: PasteExtractorService,
  ) {}

  @Post('extract')
  @HttpCode(200)
  extractPaste(
    @Body() extractPasteRequest: ExtractPasteRequest,
  ): Promise<ExtractPasteResponse> {
    return this.pasteExtractorService.extractPaste(extractPasteRequest);
  }
}
