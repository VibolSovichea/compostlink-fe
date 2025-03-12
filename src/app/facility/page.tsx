"use client";

import { useState, useEffect } from "react";
import Base from "@/components/shared/base-layout";
import MButton from "@/components/m-ui/m-button";
import Image from "next/image";
import Logo from "@/../public/assets/compostlink.png";
import Compost from "@/../public/assets/images/compost.png";
import Notification from "@/../public/assets/images/bell.png";
import ScanQRButton from "@/components/shared/scan-qr-button";
import { FaArrowRight } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/provider/authProvider";

export default function UserHomePage() {
  const { user } = useAuth();
  const [showBackground, setShowBackground] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const router = useRouter(); // ✅ FIXED: Correct router import

  // Detect scroll direction and update state
  useEffect(() => {
    const handleScroll = () => {
      setShowBackground(window.scrollY > lastScrollY);
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const articles = [
    { id: 1, title: "How to Compost at Home", image: Compost },
    { id: 2, title: "Benefits of Composting", image: Compost },
    { id: 3, title: "Community Composting Guide", image: Compost },
  ];

  return (
    <Base insideClassName="items-center min-h-screen overflow-y-auto" hideNavigation={true}>
      
      {/* Sticky Header */}
      <div className={`fixed top-0 w-full z-50 transition-all duration-300 ${showBackground ? "bg-white shadow-md" : "bg-white"}`}>
        <div className="flex justify-between items-center px-4 py-2 w-80 mx-auto">
          <Image src={Logo} alt="Logo" width={70} height={70} />
          <Image src={Notification} alt="Notification" width={30} height={25} />
        </div>
      </div>

      {/* Content Wrapper */}
      <div className="flex flex-col items-center p-4 gap-4 w-full pt-20"> 
        
        {/* User Info Card */}
        <Link href="/edit-profile">
            <div className="bg-white text-black p-4 rounded-2xl shadow-md w-80 cursor-pointer">
                <div className="flex items-center justify-between">
                <div>
                    <p className="font-bold">Compost01</p>
                </div>
                {/* Profile Image */}
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-300 shadow-md">
                    <img
                    src="https://w0.peakpx.com/wallpaper/109/769/HD-wallpaper-anime-profile-monkey-d-luffy-luffy-portrait-thumbnail.jpg"
                    alt="Profile"
                    className="w-full h-full object-cover"
                    />
                </div>
                </div>
            </div>
        </Link>

        {/* Scan QR Button */}
        <ScanQRButton />

        {/* <div className="px-6 mt-8">
          <MButton
            variant="primary"
            full
            onClick={() => router.push("/scanform")}
            className="flex items-center justify-between px-6 py-4 rounded-xl bg-green-500 text-white shadow-lg"
          >
            <span className="text-lg font-medium">Scan QR</span>
            <span className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <ArrowRight className="text-green-500 w-5 h-5" />
            </span>
          </MButton>
        </div> */}

        {/* News Section */}
        <div className="px-1 mt-6 w-80">
          <h2 className="text-xl font-semibold mb-4 text-black">News</h2>
          <div className="space-y-4">
            {articles.map((article) => (
              <div
                key={article.id}
                className="bg-white rounded-2xl shadow-sm p-4 cursor-pointer"
                onClick={() => alert(`View article: ${article.title}`)}
              >
                <div className="aspect-video relative mb-2 rounded-xl overflow-hidden">
                  <Image src={article.image} alt={article.title} fill className="object-cover" />
                </div>
                <h3 className="font-bold text-black">{article.title}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Edit Profile Button (✅ Fixed Routing) */}
        <div className="px-6 mt-8">
          <MButton
            variant="primary"
            full
            onClick={() => router.push("/edit-profile")} // ✅ FIXED: Navigate instead of alert
            className="flex items-center justify-between px-6 py-4 rounded-xl bg-green-600 text-white relative shadow-lg"
          >
            <span className="text-lg font-medium">Edit Profile</span>
          </MButton>
        </div>

      </div>
    </Base>
  );
}
