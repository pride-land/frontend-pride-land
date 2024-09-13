const endpoint_admin_control = process.env.backend_url + "staff/"

export const fetchAllStaff = async () => {
    const request = await fetch(endpoint_admin_control);
    const result:[] = await request.json();
    return result;
}