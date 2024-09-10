import {FeedbackStatus} from "../admin-interface/AdminFeedbackType";

const endpoint = process.env.backend_url + 'feedbacks/'

export const getFeedbacks = async() => {
    const request = await fetch(endpoint);
    const result = await request.json();
    return result;
}

export const updateFeedbacks = async(id:number, data:FeedbackStatus) => {
    const newEndpoint = endpoint + `${id}/`
    await fetch(newEndpoint, {
        method: "PATCH",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(data),
    });
}

export const deleteFeedbacks = async(id:number) => {
    const newEndpoint = endpoint + `${id}/`
    await fetch(newEndpoint, {
        method: "DELETE",
        headers: {
            "Content-Type" : "application/json"
        },
    });
}