import { z } from "zod";

export const signupSchema = z.object({
  body: z.object({
    name: z.string().trim().min(2, "Name must be at least 2 characters"),
    email: z.string().trim().email("Email must be valid"),
    password: z.string().min(8, "Password must be at least 8 characters"),
  }),
});

export const signinSchema = z.object({
  body: z.object({
    email: z.string().trim().email("Email must be valid"),
    password: z.string().min(1, "Password is required"),
  }),
});

export type SignupInput = z.infer<typeof signupSchema>["body"];
export type SigninInput = z.infer<typeof signinSchema>["body"];
