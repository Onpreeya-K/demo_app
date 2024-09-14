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

export async function getCriteriaOfTeach() {
    const urlEndpoint = `/criteriaOfTeach/level`;
    const header = generateHeader();

    try {
        return ServiceUtil.callApi(urlEndpoint, header, {}, {}, METHOD_TYPE.GET);
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getTermOfYear() {
    const urlEndpoint = `/termOfYear`;
    const header = generateHeader();

    try {
        return ServiceUtil.callApi(urlEndpoint, header, {}, {}, METHOD_TYPE.GET);
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getTeacherSchedule(param: any) {
    // const urlEndpoint = `/scheduleTeach/teacherSchedule/${param}`;
    const urlEndpoint = `/scheduleTeach/term/${param}`;
    const header = generateHeader();

    try {
        return ServiceUtil.callApi(urlEndpoint, header, {}, {}, METHOD_TYPE.GET);
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getCriteraiProcess() {
    const urlEndpoint = `/criteriaOfProcess`;
    const header = generateHeader();

    try {
        return ServiceUtil.callApi(urlEndpoint, header, {}, {}, METHOD_TYPE.GET);
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function createCriteraiProcess(data: any) {
    const urlEndpoint = `/criteriaOfProcess`;
    const header = generateHeader();
    try {
        return ServiceUtil.callApi(urlEndpoint, header, {}, data, METHOD_TYPE.POST);
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function updateCriteraiProcess(param: any, data: any) {
    const urlEndpoint = `/criteriaOfProcess`;
    const header = generateHeader();

    try {
        return ServiceUtil.callApi(urlEndpoint, header, param, data, METHOD_TYPE.PUT);
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function deleteCriteraiProcess(param: any) {
    const urlEndpoint = `/criteriaOfProcess`;
    const header = generateHeader();

    try {
        return ServiceUtil.callApi(urlEndpoint, header, param, {}, METHOD_TYPE.DELETE);
    } catch (error) {
        console.error(error);
        return null;
    }
}
