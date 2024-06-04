import { getAccessToken } from "../util/Util";
import { METHOD_TYPE, ServiceUtil } from "./Services-utils";

const generateHeader = (): any => {
    let header: any = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'transactionDateTime': new Date().toISOString(),
    };
    const accessToken = getAccessToken();
    header.Authorization = accessToken ? `Bearer ${accessToken}` : '';
    return header;
};

export async function getAllTeacher() {
    const urlEndpoint = `/teacher`;
    const header = generateHeader();

    try {
        return ServiceUtil.callApi(urlEndpoint, header, {}, {}, METHOD_TYPE.GET);
    } catch (error) {
        console.error(error);
        return null;
    }
}