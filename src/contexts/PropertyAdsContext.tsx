import React, { createContext, useEffect, useState } from "react";
import { PropertyAd, PropertyAdFirebase } from "../types/propertyAdTypes";

type PropertyAdsContextType = {
  propertyAds: PropertyAd[];
  addPropertyAd: (propertyAd: PropertyAdFirebase) => void;
  updatePropertyAd: (propertyAd: PropertyAdFirebase) => void;
  deletePropertyAd: (documentId: string | undefined) => void;
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

  const addPropertyAd = async (propertyAd: PropertyAdFirebase) => {
    try {
      const response = await fetch(
        "https://firestore.googleapis.com/v1/projects/cheznestor-bd113/databases/(default)/documents/propertyAd",
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

  const updatePropertyAd = (updatedPropertyAd: PropertyAdFirebase) => {
    // TODO
  };

  const deletePropertyAd = async (documentId: string | undefined) => {
    const url = `https://firestore.googleapis.com/v1/projects/cheznestor-bd113/databases/(default)/documents/propertyAd/${documentId}`;
    const response = await fetch(url, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete document");
    }
		setPropertyAds(propertyAds.filter(ad => ad.documentId !== documentId));
    // return response.json();
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
