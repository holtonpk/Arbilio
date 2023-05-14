import RegisterForm from "./register-form";
import { LinkButton } from "@/components/ui/link";

const Register = () => {
  return (
    <div className="container grid h-screen w-screen bg-background flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <LinkButton
        href="/login"
        variant="ghost"
        className="absolute right-4 top-4 md:right-8 md:top-8"
      >
        Login
      </LinkButton>
      <div className="hidden h-full bg-muted lg:block" />
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] ">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Get Started</h1>
          <p className="text-sm text-muted-foreground">
            Enter your details below to create your account
          </p>
        </div>

        <div className="grid gap-6">
          <RegisterForm />

          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <LinkButton
              href="/terms"
              variant="link"
              className="hover:text-brand underline underline-offset-4"
            >
              Terms of Service
            </LinkButton>
            and
            <LinkButton
              variant="link"
              href="/privacy"
              className="hover:text-brand underline underline-offset-4"
            >
              Privacy Policy
            </LinkButton>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
