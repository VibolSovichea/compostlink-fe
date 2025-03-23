import { Card } from "@chakra-ui/react"
import RollingNumber from "@/animation/rolling-number"
import { Circle, Flower2, Trash } from "lucide-react";
import { getDailyCompostQuote } from "@/utils/random-quotes";

const StatisticCard = () => {
  return (
    <Card.Root className="bg-primary  shadow-lg w-full h-32">
      <Card.Body className="flex flex-row items-center size-full">
        <div className="flex flex-col gap-1 flex-1">
          <p className="text-md font-semibold text-text_light tracking-tight">{getDailyCompostQuote()}</p>
          <p className="text-xs text-text_light tracking-tight">last compost: 2025-03-22 - 20g</p>
        </div>
        <div className="flex flex-col gap-2 items-center justify-center size-24 relative">
          <Circle className="text-text_light absolute opacity-15 size-28" />
          <span className="text-4xl font-bold text-text_light">
            <RollingNumber value={20} />
          </span>
        </div>
      </Card.Body>
    </Card.Root>
  )
}

export default StatisticCard;