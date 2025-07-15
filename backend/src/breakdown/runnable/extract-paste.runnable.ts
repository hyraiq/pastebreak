import {
  ExtractPasteResponse,
  extractPasteResponseSchema,
} from '../model/extract-paste-response';
import { ChatOpenAI } from '@langchain/openai';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { Runnable } from '@langchain/core/runnables';
import { ExtractPasteRequest } from '../model/extract-paste-request';

const model = new ChatOpenAI({
  model: 'gpt-4.1-nano',
  temperature: 0.0,
}).withStructuredOutput(extractPasteResponseSchema, { strict: true });

const prompts = ChatPromptTemplate.fromMessages([
  [
    'system',
    "You are an assistant tasked with extracting a standardised breakdown (categories & line items) from the user's paste buffer.",
  ],
  ['human', '{pasteBuffer}'],
]);

export const ExtractPasteRunnable: Runnable<
  ExtractPasteRequest,
  ExtractPasteResponse
> = prompts.pipe(model);
