import { z } from 'zod';

export const docsFrontmatterSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  order: z.number().optional(),
  published: z.boolean().default(true),
});

export type DocsFrontmatter = z.infer<typeof docsFrontmatterSchema>;
