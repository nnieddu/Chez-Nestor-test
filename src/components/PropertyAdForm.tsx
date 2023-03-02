import React, { useState, useContext } from "react";
import { PropertyAd, PropertyAdFirebase } from "../types/propertyAdTypes";
import { PropertyAdsContext } from "../contexts/PropertyAdsContext";

interface PropertyAdFormProps {
  setIsModalOpen: (isModalOpen: boolean) => void;
	isEdit : boolean;
	propertyAd?: PropertyAd | null;
}
const PropertyAdForm = ({ setIsModalOpen, isEdit, propertyAd }: PropertyAdFormProps) => {
  const { addPropertyAd } = useContext(PropertyAdsContext);
  const { updatePropertyAd } = useContext(PropertyAdsContext);
  const [formData, setFormData] = useState<PropertyAdFirebase>({
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
		if (!isEdit)
    	addPropertyAd(formData);
		else
			updatePropertyAd(formData)
    setIsModalOpen(false);
    setFormData({
      description: { stringValue: "" },
      img: { stringValue: "" },
      price: { stringValue: "0" },
      title: { stringValue: "" },
    });
  };

	console.log(isEdit)
	console.log(propertyAd?.title.stringValue)
	console.log(propertyAd?.description.stringValue)
	console.log(propertyAd?.img.stringValue)

  return (
    <form onSubmit={handleSubmit} className="flex flex-col ">
      <label className="mt-2 font-semibold">Titre</label>
      <input required
        name="title"
        type="text"
        value={isEdit ? propertyAd?.title.stringValue : formData.title.stringValue}
        onChange={handleChange}
        className="border rounded-md p-2"
      />

      <label className="mt-2 font-semibold">Description</label>
      <textarea required
        name="description"
        value={isEdit ? propertyAd?.description.stringValue : formData.description.stringValue}
        onChange={handleChange}
        className="border rounded-md p-2 resize-none"
      />

      <label className="mt-2 font-semibold">Image (URL)</label>
      <input required
        name="img"
        type="text"
        value={isEdit ? propertyAd?.img.stringValue : formData.img.stringValue}
        onChange={handleChange}
        className="border rounded-md p-2"
      />

      <label className="mt-2 font-semibold">Prix</label>
      <input required
        name="price"
				type="number"
        value={isEdit ? propertyAd?.price.stringValue : formData.price.stringValue}
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
