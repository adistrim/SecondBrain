import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, BrainCircuit } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Link } from "@tanstack/react-router";
import { useSigninMutation } from "@/lib/mutations";

export default function SigninPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate, status } = useSigninMutation();
  
  const isLoading = status === "pending";

  const handleSignIn = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const credentials = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    mutate(credentials);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-4">
      <div className="mb-8 flex items-center space-x-2">
        <BrainCircuit className="h-10 w-10 text-primary" />
        <h1 className="text-3xl font-bold text-primary">SecondBrain</h1>
      </div>

      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSignIn} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="name@example.com"
                required
                className="focus-visible:ring-primary"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                  className="pr-10 focus-visible:ring-primary"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-1 text-muted-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </Button>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </CardContent>

        <Separator />

        <CardFooter className="flex flex-col p-6">
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Don't have an account?
            <Link to="/signup" className="ml-1 p-0 text-primary">
              Create account
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
