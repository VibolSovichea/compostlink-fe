import { CircleCheck } from "lucide-react";
import MDialog from "@/components/m-ui/m-dailog"
import Lottie from "react-lottie-player";
import animationData from "@/../public/assets/lotties/recycle-success.json";

interface SuccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  description: string;
  animation?: boolean;
}

const SuccessDialog = ({ open, description, onOpenChange, animation = false }: SuccessDialogProps) => {
  return (
    <MDialog
      open={open}
      onOpenChange={({ open }) => onOpenChange(open)}
      content={
        <div className="flex flex-col gap-base items-center justify-center p-base">
          {animation ? (
            <Lottie
              animationData={animationData}
              loop={false}
              play={true}
              style={{ width: "100%", height: "100%" }}
              onComplete={() => onOpenChange(false)}
            />
          ) : (
            <>
              <CircleCheck className="size-16 text-primary" />
              <div className="flex flex-col items-center justify-center">
                <p className="text-lg font-bold">Success</p>
                <p className="text-sm text-text_dark">{description}</p>
              </div>
            </>
          )}
        </div>
      }
    />
  )
}

export default SuccessDialog;