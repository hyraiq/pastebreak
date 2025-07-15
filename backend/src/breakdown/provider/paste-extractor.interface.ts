import { ExtractPasteResponse } from '../model/extract-paste-response';
import { ExtractPasteRequest } from '../model/extract-paste-request';

export interface PasteExtractorInterface {
  extractPaste(request: ExtractPasteRequest): Promise<ExtractPasteResponse>;
}

export const PasteExtractorInterface = Symbol.for('PasteExtractorInterface');
