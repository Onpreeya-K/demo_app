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

export const sourceList = (list: any[]) => {
    const sorted = list.sort((a: any, b: any) => {
        if (a.has_schedule === true && b.has_schedule === false) return 1;
        if (a.has_schedule === false && b.has_schedule === true) return -1;
        return 0;
    });
    return sorted;
};

export const toMoneyFormat = (value: string): string => {
    if (!value) return value;
    const numberValue = value.replace(/[^\d.]/g, '');
    const parts = numberValue.split('.');
    let integerPart = parts[0];
    let decimalPart = parts[1] || '';
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    if (decimalPart.length === 1) {
        decimalPart += '0';
    } else if (decimalPart.length === 0) {
        decimalPart = '00';
    } else {
        decimalPart = decimalPart.substring(0, 2);
    }
    return `${integerPart}.${decimalPart}`;
};

export const moneyFormatComma = (value: string): string => {
    if (!value) return value;
    const numberValue = value.replace(/\D/g, '');
    return new Intl.NumberFormat().format(Number(numberValue));
};

export const modalAlertOpen = (message: string, title?: string) => {
    document.dispatchEvent(
        new CustomEvent('modal.open', {
            detail: { message: message, title: title },
        })
    );
};
