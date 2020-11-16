import Axios from 'axios';

const request = (option: any) => {
  return Axios(option).then(
    res => {
      return Promise.resolve(res.data);
    },
    err => {
      return Promise.reject(err);
    },
  );
};

export default request;
