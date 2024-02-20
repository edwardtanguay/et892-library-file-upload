/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useState } from "react";
import {
	IBook,
	ICurrentUser,
	IFileItem,
	IFormFields,
	ILoginFormData,
	IUploadFile,
	IUser,
	_initialFormFields,
	_initialUploadFile,
	initialCurrentUser,
	initialLoginformData,
} from "./interfaces";
import axios from "axios";
import * as tools from "./tools";

const backendUrl = "http://localhost:4211";

interface IAppContext {
	books: IBook[];
	users: IUser[];
	loginFormData: ILoginFormData;
	handleLoginFormFieldChange: (
		fieldIdCode: string,
		fieldValue: string
	) => void;
	handleLoginFormSubmit: (
		e: React.FormEvent<HTMLFormElement>,
		onSuccess: () => void
	) => void;
	currentUser: ICurrentUser;
	handleLogout: (onLoggedOut: () => void) => void;
	uploadFile: IUploadFile;
	formFields: IFormFields;
	setFormFields: (field: IFormFields) => void;
	fileItems: IFileItem[];
	handleImageUploadForm: (e: React.FormEvent<HTMLFormElement>, onSuccess: () => void) => void;
	handleImageFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleFormFieldChange: (
		e: React.ChangeEvent<HTMLInputElement>,
		fieldName: string
	) => void;
}

interface IAppProvider {
	children: React.ReactNode;
}

export const AppContext = createContext<IAppContext>({} as IAppContext);

export const AppProvider: React.FC<IAppProvider> = ({ children }) => {
	const [books, setBooks] = useState<IBook[]>([]);
	const [users, setUsers] = useState<IUser[]>([]);
	const [loginFormData, setLoginFormData] = useState<ILoginFormData>(
		structuredClone(initialLoginformData)
	);
	const [currentUser, setCurrentUser] = useState<ICurrentUser>(
		structuredClone(initialCurrentUser)
	);
	const [uploadFile, setUploadFile] = useState<IUploadFile>({
		..._initialUploadFile,
	});
	const [formFields, setFormFields] = useState<IFormFields>({
		..._initialFormFields,
	});
	const [fileItems] = useState<IFileItem[]>([]);

	const loadBooks = async () => {
		const response = await axios.get(`${backendUrl}/books`);
		const _books: IBook[] = response.data;
		setBooks(_books);
	};

	const loadUsers = async () => {
		const response = await axios.get(`${backendUrl}/users`);
		let _users: IUser[] = response.data;
		_users = _users.filter((m) => m.login !== "anonymousUser");
		setUsers(_users);
	};

	const loadCurrentUser = async () => {
		try {
			const headers = {
				"Content-Type": "application/json",
				authorization: `Bearer ${localStorage.getItem("token")}`,
			};
			const response = await axios.get(`${backendUrl}/users/current`, {
				headers,
			});
			if (response.status === 200) {
				const _currentUser = response.data.currentUser;
				tools.fillProfileFormFieldsWithCurrentUserFields(
					formFields,
					_currentUser
				);
				setCurrentUser(_currentUser);
			} else {
				setCurrentUser(structuredClone(initialCurrentUser));
			}
		} catch (e) {
			setCurrentUser(structuredClone(initialCurrentUser));
		}
	};

	useEffect(() => {
		loadBooks();
		loadUsers();
		loadCurrentUser();
	}, []);

	const handleLoginFormFieldChange = (
		fieldIdCode: string,
		fieldValue: string
	) => {
		switch (fieldIdCode) {
			case "login":
				loginFormData.login = fieldValue;
				console.log(loginFormData.login);
				if (loginFormData.login.trim() === "") {
					loginFormData.message = "";
				}
				break;
			case "password":
				loginFormData.password = fieldValue;
				break;
		}
		setLoginFormData(structuredClone(loginFormData));
	};

	const handleLoginFormSubmit = (
		e: React.FormEvent<HTMLFormElement>,
		onSuccess: () => void
	) => {
		e.preventDefault();
		(async () => {
			const headers = {
				"Access-Control-Allow-Origin": "*",
				"Content-Type": "application/json",
			};
			try {
				const response = await axios.post(
					`${backendUrl}/users/login`,
					{
						login: loginFormData.login,
						password: loginFormData.password,
					},
					{ headers }
				);
				if (response.status === 200) {
					localStorage.setItem("token", response.data.token);
					setCurrentUser(response.data.currentUser);
					tools.fillProfileFormFieldsWithCurrentUserFields(
						formFields,
						response.data.currentUser
					);
					setLoginFormData(structuredClone(initialLoginformData));
					onSuccess();
				} else {
					console.log("ERROR: bad login");
				}
			} catch (err) {
				console.log("ERROR: bad login");
				loginFormData.message = "Bad login, try again.";
				setLoginFormData(structuredClone(loginFormData));
			}
		})();
	};

	const handleLogout = (onLoggedOut: () => void) => {
		localStorage.removeItem("token");
		setCurrentUser(structuredClone(initialCurrentUser));
		loadCurrentUser();
		onLoggedOut();
	};

	const handleImageUploadForm = async (
		e: React.FormEvent<HTMLFormElement>, onSuccess: () => void
	) => {
		e.preventDefault();
		if (uploadFile.file && formFields.firstName.trim() !== "") {
			const formData = new FormData();
			formData.append("firstName", formFields.firstName);
			formData.append("lastName", formFields.lastName);
			formData.append("login", formFields.login);
			formData.append("email", formFields.email);
			formData.append("fileName", `${formFields.login}.jpg`); // FIX
			formData.append("file", uploadFile.file);
			await fetch(`${backendUrl}/users/profile`, {
				method: "POST",
				body: formData,
			});
			// setFormFields({ ..._initialFormFields });
			setUploadFile({ ..._initialUploadFile });
			onSuccess()
		} // TODO: error checking
	};

	const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files !== null) {
			const file = e.target.files[0];
			console.log(111, URL.createObjectURL(file));
			const _uploadFile = {
				file,
				preview: URL.createObjectURL(file),
			};
			setUploadFile(_uploadFile);
		} else {
			console.log("ERROR: files is null");
		}
	};

	const handleFormFieldChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		fieldName: string
	) => {
		const value = e.target.value;
		formFields[fieldName as keyof IFormFields] = value;
		setFormFields({ ...formFields });
	};

	return (
		<AppContext.Provider
			value={{
				books,
				users,
				loginFormData,
				handleLoginFormFieldChange,
				handleLoginFormSubmit,
				currentUser,
				handleLogout,
				uploadFile,
				formFields,
				setFormFields,
				fileItems,
				handleImageUploadForm,
				handleImageFileChange,
				handleFormFieldChange,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
