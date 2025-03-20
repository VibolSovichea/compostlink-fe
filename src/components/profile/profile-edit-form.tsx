import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateUserMutation } from "@/redux/slices/dataSlice";
import { Stack } from "@chakra-ui/react";
import MFormInput from "../m-ui/m-input";
import MButton from "../m-ui/m-button";
import { User } from "@/redux/slices/data.types";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters."
  }).max(50, {
    message: "Username must be less than 50 characters."
  }),
  email: z.string().email({
    message: "Invalid email address."
  }),
})

type FormValues = z.infer<typeof formSchema>;

interface ProfileEditFormProps {
  profile: User;
}

const ProfileEditForm = ({ profile }: ProfileEditFormProps) => {
  const [updateUser] = useUpdateUserMutation();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: profile?.name || "",
      email: profile?.email || "",
    }
  })

  const onSubmit = useCallback(async (data: FormValues) => {
    if (!data) return;
    try {
      setIsLoading(true);
      const result = await updateUser({
        id: profile.id.toString(),
        body: {
          name: data.name,
          email: data.email
        }
      })
      if (result?.error) {
        throw new Error(result?.error?.data?.message[0]);
      }
      toast.success("Profile updated successfully");
      setTimeout(() => {
        router.push("/home");
      }, 1000);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  }, [profile, updateUser]);

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-base">
        <Stack>
          <MFormInput
            label="Name"
            placeholder="John Doe"
            required
            {...form.register("name")}
          />
        </Stack>

        <Stack>
          <MFormInput
            label="Email"
            placeholder="johndoe123@gmail.com"
            required
            {...form.register("email")}
          />
        </Stack>

        <MButton type="submit" full variant="primary" loading={isLoading}>
          Update Profile
        </MButton>

      </form>
    </FormProvider>
  )
}

export default ProfileEditForm;