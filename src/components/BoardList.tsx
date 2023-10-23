import { API } from "aws-amplify";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface ItemDataProps {
	id: string
	title: string
	content?: string
	user: string
	createdAt: string
	viewCount: number
}

const BoardList = () => {
	const [data, setData] = useState<ItemDataProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await API.get("boardapi", "/board", []);
      setData(result.data.Items);
    };
    fetchData();
  }, []);

	return (
		<div className="list__container">
			{data.map((list) => (
				<div key={list.id} className="list__info">
					<Link to={`/board/${list.id}`} className="list__title">
						{list.title}
					</Link>
					<span className="list__writer">{list.user}</span>
					<span className="list__time">{list.createdAt}</span>
					<span className="list__view">{list.viewCount}</span>
				</div>
			))}
		</div>
	)
}

export default BoardList;