"use client";

import Base from "@/components/shared/base-layout";
import Lottie from "react-lottie-player";
import { animations, avatars } from "@/utils/assets";
import { useGetWasteDonationByUserIdQuery, useProfileQuery } from "@/redux/slices/dataSlice";
import Cookies from "js-cookie";
import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { User } from "@/redux/slices/data.types";
import { Circle } from "lucide-react";
import RollingNumber from "@/animation/rolling-number";
import MButton from "@/components/m-ui/m-button";
import { useRouter } from "next/navigation";
import AchievementCarousel from "@/components/shared/achievement-carousel";
import Loading from "@/components/shared/loading";

export default function StatisticPage() {
  const userId = Cookies.get("user_id");
  const { data: userData } = useProfileQuery(userId ?? "");
  const { data: wasteDonation } = useGetWasteDonationByUserIdQuery(userId ?? "");
  const [currentStreak, setCurrentStreak] = useState<number>(0);
  const [longestStreak, setLongestStreak] = useState<number>(0);
  const [daysSinceLastDonation, setDaysSinceLastDonation] = useState<number>(0);
  const [profile, setProfile] = useState<User | null>(null);
  const router = useRouter();

  const calculateDonationStats = () => {
    if (!wasteDonation?.donations || wasteDonation.donations.length === 0) {
      return { current: 0, longest: 0, daysSince: 0, mostRecentDonation: null, sortedDonations: [] };
    }

    const sortedDonations = [...wasteDonation.donations].sort((a, b) =>
      new Date(b.donatedAt).getTime() - new Date(a.donatedAt).getTime()
    );

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;
    let lastDate = new Date();

    const mostRecentDonation = new Date(sortedDonations[0].donatedAt);
    mostRecentDonation.setHours(0, 0, 0, 0);
    const timeDiff = today.getTime() - mostRecentDonation.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));

    if (daysDiff <= 1) {
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
      daysSince: daysDiff,
      mostRecentDonation: mostRecentDonation,
      sortedDonations: sortedDonations
    };
  };

  useEffect(() => {
    userData && setProfile(userData);
  }, [userData]);

  useEffect(() => {
    console.log(wasteDonation);
    if (wasteDonation?.donations) {
      const { current, longest, daysSince } = calculateDonationStats();
      setCurrentStreak(current);
      setLongestStreak(longest);
      setDaysSinceLastDonation(daysSince);
    }
  }, [wasteDonation]);

  const getTreeState = () => {
    if (daysSinceLastDonation === 0) return 'healthy';
    if (daysSinceLastDonation <= 3) return 'good';
    if (daysSinceLastDonation <= 7) return 'warning';
    return 'dying';
  };

  const calculateWasteTypeStats = () => {
    if (!wasteDonation?.donations) return {};

    const stats = wasteDonation.donations.reduce((acc, donation) => {
      const wasteType = donation.wasteType.toLowerCase();
      acc[wasteType] = (acc[wasteType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return stats;
  };

  const calculateWasteTypeWeights = () => {
    if (!wasteDonation?.donations) return {};

    const stats = wasteDonation.donations.reduce((acc, donation) => {
      const wasteType = donation.wasteType.toLowerCase();
      acc[wasteType] = (acc[wasteType] || 0) + donation.weight;
      return acc;
    }, {} as Record<string, number>);

    return stats;
  };

  return useMemo(() => (
    userData && wasteDonation ? (
      <Base hideNavigation headerVariant="return-button" headerContent={{
        pageTitle: "Profile Statistics"
      }}>
        <div className="relative space-y-base p-base no-scrollbar">
          <div className="flex flex-col items-center mt-base p-base gap-base rounded-lg">
            <div className="aspect-square size-24">
              <Image
                src={profile?.role === "Facility" ? avatars.composterTwo : avatars.composterOne}
                alt=""
                width={100}
                height={100}
                className="size-full rounded-full"
              />
            </div>
            <div className="w-full flex-1 flex flex-col gap-1 items-center">
              <p className="text-primary text-lg font-bold capitalize">{profile?.name}</p>
              <p className="text-text_dark text-xs">{`last donation: ${calculateDonationStats().mostRecentDonation?.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`}</p>
            </div>
  
            <div className="w-full overflow-x-auto flex justify-center">
              <AchievementCarousel />
            </div>
          </div>
  
          <div className="flex flex-col items-center justify-center h-[40vh] overflow-hidden">
            <div className={`absolute size-32 rounded-full blur-lg ${getTreeState() === 'healthy' ? 'bg-primary/30' :
              getTreeState() === 'good' ? 'bg-yellow-500/30' :
                getTreeState() === 'warning' ? 'bg-orange-500/30' :
                  'bg-red-500/30'
              } animate-pulse`} />
            <Lottie
              animationData={animations.birds}
              loop={true}
              play={true}
              style={{
                width: "100%",
                height: "30%",
                opacity: daysSinceLastDonation <= 3 ? 1 : daysSinceLastDonation <= 7 ? 0.5 : 0,
              }}
              className="absolute"
            />
  
            <Lottie
              key={daysSinceLastDonation}
              animationData={daysSinceLastDonation <= 1 ? animations.treeOne : daysSinceLastDonation <= 3 ? animations.treeTwo : daysSinceLastDonation <= 7 ? animations.treeThree : animations.treeFour}
              loop={false}
              play={true}
              style={{
                width: "100%",
                height: "100%",
                transform: "scale(2.5)",
              }}
            />
            <div className="flex justify-center items-center flex-col gap-1">
              <p className="text-primary font-bold text-lg">{`Tree ${getTreeState()}`}</p>
              <p className="text-text_dark text-xs">{`${daysSinceLastDonation} days since last donation`}</p>
            </div>
          </div>
  
          <div className="flex items-center mt-base p-base gap-8 rounded-lg w-full">
            <div className="flex flex-col gap-2 items-center justify-center size-24 relative">
              <Circle className="text-primary absolute opacity-15 size-28" />
              <span className="text-4xl font-bold text-primary">
                <RollingNumber value={wasteDonation?.donationCount ?? 0} />
              </span>
            </div>
            <div className="flex flex-col flex-1 gap-2 w-[80%]">
              {Object.entries(calculateWasteTypeStats()).map(([wasteType, count]) => (
                <div key={wasteType} className="flex justify-between items-center text-xs">
                  <p className="capitalize text-text_dark">{wasteType.replace('_', ' ')}</p>
                  <span className="text-text_dark">
                    {calculateWasteTypeWeights()[wasteType]} grams
                  </span>
                </div>
              ))}
            </div>
          </div>
  
          <span className="flex items-center gap-2">
            <p className="text-text_dark text-sm font-bold">Donations</p>
            <div className="w-full h-[1px] bg-gray-300"></div>
          </span>
  
          <div className="flex flex-col items-center justify-center gap-2 w-full px-base">
            {calculateDonationStats().sortedDonations.map((donation) => (
              <div key={donation.id} className="flex justify-between items-center text-sm w-full h-12">
                <div className="flex flex-col gap-1">
                  <p className="capitalize text-primary font-bold">{donation.wasteType}</p>
                  <p className="text-text_dark text-xs">{new Date(donation.donatedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
                </div>
                <span className="text-text_dark">{donation.weight} grams</span>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-base right-base left-base">
          <MButton
            full
            variant="primary"
            onClick={() => router.push("/location")}
          >
            Continue Donations
          </MButton>
        </div>
      </Base>
    ) : (
      <Loading />
    )
  ), [wasteDonation, daysSinceLastDonation, profile, userData]);
}