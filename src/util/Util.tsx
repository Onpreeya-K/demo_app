export const isNullOrUndefined = (value: any) => value === undefined || value == null || value.length <= 0;

export const getRoleUser = () => {
    let role = sessionStorage.getItem('ROLE')

    return role;
};
