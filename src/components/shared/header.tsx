import UserIcon from "@/../public/assets/icons/avatar-icon.svg";
import Image from "next/image";
import { ArrowLeft, Menu } from "lucide-react";
import { useRouter } from "next/navigation";

interface HeaderProps {
  username?: string;
  pageTitle?: string;
  variant?: "default" | "return-button";
  onClick?: () => void;
}

const ReturnButton = ({ pageTitle }: HeaderProps) => {
  const router = useRouter();

  return (
    <div className="sticky top-0 h-14 bg-primary shadow-lg">
      <div className="relative h-14 px-4 flex items-center">
        <button className="text-white absolute left-base" onClick={() => router.back()}>
          <ArrowLeft />
        </button>
        <span className="text-white text-sm flex-1 text-center font-bold">{pageTitle}</span>
      </div>
    </div>
  )
}

const Header = ({ username, pageTitle, variant = "default", onClick }: HeaderProps) => {
  return (
    <>
      {variant === "return-button" ? (
        <ReturnButton pageTitle={pageTitle} />
      ) : (
        <div className="flex h-14 bg-inherit items-center sticky top-0 z-10 bg-secondary gap-base px-base">
          <div className="flex items-center gap-2 flex-1" onClick={onClick}>
            <Image
              src={UserIcon}
              alt=""
              width={100}
              height={100}
              className="size-10"
            />
            <p className="text-primary text-sm">Welcome, <span className="font-bold">{username}</span></p>
          </div>
          <Menu className="text-primary size-6"/>
        </div>
      )}
    </>
  )
}

export default Header;