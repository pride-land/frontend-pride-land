const endpoint = process.env.media_url + 'upload-img/'
const get_img_url = process.env.media_url + 'get-img/'

export const postImage= async (formData: FormData) => {
    try {
        const request = await fetch(endpoint, {
            method: 'POST',
            body: formData
        });
        const result = await request.json();
        return result
    } catch(error){
        console.error('error', error);
    }
}

export const fetchAllImages = async () => {
    const request = await fetch(get_img_url);
    const result = await request.json();
    return result;
}