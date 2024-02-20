import { ICurrentUser } from "./interfaces";

export const isMemberOfAccessGroup = (currentUser:ICurrentUser, accessGroup: string) => {
	const accessGroupItems = currentUser.accessGroups.split(',').map(m => m.trim());
	return accessGroupItems.includes(accessGroup);
}