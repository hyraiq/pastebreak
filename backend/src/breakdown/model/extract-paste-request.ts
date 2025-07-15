import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const extractPasteRequestSchema = z.object({
  pasteBuffer: z.string().min(1),
});

export class ExtractPasteRequest extends createZodDto(
  extractPasteRequestSchema,
) {}
