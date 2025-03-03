"use client";

import Base from "@/components/shared/base-layout";
import { useAuth } from "@/provider/authProvider";
import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";
import Image from "next/image";
import Compost from "@/../public/assets/images/compost.png";
import Logo from "@/../public/assets/compostlink.png";
import Notification from "@/../public/assets/images/bell.png";
import { useState, useEffect } from "react";


export default function ProfilePage() {
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackground(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const { user, logout } = useAuth();

  const menuItems = [
    { title: "Edit Profile", href: "/profile/edit" },
    { title: "Point History", href: "/profile/points" },
    { title: "Legal Policy", href: "/legal" },
    { title: "Language", href: "/language" },
    { 
      title: "Log Out", 
      href: "#",
      onClick: () => {
        logout();
        window.location.href = "/auth/signin";
      }
    },
  ];

  return (
    <Base insideClassName="items-center gap-half" hideNavigation={false}>
      {/* Sticky Header */}
      <div
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          showBackground ? "bg-white shadow-md" : "bg-white"
        }`}
      >
        <div className="flex justify-between items-center px-4 py-2 w-80 mx-auto">
          <Image src={Logo} alt="Logo" width={70} height={70} />
          <Image src={Notification} alt="Notification" width={30} height={25} />
        </div>
      </div>

      {/* Content Wrapper */}
      <div className="flex-grow flex flex-col items-center p-4 pt-20"> {/* Adjusted padding */}
        {/* User Info Card */}
        <div className="bg-white text-black p-4 rounded-2xl shadow-md w-80 max-w-80">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm">Hello, John</p>
              <p className="font-bold">Your Point: 0</p>
            </div>
            {/* Profile Image */}
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-300 shadow-md">
              <img
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" // Replace with actual image URL
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

        {/* Add margin to reduce gap between user info card and menu items */}
        <div className="flex flex-col gap-4 p-4 mt-6"> {/* Adjusted margin */}
          {menuItems.map((item, index) => (
            <div key={index}>
              {item.onClick ? (
                <button
                  className="w-full py-4 flex justify-between items-center border-b border-gray-100"
                  onClick={item.onClick}
                >
                  <span className="text-lg text-black">{item.title}</span>
                  <FiChevronRight className="w-6 h-6 text-gray-400" />
                </button>
              ) : (
                <Link href={item.href}>
                  <div className="w-80 py-4 flex justify-between items-center border-b border-gray-100">
                    <span className="text-lg text-black">{item.title}</span>
                    <FiChevronRight className="w-6 h-6 text-gray-400" />
                  </div>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </Base>

  );
}