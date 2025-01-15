import { ChangeEvent, useState } from "react";
import { InputParams } from "../types/FormInterface";
import { CiMinimize1 } from "react-icons/ci";

interface FormInputParams extends InputParams {
	value: string;
	handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
	showValidation?: boolean;
}

function FormInput(prop: FormInputParams) {
	const [focused, setFocused] = useState<boolean>(false);
	const { id, label, value, errors, handleChange, showValidation = true, ...inputProps } = prop;

	const handleBlur = () => {
		if (value.trim() !== "" && showValidation) {
			setFocused(true);
		}
	};

	return (
		<div className="input-wrapper">
			<label>{label}</label>
			<input
				className="form-input"
				{...inputProps}
				{...(showValidation ? inputProps : {
					...inputProps,
					pattern: undefined,
					required: undefined
				})}
				value={value}
				onChange={handleChange}
				onBlur={handleBlur}
				onFocus={() => { inputProps.name === "confirmPassword" && showValidation && setFocused(true) }}
				data-was-focused={(focused && showValidation).toString()}
			/>
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
	);
}

export default FormInput;