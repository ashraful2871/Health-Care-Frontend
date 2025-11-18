/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import z from "zod";

export const createSpecialityZodSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
});

export async function createSpeciality(
  _previousState: any,
  formData: FormData
) {
  try {
    const payload = {
      title: formData.get("title") as string,
    };

    if (zodValidator(payload, createSpecialityZodSchema).success === false) {
      return zodValidator(payload, createSpecialityZodSchema);
    }

    const validatedPayload = zodValidator(
      payload,
      createSpecialityZodSchema
    ).data;

    const newFormData = new FormData();
    newFormData.append("data", JSON.stringify(validatedPayload));

    if (formData.get("title")) {
      newFormData.append("title", formData.get("title") as string);
    }

    const response = await serverFetch.post("/specialties", {
      body: newFormData,
    });

    const result = await response.json();
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong"
      }`,
    };
  }
}

export async function getSpeciality() {
  try {
    const response = await serverFetch.get("/specialties");
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong"
      }`,
    };
  }
}
export async function deleteSpeciality(id: string) {
  try {
    const response = await serverFetch.delete(`/specialties/${id}`);
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong"
      }`,
    };
  }
}
