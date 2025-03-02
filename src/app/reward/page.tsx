"use client";

import Base from "@/components/shared/base-layout";
import MBottomNavigation from "@/components/m-ui/m-bottom-navigation";

export default function RewardPage() {
  return (
    <Base insideClassName="items-center gap-half" hideNavigation={true}>
      <div className="bg-cream min-h-screen flex flex-col justify-between w-full">
        {/* Content Wrapper */}
        <div className="flex-grow flex flex-col items-center p-4 gap-4">
          {/* Header */}
          <div className="w-full flex justify-between px-4 text-sm font-semibold">
            <span>LOGO</span>
            <span>Notification</span>
          </div>

          {/* User Info Card */}
          <div className="bg-white p-4 rounded-2xl shadow-md w-full max-w-md">
            <p className="text-sm">Hello, John</p>
            <p className="font-bold">Your Point: 0</p>
            <div className="relative mt-2">
              <div className="w-full bg-gray-300 h-2 rounded-full"></div>
              <div
                className="absolute top-0 left-0 bg-green-500 h-2 rounded-full"
                style={{ width: "50%" }}
              ></div>
              <p className="text-xs text-center mt-1">5/10 Kg</p>
            </div>
          </div>

          {/* Options */}
          <div className="flex gap-2 w-full justify-center">
            <button className="bg-green-500 text-white px-4 py-2 rounded-full">Opt1</button>
            <button className="bg-green-500 text-white px-4 py-2 rounded-full">Opt1</button>
            <button className="bg-green-500 text-white px-4 py-2 rounded-full">Opt1</button>
          </div>

          {/* Rewards List */}
          <div className="w-full max-w-md space-y-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="bg-white p-4 rounded-2xl shadow-md flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-300 rounded-lg"></div>
                <p className="text-lg font-semibold">Reward1</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Navigation */}
        <MBottomNavigation />
      </div>
    </Base>
  );
}
