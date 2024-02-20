import { useContext } from "react"
import { AppContext } from "../AppContext"

export const PageProfile = () => {
	const { currentUser } = useContext(AppContext);

	return (
		<p>{currentUser.fullName}</p>
	)
}