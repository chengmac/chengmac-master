import { request } from 'umi';
import apiMap from './apiMap';

const generateApiMap = (params: any) => {
  let method: string = '';
  let url: string = '';
  if (typeof params == 'string') {
    let paramsArray = params.split(' ');
    if (paramsArray.length === 2) {
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
    if (method === 'GET') {
      return request(url, {
        method,
        params: data,
      });
    } else if (method === 'POST') {
      return request(url, {
        method,
        data,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
        },
      });
    }
  };
};

const ApiMapObject: Object = {};
for (let key in apiMap) {
  ApiMapObject[key] = generateApiMap(apiMap[key]);
}
export default ApiMapObject;
