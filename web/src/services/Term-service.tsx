import { getAccessToken } from '../util/Util';
import { METHOD_TYPE, ServiceUtil } from './Services-utils';

const generateHeader = (): any => {
    let header: any = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    };
    const accessToken = getAccessToken();
    header.Authorization = accessToken ? `Bearer ${accessToken}` : '';
    return header;
};

export async function getAllTerm() {
    const urlEndpoint = `/termOfYear`;
    const header = generateHeader();

    try {
        return ServiceUtil.callApi(urlEndpoint, header, {}, {}, METHOD_TYPE.GET);
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function addTerm(data: any) {
    const urlEndpoint = `/termOfYear`;
    const header = generateHeader();

    try {
        return ServiceUtil.callApi(urlEndpoint, header, {}, data, METHOD_TYPE.POST);
    } catch (error) {
        console.error(error);
        return null;
    }
}
export async function updateTerm(termOfYearID: any, data: any) {
    const urlEndpoint = `/termOfYear`;
    const header = generateHeader();

    try {
        return ServiceUtil.callApi(urlEndpoint, header, termOfYearID, data, METHOD_TYPE.PUT);
    } catch (error) {
        console.error(error);
        return null;
    }
}