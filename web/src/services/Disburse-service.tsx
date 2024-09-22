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

export async function addDisbursement(data: any) {
    const urlEndpoint = `/disbursement`;
    const header = generateHeader();

    try {
        return ServiceUtil.callApi(urlEndpoint, header, {}, data, METHOD_TYPE.POST);
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function updateDisbursement(disbursementID: any, data: any) {
    const urlEndpoint = `/disbursement`;
    const header = generateHeader();

    try {
        return ServiceUtil.callApi(urlEndpoint, header, disbursementID, data, METHOD_TYPE.PUT);
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getDataDisbursementByTeacherIDAndTermID(params: any) {
    const urlEndpoint = `/disbursement/teacher/${params.teacherID}/term/${params.termId}`;
    const header = generateHeader();

    try {
        return ServiceUtil.callApi(urlEndpoint, header, {}, {}, METHOD_TYPE.GET);
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getTeacherListByTermID(termId: string) {
    const urlEndpoint = `/disbursement/teacher/status/${termId}`;
    const header = generateHeader();

    try {
        return ServiceUtil.callApi(urlEndpoint, header, {}, {}, METHOD_TYPE.GET);
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function updateStatus(disbursementID: any, data: any) {
    const urlEndpoint = `/disbursement/status`;
    const header = generateHeader();

    try {
        return ServiceUtil.callApi(urlEndpoint, header, disbursementID, data, METHOD_TYPE.PUT);
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getPdf(data: any) {
    const urlEndpoint = `/disbursement/pdf`;
    const header = generateHeader();

    try {
        return ServiceUtil.callApi(urlEndpoint, header, {}, data, METHOD_TYPE.POST);
    } catch (error) {
        console.error(error);
        return null;
    }
}
