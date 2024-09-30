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

export async function getAllCourseOfStudy() {
    const urlEndpoint = `/courseOfStudy`;
    const header = generateHeader();

    try {
        return ServiceUtil.callApi(urlEndpoint, header, {}, {}, METHOD_TYPE.GET);
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getAllSubject() {
    const urlEndpoint = `/subject`;
    const header = generateHeader();

    try {
        return ServiceUtil.callApi(urlEndpoint, header, {}, {}, METHOD_TYPE.GET);
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function createSubject(data: any) {
    const urlEndpoint = `/subject`;
    const header = generateHeader();
    try {
        return ServiceUtil.callApi(urlEndpoint, header, {}, data, METHOD_TYPE.POST);
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function updateSubject(subjectID: any, data: any) {
    const urlEndpoint = `/subject`;
    const header = generateHeader();

    try {
        return ServiceUtil.callApi(urlEndpoint, header, subjectID, data, METHOD_TYPE.PUT);
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function deleteSubject(subjectID: any) {
    const urlEndpoint = `/subject`;
    const header = generateHeader();

    try {
        return ServiceUtil.callApi(urlEndpoint, header, subjectID, {}, METHOD_TYPE.DELETE);
    } catch (error) {
        console.error(error);
        return null;
    }
}
