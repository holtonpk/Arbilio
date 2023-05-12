"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { userAuthSchema } from "@/lib/validations/auth";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { CgSpinner } from "react-icons/cg";
import { FcGoogle } from "react-icons/fc";
import * as z from "zod";
import { useAuth } from "@/context/Auth";
import { PasswordInput } from "@/components/ui/password-input";
import { Icons } from "@/components/icons";
const LoginForm = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isGoogleLoading, setIsGoogleLoading] = React.useState<boolean>(false);

  const { signIn, logInWithGoogle } = useAuth()!;
  type FormData = z.infer<typeof userAuthSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  });

  async function onSubmit(data: FormData) {
    setIsLoading(true);
    const signInResult = await signIn(data.email, data.password);
    setIsLoading(false);
    console.log("ress", signInResult);
    if (signInResult?.success) {
      window.location.href = "/dashboard";
    }
    if (signInResult?.error === "auth/user-not-found") {
      setError("email", {
        type: "manual",
        message: "An account with this email does not exist.",
      });
      toast({
        title: "An account with this email does not exist.",
        description: "Please please check your email and try again.",
        variant: "destructive",
      });
    } else if (signInResult?.error === "auth/wrong-password") {
      setError("password", {
        type: "manual",
        message: "Incorrect password.",
      });
      toast({
        title: "Incorrect password.",
        description: "Please please check your password and try again.",
        variant: "destructive",
      });
    } else if (signInResult?.error === "auth/too-many-requests") {
      toast({
        title: "Too many requests.",
        description: "Please try again later.",
        variant: "destructive",
      });
    } else if (signInResult?.error === "auth/user-disabled") {
      toast({
        title: "User disabled.",
        description: "Please contact support.",
        variant: "destructive",
      });
    }
  }

  async function googleSingIn() {
    setIsGoogleLoading(true);
    const createAccountResult = await logInWithGoogle();
    if (createAccountResult.success) {
      window.location.href = "/dashboard";
    } else if (createAccountResult.error) {
      setIsGoogleLoading(false);
      toast({
        title: "Something went wrong.",
        description: "Please please try again later.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <Input
            id="email"
            placeholder="name@example.com"
            type="email"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            disabled={isLoading || isGoogleLoading}
            {...register("email")}
          />
          {errors?.email && (
            <p className="px-1 text-xs text-red-600">{errors.email.message}</p>
          )}
          <PasswordInput
            id="password"
            placeholder="password"
            type="password"
            autoCapitalize="none"
            disabled={isLoading || isGoogleLoading}
            {...register("password")}
          />
          {errors?.password && (
            <p className="px-1 text-xs text-red-600">
              {errors.password.message}
            </p>
          )}
          <Button className="w-full" disabled={isLoading || isGoogleLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <Button
        onClick={googleSingIn}
        type="button"
        className="w-full"
        variant="outline"
      >
        {isGoogleLoading ? (
          <CgSpinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <FcGoogle className=" h-6 w-6 mr-2" />
        )}
        Signing in with Google
      </Button>
    </div>
  );
};

export default LoginForm;
