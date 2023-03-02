// export interface PropertyAd {
//   description: string;
//   img: string;
//   price: number;
//   title: string;
// }

export interface PropertyAd {
  description: { stringValue: string };
  img: { stringValue: string };
  price: { stringValue: string };
  title: { stringValue: string };
}
// documentId: { stringValue: string };

// export function convertFirebaseToPropertyAd(firebaseAd: PropertyAdFirebase): PropertyAd {
//   const propertyAd: PropertyAd = {
//     description: firebaseAd.description.stringValue,
//     img: firebaseAd.img.stringValue,
//     price: firebaseAd.price.integerValue,
//     title: firebaseAd.title.stringValue,
//   };
//   return propertyAd;
// }
