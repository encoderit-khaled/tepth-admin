import { z } from "zod";

export const SearchSchema = z.object({
  search: z.string().optional(),
  page: z.number().optional().default(1),
  per_page: z.number().optional().default(10),
});

export type TSearchSchema = z.infer<typeof SearchSchema>;
