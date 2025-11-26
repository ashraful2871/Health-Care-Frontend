import { getNewAccessToken } from "@/service/auth/auth.service";
import { getCookie } from "@/service/auth/cookiesHandler";

const BACKEND_API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

const serverFetchHelper = async (
  endPoint: string,
  options: RequestInit
): Promise<Response> => {
  const { headers, ...restOptions } = options;
  const accessToken = await getCookie("accessToken");
  // console.log({ accessToken });

  if (endPoint !== "/auth/refresh-token") {
    await getNewAccessToken();
  }

  const response = await fetch(`${BACKEND_API_URL}${endPoint}`, {
    headers: {
      Cookie: accessToken ? `accessToken=${accessToken}` : "",
      ...headers,
      // ...(accessToken ? { "Authorization": `Bearer ${accessToken}` } : {}),
      // ...(accessToken ? { "Authorization": accessToken } : {}),
    },
    ...restOptions,
    credentials: "include", // Include cookies in the request
  });
  return response;
};

export const serverFetch = {
  get: async (endPoint: string, options: RequestInit = {}): Promise<Response> =>
    serverFetchHelper(endPoint, { ...options, method: "GET" }),
  post: async (
    endPoint: string,
    options: RequestInit = {}
  ): Promise<Response> =>
    serverFetchHelper(endPoint, { ...options, method: "POST" }),
  put: async (endPoint: string, options: RequestInit = {}): Promise<Response> =>
    serverFetchHelper(endPoint, { ...options, method: "PUT" }),
  patch: async (
    endPoint: string,
    options: RequestInit = {}
  ): Promise<Response> =>
    serverFetchHelper(endPoint, { ...options, method: "PATCH" }),
  delete: async (
    endPoint: string,
    options: RequestInit = {}
  ): Promise<Response> =>
    serverFetchHelper(endPoint, { ...options, method: "DELETE" }),
};
