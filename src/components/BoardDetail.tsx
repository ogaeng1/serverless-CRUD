import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { API, Auth } from "aws-amplify";
import Swal from "sweetalert2";
import Button from "./ui/Button";
import { ItemDataProps } from "../@type/type";
import Loading from "./ui/Loading";

const BoardDetail = () => {
	const [userName, setUserName] = useState<string | null>(null);
  const [data, setData] = useState<ItemDataProps>();
	const [editMode, setEditMode] = useState(false);
	const [loading, setLoading] = useState(false);
	const [editTitle, setEditTitle] = useState("");
	const [editContent, setEditContent] = useState("");
	const { id } = useParams();
	const navigate = useNavigate();

	const onDeleteBoard = async () => {
		Swal.fire({
			title: "정말 삭제하시겠습니까?",
			text: "삭제한 게시글은 되돌릴 수 없습니다.",
			icon: "warning",
			showCancelButton: true,
			confirmButtonText: "삭제",
			cancelButtonText: '취소',
			iconColor: "#F24E1E"
		}).then(async (result) => {
			if (result.isConfirmed) {
				try {
					await API.del("boardapi", `/board/${id}`, []);
					Swal.fire({
						title: "삭제 완료",
						icon: "success"
					}).then((result) => {
						if(result.isConfirmed) navigate("/")
					})
				} catch (err) {
					Swal.fire("삭제 실패", "error")
				}
			}
		})
	}

	const onUpdateBoard = async () => {
    try {
      await API.patch("boardapi", `/board/${id}`, {
        body: { title: editTitle, content: editContent },
      });
      Swal.fire({
        title: "수정 완료",
        icon: "success"
      }).then(async (result) => {
        if(result.isConfirmed) {
					setEditMode(false);
					const updatedData = await API.get("boardapi", `/board/${id}`, {});
					setData(updatedData.data.Item);
				}
      })
    } catch (err) {
      Swal.fire("수정 실패", "error")
    }
  }

	useEffect(() => {
		setLoading(true);
		Auth.currentAuthenticatedUser().then(user => setUserName(user.username))
    const fetchData = async () => {
      const result = await API.get("boardapi", `/board/${id}`, {});
			setData(result.data.Item);
			setLoading(false);
    };
    fetchData();
  }, []);

	return (
		<>
			{loading && <Loading />}
			<div className="detail__container">
				<section className="detail__header">
					{editMode ? (
						<input className="edit__title" value={editTitle} onChange={e => setEditTitle(e.target.value)} />
					) : (
						<div className="detail__title">{data?.title}</div>
					)}
					<div className="detail__info">
						<div className="detail__left">
							<span>{data?.createdAt.split("T")[0]}</span>
							<span>{data?.user}</span>
						</div>
						<div className="detail__right">
							<span className="detail__view">
								<span>👁‍🗨</span>
								<span>{data?.viewCount}</span>
							</span>
						</div>
					</div>
				</section>
				<section className="detail__body">
					{editMode ? (
						<textarea className="edit__content" value={editContent} onChange={e => setEditContent(e.target.value)} />
					) : (
						<p>{data?.content}</p>
					)}
				</section>
				<div className="detail__bottom">
					<Button text="목록으로" onClick={() => navigate("/")}></Button>
					{(userName === data?.user || userName === "관리자계정") && (
						<div className="detail__button">
							{editMode ? (
								<>
									<Button text="저장" onClick={onUpdateBoard}></Button>
									<Button text="취소" onClick={() => setEditMode(false)}></Button>
								</>
							) : (
								<>
									<Button text="수정" onClick={() => setEditMode(true)}></Button>
									<Button text="삭제" onClick={onDeleteBoard}></Button>
								</>
							)}
						</div>
					)}
				</div>
			</div>
		</>
	)
}

export default BoardDetail;