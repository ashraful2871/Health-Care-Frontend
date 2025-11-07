/* eslint-disable @typescript-eslint/no-explicit-any */

"use server";

import z, { email, success } from "zod";

const loginInvalidZodSchema = z.object({
  email: z.email(),
  password: z
    .string("password Is required")
    .min(6, {
      error: "Password is required and must be at least 6 characters long",
    })
    .max(32, {
      error: "Password must be less than 32 characters long",
    }),
});

export const loginUser = async (_currentState: any, formData: any) => {
  try {
    const loginData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const validatedFields = loginInvalidZodSchema.safeParse(loginData);
    if (!validatedFields.success) {
      return {
        success: false,
        errors: validatedFields.error.issues.map((issue) => {
          return {
            field: issue.path[0],
            message: issue.message,
          };
        }),
      };
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: "POST",
      body: JSON.stringify(loginData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    return res;
  } catch (error) {
    console.log(error);
    return { error: "Login Failed" };
  }
};
