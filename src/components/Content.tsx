import React, { useContext } from "react";
import { PropertyAdsContext } from "../contexts/PropertyAdsContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";

const Content = () => {
  const { propertyAds, addPropertyAd } = useContext(PropertyAdsContext);

  return (
    <div className="mx-28">
      <button
        className="px-3 my-5 py-2 bg-chezNestor text-white font-bold uppercase rounded"
      >
        Ajouter une annonce
        <FontAwesomeIcon className="ml-5" icon={faSquarePlus} />
      </button>

    </div>
  );
};

export default Content;
