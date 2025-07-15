import * as request from 'supertest';
import { Agent } from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { PasteController } from './paste.controller';
import { BreakdownModule } from '../breakdown.module';
import { PasteExtractorInterface } from '../provider/paste-extractor.interface';
import { StubPasteExtractor } from '../test/stub-paste-extractor';
import { ExtractPasteResponse } from '../model/extract-paste-response';
import { INestApplication } from '@nestjs/common';

describe('PasteController e2e tests', () => {
  let pasteExtractor: StubPasteExtractor;
  let client: Agent;
  const url = '/api/paste/extract';

  beforeEach(async () => {
    // Test the entire module
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [BreakdownModule],
    })
      .overrideProvider(PasteExtractorInterface)
      .useClass(StubPasteExtractor)
      .compile();

    const app = moduleFixture.createNestApplication();
    await app.init();
    client = request(app.getHttpServer());

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

      const response = await client
        .post(url)
        .send({
          pasteBuffer: 'Hello World!',
        })
        .expect(200);

      const responseJson = response.body;
      expect(responseJson).toMatchObject(dummyExtraction);

      expect(pasteExtractor.calls).toEqual([
        {
          pasteBuffer: 'Hello World!',
        },
      ]);
    });
  });

  it('should return error if extractor throws', async () => {
    pasteExtractor.setResponse(new Error('Some random LLM error'));

    await client
      .post(url)
      .send({
        pasteBuffer: 'Hello World!',
      })
      .expect(500);

    expect(pasteExtractor.calls).toEqual([
      {
        pasteBuffer: 'Hello World!',
      },
    ]);
  });
});
