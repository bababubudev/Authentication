import { ChangeEvent, useState } from "react";
import { InputParams } from "../types/FormInterface";
import { CiMinimize1 } from "react-icons/ci";

interface FormInputParams extends InputParams {
	value: string;
	requiresvalidation: string;
	handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function FormInput(prop: FormInputParams) {
	const [focused, setFocused] = useState<boolean>(false);
	const { id, label, value, errors, handleChange, ...inputProps } = prop;

	const handleBlur = () => {
		if (value.trim() !== "") {
			setFocused(true);
		}
	};

	return (
		<div className="input-wrapper">
			<label>{label}</label>
			<input
				className="form-input"
				{...inputProps}
				value={value}
				onChange={handleChange}
				onBlur={handleBlur}
				onFocus={() => { inputProps.name === "confirmPassword" && setFocused(true) }}
				data-was-focused={prop.requiresvalidation === "true" && focused.toString()}
			/>
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
		</div>
	);
}

export default FormInput;