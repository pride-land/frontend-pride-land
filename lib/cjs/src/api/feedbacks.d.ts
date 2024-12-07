import FeedbackType from "../interfaces/FeedbackType";
export declare const fetchAllFeedbacks: () => Promise<FeedbackType[] | undefined>;
export declare const postFeedback: (formData: FormData) => Promise<any>;
