import { useEffect, useState } from 'react';
import { API } from 'aws-amplify';
import { UserInfoProps } from '../@type/type';
import Button from "./ui/Button";
import Modal from "./ui/Modal";
import Loading from './ui/Loading';

type modalProps = {
	userListModal: boolean
	setUserListModal: (value: boolean) => void
}

const UserList = ({ userListModal, setUserListModal }: modalProps) => {
	const [userList, setUserList] = useState<UserInfoProps[]>([])
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		setLoading(true);
    const fetchUsers = async () => {
      try {
        const data = await API.get('userapi', '/user', []);
				setUserList(data);
				setLoading(false);
      } catch (err) {
        console.error("에러", err);
      }
    };
    fetchUsers();
  }, []);

	if (loading) {
		return (
			<Modal>
				<Loading />
			</Modal>
		)
	} else {
			return (
				<Modal>
					<div className="user__list">
						<div className="user__list__head">
							<span className="list__head__nickname">닉네임</span>
							<span className="list__head__signup">가입일자</span>
							<span className="list__head__email">이메일</span>
						</div>
						<section className="list__info__container">
							{userList.map((user) => {
								const emailAttribute = user.Attributes.find(attr => attr.Name === 'email');
								const email = emailAttribute ? emailAttribute.Value : '이메일 없음';
								return (
									<p key={user.UserCreateDate} className="user__list__info">
										<span className="list__info__nickname">{user.Username}</span>
										<span className="list__info__signup">{user.UserCreateDate.split("T")[0]}, {user.UserCreateDate.split("T")[1].split(".")[0]}</span>
										<span className="list__info__email">{email}</span>
									</p>
								);
							})}
						</section>
						<div className="user__list__box">
							<Button className="user__list__confirm__button" text="확인" onClick={() => setUserListModal(!userListModal)}></Button>
						</div>
					</div>
				</Modal>
			)
		}
	}

export default UserList;