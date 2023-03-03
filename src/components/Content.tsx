import React, { useContext, useState } from "react";
import { PropertyAdsContext } from "../contexts/PropertyAdsContext";
import PropertyAdCard from "./PropertyAdCard";
import Modal from "./Modal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";

const ITEMS_PER_PAGE = 5; // Number of items to display per page

const Content = () => {
  const { propertyAds } = useContext(PropertyAdsContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Current page number

  const totalPages = Math.ceil(propertyAds.length / ITEMS_PER_PAGE);
  // Filter the propertyAds array based on the current page number and items per page
  const filteredPropertyAds = propertyAds.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="flex flex-col">
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-3 mx-auto mt-10 my-5 py-2 bg-chezNestor hover:bg-chezNestorDark text-white font-bold uppercase rounded lg:text-xl shadow-lg"
      >
        Ajouter une annonce
        <FontAwesomeIcon className="ml-5 " icon={faSquarePlus} />
      </button>
      {filteredPropertyAds.map((propertyAd, index) => (
        <PropertyAdCard key={index} propertyAd={propertyAd} />
      ))}

      {totalPages > 1 && (
        <div className="flex justify-center m-8">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`px-2 py-1 mx-1 min-w-[30px] border-chezNestor border rounded-lg ${
                index + 1 === currentPage ? "bg-chezNestor text-white" : "text-chezNestor"
              }`}
              onClick={() => {
                window.scrollTo({ top: 400, behavior: "smooth" })
                setCurrentPage(index + 1);
              }}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}

      {isModalOpen && (
        <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} isEdit={false} />
      )}
    </div>
  );
};

export default Content;
