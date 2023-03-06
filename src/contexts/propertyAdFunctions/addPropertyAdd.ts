import { PropertyAd, PropertyAdFirebase } from "../../types/propertyAdTypes";

export const addPropertyAdAPI = async (propertyAd: PropertyAdFirebase, firebaseUrl : string, idToken : string | null, setPropertyAds: React.Dispatch<React.SetStateAction<PropertyAd[]>> ) => {
	try {
		const response = await fetch(firebaseUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${idToken}`,
			},
			body: JSON.stringify({
				fields: propertyAd,
			}),
		});
		if (!response.ok) {
			throw new Error(`Erreur lors de l'ajout de l'annonce. HTTP ${response.status} - ${response.statusText}`);
		} else {
			const data = await response.json();
			const addedPropertyAd = { ...propertyAd, documentId: data.name.split("/").pop() };
			setPropertyAds((prevPropertyAds) => [addedPropertyAd, ...prevPropertyAds]);
		}
	} catch (error) {
		// setError(error);
	}
};