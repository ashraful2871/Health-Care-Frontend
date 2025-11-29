"use server";
import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import {
  createAdminZodSchema,
  updateAdminZodSchema,
} from "@/zod/admin.validation";

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function createAdmin(_parseState: any, formData: FormData) {
  const validationPayload = {
    name: formData.get("name"),
    email: formData.get("email"),
    contactNumber: formData.get("contactNumber"),
    password: formData.get("password"),
    profilePhoto: formData.get("file") as File,
  };

  //   console.log(validationPayload);

  const validatedPayload = zodValidator(
    validationPayload,
    createAdminZodSchema
  );

  if (!validatedPayload.success && validatedPayload.errors) {
    return {
      success: false,
      message: "Validation failed",
      formData: validatedPayload,
      errors: validatedPayload.errors,
    };
  }

  if (!validatedPayload.data) {
    return {
      success: false,
      message: "Validation failed",
      formData: validationPayload,
    };
  }

  const backendPayload = {
    password: validatedPayload.data.password,
    admin: {
      name: validatedPayload.data.name,
      email: validatedPayload.data.email,
      contactNumber: validatedPayload.data.contactNumber,
    },
  };
  const newFormData = new FormData();

  newFormData.append("data", JSON.stringify(backendPayload));
  newFormData.append("file", formData.get("file") as Blob);
  console.log(newFormData);
  try {
    const response = await serverFetch.post("/user/create-admin", {
      body: newFormData,
    });

    const result = await response.json();
    return result;
  } catch (error: any) {
    console.error("Create admin error:", error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to create admin",
      formData: validationPayload,
    };
  }
}

export async function getAdmins(queryString?: string) {
  try {
    const response = await serverFetch.get(
      `/admin/${queryString ? `?${queryString}` : ""}`
    );
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.error("Get admins error:", error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to get admins",
    };
  }
}

export async function updateAdmin(
  id: string,
  _parseState: any,
  formData: FormData
) {
  const validationPayload: any = {
    name: formData.get("name"),
    contactNumber: formData.get("contactNumber"),
  };

  const validation = zodValidator(validationPayload, updateAdminZodSchema);
  if (!validation.success && validation.errors) {
    return {
      success: false,
      message: "Validation failed",
      formData: validation,
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
    const response = await serverFetch.patch(`/user/update-admin/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validation.data),
    });
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.error("Update admin error:", error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to update admin",
      formData: validationPayload,
    };
  }
}

export async function softDeleteAdmin(id: string) {
  try {
    const response = await serverFetch.delete(`/admin/soft/${id}`);
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.error("Soft delete admin error:", error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to delete admin",
    };
  }
}
