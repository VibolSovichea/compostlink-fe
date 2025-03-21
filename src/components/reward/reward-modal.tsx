import { useEffect, useState } from "react";
import MButton from "@/components/m-ui/m-button";
import { rewardData } from "@/utils/mockData";
import { Drawer, DrawerBody, DrawerFooter } from "@chakra-ui/react";
import { useRewardQuery } from "@/redux/slices/dataSlice";

interface RewardModalProps {
  rewardId: number;
  onSuccess: () => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const RewardModal = ({
  rewardId,
  onSuccess,
  open,
  onOpenChange,
}: RewardModalProps) => {
  const [reward, setReward] = useState<any | null>(null);

  const onSubmit = () => {
    onSuccess();
  };

  const { data: rewardData } = useRewardQuery();

  useEffect(() => {
    if (rewardData) {
      const reward = rewardData.find((item: any) => item.id === rewardId);
      setReward(reward);
    }
  }, [rewardId, rewardData]);

  return (
    <Drawer.Root
      open={open}
      onOpenChange={(e) => onOpenChange(e.open)}
      placement="bottom"
    >
      <Drawer.Backdrop />
      <Drawer.Positioner className="flex justify-center">
        <Drawer.Content className="w-[430px] rounded-t-lg bg-secondary shadow-none p-base">
          <DrawerBody className="p-0 h-full max-h-[80vh] overflow-y-auto">
            <div className="flex flex-col gap-base h-full">
              <div className="aspect-video bg-white w-full">
                {reward ? (
                  <img
                    src={reward.imageUrl}
                    alt={reward.title} // Add an alt attribute for accessibility
                    className="size-full rounded-lg"
                  />
                ) : (
                  <div className="bg-gray-200 size-full rounded-lg animate-pulse"></div> // Placeholder while loading
                )}
              </div>

              <div className="flex flex-col gap-base">
                <div className="flex flex-col gap-1 flex-1">
                  <h1 className="text-xl text-black">{reward?.title}</h1>
                  <p className="text-sm font-bold text-primary">
                    {reward?.pointRequired} points
                  </p>
                </div>

                <div className="flex flex-col gap-1">
                  <p className="text-sm text-black">Description</p>
                  <p className="text-sm text-black">{reward?.description}</p>
                </div>
              </div>
            </div>
          </DrawerBody>

          <DrawerFooter className="px-0 mt-base">
            <MButton
              variant="primary"
              full
              className="text-white"
              onClick={onSubmit}
            >
              Confirm Redemption
            </MButton>
          </DrawerFooter>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root>
  );
};

export default RewardModal;
