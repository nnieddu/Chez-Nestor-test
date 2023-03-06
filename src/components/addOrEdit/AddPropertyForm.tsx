import React, { useState, useContext } from "react";
import { PropertyAd, PropertyAdFirebase } from "../../types/propertyAdTypes";
import { PropertyAdsContext } from "../../contexts/PropertyAdsContext";

interface PropertyAdFormProps {
  setIsModalOpen: (isModalOpen: boolean) => void;
  isEdit: boolean;
  propertyAd?: PropertyAd;
}
const PropertyAdForm = ({ setIsModalOpen, isEdit, propertyAd }: PropertyAdFormProps) => {
  const { addPropertyAd, updatePropertyAd } = useContext(PropertyAdsContext);
  const [formData, setFormData] = useState<PropertyAdFirebase>({
    description: { stringValue: propertyAd?.description.stringValue ?? "" },
    img: { stringValue: propertyAd?.img.stringValue ?? "" },
    price: { stringValue: propertyAd?.price.stringValue ?? "0" },
    title: { stringValue: propertyAd?.title.stringValue ?? "" },
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: {
        ...(prevFormData as any)[name],
        stringValue: value,
      },
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isEdit) {
      addPropertyAd(formData);
    } else {
      const propertyAdFromFormData: PropertyAd = {
        title: { stringValue: formData.title.stringValue },
        description: { stringValue: formData.description.stringValue },
        img: { stringValue: formData.img.stringValue },
        price: { stringValue: formData.price.stringValue },
        documentId: propertyAd?.documentId ?? "",
      };
      updatePropertyAd(propertyAdFromFormData);
    }

    setIsModalOpen(false);
    setFormData({
      description: { stringValue: "" },
      img: { stringValue: "" },
      price: { stringValue: "0" },
      title: { stringValue: "" },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      {/* <label className="mt-6 font-semibold">Titre</label> */}
      <input
        required
				placeholder="Titre de votre annonce"
				maxLength={150}
        name="title"
        type="text"
        value={formData.title.stringValue}
        onChange={handleChange}
        className="mt-6 border rounded-md p-2 placeholder-gray-500"
      />

      {/* <label className="mt-2 font-semibold">Déscription</label> */}
      <textarea
        required
				placeholder="Déscription de votre annonce..."
				maxLength={3500}
        name="description"
        value={formData.description.stringValue}
        onChange={handleChange}
        className="mt-2 border rounded-md p-2 resize-none  min-h-[30vh] placeholder-gray-500"
      />

      {/* <label className="mt-2 font-semibold">Image (URL)</label> */}
      <input
        required
				placeholder="Image (URL)"
				maxLength={600}
        name="img"
        type="text"
        value={formData.img.stringValue}
        onChange={handleChange}
        className="mt-2 border rounded-md p-2 placeholder-gray-500"
      />

      {/* <label className="mt-3 font-semibold">Prix en €</label> */}
      <label className="mt-3 ml-1 font-semibold">Prix</label>
      <input
        required
        name="price"
        type="number"
				max={9999999999999}
				step={100}
        value={formData.price.stringValue}
        onChange={handleChange}
        className="mt-1 border rounded-md p-2"
      />
      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          className="w-full inline-flex justify-center mr-5 rounded-md border border-gray-300 shadow px-4 py-2 text-base font-medium text-black-700 bg-green-400 hover:bg-green-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        >
          Publier
        </button>
        <button
          type="button"
          className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow px-4 py-2 text-base font-medium text-black-700 bg-gray-100 hover:bg-gray-200 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          onClick={() => setIsModalOpen(false)}
        >
          Annuler
        </button>
      </div>
    </form>
  );
};

export default PropertyAdForm;
