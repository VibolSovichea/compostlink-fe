import ProfilePreviewCard from "@/components/home/profile-preview-card";
import NewsCard from "@/components/home/news-card";
import { User } from "@/redux/slices/data.types";

interface UserHomePageProps {
  userData: User
}

const UserHomePage = ({ userData }: UserHomePageProps) => {

  return (
    <>
      <ProfilePreviewCard points={userData.totalPoint} />
      <NewsCard />
      <NewsCard />
      <NewsCard />
      <NewsCard />
      <NewsCard />
    </>
  )
}

export default UserHomePage;
