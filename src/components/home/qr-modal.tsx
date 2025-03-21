import {
  Drawer,
  DrawerBody,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@chakra-ui/react";
import QRGenerator from "../shared/qr-generator";
import MButton from "../m-ui/m-button";
import { useQrShare } from "@/hooks/use-share-qr";

interface QrModalProp {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  id: string;
  type: "wastedonation" | "redemption"; // Add type to determine endpoint
}

const QrModal = ({ open, onOpenChange, id, type }: QrModalProp) => {
  const { shareQR } = useQrShare();

  // Dynamically set the QR code URL based on type
  const qrUrl = `http://localhost:4000/${type}/${id}`;

  return (
    <Drawer.Root
      open={open}
      onOpenChange={(e) => onOpenChange(e.open)}
      placement="bottom"
    >
      <Drawer.Backdrop />
      <Drawer.Positioner className="flex justify-center">
        <Drawer.Content className="w-[430px] rounded-t-lg bg-secondary shadow-none p-base">
          <DrawerHeader>
            <DrawerTitle className="text-2xl font-bold text-black text-center">
              QR Code
            </DrawerTitle>
            <DrawerDescription className="text-black text-center">
              {type === "wastedonation"
                ? "Show this QR code to the facility to earn your points"
                : "Show this QR code to confirm your redemption"}
            </DrawerDescription>
          </DrawerHeader>

          <DrawerBody className="p-0 h-screen">
            <QRGenerator data={qrUrl} />
          </DrawerBody>

          <DrawerFooter className="px-0 mt-base">
            <MButton
              variant="primary"
              full
              className="text-white"
              onClick={() => shareQR()}
            >
              Download QR Code
            </MButton>
          </DrawerFooter>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root>
  );
};

export default QrModal;
