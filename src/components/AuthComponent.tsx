import { Amplify } from "aws-amplify";
import { withAuthenticator, WithAuthenticatorProps } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import awsmobile from "../aws-exports";
import Navbar from "../components/layout/Navbar";
import Board from "../components/Board";
import "../styles/main.scss";

Amplify.configure(awsmobile)

const AuthComponent = ({ user, signOut }: WithAuthenticatorProps) => {
  return (
		<main>
			<Navbar user={user} signOut={signOut} />
			<Board /> 
		</main>
  )
}

export default withAuthenticator(AuthComponent);