import { Card } from "@chakra-ui/react"
import { HTMLAttributes } from "react";
interface MCardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const MCard = ({ children, className, ...props }: MCardProps) => {
  return (
    <Card.Root className="w-full bg-secondary shadow-xl h-32 cursor-pointer" {...props}>
      <Card.Body className={className}>
        {children}
      </Card.Body>
    </Card.Root>
  )
}

export default MCard;