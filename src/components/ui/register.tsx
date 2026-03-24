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
  name: z.string().min(3, "Name must be at least 3 characters"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const createUser = async (data: registerType) => {
  const res = await axios.post("/api/auth/register", data);
  return res.data;
};

type registerType = z.infer<typeof schema>;

const RegisterForm = () => {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      router.push("/auth/login");
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<registerType>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<registerType> = (data) => {
    mutation.mutate(data);
  };
  return (
    <section className="bg-background dark:bg-foreground relative flex min-h-screen items-center justify-center">
      <div className="pointer-events-none absolute inset-0 right-0 hidden overflow-hidden md:block">
        {/* Outer big circle */}
        <div className="absolute top-0 left-1/1 h-650 w-650 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10" />
        {/* Inner circle */}
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
            <form onSubmit={handleSubmit(onSubmit)}>
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
                      {...register("name")}
                    />
                    <FieldDescription className="text-red-400">
                      {errors.name?.message}
                    </FieldDescription>
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
                      {...register("username")}
                      className="dark:bg-background h-9 shadow-xs"
                    />
                    <FieldDescription className="text-red-400">
                      {errors.username?.message}
                    </FieldDescription>
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
                      type="text"
                      placeholder="example@shadcnspace.com"
                      required
                      {...register("email")}
                      className="dark:bg-background h-9 shadow-xs"
                    />
                    <FieldDescription className="text-red-400">
                      {errors.email?.message}
                    </FieldDescription>
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
                    <FieldDescription className="text-red-400">
                      {errors.password?.message}
                    </FieldDescription>
                  </Field>
                </div>
                <Field className="gap-4">
                  {mutation.isError && (
                    <p className="text-sm font-medium text-red-400 text-center">
                      {(mutation.error as any).response?.data?.error || "Registration failed. Please try again."}
                    </p>
                  )}
                  <Button
                    type="submit"
                    size={"lg"}
                    disabled={mutation.isPending}
                    className="hover:bg-primary/80 h-10 cursor-pointer rounded-lg"
                  >
                    {mutation.isPending ? "Creating account..." : "Sign Up"}
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
