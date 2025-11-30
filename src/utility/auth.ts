export const checkAuth = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error("Failed to check authentication status");
    }
    return {
      isAuthenticated: true,
      user: data.data,
    };
  } catch (error) {
    console.error(error);

    return {
      isAuthenticated: false,
      user: null,
    };
  }
};
