import { useState } from "react";

import { PropertyAd } from "../types/propertyAdTypes";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import defaultImage from "../style/no-photo.svg";

interface PropertyAdCardProps {
  propertyAd: PropertyAd;
}

export const PropertyAdCard = ({ propertyAd }: PropertyAdCardProps) => {
	const [imgSrc, setImgSrc] = useState<string | undefined>(propertyAd?.img.stringValue);

  return (
		<div className="my-6 mx-[5vw]">
				<Link to={`/property/${propertyAd.documentId}`} onClick={() => window.scrollTo(0, 0)}>
        <div className="flex flex-col lg:flex-row h-50 lg:h-80 bg-cardColor shadow-lg rounded-lg overflow-hidden">
        <img
          className="lg:max-h-[100%] lg:min-w-[25vw] lg:max-w-[25vw] w-full max-h-[25vh] object-cover"
          src={imgSrc}
          alt="Living room background"
					onError={() => setImgSrc(defaultImage)}
        />
          <div className="flex flex-col p-4 lg:pl-4 whitespace-pre-line ellipsized">
          {/* <div className="flex flex-col p-4 lg:pl-4 justify-between whitespace-pre-line ellipsized"> */}
            <h2 className="ml-1 text-gray-900 font-bold text-2xl titleEllipsized">
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
