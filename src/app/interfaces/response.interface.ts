import { UserLogin } from './user.interface';

export interface Response {
  ok: boolean;
  results: [] | any;
  message?: string;
  error?: any;
  data_error?: any;
}

export interface ResponseLogin {
  ok: boolean;
  results: {
    access: string;
    refresh: string;
    user: UserLogin[];
  };
}
