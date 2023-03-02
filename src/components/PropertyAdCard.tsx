import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { PropertyAd } from "../types/propertyAdTypes";
import { PropertyAdsContext } from "../contexts/PropertyAdsContext";

interface PropertyAdCardProps {
  propertyAd: PropertyAd;
}

export const PropertyAdCard = ({ propertyAd }: PropertyAdCardProps) => {
  const { deletePropertyAd } = useContext(PropertyAdsContext);

  return (
    <div className="my-6">
      <div className="flex bg-cardColor shadow-lg rounded-lg overflow-hidden">
        <div className="bg-cover">
          <img className="object-cover h-48 w-96" src={propertyAd.img.stringValue} alt={propertyAd.title.stringValue} />
        </div>
        <div className="flex flex-col p-4 justify-between">
          <h2 className="text-gray-900 font-bold text-2xl">
            {propertyAd.title.stringValue}
          </h2>
          <p className="mt-2 text-gray-600 text-sm">
            {propertyAd.description.stringValue}
          </p>
          <div className="flex mt-3">
            <h2 className="text-gray-700 font-bold text-xl">
              {propertyAd.price.stringValue}€
            </h2>
          </div>
          <div className="mt-3 ">
            <button className="px-3 py-2 bg-chezNestor text-white text-s font-bold uppercase rounded">
              Voir l'annonce
            </button>
            <button onClick={() => deletePropertyAd(propertyAd.documentId)} className="px-3 py-2 bg-chezNestor text-white text-s ml-16 font-bold uppercase rounded">
              Supprimer l'annonce
              <FontAwesomeIcon className="ml-5" icon={faTrashCan} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyAdCard;
