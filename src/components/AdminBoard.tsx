import { useEffect, useState } from 'react';
import { API } from 'aws-amplify';

type Attribute = {
  Name: string;
  Value: string;
};

type UserInfoProps = {
	Username: string
	Attributes: Attribute[]
	UserCreateDate: string
	Value: string
}

const AdminBoard = () => {
	const [userList, setUserList] = useState<UserInfoProps[]>([])
	useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await API.get('userapi', '/user', []);
				setUserList(data);
      } catch (err) {
        console.error("에러", err);
      }
    };
    fetchUsers();
  }, []);

	return (
		<div>
			<ul>
			{userList.map((user) => {
				const emailAttribute = user.Attributes.find(attr => attr.Name === 'email');
				const email = emailAttribute ? emailAttribute.Value : '이메일 없음';
				return (
					<li key={user.UserCreateDate} style={{ display: "flex", gap: "10px" }}>
						<span>{user.Username}</span>
						<span>{user.UserCreateDate.split("T")[0]}, {user.UserCreateDate.split("T")[1].split(".")[0]}</span>
						<span>{email}</span>
					</li>
				);
			})}
			</ul>
		</div>
	)
}

export default AdminBoard;