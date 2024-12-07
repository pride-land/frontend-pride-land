import { MinPutVolunteer } from "../admin-interface/AdminVolunteerType";
export declare const getAllVolunteers: () => Promise<any>;
export declare const updateVolunteerStatus: (id: number, data: MinPutVolunteer) => Promise<void>;
