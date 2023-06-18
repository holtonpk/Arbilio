import Background from "@/components/background";
import Link from "next/link";
import RegisterForm from "./register-form";
import { LinkButton } from "@/components/ui/link";

const Register = () => {
  return (
    <div className="container flex h-screen w-screen bg-background flex-col items-center">
      <LinkButton
        href="/login"
        variant="ghost"
        className="absolute right-4 top-4 md:right-8 md:top-8"
      >
        Login
      </LinkButton>
      <div className=" mt-20 md:mt-[calc(20vh)] h-fit w-full max-w-md overflow-hidden border sm:rounded-2xl sm:shadow-xl z-20 blurBack">
        <div className="flex flex-col space-y-2 text-center bg-background px-4 py-6 pt-8">
          <h1 className="text-2xl md:text-4xl font-semibold bg-gradient-to-r to-amber-400 via-orange-500 from-red-500 bg-clip-text text-transparent">
            Let&apos;s Get Started!
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your details below to create your account
          </p>
        </div>

        <div className="grid gap-4 bg-background/60 px-4 py-8 sm:px-16">
          <RegisterForm />

          <p className="px-4 text-center flex items-center flex-col text-[12px] md:text-sm text-muted-foreground whitespace-nowrap">
            By clicking continue, you agree to our
            <div className="flex items-center gap-1">
              <Link
                href="/terms"
                className="font-semibold text-muted-foreground transition-colors hover:text-primary"
              >
                Terms of Service
              </Link>
              &
              <Link
                href="/privacy"
                className="font-semibold text-muted-foreground transition-colors hover:text-primary"
              >
                Privacy Policy
              </Link>
            </div>
          </p>
        </div>
      </div>
      <Background />
    </div>
  );
};

export default Register;
