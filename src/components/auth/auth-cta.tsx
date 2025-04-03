"use client";

import React from "react";
import MButton from "@/components/m-ui/m-button"

interface AuthCTAProps {
  title: string;
  label: string;
  onClick: () => void;
}

const AuthCTA:React.FC<AuthCTAProps> = ({title, label, onClick}) => {

  return (
    <div className="text-center text-text_dark">
      <p>{title}</p>
      <MButton 
        className="bg-inherit shadow-none hover:bg-inherit text-base text-primary font-bold"
        onClick={onClick}>
          {label}
      </MButton>
    </div>
  )
}

export default AuthCTA;
