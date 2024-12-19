export interface AdminFeedback {
    id: number;
    name: string;
    comment: string;
    is_accepted: boolean;
}
export interface FeedbackStatus {
    is_accepted: boolean;
}
