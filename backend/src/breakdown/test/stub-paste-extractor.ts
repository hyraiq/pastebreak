import { ExtractPasteResponse } from '../model/extract-paste-response';
import { PasteExtractorInterface } from '../provider/paste-extractor.interface';
import { ExtractPasteRequest } from '../model/extract-paste-request';

export class StubPasteExtractor implements PasteExtractorInterface {
  private response: ExtractPasteResponse | Error | undefined;
  public readonly calls: ExtractPasteRequest[] = [];

  public setResponse(response: ExtractPasteResponse | Error) {
    this.response = response;

    return this;
  }

  async extractPaste(
    request: ExtractPasteRequest,
  ): Promise<ExtractPasteResponse> {
    this.calls.push(request);

    if (this.response instanceof Error) {
      throw this.response;
    }

    if (this.response === undefined) {
      throw new Error('No response set yet in StubPasteExtractor');
    }

    return this.response;
  }
}
