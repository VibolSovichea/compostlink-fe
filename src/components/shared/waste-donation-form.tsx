"use client";

import { Stack } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import MFormInput from "../m-ui/m-input";
import MButton from "../m-ui/m-button";
import { useMemo } from "react";

const formSchema = z.object({
  wasteType: z.string().min(1, {
    message: "Waste type is required",
  }),
  weight: z.string().min(1, {
    message: "Weight is required",
  }).regex(/^\d+$/, {
    message: "Weight must be a number",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const WasteDonationForm = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      wasteType: "",
      weight: "",
    }
  })

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    },
  } = form;

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-half">

        <div className="text-center text-primary ">
          <p>Reward Points</p>
          <p className="text-4xl font-bold">{Number(form.watch("weight")) * 1}</p>
        </div>

        <Stack>
          <MFormInput
            label="Waste Type"
            placeholder="Waste Type"
            required
            {...register("wasteType")}
          />
        </Stack>

        <Stack>
          <MFormInput
            label="Weight"
            placeholder="Weight"
            type="number"
            required
            {...register("weight")}
          />
        </Stack>

        <MButton variant="primary" type="submit" className="w-full">
          Confirm
        </MButton>
      </form>
    </FormProvider>
  );
};

export default WasteDonationForm;
