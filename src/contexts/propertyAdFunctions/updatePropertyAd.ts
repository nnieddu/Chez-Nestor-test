import { PropertyAd } from "../../types/propertyAdTypes";

export const updatePropertyAdAPI = async (
	updatedPropertyAd: PropertyAd,
  propertyAds : PropertyAd[],
  firebaseUrl: string,
  idToken: string | null,
  setPropertyAds: React.Dispatch<React.SetStateAction<PropertyAd[]>>
) => {
  try {
    const { documentId, ...updatedFields } = updatedPropertyAd;
    const response = await fetch(`${firebaseUrl}/${documentId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({
        fields: updatedFields,
      }),
    });
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
