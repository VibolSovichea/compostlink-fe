import Image from "next/image";
import MDialog from "../m-ui/m-dailog";
import { badges } from "@/utils/assets";
import MButton from "../m-ui/m-button";
import { useEffect, useMemo, useState } from "react";

interface AchievementLevel {
  threshold: number;
  badge: string;
}

const ACHIEVEMENT_LEVELS: AchievementLevel[] = [
  { threshold: 100000, badge: badges.hundred },
  { threshold: 50000, badge: badges.fifty },
  { threshold: 25000, badge: badges.twentyFive },
  { threshold: 10000, badge: badges.ten },
  { threshold: 5000, badge: badges.five },
  { threshold: 10, badge: badges.one },
];

interface AchievementDialogProps {
  wasteProgress: number;
  open: boolean;
  onClose: (confirmed?: boolean) => void;
}

const AchievementDialog = ({ wasteProgress, open, onClose }: AchievementDialogProps) => {
  const [achievement, setAchievement] = useState<string>(badges.one);
  
  useEffect(() => {
    if (!wasteProgress) return;
    
    const currentLevel = ACHIEVEMENT_LEVELS.find(level => wasteProgress >= level.threshold);
    if (currentLevel) {
      setAchievement(currentLevel.badge);
    }
  }, [open, wasteProgress]);

  const handleClose = () => {
    onClose(true);
  }

  return useMemo(() => (
    <MDialog
      open={open}
      onOpenChange={handleClose}
      closeTrigger={false}
      closeOnInteractOutside={false}
      closeOnEscape={false}
      content={
        <div className="flex flex-col items-center justify-center w-full pt-base gap-base">
          <div className="text-center">
            <p className="text-text_dark text-2xl font-bold">Congratulations!</p>
            <p className="text-text_dark text-sm">You have earned a new achievement</p>
          </div>
          <div className="aspect-square size-40">
            <Image src={achievement} alt="" width={150} height={150} className="object-cover" />
          </div>
          <MButton full variant="primary" onClick={handleClose}>
            Confirm Achievement
          </MButton>
        </div>
      }
    />
  ), [open, achievement])
}

export default AchievementDialog;