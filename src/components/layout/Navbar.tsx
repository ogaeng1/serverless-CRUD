import { WithAuthenticatorProps } from "@aws-amplify/ui-react";
import { useState } from "react";
import WriteForm from "../WriteForm";

const Navbar = ({ user, signOut }: WithAuthenticatorProps) => {
	const [formModal, setFormModal] = useState(false);

	return (
		<>
			<div className="navbar">
				<button onClick={() => setFormModal(!formModal)}>글쓰기</button>
				<span className="navbar__user">{user?.username}</span>님
				<button className="navbar__logout" onClick={signOut}>로그아웃</button>
			</div>
			<div className={`${formModal ? "modal-background" : ""}`}>
				{formModal && <WriteForm user={user} formModal={formModal} setFormModal={setFormModal} />}
			</div>
		</>
	)
}

export default Navbar;