const BoardHeader = () => {
	return (
		<div className="board__head">
			<span className="head__title">제목</span>
			<span className="head__writer">작성자</span>
			<span className="head__date">작성일자</span>
			<span className="head__viewCount">조회수</span>
		</div>
	)
}

export default BoardHeader;