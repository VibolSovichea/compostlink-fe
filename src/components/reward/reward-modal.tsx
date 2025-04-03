import { useEffect, useState } from "react";
import MButton from "@/components/m-ui/m-button";
// import { rewardData } from "@/utils/mockData";
import { Drawer, DrawerBody, DrawerFooter } from "@chakra-ui/react";
import { useRewardQuery } from "@/redux/slices/dataSlice";
import Image from "next/image";
import { Reward } from "@/redux/slices/data.types";

interface RewardModalProps {
  data: Reward[];
  rewardId: number;
  onSuccess: () => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const mockData = [
  {
    id: 1,
    title: "templr",
    description: "eco-freindly templr made from recycle part of dying star.",
    imageUrl: "https://i.ibb.co/q3pLrvFs/51u-BSV9-Ugb-L.jpg",
    pointRequired: 2000,
    stockQuantity: 58,
  },
  {
    id: 2,
    title: "templr",
    description: "eco-freindly templr made from recycle part of dying star.",
    imageUrl: "https://i.ibb.co/q3pLrvFs/51u-BSV9-Ugb-L.jpg",
    pointRequired: 2000,
    stockQuantity: 58,
  },
  {
    id: 3,
    title: "templr",
    description: "eco-freindly templr made from recycle part of dying star.",
    imageUrl: "https://i.ibb.co/q3pLrvFs/51u-BSV9-Ugb-L.jpg",
    pointRequired: 2000,
    stockQuantity: 58,
  },
];

const RewardModal = ({
  data,
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
    if (data) {
      const reward = data.find((item: any) => item.id === rewardId);
      setReward(reward);
    }
  }, [rewardId, data]);

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
                  <Image
                    src={reward.imageUrl}
                    alt=""
                    width={200}
                    height={200}
                    className="size-full object-cover"
                  />
                ) : (
                  <div className="bg-gray-200 size-full rounded-lg animate-pulse"></div> // Placeholder while loading
                )}
              </div>

              <div className="flex flex-col gap-base">
                <div className="flex flex-col gap-1 flex-1">
                  <h1 className="text-xl text-text_dark">{reward?.title}</h1>
                  <p className="text-sm font-bold text-primary">
                    {reward?.pointRequired} points
                  </p>
                </div>

                <div className="flex flex-col gap-1">
                  <p className="text-sm text-text_dark">Description</p>
                  <p className="text-sm text-text_dark">{reward?.description}</p>
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
