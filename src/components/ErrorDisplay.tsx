import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { PropertyAdsContext } from "../contexts/PropertyAdsContext";

export default function ErrorDisplay() {
  const { error } = useContext(PropertyAdsContext);
  var displayedError;

  if (error instanceof Error) {
    displayedError = error.message;
  } else {
    displayedError =
      "Une erreur inconnue s'est produite, veuillez réessayer ou contacter l'administrateur : " +
      error;
  }

  return (
    <span className="opacityAnimFast text-center text-red pr-3">
      <FontAwesomeIcon
        style={{ color: "red" }}
        className="mr-2"
        icon={faCircleExclamation}
      />
      <>{displayedError}</>
    </span>
  );
}

// https://firebase.google.com/docs/reference/rest/auth?hl=fr

// Codes d'erreur courants : signInWithPassword
// EMAIL_NOT_FOUND : aucun enregistrement d'utilisateur ne correspond à cet identifiant. L'utilisateur a peut-être été supprimé.
// INVALID_PASSWORD : le mot de passe n'est pas valide ou l'utilisateur n'a pas de mot de passe.
// USER_DISABLED : le compte d'utilisateur a été désactivé par un administrateur. 

// Codes d'erreur courants signInWithPassword
// INVALID_ID_TOKEN : les informations d'identification de l'utilisateur ne sont plus valides. L'utilisateur doit se reconnecter.
// USER_NOT_FOUND : il n'y a pas d'enregistrement d'utilisateur correspondant à cet identifiant. L'utilisateur a peut-être été supprimé. 