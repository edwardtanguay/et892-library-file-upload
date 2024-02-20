import { IUser } from "../interfaces";

interface IProps {
	user: IUser;
}

export const User = ({ user }: IProps) => {
	return (
		<div className="bg-slate-300 p-3 w-[15rem] rounded">
			<p className="font-semibold">{user.firstName} {user.lastName}</p>
			<p>{user.email}</p>
		</div>
	);
};
