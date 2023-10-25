import "../../styles/ui.scss";

const Loading = () => {
	return (
		<div className="loading__container">
			<img src="/assets/loading.gif" alt="로딩" />
			<p>불러오는중...</p>
		</div>
	)
}

export default Loading;