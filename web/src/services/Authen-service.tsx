import { METHOD_TYPE, ServiceUtil } from "./Services-utils";

const generateHeader = (): any => {
    let header: any = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'transactionDateTime': new Date().toISOString(),
    };
    return header;
};

export async function callLoginService(
    requestBody: {},
) {
    const urlEndpoint = `/auth/login`;
    const header = generateHeader();

    try {
        return ServiceUtil.callApi(urlEndpoint, header, {}, requestBody, METHOD_TYPE.POST);
    } catch (error) {
        console.error(error);
        return null;
    }
}