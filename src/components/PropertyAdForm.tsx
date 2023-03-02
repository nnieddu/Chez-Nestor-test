import React, { useState, useContext } from "react";
import { PropertyAd, PropertyAdFirebase } from "../types/propertyAdTypes";
import { PropertyAdsContext } from "../contexts/PropertyAdsContext";

interface PropertyAdFormProps {
  setIsModalOpen: (isModalOpen: boolean) => void;
  isEdit: boolean;
  propertyAd?: PropertyAd;
}
const PropertyAdForm = ({ setIsModalOpen, isEdit, propertyAd }: PropertyAdFormProps) => {
  const { addPropertyAd } = useContext(PropertyAdsContext);
  const { updatePropertyAd } = useContext(PropertyAdsContext);
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
    <form onSubmit={handleSubmit} className="flex flex-col ">
      <label className="mt-2 font-semibold">Titre</label>
      <input
        required
        name="title"
        type="text"
        value={formData.title.stringValue}
        onChange={handleChange}
        className="border rounded-md p-2"
      />

      <label className="mt-2 font-semibold">Description</label>
      <textarea
        required
        name="description"
        value={formData.description.stringValue}
        onChange={handleChange}
        className="border rounded-md p-2 resize-none"
      />

      <label className="mt-2 font-semibold">Image (URL)</label>
      <input
        required
        name="img"
        type="text"
        value={formData.img.stringValue}
        onChange={handleChange}
        className="border rounded-md p-2"
      />

      <label className="mt-2 font-semibold">Prix</label>
      <input
        required
        name="price"
        type="number"
        value={formData.price.stringValue}
        onChange={handleChange}
        className="border rounded-md p-2"
      />
      <button
        type="submit"
        className="mt-4 px-4 py-2 rounded-md bg-green-400 hover:bg-green-500 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 w-full sm:w-auto"
      >
        Publier
      </button>
      <button
        className="mt-4 px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-400 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 w-full sm:w-auto"
        onClick={() => setIsModalOpen(false)}
      >
        Annuler
      </button>
    </form>
  );
};

export default PropertyAdForm;
