import { useContext } from "react";
import { useParams } from "react-router-dom";
import { PropertyAdsContext } from "../contexts/PropertyAdsContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

const DedicatedPage = () => {
  const { id } = useParams<{ id: string }>();
  const { propertyAds } = useContext(PropertyAdsContext);
  const propertyAd = propertyAds.find((ad) => ad.documentId === id);

  const { deletePropertyAd } = useContext(PropertyAdsContext);

  if (!propertyAd) {
    return <div>Property ad not found</div>;
  }

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
            <button
              onClick={() => deletePropertyAd(propertyAd.documentId)}
              className="px-3 py-2 bg-chezNestor text-white text-s ml-3 lg:ml-6 font-bold uppercase rounded"
            >
              Supprimer l'annonce
              <FontAwesomeIcon className="ml-5" icon={faTrashCan} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DedicatedPage;
