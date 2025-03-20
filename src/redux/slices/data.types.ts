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
}

export interface Location {
  id: string;
  latitude: number;
  longitude: number;
  address?: string;
  facilityId?: number;
}

export interface PointHistory {
  id: number;
  amount: number;
  points: number;
  createdAt: string;
}
