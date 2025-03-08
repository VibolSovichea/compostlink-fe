"use client";

import { z } from "zod"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import MButton from "@/components/m-ui/m-button";
import MFormInput from "@/components/m-ui/m-input";
import { Stack } from "@chakra-ui/react";
import MInputPhoneNumber, { phoneNumberValidation } from "@/components/m-ui/m-phone-input";

// TODO: update address with google maps api
const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required"
  }).max(100, {
    message: "Name must be less than 100 characters"
  }),
  address: z.string().min(10, {
    message: "Address is required"
  }),
  phone: phoneNumberValidation,
})

type FormValues = z.infer<typeof formSchema>

const FacilityForm = () => {

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      address: "",
      phone: "",
    }
  })

  const { register, handleSubmit, formState: { errors } } = form;

  const onSubmit = (data: FormValues) => {
    console.log(data);
  }

  return (
    <FormProvider {...form}>
      <form className="flex flex-col gap-base" onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <MFormInput
            label="Name"
            required={true}
            {...register("name")}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </Stack>

        <Stack> 
          <MFormInput
            label="Address"
            required={true}
            helperText="Please paste the address from Google Maps"
            {...register("address")}
          />
          {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
        </Stack>

        <Stack>
          <MInputPhoneNumber
            label="Contact Number"
            error={errors.phone?.message}
            {...register("phone")}
            onChange={(value) => {
              register("phone").onChange({
                target: {
                  name: "phone",
                  value: value
                }
              });
            }}
          />
        </Stack>

        <MButton
          variant="primary"
          type="submit"
          className="w-full">
          Create
        </MButton>
      </form>
    </FormProvider>
  )
}

export default FacilityForm;