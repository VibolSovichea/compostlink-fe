"use client";

import { useState, useEffect } from "react";
import Base from "@/components/shared/base-layout";
import MButton from "@/components/m-ui/m-button";
import Image from "next/image";
import Logo from "@/../public/assets/compostlink.png";
import Compost from "@/../public/assets/images/compost.png";
import Notification from "@/../public/assets/images/bell.png";
import { useAuth } from "@/provider/authProvider";

export default function UserHomePage() {
  const { user } = useAuth();
  const [showBackground, setShowBackground] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Detect scroll direction and update state
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowBackground(true); // Scrolling down -> show background
      } else {
        setShowBackground(false); // Scrolling up -> hide background
      }
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
    <Base insideClassName="items-center min-h-screen overflow-y-auto" hideNavigation={false}>
      
      {/* Sticky Header */}
      <div
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          showBackground ? "bg-white shadow-md" : "bg-white" 
        }`}>
        <div className="flex justify-between items-center px-4 py-2 w-80 mx-auto">
          <Image src={Logo} alt="Logo" width={70} height={70} />
          <Image src={Notification} alt="Notification" width={30} height={25} />
        </div>
      </div>

      {/* Content Wrapper */}
      <div className="flex flex-col items-center p-4 gap-4 w-full pt-20"> {/* Prevent overlap */}
        
        {/* User Info Card */}
        <div className="bg-white text-black p-4 rounded-2xl shadow-md w-80">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm">Hello, John</p>
              <p className="font-bold">Your Point: 0</p>
            </div>
            {/* Profile Image */}
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-300 shadow-md">
              <img
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="relative mt-2">
            <div className="w-full bg-gray-300 h-2 rounded-full"></div>
            <div
              className="absolute top-0 left-0 bg-green-500 h-2 rounded-full"
              style={{ width: "50%" }}
            ></div>
            <p className="text-xs text-center mt-1">5/10 Kg</p>
          </div>
        </div>

        {/* Scan QR Button */}
        <div className="px-6 mt-8">
          <MButton
            variant="primary"
            full
            onClick={() => alert("Scan QR To Get Point")}
            className="flex items-center justify-between px-6 py-4 rounded-full bg-green-400 text-white"
          >
            <span className="text-lg">Scan QR To Get Point</span>
            {/* <span className="text-xl">➡️</span> */}
          </MButton>
        </div>

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
                <h3 className="font-bold text-black ">{article.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Base>
  );
}
