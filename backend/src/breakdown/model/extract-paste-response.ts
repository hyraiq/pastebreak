import { z } from 'zod';

export const extractPasteResponseSchema = z.object({
  categories: z.array(
    z.object({
      name: z.string(),
      lineItems: z.array(z.string()),
    }),
  ),
});

export type ExtractPasteResponse = z.infer<typeof extractPasteResponseSchema>;
