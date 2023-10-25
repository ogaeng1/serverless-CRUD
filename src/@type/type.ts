export type ChildrenProps = {
	children: React.ReactNode
}

export type ItemDataProps = {
	id: string
	title: string
	content: string
	user: string
	createdAt: string
	viewCount: number
	isAdmin?: boolean
}

type Attribute = {
  Name: string;
  Value: string;
};

export type UserInfoProps = {
	Username: string
	Attributes: Attribute[]
	UserCreateDate: string
	Value: string
}

export type ButtonProps = {
	text: string
	className?: string
	type?: "button" | "submit"
	onClick?: () => void;
	children?: React.ReactNode
	disabled?: boolean
}

export type PaginationProps = {
	currentPage: number
	totalPages: number
	nextPage: () => void
	prevPage: () => void
}