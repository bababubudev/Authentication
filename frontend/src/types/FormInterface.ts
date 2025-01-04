export interface InputParams
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "id"> {
  id: number;
  label: string
  name: string;
  errors: string[];
}

export interface LoginInterface {
  email: string;
  password: string;
}

export interface SignUpInterface extends LoginInterface {
  username: string;
  confirmPassword: string;
  [key: string]: string;
}