import React, { useState, useContext } from "react";
import { PropertyAd } from "../types/propertyAdTypes";
import { PropertyAdsContext } from "../contexts/PropertyAdsContext";

interface PropertyAdFormProps {
  setIsModalOpen: (isModalOpen: boolean) => void;
}
const PropertyAdForm = ({ setIsModalOpen }: PropertyAdFormProps) => {
  const { addPropertyAd } = useContext(PropertyAdsContext);
  const [formData, setFormData] = useState<PropertyAd>({
    description: { stringValue: "" },
    img: { stringValue: "" },
    price: { stringValue: "0" },
    title: { stringValue: "" },
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
    // console.log(event);
    // console.log(formData);
    addPropertyAd(formData);
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
        name="title"
        type="text"
        value={formData.title.stringValue}
        onChange={handleChange}
        className="border rounded-md p-2"
      />

      <label className="mt-2 font-semibold">Description</label>
      <textarea
        name="description"
        value={formData.description.stringValue}
        onChange={handleChange}
        className="border rounded-md p-2 resize-none"
      />

      <label className="mt-2 font-semibold">Image (URL)</label>
      <input
        name="img"
        type="text"
        value={formData.img.stringValue}
        onChange={handleChange}
        className="border rounded-md p-2"
      />

      <label className="mt-2 font-semibold">Prix</label>
      <input
        name="price"
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
    </form>
  );
};

export default PropertyAdForm;
