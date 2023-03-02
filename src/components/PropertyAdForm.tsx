import React, { useState } from "react";

interface PropertyAd {
  description: string;
  img: string;
  price: number;
  title: string;
}

const PropertyAdForm = () => {
  const [formData, setFormData] = useState<PropertyAd>({
    description: "",
    img: "",
    price: 0,
    title: "",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col ">
      <label className="mt-2 font-semibold">Titre</label>
      <input
        name="title"
        type="text"
        value={formData.title}
        onChange={handleChange}
        className="border rounded-md p-2"
      />

      <label className="mt-2 font-semibold">Description</label>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        className="border rounded-md p-2 resize-none"
      />

      <label className="mt-2 font-semibold">Image URL</label>
      <input
        name="img"
        type="text"
        value={formData.img}
        onChange={handleChange}
        className="border rounded-md p-2"
      />

      <label className="mt-2 font-semibold">Prix</label>
      <input
        name="price"
        type="number"
        value={formData.price}
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
