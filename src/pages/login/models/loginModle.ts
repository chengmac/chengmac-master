import { Effect, ImmerReducer, Subscription, history } from 'umi';
import Api from '@/services/api';
import Cookies from 'js-cookie';

const { userLogin } = Api;
export interface LoginModelState {
    name: string;
}
export interface LoginModelType {
    namespace: 'login';
    state: LoginModelState;
    effects: {
        query: Effect;
    };
    reducers: {
        save: ImmerReducer<LoginModelState>;
    };
    subscriptions: { setup: Subscription };
}

const LoginModel: LoginModelType = {
    namespace: 'login',
    state: {
        name: '',
    },
    effects: {
        *signin({ payload }, { call, put }) {
            const data = yield call(userLogin, payload);
            if (data && data.success) {
                Cookies.set('MCKEY', data.result.token, { expires: 7 });
                history.push('/dashboard');
            }
        },
    },
    reducers: {
        save(state, action) {
            state.name = action.payload;
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname }) => {});
        },
    },
};
export default LoginModel;
