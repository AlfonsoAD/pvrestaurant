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

export interface ListUser {
  id: number;
  last_login: string;
  is_superuser: boolean;
  username: string;
  first_name: string;
  last_name: string;
  is_staff: boolean;
  is_active: boolean;
  date_joined: string;
  email: string;
  number_employee: string;
  roles: string[];
  image: string;
}
