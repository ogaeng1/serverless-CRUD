import { API } from "aws-amplify";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ItemDataProps } from "../@type/type";
import Pagination from "./ui/Pagination";
import Loading from "./ui/Loading";

const BoardList = () => {
	const [data, setData] = useState<ItemDataProps[]>([]);
	const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
	const itemsPerPage = 15; // 한 페이지 당 아이템 개수
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
	const totalPages = Math.ceil(data.length / itemsPerPage); // 전체 페이지 수
	
	const nextPage = () => {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
		}
	};
	
	const prevPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	useEffect(() => {
		setLoading(true);
		const fetchData = async () => {
			const result = await API.get("boardapi", "/board", []);
			const sortedData = result.data.Items.sort((a: ItemDataProps, b: ItemDataProps) => {
				if (a.isAdmin && !b.isAdmin) {
					return -1;
				} else if (!a.isAdmin && b.isAdmin) {
					return 1;
				}
				return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
			});
			setData(sortedData);
			setLoading(false);
		};
		fetchData();
	}, []);

	if (loading) {
		return <Loading />
	} else {
		return (
			<>
				<div className="list__container">
					{currentItems.map((list) => (
						<div key={list.id} className={`list__info ${list.isAdmin ? "list__info__admin" : ""}`}>
							<Link to={`/board/${list.id}`} className="list__title">
							{list.isAdmin && <span style={{ color: "gray", fontSize: "18px", marginRight: "10px" }}>전체공지</span> }{list.title}
							</Link>
							<span className="list__writer">{list.user}</span>
							<span className="list__time">{list.createdAt.split("T")[0]}</span>
							<span className="list__view">{list.viewCount}</span>
						</div>
					))}
				</div>
				<footer>
					<Pagination currentPage={currentPage} totalPages={totalPages} nextPage={nextPage} prevPage={prevPage} />
				</footer>
			</>
		)
	}
}

export default BoardList;