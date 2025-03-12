"use client";

import { useState } from "react";
import router from "next/router";
import MButton from "@/components/m-ui/m-button";

export default function CompostFacilityForm() {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    contact: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Form submitted: ${JSON.stringify(formData)}`);
  };

  return (
    <div className="flex items-center justify-center w-full h-screen bg-white">
      <div className="bg-cream w-full max-w-md p-8 rounded-xl ">
        <h1 className="text-center text-2xl font-semibold mb-20 text-black">
          Compost Facility
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Input */}
          <div>
            <label className="block text-black mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter name"
              className="w-full p-3  rounded-xl bg-gray-200/100 text-black"
              required
            />
          </div>

          {/* Address Input */}
          <div>
            <label className="block text-black mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter address"
              className="w-full p-3  rounded-xl bg-gray-200/100 text-black"
              required
            />
          </div>

          {/* Contact Input */}
          <div>
            <label className="block text-black mb-1">Contact Info</label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="Enter contact info"
              className="w-full p-3  rounded-xl bg-gray-200/100 text-black"
              required
            />
          </div>

          {/* Confirm Button */}
          <MButton
            variant="primary"
            full
            onClick={() => router.push("/facility")}
            type="submit"
            className="w-80 bg-green-600 text-white rounded-xl mt-4 text-lg font-medium"
          >
            Save
          </MButton>
        </form>
      </div>
    </div>
  );
}
