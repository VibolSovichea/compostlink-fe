"use client";

import Base from "@/components/shared/base-layout";
import Lottie from "react-lottie-player";
import { animations } from "@/utils/assets";

export default function StatisticPage() {
  return (
    <Base hideNavigation>
      <div className="relative">
        <div className="absolute flex items-center justify-center z-10 h-[90vh] overflow-hidden">
          <div className="absolute size-32 rounded-full blur-lg bg-primary/30 animate-pulse"/>
          <Lottie
            animationData={animations.birds}
            loop={true}
            play={true}
            style={{
              width: "100%",
              height: "30%",
            }}
            className="absolute"
          />

          <Lottie
            animationData={animations.treeOne}
            loop={false}
            play={true}
            style={{
              width: "100%",
              height: "100%",
              transform: "scale(2.5)"
            }}
          />
        </div>
      </div>
    </Base>
  )
}