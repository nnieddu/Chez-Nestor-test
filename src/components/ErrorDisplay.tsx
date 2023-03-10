import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { PropertyAdsContext } from "../contexts/PropertyAdsContext";

function messageBeautifier(message: string): string {
  let newMsg: string;
  switch (true) {
    case message.includes("EMAIL_NOT_FOUND"):
      newMsg = message.replace("EMAIL_NOT_FOUND", "adresse email non trouvée");
      break;
    case message.includes("INVALID_EMAIL"):
      newMsg = message.replace("INVALID_EMAIL", "adresse email non valide");
      break;
    case message.includes("INVALID_PASSWORD"):
      newMsg = message.replace("INVALID_PASSWORD", "mot de passe erroné");
      break;
    case message.includes("INVALID_ID_TOKEN"):
      newMsg = message.replace("INVALID_ID_TOKEN", "jeton de connexion invalide ou expiré");
			localStorage.removeItem("idToken");
      break;
    case message.includes("USER_NOT_FOUND"):
      newMsg = message.replace(
        "USER_NOT_FOUND",
        "le compte d'utilisateur a été désactivé par un administrateur."
      );
      break;
    case message.includes("USER_DISABLED"):
      newMsg = message.replace(
        "USER_DISABLED",
        "le compte d'utilisateur a été désactivé par un administrateur."
      );
      break;
    default:
      newMsg = message;
  }
  return newMsg;
}

export default function ErrorDisplay() {
  const { error } = useContext(PropertyAdsContext);
  var displayedError;

  if (error instanceof Error) {
		// const t0 = performance.now();
    displayedError = messageBeautifier(error.message);
		// const t1 = performance.now();
		// console.log(`Function took ${t1 - t0} milliseconds to execute.`);
  } else {
    displayedError =
      "Une erreur inconnue s'est produite, veuillez réessayer ou contacter l'administrateur : " +
      error;
  }

  return (
    <span className="opacityAnimFast text-center tracking-tight text-red pr-3">
      <FontAwesomeIcon
        style={{ color: "red" }}
        className="mr-2"
        icon={faCircleExclamation}
      />
      <>{displayedError}</>
    </span>
  );
}
