import { z } from "zod";

/*^(?!.* )(?=.*\d)(?=.*[A-Z]).{8,15}$
How it works:

.{8,15} means: 8 to 15 characters

(?!.* ) means: does not contain " "
(?=.*\d) means: contains at least one digit.
(?=.*[A-Z]) means: contains at least one capital letter^(?!.* )(?=.*\d)(?=.*[A-Z]).{8,15}$
How it works:

.{8,15} means: 8 to 15 characters

(?!.* ) means: does not contain " "
(?=.*\d) means: contains at least one digit.
(?=.*[A-Z]) means: contains at least one capital letter */

const passwordValidation = new RegExp("^.*?[@$!%*?&].*$");

export const RegisterUserSchema = z.object({
  name: z
    .string({ description: "name must be provide, please provide a name" })
    .min(3),
  email: z
    .string({ description: "email must be provide, please provide a email" })
    .email(),
  password: z
    .string({
      description: "password must be provide, please provide a password",
    })
    .regex(passwordValidation, {
      message: "password must contain at least one special character",
    })
    .regex(/(?!.* )(?=.*\d)/, {
      message: "password must contain at least one digit, and no spaces",
    }),
});

export const LoginUserSchema = z.object({
  email: z
    .string({ description: "email must be provide, please provide a email" })
    .email(),
  password: z.string({
    description: "password must be provide, please provide a password",
  }),
});

export type LoginUserSchemaType = z.infer<typeof LoginUserSchema>;
export type RegisterUserSchemaType = z.infer<typeof RegisterUserSchema>;
