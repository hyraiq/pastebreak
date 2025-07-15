import { configDotenv } from 'dotenv';
import { z } from 'zod';
import { evaluate } from 'langsmith/evaluation';
import { ExtractPasteRunnable } from '../extract-paste.runnable';

configDotenv();

const datasetId = process.env.LANGSMITH_DATASET_ID;
if (!datasetId) {
  throw new Error('LANGSMITH_DATASET_ID is not defined');
}

const exampleInputSchema = z.object({
  pasteBuffer: z.string().min(1),
});

type ExampleInput = z.infer<typeof exampleInputSchema>;

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async () => {
  await evaluate(
    (input: ExampleInput) => {
      return ExtractPasteRunnable.invoke(input);
    },
    {
      data: datasetId,
      evaluators: [],
      metadata: {},
    },
  );
})();
