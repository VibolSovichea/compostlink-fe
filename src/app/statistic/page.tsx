"use client";

import Base from "@/components/shared/base-layout";
import Lottie from "react-lottie-player";
import { animations } from "@/utils/assets";
import { useGetWasteDonationByUserIdQuery } from "@/redux/slices/dataSlice";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function StatisticPage() {
  const userId = Cookies.get("user_id");
  const { data: wasteDonation } = useGetWasteDonationByUserIdQuery(userId ?? "");
  const [currentStreak, setCurrentStreak] = useState<number>(0);
  const [longestStreak, setLongestStreak] = useState<number>(0);
  const [daysSinceLastDonation, setDaysSinceLastDonation] = useState<number>(0);

  const calculateDonationStats = () => {
    if (!wasteDonation?.donations || wasteDonation.donations.length === 0) {
      return { current: 0, longest: 0, daysSince: 0 };
    }

    // Sort donations by date
    const sortedDonations = [...wasteDonation.donations].sort((a, b) => 
      new Date(b.donatedAt).getTime() - new Date(a.donatedAt).getTime()
    );

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;
    let lastDate = new Date();

    // Calculate days since last donation
    const mostRecentDonation = new Date(sortedDonations[0].donatedAt);
    mostRecentDonation.setHours(0, 0, 0, 0);
    const timeDiff = today.getTime() - mostRecentDonation.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
    
    if (daysDiff <= 1) { // Only count as current if last donation was today or yesterday
      for (let i = 0; i < sortedDonations.length; i++) {
        const donationDate = new Date(sortedDonations[i].donatedAt);
        donationDate.setHours(0, 0, 0, 0);
        
        if (i === 0) {
          currentStreak = 1;
          lastDate = donationDate;
          continue;
        }

        const dayDifference = Math.floor(
          (lastDate.getTime() - donationDate.getTime()) / (1000 * 3600 * 24)
        );

        if (dayDifference === 1) {
          currentStreak++;
          lastDate = donationDate;
        } else {
          break;
        }
      }
    }

    // Calculate longest streak
    lastDate = new Date(sortedDonations[0].donatedAt);
    lastDate.setHours(0, 0, 0, 0);
    tempStreak = 1;

    for (let i = 1; i < sortedDonations.length; i++) {
      const donationDate = new Date(sortedDonations[i].donatedAt);
      donationDate.setHours(0, 0, 0, 0);
      
      const dayDifference = Math.floor(
        (lastDate.getTime() - donationDate.getTime()) / (1000 * 3600 * 24)
      );

      if (dayDifference === 1) {
        tempStreak++;
        longestStreak = Math.max(longestStreak, tempStreak);
      } else {
        tempStreak = 1;
      }
      
      lastDate = donationDate;
    }

    longestStreak = Math.max(longestStreak, tempStreak, currentStreak);
    
    return { 
      current: currentStreak, 
      longest: longestStreak,
      daysSince: daysDiff
    };
  };

  useEffect(() => {
    if (wasteDonation?.donations) {
      const { current, longest, daysSince } = calculateDonationStats();
      setCurrentStreak(current);
      setLongestStreak(longest);
      setDaysSinceLastDonation(daysSince);
    }
  }, [wasteDonation]);

  // Helper function to determine tree animation state
  const getTreeState = () => {
    if (daysSinceLastDonation === 0) return 'healthy';
    if (daysSinceLastDonation <= 3) return 'good';
    if (daysSinceLastDonation <= 7) return 'warning';
    return 'dying';
  };

  return (
    <Base hideNavigation>
      <div className="relative">
        {/* <div className="flex flex-col items-center gap-4 mt-4 px-4">
          <div className="bg-primary rounded-lg p-4 w-full">
            <h2 className="text-lg font-semibold text-text_light">Current Streak</h2>
            <p className="text-3xl font-bold text-text_light">{currentStreak} days</p>
          </div>
          <div className="bg-primary rounded-lg p-4 w-full">
            <h2 className="text-lg font-semibold text-text_light">Longest Streak</h2>
            <p className="text-3xl font-bold text-text_light">{longestStreak} days</p>
          </div>
          <div className="bg-primary rounded-lg p-4 w-full">
            <h2 className="text-lg font-semibold text-text_light">Days Since Last Donation</h2>
            <p className="text-3xl font-bold text-text_light">{daysSinceLastDonation} days</p>
          </div>
        </div> */}
        <div className="absolute flex items-center justify-center z-10 h-[90vh] overflow-hidden">
          <div className={`absolute size-32 rounded-full blur-lg ${
            getTreeState() === 'healthy' ? 'bg-primary/30' :
            getTreeState() === 'good' ? 'bg-yellow-500/30' :
            getTreeState() === 'warning' ? 'bg-orange-500/30' :
            'bg-red-500/30'
          } animate-pulse`}/>
          <Lottie
            animationData={animations.birds}
            loop={true}
            play={true}
            style={{
              width: "100%",
              height: "30%",
              opacity: daysSinceLastDonation <= 3 ? 1 : 0.5, // Birds fade when tree is not healthy
            }}
            className="absolute"
          />

          <Lottie
            animationData={daysSinceLastDonation <= 1 ? animations.treeOne : daysSinceLastDonation <= 3 ? animations.treeTwo : daysSinceLastDonation <= 7 ? animations.treeThree : animations.treeFour}
            loop={false}
            play={true}
            style={{
              width: "100%",
              height: "100%",
              transform: "scale(2.5)",
              opacity: getTreeState() === 'dying' ? 0.7 : 1, // Tree fades when dying
            }}
          />
        </div>
      </div>
    </Base>
  );
}