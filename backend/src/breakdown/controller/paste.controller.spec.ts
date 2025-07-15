import { Test, TestingModule } from '@nestjs/testing';
import { PasteController } from './paste.controller';
import { BreakdownModule } from '../breakdown.module';
import { PasteExtractorInterface } from '../provider/paste-extractor.interface';
import { StubPasteExtractor } from '../test/stub-paste-extractor';
import { ExtractPasteResponse } from '../model/extract-paste-response';

describe('PasteController', () => {
  let appController: PasteController;
  let pasteExtractor: StubPasteExtractor;

  beforeEach(async () => {
    // Test the entire module
    const app: TestingModule = await Test.createTestingModule({
      imports: [BreakdownModule],
    })
      .overrideProvider(PasteExtractorInterface)
      .useClass(StubPasteExtractor)
      .compile();

    appController = app.get<PasteController>(PasteController);
    pasteExtractor = app.get<StubPasteExtractor>(PasteExtractorInterface);
  });

  describe('extract paste controller method', () => {
    it('should use the extractor to return categories & line items', async () => {
      const dummyExtraction: ExtractPasteResponse = {
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

      pasteExtractor.setResponse(dummyExtraction);

      const response = await appController.extractPaste({
        pasteBuffer: 'Hello World!',
      });

      expect(response).toBe(dummyExtraction);
      expect(pasteExtractor.calls).toEqual([
        {
          pasteBuffer: 'Hello World!',
        },
      ]);
    });
  });

  it('should return error if extractor throws', async () => {
    pasteExtractor.setResponse(new Error('Some random LLM error'));
    await expect(
      appController.extractPaste({
        pasteBuffer: 'Hello World!',
      }),
    ).rejects.toThrow('Some random LLM error');
    expect(pasteExtractor.calls).toEqual([
      {
        pasteBuffer: 'Hello World!',
      },
    ]);
  });
});
