import { Injectable } from '@nestjs/common';
import { ExtractPasteResponse } from '../model/extract-paste-response';
import { ExtractPasteRequest } from '../model/extract-paste-request';

@Injectable()
export class PasteExtractorService {
  public async extractPaste(
    request: ExtractPasteRequest,
  ): Promise<ExtractPasteResponse> {
    return {
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
  }
}
