import { useEffect, useState } from "react";
import MButton from "@/components/m-ui/m-button";
import { rewardData } from "@/utils/mockData";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
} from "@chakra-ui/react";

interface RewardModalProps {
  rewardId: number;
  onSuccess: () => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const RewardModal = ({ rewardId, onSuccess, open, onOpenChange }: RewardModalProps) => {
  const [reward, setReward] = useState<any | null>(null);

  const onSubmit = () => {
    onSuccess();
  };

  useEffect(() => {
    const reward = rewardData.find((reward) => reward.id === rewardId);
    setReward(reward);
  }, [rewardId]);

  return (
    <Drawer.Root open={open} onOpenChange={(e) => onOpenChange(e.open)} placement="bottom">
      <Drawer.Backdrop />
      <Drawer.Positioner className="flex justify-center">
        <Drawer.Content className="w-[430px] rounded-xl bg-secondary rounded-xl shadow-none p-base">

          <DrawerBody className="p-0 h-full max-h-[80vh] rounded-xl overflow-y-auto">
            <div className="flex flex-col gap-base h-full">
              <div className="aspect-video bg-white w-full rounded-t-xl">
                <div className="bg-primary size-full rounded-xl" />
              </div>

              <div className="flex flex-col gap-base">
                <div className="flex flex-col gap-1 flex-1">
                  <h1 className="text-xl text-black">{reward?.name}</h1>
                  <p className="text-sm font-bold text-primary">{reward?.points} points</p>
                </div>

                <div className="flex flex-col gap-1">
                  <p className="text-sm text-black">Description</p>
                  <p className="text-sm text-black">{reward?.description}</p>
                </div>
              </div>
            </div>
          </DrawerBody>

          <DrawerFooter className="px-0 mt-base rounded-xl">
            <MButton variant="primary" full className="text-white" onClick={onSubmit}>
              Confirm Redemption
            </MButton>
          </DrawerFooter>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root >
  );
};

export default RewardModal;
