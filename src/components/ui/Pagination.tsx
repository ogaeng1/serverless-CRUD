import { PaginationProps } from "../../@type/type";
import Button from "./Button";

const Pagination = ({ currentPage, totalPages, nextPage, prevPage }: PaginationProps) => {
	return (
		<div className="pagination">
      <Button text="이전" onClick={prevPage} disabled={currentPage === 1}></Button>
      <span>{currentPage} / {totalPages}</span>
      <Button text="다음" onClick={nextPage} disabled={currentPage === totalPages}></Button>
    </div>
	)
}

export default Pagination;