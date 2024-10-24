import { checkError, CustomError } from '../util/Util';
import environment from './../environment/environment.json';

export const METHOD_TYPE = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    PATCH: 'PATCH',
    DELETE: 'DELETE',
};

const handleResponse = async (url: string, response: Response) => {
    if (!response.ok) {
        const error = await response.json();
        if (response.status === 401 || response.statusText === 'Unauthorized') {
            if (!window.location.pathname.endsWith('/login')) {
                const currentOrigin = window.location.origin;
                const loginUrl = `${currentOrigin}${environment.base_href_content_path}/login`;
                window.location.href = loginUrl;
            }
        }
        const errorMessage = error.payload?.message || error.message || 'An error occurred';
        throw new CustomError(errorMessage, response.status, error.payload);
    }
    return response.json();
};

const post = async ({ url, header, data }: { url: string; header: any; data: any }) => {
    try {
        const response = await fetch(url, {
            method: METHOD_TYPE.POST,
            headers: header,
            body: JSON.stringify(data),
        });
        return await handleResponse(url, response);
    } catch (error) {
        checkError(error);
        console.error('Error:', error);
    }
};

const get = async ({ url, header, params }: { url: string; header: any; params: any }) => {
    try {
        const query = new URLSearchParams(params).toString();
        const response = await fetch(`${url}?${query}`, {
            method: METHOD_TYPE.GET,
            headers: header,
        });
        return await handleResponse(url, response);
    } catch (error) {
        checkError(error);
        console.error('Error:', error);
    }
};

const put = async ({
    url,
    header,
    params,
    data,
}: {
    url: string;
    header: any;
    params: any;
    data: any;
}) => {
    try {
        const response = await fetch(`${url}/${params}`, {
            method: METHOD_TYPE.PUT,
            headers: header,
            body: JSON.stringify(data),
        });
        return await handleResponse(url, response);
    } catch (error) {
        checkError(error);
        console.error('Error:', error);
    }
};

const del = async ({ url, header, params }: { url: string; header: any; params: any }) => {
    try {
        const response = await fetch(`${url}/${params}`, {
            method: METHOD_TYPE.DELETE,
            headers: header,
        });
        return await handleResponse(url, response);
    } catch (error) {
        checkError(error);
        console.error('Error:', error);
    }
};

const callApi = async (
    url: string,
    header: any,
    params: any,
    requestBody: any,
    httpMethod: string
) => {
    const currentOrigin = window.location.origin;
    const urlEndpoint = `${currentOrigin}${environment.base_href_content_path}${environment.path_api}${url}`;

    switch (httpMethod) {
        case 'GET':
            return await get({ url: urlEndpoint, header, params });
        case 'POST':
            return await post({ url: urlEndpoint, header, data: requestBody });
        case 'PUT':
            return await put({
                url: urlEndpoint,
                header,
                params,
                data: requestBody,
            });
        case 'DELETE':
            return await del({ url: urlEndpoint, header, params });
        default:
            throw new Error('Invalid http method.');
    }
};

export const ServiceUtil = {
    callApi,
};
