import { WithAuthenticatorProps } from "@aws-amplify/ui-react";
import { useState } from "react";
import { API } from "aws-amplify";
import Button from "./ui/Button";

type modalProps = {
	formModal: boolean
	setFormModal: (value: boolean) => void
}

type WriteFormProps = WithAuthenticatorProps & modalProps

const WriteForm = ({ user, formModal, setFormModal }: WriteFormProps) => {
	const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const currentDate = new Date().toISOString().split("T")[0];
	
	const onAddBoard = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      body: {
				user: user?.username,
        title: title,
        content: content,
        createdAt: currentDate,
        viewCount: 0,
        like: 0
      }
    };
  
    await API.post("boardapi", "/board", data);
		setFormModal(!formModal)
  }
	return (
		<form onSubmit={onAddBoard} className="board__form">
			<section className="board__title">
				<label>제목</label>
				<input type="text" placeholder="제목을 입력하세요" value={title} 
					required maxLength={30} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
				/>
			</section>
			<section className="board__content">
				<label>내용</label>
				<textarea value={content} placeholder="내용을 입력하세요" onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)} />
			</section>
			<section className="board__button__box">
				<Button className="cancel__button" text="취소" onClick={() => setFormModal(!formModal)}></Button>
				<Button type="submit" className="submit__button" text="등록"></Button>
			</section>
		</form>

	)
}

export default WriteForm;