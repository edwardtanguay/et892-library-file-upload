import { useContext } from "react";
import { AppContext } from "../AppContext";
import { User } from "../components/User";
import * as tools from "../tools";

export const PageUsers = () => {
	const { users, currentUser } = useContext(AppContext);

	return (
		<>
			{tools.isMemberOfAccessGroup(currentUser, "administrators") ? (
				<>
					<p className="mb-4">There are {users.length} users:</p>
					<section className="flex gap-2 flex-wrap">
						{users.map((user) => {
							return <User user={user} key={user._id} />;
						})}
					</section>
				</>
			) : (<p>no access</p>)}
		</>
	);
};
