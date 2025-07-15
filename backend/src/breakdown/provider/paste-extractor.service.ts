import { Injectable, Logger } from '@nestjs/common';
import { ExtractPasteResponse } from '../model/extract-paste-response';
import { ExtractPasteRequest } from '../model/extract-paste-request';
import { ConfigService } from '@nestjs/config';
import { ExtractPasteRunnable } from '../runnable/extract-paste.runnable';

const dummyResponse: ExtractPasteResponse = {
  categories: [
    {
      name: 'Category 1',
      lineItems: ['Item 1', 'Item 2'],
    },
    {
      name: 'Category 2',
      lineItems: ['Item 3', 'Item 4'],
    },
  ],
};

@Injectable()
export class PasteExtractorService {
  private readonly useOpenAI: boolean;
  private readonly logger = new Logger(PasteExtractorService.name);

  constructor(configService: ConfigService) {
    const openaiApiKey = configService.get<string>('OPENAI_API_KEY');

    this.useOpenAI = openaiApiKey !== undefined;

    if (this.useOpenAI) {
      this.logger.debug(`Using OpenAI`);
    } else {
      this.logger.debug(`OPENAI_API_KEY not set, using dummy data instead.`);
    }
  }

  public async extractPaste(
    request: ExtractPasteRequest,
  ): Promise<ExtractPasteResponse> {
    if (!this.useOpenAI) {
      return dummyResponse;
    }

    return ExtractPasteRunnable.invoke(request);
  }
}
