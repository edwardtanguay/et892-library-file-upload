import { useContext } from "react";
import { AppContext } from "../AppContext";
import * as tools from "../tools";

export const PageProfile = () => {
	const {
		currentUser,
		uploadFile,
		formFields,
		handleImageUploadForm,
		handleImageFileChange,
		handleFormFieldChange,
	} = useContext(AppContext);

	return (
		<>
			{tools.isMemberOfAccessGroup(currentUser, "members") && (
				<>
					<div className="flex gap-3">
						<img
							className="w-[7rem]"
							src="images/users/defaultProfile.jpg"
						/>
						<div>
							<p className="text-2xl">{currentUser.fullName}</p>
							<p>Login: {currentUser.login}</p>
							<p>Email: {currentUser.email}</p>
						</div>
					</div>
					<form
						className="mt-4 bg-slate-500 p-4 rounded-lg w-[20rem]"
						onSubmit={(e) => handleImageUploadForm(e)}
					>
						<div className="mb-3">
							<label className="block" htmlFor="firstName">
								First Name
							</label>
							<input
								type="text"
								id="firstName"
								className="w-[17.8rem]"
								value={formFields.firstName}
								onChange={(e) =>
									handleFormFieldChange(e, "firstName")
								}
							/>
						</div>

						<div className="mb-3">
							<label className="block" htmlFor="lastName">
								Last Name
							</label>
							<input
								type="text"
								id="lastName"
								className="w-[17.8rem]"
								value={formFields.lastName}
								onChange={(e) =>
									handleFormFieldChange(e, "lastName")
								}
							/>
						</div>

						<div className="mb-3">
							<label className="block" htmlFor="login">
								Login
							</label>
							<input
								type="text"
								id="login"
								value={formFields.login}
								className="w-[8rem]"
								onChange={(e) =>
									handleFormFieldChange(e, "login")
								}
							/>
						</div>

						<div className="mb-3">
							<label className="block" htmlFor="email">
								Email
							</label>
							<input
								type="text"
								id="email"
								value={formFields.email}
								className="w-[17.8rem]"
								onChange={(e) =>
									handleFormFieldChange(e, "email")
								}
							/>
						</div>

						<div className="mt-4 mb-3">
							<label className="block mb-1">Profile Image</label>
							<input
								type="file"
								className="text-sm"
								onChange={(e) => handleImageFileChange(e)}
							></input>
						</div>

						<div className="flex justify-between">
							<div className="preview">
								{[".jpg", ".png"].filter(
									(m) => uploadFile.file?.name.endsWith(m)
								).length > 0 ? (
									<img
										src={uploadFile.preview}
										width="100"
										height="100"
									/>
								) : (
									<div className="previewFileName">
										{uploadFile.file?.name}
									</div>
								)}
							</div>
							<div className="mt-6 flex justify-end">
								{/* TODO: put button on bottom of form when image is displayed left */}
								<button
									className="bg-gray-200 h-fit py-1 px-2 rounded text-base hover:bg-gray-300"
									type="submit"
								>
									Update Profile
								</button>
							</div>
						</div>
					</form>
				</>
			)}
		</>
	);
};
