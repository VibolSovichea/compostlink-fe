"use client";

import Base from "@/components/shared/base-layout";
import PointHistory from "@/components/profile/points-history-modal";

export default function PointHistoryPage() {
  return (
    <Base headerVariant="return-button" headerContent={{ pageTitle: "Point History" }} hideNavigation>
      <div className="text-title text-black flex flex-col items-center py-double mt-16">
        <div className="text-center">Points History</div>
      </div>
      <PointHistory />
    </Base>
  );
}