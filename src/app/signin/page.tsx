"use client";

import Base from "@/components/shared/base-layout";
import MButton from "@/components/m-ui/m-button";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();

  return (
    <Base insideClassName="items-center gap-half">
      <div className="text-title text-black flex flex-col items-center py-double mt-16">
        <div className="text-center">Welcome Back</div>
      </div>

      <div className="flex flex-col gap-medium w-full max-w-md">
        <input
          type="text"
          placeholder="Username / Phone Number / Email"
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="flex flex-col gap-medium w-full max-w-md">
        <MButton
          variant="primary"
          full
          onClick={() => router.push("/roleselection")}
        >
          Sign In
        </MButton>
      </div>

      <div className="text-center mt-4">
        <a href="/signup" className="text-blue-500">Not yet a member?</a>
      </div>
    </Base>
  );
}