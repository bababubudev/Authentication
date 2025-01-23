import { ChangeEvent, FormEvent, useState } from "react";
import { useAuth } from "../context/AuthContext";
import FormInput from "./FormInput";
import { InputParams } from "../types/FormInterface";
import Modal from "./Modal";
import { ModalType } from "../types/Modal";

interface PasswordFormValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface ChangePasswordProp {
  isModalShown: boolean;
  setIsModalShown: (value: boolean) => void;
}

const PASSWORD_REGEX = "^(?=.*\\d)(?=.*[@$!%*?&.])[A-Za-z\\d@$!%*?&.]{8,}$";

function ChangePassword({ isModalShown, setIsModalShown }: ChangePasswordProp) {
  const { changePassword } = useAuth();

  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string | null>(null);

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
      pattern: serverError ? "^(?!.*).+$" : undefined,
      errors: [
        serverError || "Please enter your current password"
      ]
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

  const isSubmissionDisabled = Object.values(formValues).some(value => value.trim() === "");

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();

    try {
      await changePassword(
        formValues.currentPassword,
        formValues.newPassword,
        formValues.confirmPassword
      );

      setFormValues({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });

      setServerError(null);
      setIsModalShown(false);
    }
    catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Password change failed";
      setServerError(errorMessage);
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    setServerError(null);
    setFormValues({ ...formValues, [e.target.name]: e.target.value.trim() });
  }

  function togglePasswordVisibility() {
    setPasswordVisible(prev => !prev);
  }

  return (
    <Modal
      isDisabled={isSubmissionDisabled}
      isOpen={isModalShown}
      dialogue="Change password"
      type={ModalType.form}
      description={
        <>
          {inputObjects.map((input) => {
            const isPasswordInput = ["newPassword", "confirmPassword", "currentPassword"].includes(input.name);
            const showForceErrors = input.name === "currentPassword";
            const inputType = isPasswordInput && passwordVisible ? "text" : input.type;

            return (
              <FormInput
                key={input.id}
                {...input}
                type={inputType}
                value={formValues[input.name as keyof typeof formValues]}
                handleChange={handleChange}
                forceValidatedError={showForceErrors ? !!serverError : false}
                showValidation={true}
                showPassword={passwordVisible}
                isPasswordInput={isPasswordInput}
                togglePasswordVisibility={togglePasswordVisibility}
              />
            );
          })}
        </>
      }
      onSubmitForm={handleSubmit}
      onCancel={() => setIsModalShown(false)}
    />
  );
}

export default ChangePassword;