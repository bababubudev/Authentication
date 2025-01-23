import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import FormInput from "./FormInput";
import { InputParams, LoginInterface, SignUpInterface } from "../types/FormInterface";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const USERNAME_REGEX = "^[a-zA-Z0-9_\\-]{3,16}$";
const PASSWORD_REGEX = "^(?=.*\\d)(?=.*[@$!%*?&.])[A-Za-z\\d@$!%*?&.]{8,}$";

function UserAction() {
	const { isAuthenticated, user, login, register } = useAuth();

	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [serverError, setServerError] = useState<string | null>(null);
	const [isSignUp, setIsSignup] = useState<boolean>(false);

	const emptyLoginField: LoginInterface = useMemo(() => ({
		email: "",
		password: "",
	}), []);

	const emptySignUpField: SignUpInterface = useMemo(() => ({
		username: "",
		email: "",
		password: "",
		confirmPassword: ""
	}), []);

	const [formValues, setFormValues] = useState<SignUpInterface | LoginInterface>(emptySignUpField);

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
			errors: serverError
				? [serverError]
				: [
					"Must be 3-16 characters",
					"[ - ] or [ _ ] allowed",
					"No Special characters"
				],
		},
		{
			id: 2,
			label: isSignUp ? "Email" : "Username or email",
			name: "email",
			type: isSignUp ? "email" : "text",
			placeholder: "john.doe@example.com",
			required: true,
			errors: serverError
				? [serverError]
				: [
					"Invalid email address"
				],
		},
		{
			id: 3,
			label: "Password",
			name: "password",
			type: "password",
			placeholder: "Password",
			pattern: isSignUp ? PASSWORD_REGEX : undefined,
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

	useEffect(() => {
		setFormValues(isSignUp ? emptySignUpField : emptyLoginField);
		setServerError(null);
	}, [emptyLoginField, emptySignUpField, isSignUp]);

	const filteredInputs = inputObjects.filter(input => isSignUp || ["email", "password"].includes(input.name));

	async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
		e.preventDefault();
		const rawData = new FormData(e.target as HTMLFormElement);
		const data = Object.fromEntries(rawData.entries());

		try {
			if (isSignUp) {
				await register(
					data.username as string,
					data.email as string,
					data.password as string,
					data.confirmPassword as string
				);
			} else {
				await login(data.email as string, data.password as string);
			}

			setServerError(null);
		}
		catch (err) {
			const errorMessage = err instanceof Error ? err.message : "Password change failed";
			console.error(errorMessage);
			setServerError(errorMessage);
		}
	}

	function handleChange(e: ChangeEvent<HTMLInputElement>): void {
		setServerError(null);
		setFormValues({ ...formValues, [e.target.name]: e.target.value });
	}

	function togglePasswordVisibility() {
		setShowPassword(prev => !prev);
	}

	return (
		<div className="user-action">
			{!isAuthenticated ?
				<div className="logged-out">
					<form onSubmit={handleSubmit}>
						<h1 className="form-title">{isSignUp ? "Create new account" : "Sign in"}</h1>
						{filteredInputs.map((input) => {
							const isPasswordInput = ["password", "confirmPassword"].includes(input.name);
							const showForceErrors = ["username", "email"].includes(input.name);
							const inputType = isPasswordInput && showPassword ? "text" : input.type;

							return (
								<FormInput
									key={input.id}
									{...input}
									type={inputType}
									value={formValues[input.name as keyof typeof formValues]}
									handleChange={handleChange}
									forceValidatedError={showForceErrors ? !!serverError : false}
									showValidation={isSignUp}
									showPassword={showPassword}
									isPasswordInput={isPasswordInput}
									togglePasswordVisibility={togglePasswordVisibility}
								/>
							);
						})}
						<button type="submit">Submit</button>
					</form>
					<div className="linker" onClick={() => setIsSignup(prev => !prev)}>
						<p>
							{isSignUp
								? "Already have an account? Login here."
								: "Register a new account."}
						</p>
					</div>
				</div> :
				<div className="logged-in">
					<p>Logged in as {user?.username}</p>
					<Link className="logout-btn" to={"/dashboard"}>
						Dashboard
					</Link>
				</div>
			}
		</div >
	);
}

export default UserAction;