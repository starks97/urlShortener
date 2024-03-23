import { z } from "zod";

const CreateUrlSchema = z.object({
  url: z.string().url().optional().or(z.literal("")),
  short_url: z
    .string({
      description: "short url must be provide, please provide at lease a name",
    })
    .min(5)
    .max(10),
});

export type CreateUrlSchemaType = z.infer<typeof CreateUrlSchema>;
