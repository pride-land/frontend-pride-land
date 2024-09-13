export interface AdminControls {
    id: number,
    password: string,
    is_superuser: boolean,
    first_name: string,
    last_name: string,
    email: string,
    is_staff: boolean,
    is_active: boolean,
    date_joined: Date,
    username: string,
    groups: [],
    user_permissions: [],
}