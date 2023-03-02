import React, { useContext, useState } from "react";
import { PropertyAdsContext } from "../contexts/PropertyAdsContext";
import PropertyAdCard from "./PropertyAdCard";
import Modal from "./Modal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";

const Content = () => {
  const { propertyAds } = useContext(PropertyAdsContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sortedPropertyAds = [...propertyAds].sort((a, b) =>
    a.title.stringValue.localeCompare(b.title.stringValue)
  );

  return (
    <div className="mx-28 flex flex-col">
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-3 mx-auto my-5 py-2 bg-chezNestor hover:bg-chezNestorDark text-white font-bold uppercase rounded"
      >
        Ajouter une annonce
        <FontAwesomeIcon className="ml-5" icon={faSquarePlus} />
      </button>
      {sortedPropertyAds.map((propertyAd, index) => (
        <PropertyAdCard key={index} propertyAd={propertyAd} />
      ))}
      {isModalOpen && <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} isEdit={false} />}
    </div>
  );
};

export default Content;
