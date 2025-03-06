"use client";

import Base from "@/components/shared/base-layout";
import { useAuth } from "@/provider/authProvider";
import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";

export default function ProfilePage() {
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
      }
    },
  ];

  return (
    <Base>
      <div className="h-screen overflow-y-auto pb-20">
        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-sm m-4 p-6">
          <h2 className="text-2xl text-black">Hello, {user?.name || "User"}</h2>
          <p className="text-xl font-bold my-2 text-black">Your Point: {user?.points || 0}</p>
          
          <div className="my-4">
            {/* Custom Progress Bar */}
            <div className="relative h-2 bg-gray-200 rounded-full">
              <div 
                className="absolute left-0 h-full bg-green-400 rounded-full"
                style={{ width: '50%' }}
              />
            </div>
            <p className="text-right mt-1 text-sm text-black">5/10 Kg</p>
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex flex-col gap-4 p-4">
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
                  <div className="w-full py-4 flex justify-between items-center border-b border-gray-100">
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