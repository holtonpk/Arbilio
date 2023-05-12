"use client";
import React, { EventHandler, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { validateEmail } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserSchema } from "@/lib/validations/auth";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import * as z from "zod";
import { useAuth } from "@/context/Auth";
import { PasswordInput } from "@/components/ui/password-input";
import { Icons } from "@/components/icons";

const RegisterForm = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isGoogleLoading, setIsGoogleLoading] = React.useState<boolean>(false);
  const { createAccount, logInWithGoogle } = useAuth()!;
  type FormData = z.infer<typeof createUserSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(createUserSchema),
  });

  async function onSubmit(data: FormData) {
    setIsLoading(true);
    const createAccountResult = await createAccount(
      data.email,
      data.firstName,
      data.password
    );
    if (createAccountResult?.success) {
      return;
    }
    if (createAccountResult?.error === "auth/email-already-in-use") {
      setError("email", {
        type: "manual",
        message: "An account with this email already exists.",
      });
      toast({
        title: "An account with this email already exists.",
        description: "Please please check your email and try again.",
        variant: "destructive",
      });
    } else if (createAccountResult?.error === "auth/invalid-email") {
      setError("email", {
        type: "manual",
        message: "Please enter a valid email.",
      });
      toast({
        title: "Please enter a valid email.",
        description: "Please please check your email and try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Something went wrong.",
        description: "Please please try again later.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  }

  function handleLoginError(error: any): void {
    console.log("error", error.message);
    toast({
      title: "Something went wrong.",
      description: `Please try again later. Error: ${error.message || error}`,
      variant: "destructive",
    });
  }

  async function googleSingIn(): Promise<void> {
    try {
      setIsGoogleLoading(true);
      const createAccountResult = await logInWithGoogle();

      if (createAccountResult.error) {
        handleLoginError(createAccountResult.error);
      }
    } catch (error: any) {
      handleLoginError(error);
    } finally {
      setIsGoogleLoading(false);
    }
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-2 grid-cols-2">
            <div>
              <Input
                id="firstName"
                placeholder="First name"
                type="text"
                autoComplete="first name"
                autoCorrect="off"
                disabled={isLoading || isGoogleLoading}
                {...register("firstName")}
              />
              {errors?.firstName && (
                <p className="px-1 text-xs text-red-600">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div>
              <Input
                id="lastName"
                placeholder="Last name"
                type="text"
                autoComplete="last name"
                autoCorrect="off"
                disabled={isLoading || isGoogleLoading}
                {...register("lastName")}
              />
              {errors?.lastName && (
                <p className="px-1 text-xs text-red-600">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>
          <Input
            id="email"
            placeholder="Email"
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
            id="Password"
            placeholder="Password"
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
            Create account
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
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className=" h-6 w-6 mr-2" />
        )}
        Sign up with Google
      </Button>
    </div>
  );
};

export default RegisterForm;
