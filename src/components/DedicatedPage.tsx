import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { PropertyAdsContext } from "../contexts/PropertyAdsContext";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import backgroundHeaderImg from "../style/backgroundHeader.jpg";
import Modal from "./Modal";

const DedicatedPage = () => {
  const { id } = useParams<{ id: string }>();
  const { propertyAds } = useContext(PropertyAdsContext);
  const propertyAd = propertyAds.find((ad) => ad.documentId === id);
  const { deletePropertyAd } = useContext(PropertyAdsContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  if (!propertyAd) {
    return (
      <div className="relative py-32">
        <img
          className="absolute shadow-lg inset-0 -z-10 h-full w-full object-cover brightness-50"
          src={backgroundHeaderImg}
          alt="Living room background"
        />
        <h2 className="py-32 text-center font-bold tracking-tight text-white drop-shadow-xl text-4xl sm:text-6xl">
          Erreur 404 : <br/>  {id}  <br/> annonce non trouvée !...
        </h2>
      </div>
    );
  }

  return (
    <div className="my-6">
      {isModalOpen && (
        <Modal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          isEdit={true}
          propertyAd={propertyAd}
        />
      )}
      <FontAwesomeIcon
        className="absolute cursor-pointer fa-6x ml-5"
				style={{color: "#7dccc4"}}
        onClick={() => {
          navigate(-1);
        }}
        icon={faArrowCircleLeft}
      />
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
          <div className="flex mt-6">
            <h2 className="text-gray-700 font-bold text-xl">
              {propertyAd.price.stringValue}€
            </h2>
          </div>
          <div className="mt-6 items-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-3 py-2 bg-chezNestor hover:bg-chezNestorDark text-white text-s mr-3 lg:mr-6 font-bold rounded"
            >
              Editer
              <FontAwesomeIcon className="ml-5" icon={faPenToSquare} />
            </button>
            <button
              onClick={() => {
                deletePropertyAd(propertyAd.documentId);
                navigate(-1);
              }}
              className="px-3 py-2 bg-chezNestor hover:bg-chezNestorDark text-white text-s lg:ml-6 font-bold rounded"
            >
              Supprimer
              <FontAwesomeIcon className="ml-5" icon={faTrashCan} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DedicatedPage;
