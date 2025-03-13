"use client";

import Base from "@/components/shared/base-layout";
import { useParams, useRouter } from "next/navigation";
import { rewardData } from "@/utils/mockData";
import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import Image from "next/image";
import MButton from "@/components/m-ui/m-button";
import MInputPhoneNumber, { phoneNumberValidation } from "@/components/m-ui/m-phone-input";
import MFormInput from "@/components/m-ui/m-input";
import { Stack } from "@chakra-ui/react";
import QRGenerator from "@/components/shared/qr-generator";
import { useQrShare } from "@/hooks/use-share-qr";

const formSchema = z.object({
  phoneNumber: phoneNumberValidation,
  firstName: z.string().min(1, { message: "First name is required" }).max(25, { message: "First name must be less than 25 characters" }),
  lastName: z.string().min(1, { message: "Last name is required" }).max(25, { message: "Last name must be less than 25 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

interface RewardFormProps {
  onSubmit: (data: FormValues) => void;
}

const RewardForm = ({ onSubmit }: RewardFormProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phoneNumber: "",
      firstName: "",
      lastName: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    },
  } = form;

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-base p-base h-screen">
        <Stack>
          <MFormInput
            label="First Name"
            placeholder="Your first name"
            {...register("firstName")}
          />
        </Stack>

        <Stack>
          <MFormInput
            label="Last Name"
            placeholder="Your last name"
            {...register("lastName")}
          />
        </Stack>

        <Stack>
          <MInputPhoneNumber
            label="Phone Number"
            onChange={(value) => {
              register("phoneNumber").onChange({
                target: {
                  name: "phoneNumber",
                  value: value
                }
              });
            }}
          />
        </Stack>

        <Stack className="absolute bottom-base right-base left-base">
          <MButton variant="primary" full className="text-white" type="submit">
            Confirm
          </MButton>
        </Stack>
      </form>
    </FormProvider>
  )

}

const RewardPage = () => {
  const { id } = useParams();
  const [reward, setReward] = useState<any | null>(null);
  const router = useRouter();
  const [confirm, setConfirm] = useState(false);
  const [formData, setFormData] = useState<FormValues | null>(null);
  const { shareQR } = useQrShare();

  useEffect(() => {
    const reward = rewardData.find((reward) => reward.id === parseInt(id as string));
    if (!reward) {
      router.push("/reward");
    }
    setReward(reward);
  }, [id]);

  const onSubmit = (data: FormValues) => {
    console.log(data);
    setFormData(data);
    setConfirm(true);
  }

  return (
    <Base insideClassName="py-base" headerVariant="return-button" headerContent={{
      pageTitle: "Reward"
    }} hideNavigation>
      {!confirm ? (
        <>
          <div className="text-title text-black flex flex-col items-center py-double mt-16">
            <div className="text-center">Personal Information</div>
          </div>
          <RewardForm onSubmit={onSubmit} />
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-[50vh] gap-4">
          <div className="text-xl text-black flex flex-col items-center py-double mt-16">
            <div className="text-center">Your QR Confirmation</div>
          </div>
          <QRGenerator
            personalInfo={{
              firstName: formData?.firstName || "",
              lastName: formData?.lastName || "",
              phoneNumber: formData?.phoneNumber || "",
              id: reward?.id?.toString()
            }}
          />
          <MButton
            variant="primary"
            full
            className="text-white mt-4"
            onClick={() => {
              shareQR()
              setTimeout(() => {
                router.push("/home");
              }, 3000);
            }}
          >
            Download Qr Code
          </MButton>
        </div>
      )}
    </Base>
  )
}

export default RewardPage;