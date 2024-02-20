import { ICurrentUser, IFormFields } from "./interfaces";

export const isMemberOfAccessGroup = (
	currentUser: ICurrentUser,
	accessGroup: string
) => {
	const accessGroupItems = currentUser.accessGroups
		.split(",")
		.map((m) => m.trim());
	return accessGroupItems.includes(accessGroup);
};

export const fillProfileFormFieldsWithCurrentUserFields = (
	formFields: IFormFields,
	currentUser: ICurrentUser
) => {
	const names = currentUser.fullName.split(" "); // TODO: refactor to send firstName/lastName from backend
	formFields.firstName = names[0];
	formFields.lastName = names[1];
	formFields.login = currentUser.login;
	formFields.email = currentUser.email;
};

export const getRandomCode = (): string => {
	let code = "";
	for (let i = 0; i < 10; i++) {
		code += Math.floor(Math.random() * 10);
	}
	return code;
};
