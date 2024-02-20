import { useContext } from "react";
import { Nav } from "./Nav";
import { AppContext } from "../AppContext";
import * as tools from "../tools";
import * as config from "../config";

export const Header = () => {
	const { currentUser } = useContext(AppContext);

	return (
		<>
			{config.isDebugging() && <div className="bg-black text-yellow-300 text-sm p-2 font-mono border-dashed border-red-800 border-4 mb-3 w-fit">CURRENT USER: {currentUser.fullName} - {currentUser.accessGroups} - {currentUser.imageExists ? 'image exists' : 'image does NOT exist'}</div>}
			<h1 className="text-3xl mb-3 text-slate-800 flex gap-3">
				<div>Library Site</div>
				{tools.isMemberOfAccessGroup(currentUser, "loggedInUsers") && (
					<div className="text-blue-950 bg-yellow-300 px-2 font-sans pb-1 rounded">
						{currentUser.fullName}
					</div>
				)}
			</h1>
			<Nav />
		</>
	);
};
