import { z } from "zod";

export const repositorySchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  stargazers_count: z.number(),
  updated_at: z.string(),
  html_url: z.string().url(),
});

export type Repository = z.infer<typeof repositorySchema>;
