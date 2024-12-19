import { Image } from "../admin-interface/AdminGalleryTypes";
export declare const deleteImage: (image: Image) => Promise<any>;
export declare const getAllImages: () => Promise<any>;
export declare const getCardRefs: () => Promise<any>;
export declare const addHeroTagToImg: (image: Image) => Promise<any>;
export declare const removeHeroTagFromImg: (image: Image) => Promise<any>;
export declare const getHeroImages: () => Promise<any>;
