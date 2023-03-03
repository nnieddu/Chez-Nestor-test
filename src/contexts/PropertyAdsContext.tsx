import React, { createContext, useEffect, useState } from "react";
import { PropertyAd, PropertyAdFirebase } from "../types/propertyAdTypes";

type PropertyAdsContextType = {
  propertyAds: PropertyAd[];
  addPropertyAd: (propertyAd: PropertyAdFirebase) => void;
  updatePropertyAd: (propertyAd: PropertyAd) => void;
  deletePropertyAd: (documentId: string) => void;
  error: Error | null;
  isLoggedIn: Boolean;
  setIsLoggedIn: (isLogged: boolean) => void;
};

export const PropertyAdsContext = createContext<PropertyAdsContextType>({
  propertyAds: [],
  addPropertyAd: () => {},
  updatePropertyAd: () => {},
  deletePropertyAd: () => {},
  error: null,
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

const PropertyAdsContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [propertyAds, setPropertyAds] = useState<PropertyAd[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
  const idToken = localStorage.getItem("idToken");

  useEffect(() => {
    async function getData() {
      const response = await fetch(
        "https://firestore.googleapis.com/v1/projects/cheznestor-bd113/databases/(default)/documents/propertyAd/",
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
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
  }, [idToken]);

  const addPropertyAd = async (propertyAd: PropertyAdFirebase) => {
    try {
      const response = await fetch(
        "https://firestore.googleapis.com/v1/projects/cheznestor-bd113/databases/(default)/documents/propertyAd",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
						Authorization: `Bearer ${idToken}`,
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

  const updatePropertyAd = async (updatedPropertyAd: PropertyAd) => {
    try {
      const { documentId, ...updatedFields } = updatedPropertyAd;
      const response = await fetch(
        `https://firestore.googleapis.com/v1/projects/cheznestor-bd113/databases/(default)/documents/propertyAd/${documentId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify({
            fields: updatedFields,
          }),
        }
      );
      if (!response.ok) {
        const error = new Error(`Error : ${response.status}`);
        throw error;
      } else {
        const updatedPropertyAds = propertyAds.map((propertyAd) =>
          propertyAd.documentId === documentId ? updatedPropertyAd : propertyAd
        );
        setPropertyAds(updatedPropertyAds);
      }
    } catch (error) {
      // setError(error);
    }
  };

  const deletePropertyAd = async (documentId: string | undefined) => {
    const url = `https://firestore.googleapis.com/v1/projects/cheznestor-bd113/databases/(default)/documents/propertyAd/${documentId}`;
    const response = await fetch(url, {
      method: "DELETE",
			headers: {
				Authorization: `Bearer ${idToken}`,
			},
    });
    if (!response.ok) {
      throw new Error("Failed to delete document");
    }
    setPropertyAds(propertyAds.filter((ad) => ad.documentId !== documentId));
    // return response.json();
  };

  return (
    <PropertyAdsContext.Provider
      value={{
        propertyAds,
        addPropertyAd,
        updatePropertyAd,
        deletePropertyAd,
        error,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </PropertyAdsContext.Provider>
  );
};

export default PropertyAdsContextProvider;
