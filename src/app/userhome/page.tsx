"use client";

import Base from "@/components/shared/base-layout";
import MButton from "@/components/m-ui/m-button";
import Image from "next/image";
import Logo from "@/../public/assets/compostlink.png";
import Compost from "@/../public/assets/images/compost.png";
import Notification from "@/../public/assets/images/bell.png";
import { useAuth } from "@/provider/authProvider";

export default function UserHomePage() {
  const { user } = useAuth();

  const articles = [
    {
      id: 1,
      title: "How to Compost at Home",
      image: Compost,
    },
    {
      id: 2,
      title: "Benefits of Composting",
      image: Compost,
    },
    {
      id: 3,
      title: "Community Composting Guide",
      image: Compost,
    },
  ];

  return (
    <Base hideNavigation={false}>
      {/* Header with Logo and Notification */}
      <div className="flex justify-between items-center px-1">
        <Image src={Logo} alt="Logo" width={40} height={40} />
        <Image src={Notification} alt="Notification" width={20} height={20} />
      </div>

      {/* User Info Card */}
      <div className="bg-white rounded-2xl shadow-md mx-6 mt-4 px-1">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h2 className="text-2xl text-black">Hello, {user?.name || "John"}</h2>
            <p className="text-xl font-bold text-black">Your Point: {user?.points || 0}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-green-400" />
        </div>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="relative h-2 bg-gray-200 rounded-full">
            <div
              className="absolute left-0 h-full bg-green-400 rounded-full"
              style={{ width: "70%" }}
            />
          </div>
          <p className="text-right text-sm text-black mt-1">5/10 Kg</p>
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
      <div className="px-1 mt-6">
        <h2 className="text-xl font-semibold mb-4 text-black">News</h2>
        <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-200px)]">
          {articles.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-2xl shadow-sm p-4 cursor-pointer"
              onClick={() => alert(`View article: ${article.title}`)}
            >
              <div className="aspect-video relative mb-2 rounded-xl overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-medium text-black">{article.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </Base>
  );
}
