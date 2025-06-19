import { useNavigate } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { signinApi, type SigninCredentials, type SigninResponse } from "@/api/singin";
import { toast } from "sonner";
import { signupApi, type SignupRequest, type SignupResponse } from "@/api/signup";

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
      if (response) {
        toast.success("Signup successful, please signin.");
        navigate({ to: "/signin" });
      } else {
        toast.error("Something went wrong, please try again.");
      }
    },
    onError() {
      toast.error("Something went wrong, please try again.");
    },
  })
}
