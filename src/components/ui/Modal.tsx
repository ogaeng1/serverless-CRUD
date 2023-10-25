import { ChildrenProps } from "../../@type/type";
import "../../styles/ui.scss";

const Modal = ({ children }: ChildrenProps) => {
	return (
		<div className="modal">{children}</div>
	)
}

export default Modal;