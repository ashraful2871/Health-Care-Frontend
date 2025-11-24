"use server";
import { serverFetch } from "@/lib/server-fetch";
import { revalidateTag } from "next/cache";

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function updateMyProfile(formData: FormData) {
  try {
    const uploadForFData = new FormData();
    const data: any = {};
    formData.forEach((value, key) => {
      if (key !== "file" && value) {
        data[key] = value;
      }
    });

    uploadForFData.append("data", JSON.stringify(data));
    const file = formData.get("file") as File;
    if (file && file instanceof File && file.size > 0) {
      uploadForFData.append("file", file);
    }

    const response = await serverFetch.patch("/user/update-my-profile", {
      body: uploadForFData,
    });

    const result = await response.json();

    revalidateTag("user-info", { expire: 0 });

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
