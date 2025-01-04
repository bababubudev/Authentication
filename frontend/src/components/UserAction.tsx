import { ChangeEvent, FormEvent, useState } from "react";
import FormInput from "./FormInput";
import { InputParams, LoginInterface, SignUpInterface } from "../types/FormInterface";

export const USERNAME_REGEX = "^[a-zA-Z0-9_\\-]{3,16}$";
export const PASSWORD_REGEX = "^(?=.*\\d)(?=.*[@$!%*?&.])[A-Za-z\\d@$!%*?&.]{8,}$";

function UserAction() {
	const [isSignUp, setIsSignup] = useState<boolean>(false);

	const emptyLoginField: LoginInterface = {
		username: "",
		password: "",
	};

	const emptySignUpField: SignUpInterface = {
		username: "",
		email: "",
		password: "",
		confirmPassword: ""
	};

	const [formValues, setFormValues] = useState<SignUpInterface | LoginInterface>(isSignUp ? emptySignUpField : emptyLoginField);

	const isFormIncomplete = Object.values(formValues).some((value) => value.trim() === "");

	const inputObjects: InputParams[] = [
		{
			id: 1,
			label: "Username",
			name: "username",
			type: "text",
			placeholder: "ex. John Doe",
			pattern: USERNAME_REGEX,
			autoComplete: "off",
			autoFocus: true,
			required: true,
			errors: [
				"Must be 3-16 characters",
				"[ - ] or [ _ ] allowed",
				"No Special characters"
			],
		},
		{
			id: 2,
			label: "Email",
			name: "email",
			type: "email",
			placeholder: "john.doe@example.com",
			required: true,
			errors: [
				"Invalid email address"
			],
		},
		{
			id: 3,
			label: "Password",
			name: "password",
			type: "password",
			placeholder: "Password",
			pattern: PASSWORD_REGEX,
			required: true,
			errors: [
				"Must be atleast 8 characters long",
				"Must contain atleast one digit",
				"Must contain atleast one special character",
			],
		},
		{
			id: 4,
			label: "Confirm password",
			name: "confirmPassword",
			type: "password",
			placeholder: "Confirm password",
			pattern: formValues.password,
			required: true,
			errors: [
				"Password doesn't match"
			],
		}
	];

	const filteredInputs = inputObjects.filter(input => isSignUp || ["username", "password"].includes(input.name));

	function handleSubmit(e: FormEvent<HTMLFormElement>): void {
		e.preventDefault();
		const rawData = new FormData(e.target as HTMLFormElement);
		const data = Object.fromEntries(rawData.entries());

		console.log(data);
	}

	function handleChange(e: ChangeEvent<HTMLInputElement>): void {
		setFormValues({ ...formValues, [e.target.name]: e.target.value });
	}


	return (
		<div className="user-action">
			<form onSubmit={handleSubmit}>
				<h1 className="form-title">{isSignUp ? "Create new account" : "Sign in"}</h1>
				{filteredInputs.map((input) => (
					<FormInput
						key={input.id}
						{...input}
						value={formValues[input.name as keyof typeof formValues]}
						requiresValidation={isSignUp}
						handleChange={handleChange}
					/>
				))}
				<button
					type="submit"
					disabled={isFormIncomplete}
				>
					Submit
				</button>
			</form>
			<div className="linker" onClick={() => setIsSignup(prev => !prev)}>
				<p>{isSignUp ? "Already have an account? Login here." : "Register a new account."}</p>
			</div>
		</div >
	);
}

export default UserAction;