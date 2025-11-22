import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { IDoctor } from "@/types/doctor.interface";
import {
  createDoctorZodSchema,
  updateDoctorZodSchema,
} from "@/zod/doctor.validation";

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function createDoctor(prevState: any, formData: FormData) {
  try {
    const payload: IDoctor = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      contactNumber: formData.get("contactNumber") as string,
      address: formData.get("address") as string,
      registrationNumber: formData.get("registrationNumber") as string,
      experience: Number(formData.get("experience")),
      gender: formData.get("gender") as "MALE" | "FEMALE",
      appointmentFee: Number(formData.get("appointmentFee")),
      qualification: formData.get("qualification") as string,
      currentWorkingPlace: formData.get("currentWorkingPlace") as string,
      designation: formData.get("designation") as string,
      password: formData.get("password") as string,
    };

    if (zodValidator(payload, createDoctorZodSchema).success === false) {
      return zodValidator(payload, createDoctorZodSchema);
    }

    const validatorPayload = zodValidator(payload, createDoctorZodSchema).data;

    if (!validatorPayload) {
      throw new Error("invalid payload");
    }

    const newPayload = {
      password: validatorPayload.password,
      doctor: {
        name: validatorPayload.name,
        email: validatorPayload.email,
        contactNumber: validatorPayload.contactNumber,
        address: validatorPayload.address,
        registrationNumber: validatorPayload.registrationNumber,
        experience: validatorPayload.experience,
        gender: validatorPayload.gender,
        appointmentFee: validatorPayload.appointmentFee,
        qualification: validatorPayload.qualification,
        currentWorkingPlace: validatorPayload.currentWorkingPlace,
        designation: validatorPayload.designation,
      },
    };
    const newFormData = new FormData();
    newFormData.append("data", JSON.stringify(newPayload));
    if (formData.get("file")) {
      newFormData.append("file", formData.get("file") as Blob);
      const response = await serverFetch.post("/users/create-doctor", {
        body: newFormData,
      });
      const result = await response.json();
      return result;
    }
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

export async function getDoctors(queryString?: string) {
  try {
    const response = await serverFetch.get(
      `/doctors${queryString ? `?${queryString}` : ""}`
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

export async function getDoctorById(id: string) {
  try {
    const response = await serverFetch.get(`/doctors/${id}`);
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

export async function updateDoctor(
  id: string,
  _prevState: any,
  formData: FormData
) {
  try {
    const payload: Partial<IDoctor> = {
      name: formData.get("name") as string,
      contactNumber: formData.get("contactNumber") as string,
      registrationNumber: formData.get("registrationNumber") as string,
      experience: Number(formData.get("experience")),
      gender: formData.get("gender") as "MALE" | "FEMALE",
      appointmentFee: Number(formData.get("appointmentFee")),
      qualification: formData.get("qualification") as string,
      currentWorkingPlace: formData.get("currentWorkingPlace") as string,
      designation: formData.get("designation") as string,
    };
    const validatePayload = zodValidator(payload, updateDoctorZodSchema).data;
    if (!validatePayload) {
      throw new Error("invalid payload");
    }
    const response = await serverFetch.patch(`/doctors/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatePayload),
    });
    const result = await response.json();
    return result;
  } catch (error: any) {
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

export async function deleteDoctor(id: string) {
  try {
    const response = await serverFetch.delete(`/doctors/${id}`);
    const result = await response.json();
    return result;
  } catch (error: any) {
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

export async function softDelete(id: string) {
  try {
    const response = await serverFetch.delete(`/doctors/soft/${id}`);
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
