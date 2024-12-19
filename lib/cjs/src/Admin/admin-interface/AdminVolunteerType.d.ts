export interface AdminVolunteer {
    id: number;
    name: string;
    email: string;
    start_date: string;
    signup_date: string;
    bamboo: boolean;
    vegetables: boolean;
    eggs: boolean;
    shiitake: boolean;
    bees: boolean;
    goats: boolean;
    construction: boolean;
    restrictions?: string;
    is_accepted: boolean;
}
export interface MinPutVolunteer {
    name: string;
    email: string;
    start_date: string;
    is_accepted: boolean;
}
