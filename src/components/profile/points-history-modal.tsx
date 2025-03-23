"use client";

import { useState, useEffect } from "react";
import { useGetUserPointHistoryQuery } from "@/redux/slices/dataSlice";
import Cookies from "js-cookie";

interface PointHistoryItem {
  id: number;
  amount: number;
  points: number;
  createdAt: string;
}

const mockData: PointHistoryItem[] = [
  { id: 1, amount: 100, points: 100, createdAt: "2021-01-01" },
  { id: 2, amount: -50, points: 50, createdAt: "2021-01-02" },
  { id: 3, amount: 200, points: 200, createdAt: "2021-01-03" },
];

export default function PointHistory() {
  const userId = Cookies.get("user_id");
  const { data: pointHistory, isLoading, error } = useGetUserPointHistoryQuery(userId || "");
  const [history, setHistory] = useState<PointHistoryItem[]>([]);

  useEffect(() => {
    if (pointHistory) {
      setHistory(pointHistory);
    }
  }, [pointHistory]);

  if (isLoading) return <div className="p-4 text-center">Loading point history...</div>;
  if (error) return <div className="p-4 text-center">Error loading point history</div>;

  return (
    <div className="flex flex-col gap-4 p-4">
      {mockData && mockData.length > 0 ? (
        <div className="divide-y divide-gray-100">
          {mockData.map((item) => (
            <div key={item.id} className="py-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold text-text_dark">{item.points}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className={`font-medium ${item.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {item.amount > 0 ? `+${item.amount}` : item.amount}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No point history available</p>
      )}
    </div>
  );
}
