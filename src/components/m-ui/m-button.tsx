import clsx from "clsx"
import { forwardRef } from "react"
import { Button, HTMLChakraProps } from "@chakra-ui/react"
import { Loader2 } from "lucide-react"

interface MButtonProps {
  className?: string
  loading?: boolean
  variant?: "primary" | "secondary"
  full?: boolean
}

const MButton = forwardRef<HTMLButtonElement, HTMLChakraProps<"button"> & MButtonProps>(({ className, variant, loading, full, ...props }, ref) => {

  const variants = {
    primary: "bg-primary text-black rounded-md h-12 p-2",
    secondary: "bg-muted text-black rounded-md active:[transform:translate3d(0,1.5px,0)] h-12 p-2"
  }

  const postSetClassName = clsx(
    "font-semibold active:[transform:translate3d(0,1.5px,0)]",
    variants[variant as keyof typeof variants],
    { "w-full": full },
    className
  );

  return (
    <Button
      className={postSetClassName}
      ref={ref}
      {...props}>
      {!loading ? (
        props.children
      ) : (
        <Loader2 size={18} strokeWidth={1.5} className="animate-spin" />
      )}
    </Button>
  )
})

MButton.displayName = "MButton"

export default MButton

