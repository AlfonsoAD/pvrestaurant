export interface UserLogin {
  id: number;
  username: string;
  email: string;
  roles: string[];
}

export interface User {
  id: number;
  email: string;
  username: string;
  first_name?: string;
  last_name?: string;
  roles: string[];
  image?: string;
}
