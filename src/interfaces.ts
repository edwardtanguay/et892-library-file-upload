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
	login: '',
	password: '',
	message: ''
}

export interface ICurrentUser {
	fullName: string;
	accessGroups: string;
}

export const initialCurrentUser:ICurrentUser = {
	fullName: '',
	accessGroups: ''
}