type Props = {
	text: string
	className?: string
	type?: "button" | "submit"
	onClick?: () => void;
}

const Button = ({ text, className, type, onClick }: Props) => {
	return (
		<button className={className} type={type} onClick={onClick}>{text}</button>
	)
}

export default Button;