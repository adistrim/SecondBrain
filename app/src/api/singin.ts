import axios from "axios";
import { API_URL } from "../config";

export interface SigninCredentials {
  email: string;
  password: string;
}

export interface SigninResponse {
  token?: string;
  message?: string;
  error?: string;
}

export async function signinApi(
  credentials: SigninCredentials,
): Promise<SigninResponse> {
  try {
    const response = await axios.post(`${API_URL}/auth/signin`, credentials, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      switch (error.response.status) {
        case 400:
          return { error: error.response.data?.message || "Bad Request" };
        case 401:
          return {
            error: error.response.data?.message || "Invalid Credentails",
          };
        case 404:
          return { error: error.response.data?.message || "User Not Found" };
      }
    }

    throw Error;
  }
}
