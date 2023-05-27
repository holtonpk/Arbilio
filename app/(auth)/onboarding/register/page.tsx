import Background from "@/components/background";
import RegisterForm from "./register-form";
import { LinkButton } from "@/components/ui/link";

const Register = () => {
  return (
    <div className="container flex h-screen w-screen bg-background flex-col items-center justify-center">
      <LinkButton
        href="/login"
        variant="ghost"
        className="absolute right-4 top-4 md:right-8 md:top-8"
      >
        Login
      </LinkButton>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] ">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-4xl font-semibold bg-gradient-to-r to-amber-400 via-orange-500 from-red-500 bg-clip-text text-transparent">
            Let&apos;s Get Started
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your details below to create your account
          </p>
        </div>

        <div className="grid gap-6">
          <RegisterForm />

          <p className="px-8 text-center flex items-center flex-col text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <div className="flex items-center">
              <LinkButton
                href="/terms"
                variant="link"
                className="hover:text-brand underline underline-offset-4 px-1 whitespace-nowrap"
              >
                Terms of Service
              </LinkButton>
              &
              <LinkButton
                variant="link"
                href="/privacy"
                className="hover:text-brand underline underline-offset-4 px-1 whitespace-nowrap"
              >
                Privacy Policy
              </LinkButton>
            </div>
          </p>
        </div>
      </div>
      <Background />
    </div>
  );
};

export default Register;
