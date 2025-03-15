"use client";

<<<<<<< HEAD
import { useState, useEffect } from "react";
import Base from "@/components/shared/base-layout";
import Image from "next/image";
import MButton from "@/components/m-ui/m-button";
import Logo from "@/../public/assets/compostlink.png";
import Notification from "@/../public/assets/images/bell.png";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { useAuth } from "@/provider/authProvider";
import { useRouter } from "next/navigation";

export default function LocationPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [showBackground, setShowBackground] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Detect scroll direction and update state
  useEffect(() => {
    const handleScroll = () => {
      setShowBackground(window.scrollY > lastScrollY);
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Compost data with images
  const compostData = [
    {
      id: 1,
      name: "Compost01",
      address: "Kandal Steung, Kandal",
      phone: "098765432345",
      image: "/assets/images/compost.png",
    },
    {
      id: 2,
      name: "Compost02",
      address: "St 21, Phnom Penh, Cambodia",
      phone: "0123456789",
      image: "/assets/images/compost.png",
    },
    {
      id: 3,
      name: "Compost03",
      address: "S'ang, Kandal",
      phone: "0976543210",
      image: "/assets/images/compost.png",
    },
    // {
    //   id: 4,
    //   name: "Compost04",
    //   address: "Ta Khmao, Phnom Penh",
    //   phone: "0123456789",
    //   image: "/assets/images/compost.png",
    // },
  ];

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
      <div className="flex flex-col items-center p-4 gap-4 w-full pt-20">
        
        {/* User Info Card */}
        <div className="bg-white text-black p-4 rounded-2xl shadow-md w-80">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm">Hello, {user?.name || "User"}</p>
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
            <div className="absolute top-0 left-0 bg-green-500 h-2 rounded-full" style={{ width: "50%" }}></div>
            <p className="text-xs text-center mt-1">5/10 Kg</p>
          </div>
        </div>

        {/* Find Compost Section */}
        <div className="w-full max-w-md">
          <h1 className="text-lg font-semibold text-gray-800 mb-2 text-center">Find Compost</h1>

          {/* Compost List */}
          <div className="mt-4 w-full space-y-4">
            {compostData.map((compost) => (
              <div key={compost.id} className="bg-white p-4 rounded-xl shadow-md flex items-center">
                
                {/* Compost Image */}
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image src={compost.image} alt={compost.name} width={48} height={48} />
                </div>

                {/* Compost Info */}
                <div className="flex-1">
                  <p className="font-bold text-gray-800">{compost.name}</p>
                  <div className="flex items-center text-sm text-gray-600">
                    <FaMapMarkerAlt className="text-green-600 mr-2" />
                    {compost.address}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <FaPhoneAlt className="text-green-600 mr-2" />
                    {compost.phone}
                  </div>
                </div>

                {/* Map Button */}
                <MButton
                  className="bg-green-500 text-white px-4 py-1 rounded-full shadow-md"
                  onClick={() => router.push(`/map/${compost.id}`)}
                >
                  Map
                </MButton>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Base>
  );
=======
import LocationList from "@/components/location/location-list";
import MButton from "@/components/m-ui/m-button";
import MDialog from "@/components/m-ui/m-dailog";
import Base from "@/components/shared/base-layout";
import { useDropOffLocationQuery, useProfileQuery } from "@/redux/slices/dataSlice";
import { Location } from "@/redux/slices/data.types";
import { useEffect, useMemo, useState } from "react";
import { Loader2 } from "lucide-react";
import ProfilePreviewCard from "@/components/home/profile-preview-card";
import Cookies from "js-cookie";

export default function LocationPage() {
  const userId = Cookies.get("user_id");
  const { data: userData } = useProfileQuery(userId || "");
  const { data: locations } = useDropOffLocationQuery();
  const [open, setOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  const onChooseLocation = () => {
    window.open(
      `https://www.google.com/maps?q=${selectedLocation?.latitude},${selectedLocation?.longitude}`,
      "_blank"
    );
  };
  
  const handleLocationSelect = (id: string, latitude: number, longitude: number) => {
    setSelectedLocation({ id, latitude, longitude });
    setOpen(true);
  };

  return useMemo(() => (
    <Base insideClassName="flex" headerVariant="default" headerContent={{ username: userData?.name }}>
      {locations ? (
        <>
          <div className="sticky top-0 z-10">
            <ProfilePreviewCard points={userData?.totalPoint || 0} />
          </div>
          <LocationList locations={locations} onSelect={handleLocationSelect} />
        </>
      ) : (
        <div className="h-[80vh] flex flex-col items-center justify-center">
          <Loader2 className="size-10 animate-spin text-primary" />
        </div>
      )}
      {selectedLocation && (
        <MDialog
          open={open}
          onOpenChange={(prev) => {
            setOpen(!prev);
            setSelectedLocation(null);
          }}
          header={{
            title: "Facility Name",
            description: "Facility Address",
          }}
          content={
            <div className="aspect-video size-full bg-gray-300/70 rounded-lg">
              <iframe
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1000!2d${selectedLocation?.longitude}!3d${selectedLocation?.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s${selectedLocation?.latitude}%2C${selectedLocation?.longitude}!2s${selectedLocation?.latitude}%2C${selectedLocation?.longitude}!5e0!3m2!1sen!2s!4v1`}
                referrerPolicy="no-referrer-when-downgrade"
                loading="lazy"
                className="size-full rounded-lg"
              />
            </div>
          }
          footer={
            <MButton variant="primary" full onClick={onChooseLocation}>
              Choose Location
            </MButton>
          }
        />
      )}
    </Base>
  ), [locations, selectedLocation, userData]);
>>>>>>> b2d8332293f54de6660db2830715b133ba9d42be
}
