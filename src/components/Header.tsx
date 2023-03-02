import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import backgroundHeaderImg from "../style/backgroundHeader.jpg";

export default function Header() {
  return (
    <div className="relative py-32">
      <img
        className="absolute shadow-lg inset-0 -z-10 h-full w-full object-cover brightness-50"
        src={backgroundHeaderImg}
        alt="Living room background"
      />
      <h2 className="text-center font-bold tracking-tight text-white drop-shadow-xl text-4xl sm:text-6xl">
        Chez-Nestor Immo
        <FontAwesomeIcon className="ml-5" icon={faHouse} />
      </h2>
    </div>
  );
}
