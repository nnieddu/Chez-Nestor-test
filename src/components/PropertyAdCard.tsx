import { PropertyAd } from "../types/propertyAdTypes";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import defaultImage from "../style/img/no-photo.svg";

interface PropertyAdCardProps {
  propertyAd: PropertyAd;
}

const PropertyAdCard = ({ propertyAd }: PropertyAdCardProps) => {
  return (
    <div className="my-6 mx-[10vw] opacityAnimHalf">
      <Link
        to={`/property/${propertyAd.documentId}`}
        onClick={() => window.scrollTo(0, 0)}
      >
        <div className="flex flex-col lg:flex-row h-50 lg:h-80 bg-cardColor shadow-lg rounded-lg overflow-hidden whitespace-pre-line ">
          <img
            className="lg:max-h-[100%] lg:min-w-[25vw] lg:max-w-[25vw] max-h-[25vh] object-cover"
            src={propertyAd.img.stringValue ?? defaultImage}
            alt="Living room background"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = defaultImage;
              target.alt = "Default image";
            }}
          />
          <div className="flex flex-col justify-around p-4 lg:pl-4">
            <h2 className="ml-1 text-gray-900 font-bold text-2xl">
              {propertyAd.title.stringValue}
            </h2>
            <p className="mt-3 ml-1 text-gray-600 text-sm ellipsized">
              {propertyAd.description.stringValue}
            </p>
            <div className="mt-3 ml-1">
              <h2 className="text-gray-700 font-bold text-xl">
                {propertyAd.price.stringValue}€
              </h2>
            </div>
            <div className="mt-3">
              <button className="px-3 py-2 bg-chezNestor hover:bg-chezNestorDark text-white text-s font-bold uppercase rounded shadow">
                Voir l'annonce
                <FontAwesomeIcon className="ml-5" icon={faEye} />
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PropertyAdCard;
