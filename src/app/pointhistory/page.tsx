"use client";

import Base from "@/components/shared/base-layout";
import PointHistory from "@/components/pointhistory/pointhistory-modal";
import { useAuth } from "@/provider/authProvider";

export default function PointHistoryPage() {
    return (
        <Base headerVariant="default">
            <PointHistory />
        </Base>
    );
}