export interface InputParams
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "id"> {
  id: number;
  label: string
  name: string;
  errors: string[];
}

export interface LoginInterface {
  username: string;
  password: string;
}

export interface SignUpInterface extends LoginInterface {
  email: string;
  confirmPassword: string;
  [key: string]: string;
}