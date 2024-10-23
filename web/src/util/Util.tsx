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

export class CustomError extends Error {
    status: number;
    payload: any;

    constructor(message: string, status: number, payload: any = null) {
        super(message);
        this.status = status;
        this.payload = payload;
        this.name = 'CustomError';
    }
}

export const checkError = (error: unknown) => {
    if (error instanceof CustomError) {
        loadingClose();
        if (error.message) {
            modalAlertOpen(error.message);
        } else {
            let messageResponse = '';
            switch (error.status) {
                case 400:
                    messageResponse = 'Bad Request';
                    break;
                case 401:
                    messageResponse = 'Unauthorized';
                    break;
                case 403:
                    messageResponse = 'Forbidden';
                    break;
                case 404:
                    messageResponse = 'Not Found';
                    break;
                case 422:
                    messageResponse = 'Unprocessable Entity';
                    break;
                case 500:
                case 501:
                case 502:
                case 503:
                    messageResponse = 'Internal Server Error';
                    break;
                default:
                    messageResponse = 'Unknown Error';
                    break;
            }
            if (messageResponse) {
                modalAlertOpen(messageResponse);
            }
        }
    } else {
        loadingClose();
        modalAlertOpen('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้');
        console.error('Unexpected Error:', error);
    }
};

export const loadingOpen = () => {
    document.dispatchEvent(new CustomEvent('backdrop.open'));
};

export const loadingClose = () => {
    document.dispatchEvent(new CustomEvent('backdrop.close'));
};
