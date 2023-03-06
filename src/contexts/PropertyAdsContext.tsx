import React, { createContext, useEffect, useState } from "react";
import { PropertyAd, PropertyAdFirebase } from "../types/propertyAdTypes";

import { getAllAd } from "./propertyAdFunctions/getAllAd";
import { addPropertyAdAPI } from "./propertyAdFunctions/addPropertyAdd";
import { updatePropertyAdAPI } from "./propertyAdFunctions/updatePropertyAd";
import { deletePropertyAdAPI } from "./propertyAdFunctions/deletePropertyAd";

export type PropertyAdsContextType = {
  propertyAds: PropertyAd[];
  addPropertyAd: (propertyAd: PropertyAdFirebase) => void;
  updatePropertyAd: (propertyAd: PropertyAd) => void;
  deletePropertyAd: (documentId: string) => void;
  error: Error | null;
  isLoggedIn: Boolean;
  isLoading: Boolean;
  setIsLoggedIn: (isLogged: boolean) => void;
  setIsLoading: (isLogged: boolean) => void;
  apiKey: string | undefined;
};

export const PropertyAdsContext = createContext<PropertyAdsContextType>({
  propertyAds: [],
  addPropertyAd: () => {},
  updatePropertyAd: () => {},
  deletePropertyAd: () => {},
  error: null,
  isLoggedIn: false,
  isLoading: false,
  setIsLoggedIn: () => {},
  setIsLoading: () => {},
  apiKey: undefined,
});

const PropertyAdsContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [propertyAds, setPropertyAds] = useState<PropertyAd[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

	const idToken = document.cookie
    .split("; ")
    .reduce(
      (acc, cookie) => (cookie.startsWith("idToken=") ? cookie.split("=")[1] : acc),
      ""
    );

  const fireProject = "cheznestor-bd113";
  const firebaseUrl = `https://firestore.googleapis.com/v1/projects/${fireProject}/databases/(default)/documents/propertyAd`;

  useEffect(() => {
    getAllAd(firebaseUrl, idToken, setPropertyAds, setError);
  }, [idToken, firebaseUrl]);

  const addPropertyAd = async (propertyAd: PropertyAdFirebase) => {
    addPropertyAdAPI(propertyAd, firebaseUrl, idToken, setPropertyAds);
  };

  const updatePropertyAd = async (updatedPropertyAd: PropertyAd) => {
    updatePropertyAdAPI(
      updatedPropertyAd,
      propertyAds,
      firebaseUrl,
      idToken,
      setPropertyAds
    );
  };

  const deletePropertyAd = async (documentId: string | undefined) => {
    deletePropertyAdAPI(documentId, propertyAds, firebaseUrl, idToken, setPropertyAds);
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
        isLoading,
        setIsLoading,
        apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      }}
    >
      {children}
    </PropertyAdsContext.Provider>
  );
};

export default PropertyAdsContextProvider;
