import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseUser } from "@fortawesome/free-solid-svg-icons";
import backgroundHeaderImg from "../style/backgroundHeader.jpg";

export default function Header() {
  return (
    <div className="relative py-28 shadow-2xl">
      <img
        className="absolute shadow-lg inset-0 -z-10 h-full w-full object-cover brightness-50"
        src={backgroundHeaderImg}
        alt=""
				onLoad={(e) => {
					const imgElement = e.target as HTMLImageElement;
					imgElement.alt = "Living room background";
				}}
      />
      <h2 className="text-center font-bold tracking-tight text-white drop-shadow-xl text-4xl sm:text-6xl">
        Chez-Nestor Immo
				<br/><br/>
        <FontAwesomeIcon icon={faHouseUser} />
      </h2>
    </div>
  );
}
