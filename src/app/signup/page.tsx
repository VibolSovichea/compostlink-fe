"use client";

import { useRouter } from "next/navigation";
import MButton from "@/components/m-ui/m-button";
import AuthCTA from "@/components/auth/auth-cta";
import Base from "@/components/shared/base-layout";
import SignUpForm from "@/components/auth/signup-form";


export default function SignUpPage() {
  const router = useRouter();
  return (
    <Base insideClassName="gap-base" hideNavigation={true}>
      <div className="text-title text-black flex flex-col items-center py-double mt-16">
        <div className="text-center">Welcome Aboard</div>
      </div>

      <div className="flex flex-col gap-6 w-full max-w-md">
        <input
          type="text"
          placeholder="Username / Phone Number / Email"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-primary"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-primary"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-primary"
        />
      </div>

      <div className="flex-grow">
      </div>
      
      <div className="w-full">
        <div className="flex-1 flex-col gap-medium w-full max-w-md">
          <MButton
            variant="primary"
            full
            onClick={() => router.push("/signin")}
          >
            Sign Up
          </MButton>
        </div>
        
        <div className="text-center mt-4">
          <a href="/signin" className="text-blue-500">Already a member?</a>
        </div>
      </div>
      <SignUpForm />
      <AuthCTA
        title="Already a member?"
        label="Sign In"
        onClick={() => router.push("/signin")}
      />
    </Base>
  );
}
