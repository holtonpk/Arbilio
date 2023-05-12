import React from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import LoginForm from "./login-form";
import { Toaster } from "@/components/ui/toaster";
import { Icons } from "@/components/icons";

const Login = () => {
  return (
    <div className="container flex h-screen w-screen bg-background flex-col items-center justify-center">
      <Toaster />
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-4 top-4 md:left-8 md:top-8"
        )}
      >
        <>
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          Back
        </>
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] ">
        <div className="flex flex-col space-y-2 text-center">
          {/* <Icons.logo className="mx-auto h-6 w-6" /> */}
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome Back
          </h1>
          <p className="text-sm text-muted-foreground">
            Welcome back! Please enter your details
          </p>
        </div>
        <div className="grid gap-6">
          <LoginForm />

          <p className="px-8 text-center text-sm text-muted-foreground">
            <Link
              href="/onboarding/register"
              className="hover:text-brand underline underline-offset-4"
            >
              Don&apos;t have an account? Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
