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
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters."
  }),
})

type FormValues = z.infer<typeof formSchema>;

const SignInForm = () => {
  const { login } = useAuth();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    }
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = form;

  const onSubmit = async (data: FormValues) => {
    console.log(data);

    try{
      const result = await fetch(`${BACKEND_URL}/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.username,
          password: data.password,
        }),
      })

      const resultData = await result.json();
      console.log(resultData);
      login(resultData?.access_token, resultData?.user, false);

    } catch (error) {
      console.error("Submission error:", error);
    }
  }
  return (
    <FormProvider {...form}>
      <form className="flex flex-col gap-half" onSubmit={handleSubmit(onSubmit)}>
        <Stack>

          <MFormInput
            label="Username / Phone Number / Email"
            placeholder="Username / Phone Number / Email"
            required={true}
            {...register("username")}
          />
          {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
        </Stack>
        
        <Stack>
          <MFormInput
            label="Password"
            placeholder="Password"
            password
            required={true}
            {...register("password")}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </Stack>

        <MButton
          variant="primary"
          type="submit"
          full
        >
          Sign In
        </MButton>
      </form>
    </FormProvider>
  )
}

export default SignInForm;
