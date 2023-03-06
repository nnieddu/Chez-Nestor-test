import { PropertyAd } from "../../types/propertyAdTypes";

export const getAllAd = async (
  firebaseUrl: string,
  idToken: string | null,
  setPropertyAds: React.Dispatch<React.SetStateAction<PropertyAd[]>>,
  setError: React.Dispatch<React.SetStateAction<Error | null>>
) => {
  try {
    const response = await fetch(firebaseUrl, {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });

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
  } catch (error) {
    // setError(error);
  }
};
