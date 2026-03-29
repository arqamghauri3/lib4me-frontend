"use client";

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
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

const schema = z.object({
  username: z.string().min(3, "Invalid  username"),
  password: z.string().min(1, "Password is required"),
});

type loginType = z.infer<typeof schema>;

const loginUser = async (data: loginType) => {
  const res = await axios.post("/api/auth/login", data);
  return res.data;
};

const LoginForm = () => {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log("Login successful:", data);
      // In the future, you might want to set a cookie or global state here
      router.push("/dashboard");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginType>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<loginType> = (data) => {
    mutation.mutate(data);
  };

  return (
    <section className="bg-foreground dark:bg-background relative flex min-h-screen items-center justify-center w-full">
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
                Login to your account now
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <form onSubmit={handleSubmit(onSubmit)}>
              <FieldGroup className="gap-6">
                <Field className="grid gap-3 md:grid-cols-2 md:gap-6">
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
                    Sign in with Google
                  </Button>
                  <Button
                    variant="outline"
                    type="button"
                    className="text-medium text-card-foreground dark:bg-background h-9 cursor-pointer gap-2 rounded-lg text-sm shadow-xs"
                  >
                    <img
                      src="https://images.shadcnspace.com/assets/svgs/icon-github.svg"
                      alt="github icon"
                      className="h-4 w-4 dark:hidden"
                    />
                    <img
                      src="https://images.shadcnspace.com/assets/svgs/icon-github-white.svg"
                      alt="github icon"
                      className="hidden h-4 w-4 dark:block"
                    />
                    Sign in with Github
                  </Button>
                </Field>
                <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card text-muted-foreground bg-transparent text-sm">
                  <span className="px-4">or sign in with</span>
                </FieldSeparator>

                <div className="flex flex-col gap-4">
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
                      placeholder="jack123"
                      required
                      {...register("username")}
                      className="dark:bg-background h-9 shadow-xs"
                    />
                    {errors.username && (
                      <p className="text-xs text-red-400">{errors.username.message}</p>
                    )}
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
                      {...register("password")}
                      className="dark:bg-background h-9 shadow-xs"
                    />
                    {errors.password && (
                      <p className="text-xs text-red-400">{errors.password.message}</p>
                    )}
                  </Field>
                </div>

                <Field orientation="horizontal" className="justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="terms"
                      defaultChecked
                      className="cursor-pointer"
                    />
                    <FieldLabel
                      htmlFor="terms"
                      className="text-primary cursor-pointer text-sm font-normal"
                    >
                      Remember this device
                    </FieldLabel>
                  </div>
                  <a
                    href="#"
                    className="text-card-foreground text-end text-sm font-medium"
                  >
                    Forgot password?
                  </a>
                </Field>

                <Field className="gap-4">
                  {mutation.isError && (
                    <p className="text-sm font-medium text-red-400 text-center">
                      {(mutation.error as any).response?.data?.error || "Login failed. Please check your credentials."}
                    </p>
                  )}
                  <Button
                    type="submit"
                    size={"lg"}
                    disabled={mutation.isPending}
                    className="hover:bg-primary/80 h-10 cursor-pointer rounded-lg"
                  >
                    {mutation.isPending ? "Logging in..." : "Sign in"}
                  </Button>
                  <FieldDescription className="text-muted-foreground text-center text-sm font-normal">
                    Don&apos;t have an account?{" "}
                    <Link
                      href="/auth/register"
                      className="text-card-foreground font-medium no-underline!"
                    >
                      Create an account
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

export default LoginForm;
