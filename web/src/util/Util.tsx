export const isNullOrUndefined = (value: any) =>
    value === undefined || value == null || value.length <= 0;

export const getRoleUser = () => {
    let role = sessionStorage.getItem('ROLE');

    return role;
};

export const setAccessToken = (accessToken: string) => {
    sessionStorage.setItem('Access_Token', accessToken);
};

export const getAccessToken = (): string | null => {
    const accessTokenStr = sessionStorage.getItem('Access_Token');
    if (accessTokenStr) {
        return accessTokenStr;
    }
    return null;
};

export const getDataProfessor = () => {
    const data = sessionStorage.getItem('DATA');
    if (data) {
        return data;
    }
    return null;
};
