import React from "react";
import Link from "next/link";
import Background from "@/components/background";
import LoginForm from "./login-form";
import { Toaster } from "@/components/ui/toaster";
import { Icons } from "@/components/icons";
import { LinkButton } from "@/components/ui/link";

const Login = () => {
  return (
    <div className="container flex h-screen w-screen bg-background flex-col items-center ">
      <Toaster />
      {/* <LinkButton
        variant={"ghost"}
        href="/"
        className={"absolute left-4 top-4 md:left-8 md:top-8"}
      >
        <>
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          Back
        </>
      </LinkButton> */}
      <div className="z-10 mt-[calc(20vh)] h-fit w-full max-w-md overflow-hidden border sm:rounded-2xl sm:shadow-xl">
        <div className="flex flex-col space-y-2 text-center bg-background px-4 py-6 pt-8">
          {/* <Icons.logo className="mx-auto h-6 w-6" /> */}

          <h1 className="text-4xl font-semibold bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-sm text-muted-foreground">
            Welcome back! Please enter your details
          </p>
        </div>
        <div className="grid gap-6 bg-background/60 px-4 py-8 sm:px-16">
          <LoginForm />

          <p className="text-center text-sm text-gray-500">
            Don&apos;t have an account?
            <Link
              href="/onboarding/register"
              className="font-semibold text-muted-foreground transition-colors hover:text-primary"
            >
              Sign up
            </Link>
            .
          </p>
        </div>
      </div>
      <Background />
    </div>
  );
};

export default Login;
