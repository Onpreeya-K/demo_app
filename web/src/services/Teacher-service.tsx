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
export async function createTeacher(data: any) {
    const urlEndpoint = `/teacher`;
    const header = generateHeader();

    try {
        return ServiceUtil.callApi(urlEndpoint, header, {}, data, METHOD_TYPE.POST);
    } catch (error) {
        console.error(error);
        return null;
    }
}
export async function updateTeacher(param:any,data: any) {
    const urlEndpoint = `/teacher`;
    const header = generateHeader();
    console.log('param ::: ',param);
    
    try {
        return ServiceUtil.callApi(urlEndpoint, header, param, data, METHOD_TYPE.PUT);
    } catch (error) {
        console.error(error);
        return null;
    }
}
export async function deleteTeacher(param:any) {
    const urlEndpoint = `/teacher`;
    const header = generateHeader();

    try {
        return ServiceUtil.callApi(urlEndpoint, header, param, {}, METHOD_TYPE.DELETE);
    } catch (error) {
        console.error(error);
        return null;
    }
}