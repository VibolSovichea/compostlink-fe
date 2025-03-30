"use client";

import { z } from "zod";
import toast from "react-hot-toast";
import { Stack } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import MButton from "@/components/m-ui/m-button";
import MSelect from "@/components/m-ui/m-select";
import MFormInput from "@/components/m-ui/m-input";
import { useWasteDonationMutation } from "@/redux/slices/dataSlice";
import { numberConversion } from "@/animation/rolling-number";

interface WasteDonationFormProps {
  facilityId: string;
  generatorId: string;
}

// Please use this
const formSchema = z.object({
  wasteType: z.string().min(1, {
    message: "Waste type is required",
  }),
  weight: z
    .string()
    .min(1, {
      message: "Weight is required",
    })
    .regex(/^\d+$/, {
      message: "Weight must be a number",
    }),
  rewardPoints: z.number(),
});

type FormValues = z.infer<typeof formSchema>;

const WasteDonationForm = ({
  facilityId,
  generatorId,
}: WasteDonationFormProps) => {
  const [wasteDonation, { isLoading: isWasteDonationLoading }] =
    useWasteDonationMutation();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      wasteType: "",
      weight: "",
      rewardPoints: 0,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (data: FormValues) => {
    const rewardPoints = (Number(data.weight) / 10) * 1;
    await form.setValue("rewardPoints", rewardPoints);

    const updatedData = {
      wasteType: data.wasteType,
      weight: data.weight,
      rewardPoints: rewardPoints,
    };

    try {
      const result = await wasteDonation({
        facilityId: Number(facilityId),
        userId: Number(generatorId),
        wasteType: updatedData.wasteType,
        weight: Number(updatedData.weight),
        pointsAwarded: updatedData.rewardPoints,
      }).unwrap();

      toast.success("Waste donation successful");
      window.location.href = "/home";

      console.log(result);
    } catch (error) {
      console.log(error);
    }

    console.log(updatedData);
    console.log(facilityId, generatorId);
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-base"
      >
        <div className="text-center text-primary ">
          <p>Reward Points</p>
          <p className="text-[500%] font-bold">
            {numberConversion((Number(form.watch("weight")) / 10) * 1)}
          </p>
        </div>

        <Stack>
          <MSelect
            options={["Mixed Waste", "Agricultural Waste", "Food Waste"]}
            placeholder="Select Waste Type"
            onChange={(value) => form.setValue("wasteType", value)}
            label="Waste Type"
            required
            helperText={form.formState.errors["wasteType"] && ""}
          />
        </Stack>

        <Stack>
          <MFormInput
            label="Weight"
            placeholder="Weight (grams)"
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
