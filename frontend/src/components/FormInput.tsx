import { ChangeEvent, useEffect, useState } from "react";
import { InputParams } from "../types/FormInterface";
import { CiMinimize1 } from "react-icons/ci";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

interface FormInputParams extends InputParams {
	value: string;
	forceValidatedError?: boolean;
	showValidation?: boolean;
	isPasswordInput?: boolean;
	showPassword?: boolean;

	handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
	togglePasswordVisibility: () => void;
}

function FormInput(prop: FormInputParams) {
	const [focused, setFocused] = useState<boolean>(false);
	const [isValid, setIsValid] = useState<boolean>(true);

	const {
		id,
		label,
		value,
		errors,
		handleChange,
		showValidation = true,
		forceValidatedError = false,
		isPasswordInput = false,
		showPassword = false,
		togglePasswordVisibility,
		...inputProps
	} = prop;

	const showToggleFor = ["password", "currentPassword"].includes(inputProps.name);
	const invalid = (!isValid || forceValidatedError) && focused && showValidation;

	const handleBlur = () => {
		if (value.trim() !== "" && showValidation) {
			setFocused(true);
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		handleChange(e);
		setIsValid(e.target.checkValidity());
	};

	useEffect(() => {
		if (forceValidatedError) {
			setFocused(true);
			setIsValid(false);
		}
	}, [forceValidatedError])

	return (
		<div className="form-wrapper">
			<label>{label}</label>
			<div
				className={`input-wrapper${invalid ? " invalid" : ""}`}
			>
				<input
					{...inputProps}
					value={value}
					onChange={handleInputChange}
					onBlur={handleBlur}
					onFocus={() => {
						if (inputProps?.name === "confirmPassword" && showValidation) {
							setFocused(true);
						}
					}}
				/>
				{(isPasswordInput && showToggleFor) && (
					<button
						type="button"
						className="password-toggle"
						onClick={togglePasswordVisibility}
						aria-label={showPassword ? "Hide password" : "Show password"}
						tabIndex={999}
					>
						{showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
					</button>
				)}
			</div>

			{showValidation && (
				<ul className="info-box">
					{errors.map((err, i) => (
						<li key={i}>{err}</li>
					))}
					<button
						type="button"
						className="close-info"
						onClick={() => setFocused(false)}
						tabIndex={999}
					>
						<CiMinimize1 />
					</button>
				</ul>
			)}
		</div>
	);
}

export default FormInput;