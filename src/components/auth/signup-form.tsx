"use client";

import { z } from "zod"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuth } from "@/provider/authProvider";

import MButton from "@/components/m-ui/m-button";
import MFormInput from "../m-ui/m-input";
import { Stack } from "@chakra-ui/react";
import { BACKEND_URL } from "@/utils/env";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters."
  }).max(50, {
    message: "Username must be less than 50 characters."
  }),
  email: z.string().email({
    message: "Invalid email address."
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters."
  }).max(50, {
    message: "Password must be less than 50 characters."
  }),
  confirmPassword: z.string().min(8, {
    message: "Password must be at least 8 characters."
  })
}).refine(({ password, confirmPassword }) => password === confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});

type FormValues = z.infer<typeof formSchema>;

const SignUpForm = () => {
  const { login } = useAuth();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    },
  } = form;

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await fetch(`${BACKEND_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.username,
          email: data.email,
          password: data.password,
          role: "User"
        }),
      });

      if (!response.ok) {
        throw new Error('Signup failed');
      }

      const resultData = await response.json();
      console.log(resultData);
      login(resultData?.access_token, resultData?.user, true);

    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <FormProvider {...form}>
      <form className="flex flex-col gap-half" onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <MFormInput
            label="Username / Phone Number / Email"
            placeholder="Username / Phone Number / Email"
            required
            {...register("username")}
          />
          {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
        </Stack>

        <Stack>
          <MFormInput
            label="Email"
            placeholder="Email"
            required
            {...register("email")}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </Stack>

        <Stack>
          <MFormInput
            label="Password"
            placeholder="Password"
            required
            password
            {...register("password")}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </Stack>

        <Stack>
          <MFormInput
            label="Confirm Password"
            placeholder="Confirm Password"
            required
            password
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
        </Stack>

        <MButton
          variant="primary"
          type="submit"
          full
        >
          Sign Up
        </MButton>
      </form>
    </FormProvider>
  )
}

export default SignUpForm;