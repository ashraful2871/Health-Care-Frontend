import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { createScheduleZodSchema } from "@/zod/schedule.validation";

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function createSchedule(_prevState: any, formData: FormData) {
  const validationPayload = {
    startDate: formData.get("startDate") as string,
    endDate: formData.get("endDate") as string,
    startTime: formData.get("startTime") as string,
    endTime: formData.get("endTime") as string,
  };

  const validation = zodValidator(validationPayload, createScheduleZodSchema);

  if (!validation.success && validation.errors) {
    return {
      success: false,
      message: "Validation failed",
      formData: validationPayload,
      errors: validation.errors,
    };
  }

  if (!validation.data) {
    return {
      success: false,
      message: "Validation failed",
      formData: validationPayload,
    };
  }

  try {
    const response = await serverFetch.post("/schedule", {
      headers: {
        "content-type": "application/json",
        body: JSON.stringify(validation.data),
      },
    });

    const result = await response.json();
    return result;
  } catch (error: any) {
    console.error("Create schedule error:", error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to create schedule",
      formData: validationPayload,
    };
  }
}

export async function getSchedules(queryString?: string) {
  try {
    const response = await serverFetch.get(
      `/schedule${queryString ? `?${queryString}` : ""}`
    );
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

export async function getScheduleById(id: string) {
  try {
    const response = await serverFetch.get(`/schedule/${id}`);
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

export async function deleteSchedule(id: string) {
  try {
    const response = await serverFetch.delete(`/schedule/${id}`);
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
