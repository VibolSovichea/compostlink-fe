"use client"; 

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Ensure this matches your routing approach
import { useProfileQuery, useUpdateUserMutation } from "@/redux/slices/dataSlice";
import Cookies from "js-cookie";
import Base from "@/components/shared/base-layout";

export default function EditProfilePage() {
  const router = useRouter();
  const userId = Cookies.get("user_id");
  
  if (!userId) {
    console.error("User ID not found in cookies");
    return <Base headerVariant="default" headerTitle="Edit Profile">
      <div className="p-4 text-center text-red-600">User not authenticated</div>
    </Base>;
  }

  const { data: userData, isLoading } = useProfileQuery(userId);
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || "",
        email: userData.email || "",
        role: userData.role || "",
      });
    }
  }, [userData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      console.error("User ID not found");
      return;
    }

    try {
      await updateUser({
        id: Number(userId),
        name: formData.name,
        email: formData.email,
        // role: formData.role,
      }).unwrap();

      router.push("/profile");
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  if (isLoading) {
    return (
      <Base headerVariant="default" headerTitle="Edit Profile">
        <div className="p-4 text-center">Loading profile data...</div>
      </Base>
    );
  }

  return (
    <Base headerVariant="default" headerTitle="Edit Profile">
      <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm text-gray-600">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm text-gray-600">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="role" className="text-sm text-gray-600">
            Role
          </label>
          <input
            type="text"
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2"
            readOnly
          />
        </div>

        <button
          type="submit"
          disabled={isUpdating}
          className="bg-green-600 text-white py-3 rounded-md mt-4 hover:bg-green-700 disabled:bg-gray-400"
        >
          {isUpdating ? "Updating..." : "Save Changes"}
        </button>
      </form>
    </Base>
  );
}
