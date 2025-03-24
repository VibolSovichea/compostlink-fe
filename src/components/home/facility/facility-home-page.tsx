import { User } from "@/redux/slices/data.types";
import MButton from "@/components/m-ui/m-button";
import NewsCard from "@/components/home/news-card";
import ScanQRButton from "@/components/shared/scan-qr-button";
import ProfilePreviewCard from "@/components/home/profile-preview-card";
import { QrCode } from "lucide-react";
import { MapPin } from "lucide-react";
import StatisticCard from "../statistc-card";
import BlogModal from "../blog-modal";
import { blogs } from "@/utils/mockData";
import { useState } from "react";

interface FacilityHomePageProps {
  userData: User
}

const FacilityHomePage = ({ userData }: FacilityHomePageProps) => {
  const url = window.location.origin;
  const [blogOpen, setBlogOpen] = useState(false);
  const [blogId, setBlogId] = useState<number | null>(null);

  const handleBlogOpen = (blogId: number) => {
    setBlogOpen(true);
    setBlogId(blogId);
  }

  return (
    <div className="flex flex-col gap-base mt-base">
      <ProfilePreviewCard points={userData.totalPoint} variant="facility" />
      <span className="flex items-center gap-2">
        <p className="text-text_dark text-sm font-bold">Statistic</p>
        <div className="w-full h-[1px] bg-gray-300"></div>
      </span>
      <StatisticCard />
      <span className="flex items-center gap-2">
        <p className="text-text_dark text-sm font-bold">Blogs</p>
        <div className="w-full h-[1px] bg-gray-300"></div>
      </span>
      <NewsCard icon="Flower" data={{
        title: blogs[0].title,
        description: blogs[0].paragraph_1,
      }} onClick={() => handleBlogOpen(blogs[0].id)} />
      <NewsCard icon="LeafyGreen" data={{
        title: blogs[1].title,
        description: blogs[1].paragraph_1,
      }} onClick={() => handleBlogOpen(blogs[1].id)} />
      {/* <NewsCard icon="Salad" data={{
        title: blogs[2].title,
        description: blogs[2].paragraph_1,
      }} onClick={() => handleBlogOpen(blogs[2].id)} /> */}

      <BlogModal
        open={blogOpen}
        onOpenChange={setBlogOpen}
        blogId={blogId ?? 0}
      />

      <div className="flex flex-col gap-base absolute bottom-base right-0 left-0 px-base">
        <div className="grid grid-cols-2 gap-base">
          <MButton
            className="text-text_light bg-primary rounded-lg h-12 w-full"
            onClick={() => { window.location.href = `${url}/location/register`; }}
          >
            <MapPin className="size-6" />
          </MButton>
          <ScanQRButton className="text-text_light bg-primary rounded-lg h-12 w-full" icon={<QrCode className="size-6" />} />
        </div>
      </div >
    </div>
  )
}

export default FacilityHomePage;
