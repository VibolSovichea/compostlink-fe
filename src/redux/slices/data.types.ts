export interface User {
  id: number;
  name: string;
  role: UserRole;
  email: string;
  totalPoint: number;
  pointHistory?: PointHistory[];
}

export type UserRole = "User" | "Facility";
export interface WasteDonation {
  facilityId: number;
  userId: number;
  wasteType: string;
  weight: number;
  pointsAwarded: number;
  donationCount?: number;
  totalWeight?: number;
  donations?: Donation[];
}

export interface Donation {
  donatedAt: string;
  facilityName: string;
  id: number;
  pointsAwarded: number;
  status: string;
  wasteType: string;
  weight: number;
}

export interface Location {
  id?: string;
  latitude: number;
  longitude: number;
  address?: string;
  facilityId?: number;
}

export type RewardStatus = "Active" | "Inactive" | "Out of Stock";
export interface Reward {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  pointRequired: number;
  stockQuantity: number;
  status: RewardStatus;
}

export type RedemptionStatus = "Active" | "Inactive";

export interface Redemption {
  id?: number;
  userId?: number;
  rewardId?: number;
  pointSpent: number;
  status: RedemptionStatus;
}

export interface PointHistory {
  id: number;
  amount: number;
  points: number;
  createdAt: string;
}

export interface Reward {
  id: number,
  title: string,
  description: string,
  imageUrl: string,
  pointRequired: number,
  stockQuantity: number,
  redemptionId: number,
}
