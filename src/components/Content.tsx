import { useContext, useState, useEffect } from "react";
import { PropertyAdsContext } from "../contexts/PropertyAdsContext";
import PropertyAdCard from "./PropertyAdCard";
import Modal from "./addOrEdit/Modal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";

const ITEMS_PER_PAGE = 5;

const Content = () => {
  const { propertyAds } = useContext(PropertyAdsContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(propertyAds.length / ITEMS_PER_PAGE);
  const filteredPropertyAds = [...propertyAds]
    .sort((a, b) => a.title.stringValue.localeCompare(b.title.stringValue))
    .slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  useEffect(() => {
		
	});

	return (
    <div className="flex flex-col opacityAnim">
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-3 mx-auto mt-14 my-5 py-2 bg-chezNestor hover:bg-chezNestorDark text-white font-bold uppercase rounded lg:text-xl shadow-lg"
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
                setCurrentPage(index + 1);
                setTimeout(() => {
                  window.scrollTo({ top: 400, behavior: "smooth" });
                }, 40);
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
