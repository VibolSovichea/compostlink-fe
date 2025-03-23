"use client";

import { useState } from "react";
import Base from "@/components/shared/base-layout";
import MButton from "@/components/m-ui/m-button";
import Image from "next/image";
import userLogo from "@/../public/assets/user.png";
import facilityLogo from "@/../public/assets/facility.png";
import { useRouter } from "next/navigation";
import { useAuth } from "@/provider/authProvider";

export default function RoleSelectionPage() {
  const router = useRouter();
  const { updateRole } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRoleSelection = async (role: "User" | "Facility") => {
    if (isLoading) return; // Prevent multiple clicks
    try {
      setError(null);
      setIsLoading(true);
      await updateRole(role); // Assuming this updates the role in context/provider
      router.push(role === "User" ? "/congratulations" : "/facilityform");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update role");
      console.error("Role selection error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Base insideClassName="items-center gap-base" hideNavigation={true}>
      <div className="text-title text-text_dark flex flex-col items-center py-double mt-16">
        <div className="text-center">What is your role?</div>
        <div className="text-center text-body text-gray-600 lowercase">
          You are both our hero!
        </div>
      </div>

      <div className="flex flex-col gap-6 w-full max-w-md">
        <div className="flex gap-3">
          {/* User Role Card */}
          <div
            className={`w-1/2 flex flex-col items-center gap-4 p-4 ${
              isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            } bg-gray-100 rounded-lg`}
            onClick={() => handleRoleSelection("User")}
          >
            <Image
              src={userLogo}
              alt="User Logo"
              width={100}
              height={100}
              className="object-contain"
              priority
            />
            <div className="text-center text-body text-text_dark">Generator</div>
          </div>

          {/* Facility Role Card */}
          <div
            className={`w-1/2 flex flex-col items-center gap-4 p-4 ${
              isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            } bg-gray-100 rounded-lg`}
            onClick={() => handleRoleSelection("Facility")}
          >
            <Image
              src={facilityLogo}
              alt="Facility Logo"
              width={100}
              height={100}
              className="object-contain"
              priority
            />
            <div className="text-center text-body text-text_dark">Facility</div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4">
            {error}
          </div>
        )}

        {/* Optional Bottom Buttons */}
        <div className="flex flex-col gap-4 w-full mt-6">
          <MButton
            variant="primary"
            full
            onClick={() => handleRoleSelection("Facility")}
            loading={isLoading}
            disabled={isLoading}
          >
            Facility
          </MButton>
          <MButton
            variant="secondary"
            full
            onClick={() => handleRoleSelection("User")}
            loading={isLoading}
            disabled={isLoading}
          >
            Generator
          </MButton>
        </div>
      </div>
    </Base>
  );
}
