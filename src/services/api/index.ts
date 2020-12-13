import { request } from 'umi';
import apiMap from './apiMap';

const generateApiMap = (params: any) => {
    let method: string = '';
    let url: string = '';
    if (typeof params == 'string') {
        let paramsArray = params.split(' ');
        url = paramsArray[0];
        if (paramsArray.length == 2) {
            method = paramsArray[0];
            url = paramsArray[1];
        }
    } else if (typeof params == 'object') {
        if (params['url'] !== undefined) {
            url = params['url'];
        }
    }
    url = `${API_DOMAIN}/api${url}`;
    return (data: any) => {
        let options: object = {
            method,
            ...params,
            data,
        };
        if (method === '') {
            options = Object.assign(options, { params: data });
        }
        return request(url, options);
    };
};

const ApiMapObject: Object = {};
for (let key in apiMap) {
    ApiMapObject[key] = generateApiMap(apiMap[key]);
}
export default ApiMapObject;
