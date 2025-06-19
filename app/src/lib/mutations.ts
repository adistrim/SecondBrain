import { useNavigate } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { signinApi, type SigninCredentials, type SigninResponse } from "@/api/singin";
import { toast } from "sonner";
import { signupApi, type SignupRequest, type SignupResponse } from "@/api/signup";
import { setTimeout } from "timers";

export function useSigninMutation() {
  const navigate = useNavigate();

  return useMutation<SigninResponse, Error, SigninCredentials, unknown>({
    mutationFn: (credentials: SigninCredentials) => signinApi(credentials),
    onSuccess(response) {
      if (response.token) {
        localStorage.setItem("session", "Bearer " + response.token);
        navigate({ to: "/" });
      } else if (response.error) {
        toast.error(response.error);
      }
    },
    onError() {
      toast.error("Something went wrong, please try again.");
    },
  });
}

export function useSignupMutation() {
  const navigate = useNavigate();
  
  return useMutation<SignupResponse, Error, SignupRequest, unknown>({
    mutationFn: (requestBody: SignupRequest) => signupApi(requestBody),
    onSuccess(response) {
      if (response.status === 201) {
        toast.success(response.message || "Signup successful");
        setTimeout(() => {
          navigate({ to: "/signin" });
        }, 1000);
      } else if (response.error) {
        toast.error(response.error);
      }
    },
    onError() {
      toast.error("Something went wrong, please try again.");
    },
  })
}