import { CircleCheck } from "lucide-react";
import MDialog from "@/components/m-ui/m-dailog"

interface SuccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  description: string;
}

const SuccessDialog = ({ open, description, onOpenChange }: SuccessDialogProps) => {
  return (
    <MDialog
      open={open}
      onOpenChange={({ open }) => onOpenChange(open)}
      content={
        <div className="flex flex-col gap-base items-center justify-center p-base">
          <CircleCheck className="size-16 text-primary" />
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg font-bold">Success</p>
            <p className="text-sm text-black">{description}</p>
          </div>
        </div>
      }
    />
  )
}

export default SuccessDialog;