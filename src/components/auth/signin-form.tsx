"use client";

import { z } from "zod"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuth } from "@/provider/authProvider";
import { useState } from "react";
import { useToast as useChakraToast } from "@chakra-ui/toast";

import MButton from "@/components/m-ui/m-button";
import MFormInput from "../m-ui/m-input";
import { Stack } from "@chakra-ui/react";

// const toast = useChakraToast();

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
  const [isLoading, setIsLoading] = useState(false);
  const toast = useChakraToast();
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
    setIsLoading(true);
    
    try {
      const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: data.username,
          password: data.password,
        }),
      });

      if (!result.ok) {
        const errorData = await result.json();
        throw new Error(errorData.message || "Failed to sign in");
      }

      const resultData = await result.json();
      login(resultData.token, resultData.user, false);
      
      toast({
        title: "Success",
        description: "Successfully signed in!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to sign in",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
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
          loading={isLoading}
          disabled={isLoading}
        >
          Sign In
        </MButton>
      </form>
    </FormProvider>
  )
}

export default SignInForm;