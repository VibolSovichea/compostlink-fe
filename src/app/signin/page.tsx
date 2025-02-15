"use client";

import Base from "@/components/shared/base-layout";
import MButton from "@/components/m-ui/m-button";
import { useRouter } from "next/navigation";
import SignInForm from "@/components/auth/signin-form";
import AuthCTA from "@/components/auth/auth-cta";

export default function SignInPage() {
  const router = useRouter();

  return (
    <Base insideClassName="gap-base" hideNavigation={true}>
      <div className="text-title text-black flex flex-col items-center py-double mt-16">
        <div className="text-center">Welcome Back</div>
      </div>
      <SignInForm />
      <AuthCTA
        title="Not yet a member?"
        label="Sign Up"
        onClick={() => router.push("/signup")}
      />
    </Base>
  );
}