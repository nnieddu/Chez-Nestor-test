import React, { createContext, useEffect, useState } from "react";
import {  PropertyAd, PropertyAdFirebase } from "../types/propertyAdTypes";

import { getAllAd } from "./propertyAdFunctions/getAllAd";
import { addPropertyAdAPI } from "./propertyAdFunctions/addPropertyAdd";
import { updatePropertyAdAPI } from "./propertyAdFunctions/updatePropertyAd";
import { deletePropertyAdAPI } from './propertyAdFunctions/deletePropertyAd';

export type PropertyAdsContextType = {
  propertyAds: PropertyAd[];
  addPropertyAd: (propertyAd: PropertyAdFirebase) => void;
  updatePropertyAd: (propertyAd: PropertyAd) => void;
  deletePropertyAd: (documentId: string) => void;
  error: Error | null | unknown;
  isLoggedIn: Boolean;
  isLoading: Boolean;
  setIsLoggedIn: (isLogged: boolean) => void;
  setIsLoading: (isLogged: boolean) => void;
  setError: (error: Error | null | unknown) => void;
  apiKey: string | undefined;
};

export const PropertyAdsContext = createContext<PropertyAdsContextType>({
  propertyAds: [],
  addPropertyAd: () => {},
  updatePropertyAd: () => {},
  deletePropertyAd: () => {},
  error: null,
  isLoggedIn: false,
  isLoading: true,
  setIsLoggedIn: () => {},
  setIsLoading: () => {},
  setError: () => {},
  apiKey: undefined,
});

const PropertyAdsContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [propertyAds, setPropertyAds] = useState<PropertyAd[]>([]);
  const [error, setError] = useState<Error | null | unknown>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
	const uidToken = localStorage.getItem("idToken");
  const fireProject = "cheznestor-bd113";
  const firebaseUrl = `https://firestore.googleapis.com/v1/projects/${fireProject}/databases/(default)/documents/propertyAd`;

	useEffect(() => {
		if (isLoggedIn)
			getAllAd(firebaseUrl, uidToken, setPropertyAds, setError);
	}, [uidToken, firebaseUrl, isLoggedIn]);

  const addPropertyAd = async (propertyAd: PropertyAdFirebase) => {
		addPropertyAdAPI(propertyAd, firebaseUrl, uidToken, setPropertyAds);
  };

  const updatePropertyAd = async (updatedPropertyAd: PropertyAd) => {
		updatePropertyAdAPI(updatedPropertyAd, propertyAds, firebaseUrl, uidToken, setPropertyAds);
  };

  const deletePropertyAd = async (documentId: string | undefined) => {
		deletePropertyAdAPI(documentId, propertyAds, firebaseUrl, uidToken, setPropertyAds);
  };

  return (
    <PropertyAdsContext.Provider
      value={{
        propertyAds,
        addPropertyAd,
        updatePropertyAd,
        deletePropertyAd,
        error,
				setError,
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
