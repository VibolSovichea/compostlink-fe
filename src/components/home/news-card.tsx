import { Card } from "@chakra-ui/react"
import { Flower, LeafyGreen, Salad } from "lucide-react";

interface NewsCardProps {
  data?: {
    title: string;
    description: string;
  };
  onClick?: () => void;
  icon?: "Flower" | "LeafyGreen" | "Salad";
}

const NewsCard = ({ data, onClick, icon = "Flower" }: NewsCardProps) => {
  return (
    <Card.Root className="bg-white shadow-lg w-full h-32"
      onClick={onClick}
    >
      <Card.Body className="flex items-center h-full aspect-video relative overflow-hidden">
        {icon === "Flower" && <Flower className="text-primary/20 size-44 rotate-5 absolute right-[-50px]" />}
        {icon === "LeafyGreen" && <LeafyGreen className="text-primary/20 size-44 rotate-5 absolute right-[-50px]" />}
        {icon === "Salad" && <Salad className="text-primary/20 size-44 rotate-5 absolute right-[-50px]" />}
        <div className="flex flex-col gap-2">
          <p className="text-text_dark text-lg font-bold tracking-tighter">{data?.title}</p>
          <p className="text-text_dark text-xs line-clamp-2">{data?.description}</p>
        </div>
      </Card.Body>
    </Card.Root>
  )
}

export default NewsCard;