import React, { createContext, useEffect, useState } from "react";
import { PropertyAd } from "../types/propertyAdTypes";

type PropertyAdsContextType = {
  propertyAds: PropertyAd[];
  addPropertyAd: (propertyAd: PropertyAd) => void;
  updatePropertyAd: (propertyAd: PropertyAd) => void;
  deletePropertyAd: (id: number) => void;
  error: Error | null;
};

export const PropertyAdsContext = createContext<PropertyAdsContextType>({
  propertyAds: [],
  addPropertyAd: () => {},
  updatePropertyAd: () => {},
  deletePropertyAd: () => {},
  error: null,
});

const PropertyAdsContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [propertyAds, setPropertyAds] = useState<PropertyAd[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function getData() {
      const response = await fetch(
        "https://firestore.googleapis.com/v1/projects/cheznestor-bd113/databases/(default)/documents/propertyAd/"
      );

      if (!response.ok) {
				const error = new Error(`Error : ${response.status}`);
        setError(error);
      } else {
        const data = await response.json();
        const propertyAds = data.documents.map((doc: any) => {
          const fields = doc.fields;
          const documentId = doc.name.split("/").pop();
          const propertyAd = { ...fields, documentId };
          return propertyAd;
        });
        setPropertyAds(propertyAds);
      }
    }
    getData();
  }, []);

	const addPropertyAd = async (propertyAd: PropertyAd) => {
		try {
			const response = await fetch(
				"https://firestore.googleapis.com/v1/projects/cheznestor-bd113/databases/(default)/documents/propertyAd/",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						fields: propertyAd,
					}),
				}
			);
			if (!response.ok) {
				const error = new Error(`Error : ${response.status}`);
				throw error;
			} else {
				const data = await response.json();
				const addedPropertyAd = { ...propertyAd, documentId: data.name.split("/").pop() };
				setPropertyAds((prevPropertyAds) => [addedPropertyAd, ...prevPropertyAds]);
			}
		} catch (error) {
			// setError(error);
		}
	};

  const updatePropertyAd = (updatedPropertyAd: PropertyAd) => {
    // TODO
  };

  const deletePropertyAd = (id: number) => {
    // TODO
  };

  return (
    <PropertyAdsContext.Provider
      value={{ propertyAds, addPropertyAd, updatePropertyAd, deletePropertyAd, error }}
    >
      {children}
    </PropertyAdsContext.Provider>
  );
};

export default PropertyAdsContextProvider;
