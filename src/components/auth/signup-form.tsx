"use client";

import { z } from "zod"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import MButton from "@/components/m-ui/m-button";
import MFormInput from "../m-ui/m-input";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters."
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters."
  }),
  confirmPassword: z.string().min(8, {
    message: "Password must be at least 8 characters."
  }),
})

type FormValues = z.infer<typeof formSchema>;

const SignUpForm = () => {

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
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
      if (data.password !== data.confirmPassword) {
        throw new Error("Passwords do not match");
      }
      
      console.log("Form data:", data);
      
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <FormProvider {...form}>
      <form className="flex flex-col gap-half" onSubmit={handleSubmit(onSubmit)}>
        <MFormInput
          label="Username / Phone Number / Email"
          placeholder="Username / Phone Number / Email"
          {...register("username")}
        />

        <MFormInput
          label="Password"
          placeholder="Password"
          {...register("password")}
        />

        <MFormInput
          label="Confirm Password"
          placeholder="Confirm Password"
          {...register("confirmPassword")}
        />

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