"use client";

import { Card } from "@chakra-ui/react"
import { useProfileQuery, useUpdateProfileNameMutation } from "@/redux/slices/dataSlice";
import { useMemo } from "react";
import { User } from "@/redux/slices/data.types";

interface ProfilePreviewCardProps {
  userId: User["id"];
}

const ProfilePreviewCard = ({ userId }: ProfilePreviewCardProps) => {
  const { data, isLoading, error } = useProfileQuery(userId);
  const [updateName, {isLoading: isUpdating}] = useUpdateProfileNameMutation();

  // example only
  const handleUpdateName = async (name: string) => {
    try {
      const result = await updateName({
        id: userId,
        name: name
      }).unwrap(); // unwrap is used to get the data from the response
    } catch (error) {
      console.error(error);
    }
  };

  const content = useMemo(() => {
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading profile</div>;
    
    return (
      <Card.Root className="w-full bg-white shadow-xl h-32">
        <Card.Body className="flex flex-col gap-6">
          <div className="flex">
            <div className="flex flex-col flex-1">
              <div className="text-md text-black capitalize">{`Hello ${data?.name}`}</div>
              <div className="text-black font-bold">{`Your total points : ${data?.totalPoint}`}</div>
            </div>
            <div className="bg-primary rounded-full w-12 h-12"></div>
          </div>
          <div className="w-full h-4 bg-primary rounded-full flex justify-center items-center text-xs">progress bar</div>
        </Card.Body>
      </Card.Root>
    );
  }, [data, isLoading, error]);

  return content;
}

export default ProfilePreviewCard;