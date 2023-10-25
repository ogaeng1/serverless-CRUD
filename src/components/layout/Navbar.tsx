import { WithAuthenticatorProps } from "@aws-amplify/ui-react";
import { useState } from "react";
import WriteForm from "../WriteForm";
import Button from "../ui/Button";
import UserList from "../UserList";

const Navbar = ({ user, signOut }: WithAuthenticatorProps) => {
	const [userListModal, setUserListModal] = useState(false);
	const [formModal, setFormModal] = useState(false);

	return (
		<>
			<div className="navbar">
				{user?.username === "관리자계정" &&
					<Button text="유저목록" onClick={() => setUserListModal(!userListModal)}></Button>
				}
				<Button text={user?.username === "관리자계정" ? "공지쓰기" : "글쓰기"} onClick={() => setFormModal(!formModal)}></Button>
				<span className="navbar__user">{user?.username}</span>님
				<Button text="로그아웃" className="navbar__logout" onClick={signOut}></Button>
			</div>
			{formModal && <WriteForm user={user} formModal={formModal} setFormModal={setFormModal} />}
			{userListModal && <UserList userListModal={userListModal} setUserListModal={setUserListModal} />}
		</>
	)
}

export default Navbar;