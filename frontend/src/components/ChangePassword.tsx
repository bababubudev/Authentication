import { ChangeEvent, FormEvent, useState } from "react";
import { useAuth } from "../context/AuthContext";
import FormInput from "./FormInput";
import { InputParams } from "../types/FormInterface";

interface PasswordFormValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface ChangePasswordProp {
  isShown: boolean;
  setShown: (value: boolean) => void;
}

const PASSWORD_REGEX = "^(?=.*\\d)(?=.*[@$!%*?&.])[A-Za-z\\d@$!%*?&.]{8,}$";

function ChangePassword({ isShown, setShown }: ChangePasswordProp) {
  const { changePassword } = useAuth();
  const [formValues, setFormValues] = useState<PasswordFormValues>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const inputObjects: InputParams[] = [
    {
      id: 1,
      label: "Current Password",
      name: "currentPassword",
      type: "password",
      placeholder: "Enter your current password",
      required: true,
      errors: ["Please enter your current password"],
    },
    {
      id: 2,
      label: "New Password",
      name: "newPassword",
      type: "password",
      placeholder: "Enter new password",
      pattern: PASSWORD_REGEX,
      required: true,
      errors: [
        "Must be atleast 8 characters long",
        "Must contain atleast one digit",
        "Must contain atleast one special character",
      ],
    },
    {
      id: 3,
      label: "Confirm New Password",
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm new password",
      pattern: formValues.newPassword,
      required: true,
      errors: ["Password doesn't match"],
    },
  ];

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    try {
      await changePassword(formValues.currentPassword, formValues.newPassword);
      setFormValues({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
    }
    catch (err) {
      console.error(err);
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  }

  return (
    <div className={`user-action change-password ${isShown ? "shown" : "hidden"}`}>
      <form onSubmit={handleSubmit}>
        <button type="button" onClick={() => setShown(false)}>Cancel</button>
        <h1 className="form-title">Change Password</h1>
        {inputObjects.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={formValues[input.name as keyof typeof formValues]}
            handleChange={handleChange}
            showValidation={true}
          />
        ))}
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
}

export default ChangePassword;