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

export async function updatePassword(userID: any, data: any) {
    const urlEndpoint = `/user`;
    const header = generateHeader();

    try {
        return ServiceUtil.callApi(urlEndpoint, header, userID, data, METHOD_TYPE.PUT);
    } catch (error) {
        console.error(error);
        return null;
    }
}
