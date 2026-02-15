import { z } from 'zod';

export const blogFrontmatterSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1).max(160),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  updatedAt: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
  author: z.object({
    name: z.string(),
    avatar: z.string().optional(),
  }),
  tags: z.array(z.string()).min(1),
  category: z.string(),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  coverImage: z.string().optional(),
  published: z.boolean().default(true),
});

export type BlogFrontmatter = z.infer<typeof blogFrontmatterSchema>;
