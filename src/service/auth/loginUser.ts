/* eslint-disable @typescript-eslint/no-explicit-any */
export const loginUser = async (_currentState: any, formData: any) => {
  try {
    const loginData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
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
