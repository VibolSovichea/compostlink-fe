import ProfilePreviewCard from "@/components/home/profile-preview-card";
import NewsCard from "@/components/home/news-card";
import { User } from "@/redux/slices/data.types";
import MButton from "@/components/m-ui/m-button";
import QrModal from "../qr-modal";
import { useEffect, useState } from "react";
import StatisticCard from "../statistc-card";
import BlogModal from "../blog-modal";
import { blogs } from "@/utils/mockData";
import AchievementDialog, { ACHIEVEMENT_LEVELS } from "@/components/shared/achievement-dialog";
import { useGetWasteDonationByUserIdQuery } from "@/redux/slices/dataSlice";
import Loading from "@/components/shared/loading";

interface UserHomePageProps {
  userData: User;
}

interface Achievement {
  threshold: number;
  badge: string;
  confirmedAt: string;
}

interface AchievementStatus {
  achievements: Achievement[];
  lastConfirmedWeight: number;
  lastConfirmedAt: string;
}

const UserHomePage = ({ userData }: UserHomePageProps) => {
  const [open, setOpen] = useState(false);
  const [blogOpen, setBlogOpen] = useState(false);
  const [blogId, setBlogId] = useState<number | null>(null);
  const [achievementOpen, setAchievementOpen] = useState(false);
  const [currentAchievement, setCurrentAchievement] = useState<Achievement | null>(null);
  const { data: wasteDonation } = useGetWasteDonationByUserIdQuery(userData.id.toString());

  const handleConfirmAchievement = () => {
    if (!wasteDonation?.totalWeight || !currentAchievement) return;
    
    const storedStatus = localStorage.getItem("achievementStatus");
    const achievementStatus: AchievementStatus = storedStatus 
      ? JSON.parse(storedStatus)
      : { 
          achievements: [], 
          lastConfirmedWeight: 0, 
          lastConfirmedAt: "" 
        };

    const now = new Date().toISOString();
    
    const newStatus: AchievementStatus = {
      achievements: [
        ...achievementStatus.achievements,
        {
          threshold: currentAchievement.threshold,
          badge: currentAchievement.badge,
          confirmedAt: now
        }
      ],
      lastConfirmedWeight: wasteDonation.totalWeight,
      lastConfirmedAt: now
    };

    localStorage.setItem("achievementStatus", JSON.stringify(newStatus));
    setAchievementOpen(false);
    setCurrentAchievement(null);
  }
  
  const handleBlogOpen = (blogId: number) => {
    setBlogOpen(true);
    setBlogId(blogId);
  }

  useEffect(() => {
    if (!wasteDonation?.totalWeight) return;

    const storedStatus = localStorage.getItem("achievementStatus");
    const achievementStatus: AchievementStatus = storedStatus 
      ? JSON.parse(storedStatus)
      : { 
          achievements: [], 
          lastConfirmedWeight: 0, 
          lastConfirmedAt: "" 
        };

    const currentWeight = wasteDonation.totalWeight;
    
    const nextAchievement = ACHIEVEMENT_LEVELS.find(level => {
      const isHighEnough = currentWeight >= level.threshold;
      const notYetAchieved = !achievementStatus.achievements.some(
        a => a.threshold === level.threshold
      );
      return isHighEnough && notYetAchieved;
    });

    if (nextAchievement) {
      setCurrentAchievement(nextAchievement as Achievement);
      setAchievementOpen(true);
    }
  }, [wasteDonation]);

  return (
    <div className="flex flex-col gap-base mt-base">
      <ProfilePreviewCard points={userData.totalPoint} />
      <MButton
        variant="primary"
        full
        className="text-white"
        onClick={() => setOpen(true)}
      >
        Share your QR
      </MButton>
      <span className="flex items-center gap-2">
        <p className="text-text_dark text-sm font-bold">Statistic</p>
        <div className="w-full h-[1px] bg-gray-300"></div>
      </span>
      <StatisticCard userId={userData.id.toString()} role={"user"} />
      <span className="flex items-center gap-2">
        <p className="text-text_dark text-sm font-bold">Blogs</p>
        <div className="w-full h-[1px] bg-gray-300"></div>
      </span>
      <NewsCard icon="Flower" data={{
        title: blogs[0].title,
        description: blogs[0].paragraph_1,
      }} onClick={() => handleBlogOpen(blogs[0].id)} />
      {/* <NewsCard icon="LeafyGreen" data={{
        title: blogs[1].title,
        description: blogs[1].paragraph_1,
      }} onClick={() => handleBlogOpen(blogs[1].id)} />
      <NewsCard icon="Salad" data={{
        title: blogs[2].title,
        description: blogs[2].paragraph_1,
      }} onClick={() => handleBlogOpen(blogs[2].id)} /> */}

      <BlogModal
        open={blogOpen}
        onOpenChange={setBlogOpen}
        blogId={blogId ?? 0}
      />

      <QrModal
        open={open}
        onOpenChange={setOpen}
        id={userData.id.toString()}
        type="wastedonation"
      />

      <AchievementDialog
        open={achievementOpen}
        onClose={(confirmed) => {
          if (confirmed) {
            handleConfirmAchievement();
          } else {
            setAchievementOpen(false);
            setCurrentAchievement(null);
          }
        }}
        wasteProgress={wasteDonation?.totalWeight ?? 0}
        achievement={currentAchievement}
      />
    </div>
  );
};

export default UserHomePage;
