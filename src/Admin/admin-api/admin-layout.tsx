import { Image } from "../admin-interface/AdminGalleryTypes";

const endpoint = process.env.backend_url

export const getAllImages = async() => {
    const request = await fetch(endpoint + "media/");
    const result = await request.json();
    return result;
}

export const getCardRefs = async() => {
    const request = await fetch(endpoint + "cardrefs/");
    const result = await request.json();
    return result;
}

export const addHeroTagToImg = async(image: Image) => {
    const request = await fetch(endpoint + `medias/${image.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({set_as_hero: true})

        });
    const result = await request.json();
    return result;
    }


export const removeSelectedImage = async(image: Image) => {
    const request = await fetch(endpoint + "heroimages/", {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(image)
    });
    const result = await request.json();
    return result;
}

export const deleteImage = async(image: Image) => {
    const request = await fetch(endpoint + "heroimages/", {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(image)
    });
    const result = await request.json();
    return result;
}
