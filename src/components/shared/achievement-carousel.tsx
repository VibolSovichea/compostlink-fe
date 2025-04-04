"use client";

import { Trophy } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Achievement {
  threshold: number;
  badge: string;
  confirmedAt: string;
}

const TOTAL_SLOTS = 24;

const AchievementCarousel = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    const storedData = localStorage.getItem("achievementStatus");
    if (storedData) {
      const { achievements } = JSON.parse(storedData);
      setAchievements(achievements.sort((a: Achievement, b: Achievement) => a.threshold - b.threshold));
    }
  }, []);

  return (
      <div className="flex gap-base p-base justify-items-center">
        {[...Array(achievements.length)].map((_, index) => {
          const achievement = achievements[index];
          return (
            <div 
              key={index} 
              className=" aspect-square size-24 rounded-lg flex items-center justify-center"
            >
              {achievement ? (
                <Image 
                  src={achievement.badge} 
                  alt={`${achievement.threshold}kg Achievement`} 
                  width={100} 
                  height={100} 
                  className="size-full object-cover"
                />
              ) : (
                <Trophy className="size-12 text-gray-300" />
              )}
            </div>
          );
        })}
      </div>
  );
} 

export default AchievementCarousel;