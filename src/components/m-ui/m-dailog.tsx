import { Dialog, DialogRootProps, Portal } from "@chakra-ui/react";
import clsx from "clsx";
import { X } from "lucide-react";
import React from "react";

interface MDialogProps extends Omit<DialogRootProps, "children"> {
  content?: React.ReactNode;
  trigger?: React.ReactNode;
  closeTrigger?: boolean;
  placement?: "top" | "center" | "bottom";
  header?: {
    title?: string;
    description?: string;
  }
  footer?: React.ReactNode;
  className?: string;
}

const MDialog = React.forwardRef<HTMLDialogElement, MDialogProps>(({ content, trigger, header, footer, placement = "center", className, closeTrigger = true, ...props }, ref) => {
  return (
    <Dialog.Root {...props} placement={placement} motionPreset="scale">
      <Dialog.Trigger asChild={!!trigger}>
        {trigger}
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner >
          <Dialog.Content className={clsx("w-full max-w-[92%] sm:max-w-[400px] bg-secondary rounded-lg text-text_dark shadow-none", className)} autoFocus={false}>
            {closeTrigger && (
              <Dialog.CloseTrigger className="absolute top-2 right-2 text-text_dark/30">
                <X className="size-5" />
              </Dialog.CloseTrigger>
            )}
            {header && (
              <Dialog.Header>
                <Dialog.Title className="text-lg font-bold">{header.title}</Dialog.Title>
                <Dialog.Description className="text-sm">{header.description}</Dialog.Description>
              </Dialog.Header>
            )}
            <Dialog.Body>
              {content}
            </Dialog.Body>
            {footer && (
              <Dialog.Footer>
                {footer}
              </Dialog.Footer>
            )}
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
});

export default MDialog;