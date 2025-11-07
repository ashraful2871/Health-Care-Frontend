"use server";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const registerPatient = async (
  _currentState: any,
  formData: any
): Promise<any> => {
  try {
    const registerData = {
      password: formData.get("password"),
      patient: {
        name: formData.get("name"),
        address: formData.get("address"),
        email: formData.get("email"),
      },
    };

    const newFormData = new FormData();
    newFormData.append("data", JSON.stringify(registerData));

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/create-patient`,
      {
        method: "POST",
        body: newFormData,
      }
    ).then((res) => res.json());

    console.log(res, "res");

    return res;
  } catch (error) {
    console.log(error);
    return { error: "Registration Failed" };
  }
};
