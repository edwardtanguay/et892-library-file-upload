export interface IBook {
	_id: string;
	title: string;
	authors: string[];
	pages: number;
	available: boolean;
}

export interface IUser {
	_id: string;
	login: string;
	firstName: string;
	lastName: string;
	accessGroups: string;
	email: string;
}

export interface ILoginFormData {
	login: string;
	password: string;
	message: string;
}

export const initialLoginformData = {
	login: "",
	password: "",
	message: "",
};

export interface ICurrentUser {
	fullName: string;
	accessGroups: string;
	login: string;
	email: string;
	imageExists: boolean;
}

export const initialCurrentUser: ICurrentUser = {
	fullName: "",
	accessGroups: "",
	login: "",
	email: "",
	imageExists: false
};

export interface IFileItem {
	firstName: string;
	lastName: string;
	login: string;
	email: string;
	fileName: string;
	iconPathAndFileName: string;
}

export interface IFormFields {
	firstName: string;
	lastName: string;
	login: string;
	email: string;
}

export const _initialFormFields = {
	firstName: "",
	lastName: "",
	login: "",
	email: "",
};

export interface IUploadFile {
	file: File | null;
	preview: string;
}

export const _initialUploadFile: IUploadFile = {
	preview: "",
	file: null,
};
