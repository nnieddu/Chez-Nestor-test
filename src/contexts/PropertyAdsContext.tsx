import React, { createContext, useEffect, useState } from "react";
import { PropertyAd } from "../types/propertyAdTypes";

export const PropertyAdsContext = createContext<PropertyAdsContextType>({
  propertyAds: [],
  addPropertyAd: () => {},
  updatePropertyAd: () => {},
  deletePropertyAd: () => {},
});

type PropertyAdsContextType = {
  propertyAds: PropertyAd[];
  addPropertyAd: (propertyAd: PropertyAd) => void;
  updatePropertyAd: (propertyAd: PropertyAd) => void;
  deletePropertyAd: (id: number) => void;
};

const PropertyAdsContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [propertyAds, setPropertyAds] = useState<PropertyAd[]>([]);

  useEffect(() => {
		async function getData() {
			const response = await fetch(
				"https://firestore.googleapis.com/v1/projects/cheznestor-bd113/databases/(default)/documents/propertyAd/"
			);
			const data = await response.json();
			console.log(data);
			const propertyAds = data.documents.map((doc: any) => doc.fields);
			setPropertyAds(propertyAds);
		}
		getData();
  }, []);

  const addPropertyAd = (propertyAd: PropertyAd) => {
  };

  const updatePropertyAd = (updatedPropertyAd: PropertyAd) => {
  };

  const deletePropertyAd = (id: number) => {
  };

  return (
    <PropertyAdsContext.Provider
      value={{ propertyAds, addPropertyAd, updatePropertyAd, deletePropertyAd }}>
      {children}
    </PropertyAdsContext.Provider>
  );
};

export default PropertyAdsContextProvider;
