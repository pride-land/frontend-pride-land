import { Image } from "../admin-interface/AdminGalleryTypes";

const endpoint = process.env.backend_url
const media_url = process.env.media_url

export const deleteImage = async(image: Image) => {
    const request = await fetch(endpoint + `medias/${image.id}/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        });
    const result = await request.json();
    return result;
    }

export const getAllImages = async() => {
    const request = await fetch(endpoint + "medias/");
    const result = await request.json();
    return result;
}

export const getCardRefs = async() => {
    const request = await fetch(endpoint + "cardrefs/");
    const result = await request.json();
    return result;
}

export const addHeroTagToImg = async(image: Image) => {
    const request = await fetch(endpoint + `medias/${image.id}/`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({set_as_hero: true})

        });
    const result = await request.json();
    return result;
    }

export const removeHeroTagFromImg = async(image: Image) => {
    const request = await fetch(endpoint + `medias/${image.id}/`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({set_as_hero: false})

        });
    const result = await request.json();
    return result;
    }

    export const getHeroImages = async() => {
        const request = await fetch(media_url + "heroes/");
        const result = await request.json();
        return result;
    }
