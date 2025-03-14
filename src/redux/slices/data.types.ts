export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  totalPoint: number;
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
  id?: string;
  latitude: number;
  longitude: number;
  address: string;
  facilityId: number;
}
