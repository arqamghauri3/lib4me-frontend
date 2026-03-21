import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "./field";
import { Input } from "./input";
import { Checkbox } from "./checkbox";
import { Button } from "./button";
import Link from "next/link";

const RegisterForm = () => {
  return (
    <section className="bg-foreground dark:bg-background relative flex min-h-screen items-center justify-center">
      <div className="pointer-events-none absolute inset-0 right-0 hidden overflow-hidden md:block">
        {/* Outer big circle */}
        <div className="absolute top-0 left-1/1 h-650 w-650 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10" />
        {/* Inner circle */}
        <div className="bg-foreground dark:bg-background absolute top-0 left-1/1 h-175 w-175 -translate-x-1/2 -translate-y-1/2 rounded-full" />
      </div>

      <div className="mx-auto w-full max-w-lg px-4 py-10 sm:px-0 md:py-20">
        <Card className="relative max-w-lg gap-6 px-6 py-8 sm:p-12">
          <CardHeader className="gap-6 p-0 text-center">
            <div className="flex flex-col gap-1">
              <CardTitle className="text-card-foreground text-2xl font-medium">
                Welcome to Lib4Me
              </CardTitle>
              <CardDescription className="text-muted-foreground text-sm font-normal">
                Register your account now
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <form>
              <FieldGroup className="gap-6">
                <Field className="grid grid-cols-1">
                  <Button
                    variant="outline"
                    type="button"
                    className="text-medium text-card-foreground dark:bg-background h-9 cursor-pointer gap-2 rounded-lg text-sm shadow-xs"
                  >
                    <img
                      src="https://images.shadcnspace.com/assets/svgs/icon-google.svg"
                      alt="google icon"
                      className="h-4 w-4"
                    />
                    Sign up with Google
                  </Button>
                </Field>
                <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card text-muted-foreground bg-transparent text-sm">
                  <span className="px-4">or sign up with</span>
                </FieldSeparator>

                <div className="flex flex-col gap-4">
                  <Field className="gap-1.5">
                    <FieldLabel
                      htmlFor="name"
                      className="text-muted-foreground text-sm font-normal"
                    >
                      Name*
                    </FieldLabel>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Jack Smith"
                      required
                      className="dark:bg-background h-9 shadow-xs"
                    />
                  </Field>
                  <Field className="gap-1.5">
                    <FieldLabel
                      htmlFor="username"
                      className="text-muted-foreground text-sm font-normal"
                    >
                      Username*
                    </FieldLabel>
                    <Input
                      id="username"
                      type="text"
                      placeholder="jacksmith123"
                      required
                      className="dark:bg-background h-9 shadow-xs"
                    />
                  </Field>
                  <Field className="gap-1.5">
                    <FieldLabel
                      htmlFor="email"
                      className="text-muted-foreground text-sm font-normal"
                    >
                      Email*
                    </FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      placeholder="example@shadcnspace.com"
                      required
                      className="dark:bg-background h-9 shadow-xs"
                    />
                  </Field>
                  <Field className="gap-1.5">
                    <FieldLabel
                      htmlFor="password"
                      className="text-muted-foreground text-sm font-normal"
                    >
                      Password*
                    </FieldLabel>

                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      required
                      className="dark:bg-background h-9 shadow-xs"
                    />
                  </Field>
                </div>
                <Field className="gap-4">
                  <Button
                    type="submit"
                    size={"lg"}
                    className="hover:bg-primary/80 h-10 cursor-pointer rounded-lg"
                  >
                    Sign Up
                  </Button>
                  <FieldDescription className="text-muted-foreground text-center text-sm font-normal">
                    Already have an account?{" "}
                    <Link
                      href="/auth/login"
                      className="text-card-foreground font-medium no-underline!"
                    >
                      Login
                    </Link>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default RegisterForm;
