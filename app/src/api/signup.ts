import axios from "axios";
import { API_URL } from "../config";

export interface SignupRequest {
  email: string;
  password: string;
}

export interface SignupResponse {
  message?: string;
  error?: string;
}

export async function signupApi(
  requestBody: SignupRequest,
): Promise<SignupResponse> {
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, requestBody, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      switch (error.response.status) {
        case 409:
          return { error: "Account already exists, please signin." };
        case 400:
          return { error: "Something went wrong, please try again." };
      }
    }

    throw Error;
  }
}
