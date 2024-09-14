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

export async function getDataDisbursementByTeacherIDAndTermID(params: any) {
    const urlEndpoint = `/disbursement/teacher/${params.teacherID}/${params.termId}`;
    const header = generateHeader();

    try {
        return ServiceUtil.callApi(urlEndpoint, header, {}, {}, METHOD_TYPE.GET);
    } catch (error) {
        console.error(error);
        return null;
    }
}
