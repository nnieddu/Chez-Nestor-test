import { PropertyAd } from "../../types/propertyAdTypes";

export const deletePropertyAdAPI = async (
	documentId: string | undefined,
  propertyAds : PropertyAd[],
  firebaseUrl: string,
  idToken: string | null,
  setPropertyAds: React.Dispatch<React.SetStateAction<PropertyAd[]>>
) => {
	const response = await fetch(`${firebaseUrl}/${documentId}`, {
		method: "DELETE",
		headers: {
			Authorization: `Bearer ${idToken}`,
		},
	});
	if (!response.ok) {
		throw new Error("Failed to delete document");
		// setError(error);
	}
	setPropertyAds(propertyAds.filter((ad) => ad.documentId !== documentId));
	// return response.json();
};
