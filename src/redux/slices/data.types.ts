export  interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  totalPoint: number;
}

export type UserRole = 'User' | 'Facility';