"use client";

import Base from "@/components/shared/base-layout";
import MBottomNavigation from "@/components/m-ui/m-bottom-navigation";
import Image from "next/image";
import Logo from "@/../public/assets/compostlink.png";
import Notification from "@/../public/assets/images/bell.png";
import { useState, useEffect } from "react";
import MapComponent from "@/components/shared/map";

export default function RewardPage() {
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

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const handleNext = () => {
    console.log("Latitude:", latitude, "Longitude:", longitude);
  };

  return (
<Base insideClassName="items-center min-h-screen overflow-y-auto" hideNavigation={false}>
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
        <div className="flex flex-col items-center p-4 gap-4 w-full pt-20"> {/* Prevent overlap */}
          
          {/* User Info Card */}
          <div className="bg-white text-black p-4 rounded-2xl shadow-md w-80 ">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm">Hello, John</p>
                <p className="font-bold">Your Point: 0</p>
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

            <div className="relative mt-2">
              <div className="w-full bg-gray-300 h-2 rounded-full"></div>
              <div
                className="absolute top-0 left-0 bg-green-500 h-2 rounded-full"
                style={{ width: "50%" }}
              ></div>
              <p className="text-xs text-center mt-1">5/10 Kg</p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center bg-cream p-4 rounded-xl w-80">
        <div className="w-80 max-w-md text-black">
          <label className="block text-sm font-medium text-gray-700">Latitude</label>
          <input
            type="text"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            className="w-full p-2 mt-1 border border-gray-300 rounded bg-gray-100"
            placeholder="Enter latitude"
          />
          
          <label className="block mt-4 text-sm font-medium text-gray-700">Longitude</label>
          <input
            type="text"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            className="w-full p-2 mt-1 border border-gray-300 rounded bg-gray-100"
            placeholder="Enter longitude"
          />
          
          <div className="w-full h-64 mt-6 flex items-center justify-center text-gray-600">
            <MapComponent />
          </div>

          
          <button
            onClick={handleNext}
            className="w-full mt-8 p-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600"
          >
            Next
          </button>
        </div>
      </div>
          </div>
          {/* Bottom Navigation */}
      <MBottomNavigation />
  </Base>
    );
  }
