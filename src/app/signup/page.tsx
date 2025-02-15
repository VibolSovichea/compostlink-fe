"use client";

import { useRouter } from "next/navigation";

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
      <SignUpForm />
      <AuthCTA
        title="Already a member?"
        label="Sign In"
        onClick={() => router.push("/signin")}
      />
    </Base>
  );
}
