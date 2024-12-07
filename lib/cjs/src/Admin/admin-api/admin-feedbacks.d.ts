import { FeedbackStatus } from "../admin-interface/AdminFeedbackType";
export declare const getFeedbacks: () => Promise<any>;
export declare const updateFeedbacks: (id: number, data: FeedbackStatus) => Promise<void>;
export declare const deleteFeedbacks: (id: number) => Promise<void>;
