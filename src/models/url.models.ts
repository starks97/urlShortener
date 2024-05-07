import { z } from "zod";

export const CreateUrlSchema = z.object({
  original_url: z.string().url().optional(),
  short_url: z
    .string({
      description: "short url must be provide, please provide at lease a name",
    })
    .min(5)
    .max(30)
    .optional(),
});

export const UpdateUrlSchema = CreateUrlSchema.pick({
  original_url: true,
  short_url: true,
});

export type UpdateUrlSchemaType = z.infer<typeof UpdateUrlSchema>;

export type CreateUrlSchemaType = z.infer<typeof CreateUrlSchema>;
