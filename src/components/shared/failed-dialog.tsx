import { CircleCheck, CircleX } from "lucide-react";
import MDialog from "@/components/m-ui/m-dailog"

interface FailedDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  description: string;
}

const FailedDialog = ({ open, description, onOpenChange }: FailedDialogProps) => {
  return (
    <MDialog
      open={open}
      onOpenChange={({ open }) => onOpenChange(open)}
      content={
        <div className="flex flex-col gap-base items-center justify-center p-base">
          <CircleX className="size-16 text-red-500" />
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg font-bold">Failed</p>
            <p className="text-sm text-black">{description}</p>
          </div>
        </div>
      }
    />
  )
}

export default FailedDialog;