export default interface Volunteer {
    name: string;
    email: string;
    start_date: Date;
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
