import { ButtonProps } from "../../@type/type";

const Button = ({ children, text, className, type, onClick, disabled }: ButtonProps) => {
	return (
		<button className={className} type={type} disabled={disabled} onClick={onClick}>{children || text}</button>
	)
}

export default Button;