import { z } from "zod";

export const CreateUrlSchema = z.object({
  original_url: z.string().url(),
  short_url: z
    .string({
      description: "short url must be provide, please provide at lease a name",
    })
    .min(5)
    .max(30),
});

export type CreateUrlSchemaType = z.infer<typeof CreateUrlSchema>;
