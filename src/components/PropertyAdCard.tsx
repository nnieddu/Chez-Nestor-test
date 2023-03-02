import { PropertyAd } from "../types/propertyAdTypes";
import { Link } from "react-router-dom";

interface PropertyAdCardProps {
  propertyAd: PropertyAd;
}

export const PropertyAdCard = ({ propertyAd }: PropertyAdCardProps) => {
  return (
    <div className="my-6">
      <div className="flex flex-col lg:flex-row bg-cardColor shadow-lg rounded-lg overflow-hidden">
        <div
          className="h-48 lg:h-auto lg:w-48 flex-none bg-cover bg-center rounded-t-lg lg:rounded-t-none lg:rounded-l-lg overflow-hidden"
          style={{
            backgroundImage: `url(${propertyAd.img.stringValue})`,
            minWidth: "8rem",
          }}
        ></div>
        <div className="flex flex-col p-4 lg:pl-4 justify-between">
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
          <div className="mt-3 flex justify-end items-center">
            <Link to={`/property/${propertyAd.documentId}`}>
              <button className="px-3 py-2 bg-chezNestor text-white text-s font-bold uppercase rounded">
                Voir l'annonce
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyAdCard;
