import { ChangeEvent, useState } from "react";
import { InputParams } from "../types/FormInterface";
import { CiMinimize1 } from "react-icons/ci";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

interface FormInputParams extends InputParams {
	value: string;
	showValidation?: boolean;
	isPasswordInput?: boolean;
	showPassword?: boolean;

	handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
	togglePasswordVisibility: () => void;
}

function FormInput(prop: FormInputParams) {
	const [focused, setFocused] = useState<boolean>(false);

	const {
		id,
		label,
		value,
		errors,
		handleChange,
		showValidation = true,
		isPasswordInput = false,
		showPassword = false,
		togglePasswordVisibility,
		...inputProps
	} = prop;

	const showToggleFor = ["password", "currentPassword"].includes(inputProps.name);

	const handleBlur = () => {
		if (value.trim() !== "" && showValidation) {
			setFocused(true);
		}
	};

	return (
		<div className="form-wrapper">
			<label>{label}</label>
			<div className="input-wrapper">
				<input
					{...inputProps}
					value={value}
					onChange={handleChange}
					onBlur={handleBlur}
					onFocus={() => {
						inputProps.name === "confirmPassword" && showValidation && setFocused(true)
					}}
					data-was-focused={(focused && showValidation).toString()}
				/>
				{(isPasswordInput && showToggleFor) && (
					<button
						type="button"
						className="password-toggle"
						onClick={togglePasswordVisibility}
						aria-label={showPassword ? "Hide password" : "Show password"}
					>
						{showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
					</button>
				)}
				{showValidation && (
					<ul className="info-box">
						{errors.map((err, i) => (
							<li key={i}>{err}</li>
						))}
						<button
							type="button"
							className="close-info"
							onClick={() => setFocused(false)}
						>
							<CiMinimize1 />
						</button>
					</ul>
				)}
			</div>
		</div>
	);
}

export default FormInput;