import { Effect, ImmerReducer, Subscription } from 'umi';
import Cookies from 'js-cookie';
import { history } from 'umi';
import { matchPathRegexp } from '@/uilts';

export interface AppModelState {
    currentMenu: null;
    currentSubMenu: null;
}
export interface AppModelType {
    namespace: 'app';
    state: AppModelState;
    effects: {
        checkLoginStatus: Effect;
        updateCurrentMenu: Effect;
    };
    reducers: {
        updateCurrentMenuSuccess: ImmerReducer<AppModelState>;
    };
    subscriptions: { setup: Subscription };
}

const AppModel: AppModelType = {
    namespace: 'app',
    state: {
        currentMenu: null,
        currentSubMenu: null,
    },
    effects: {
        *checkLoginStatus({ payload }, { call, put }) {
            if (Cookies.get('MCKEY')) {
                history.push('/dashboard');
            } else {
                history.push('/login');
            }
        },
        *updateCurrentMenu({ payload }, { call, put }) {
            yield put({
                type: 'updateCurrentMenuSuccess',
                payload: payload,
            });
        },
    },
    reducers: {
        // 启用 immer 之后
        updateCurrentMenuSuccess(state, { payload }) {
            return {
                ...state,
                ...payload,
            };
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname }) => {
                const matchLandingPage = matchPathRegexp('/', pathname);
                if (matchLandingPage) {
                    dispatch({
                        type: 'checkLoginStatus',
                    });
                }
                const currentRouteArr = pathname.split('/');
                if (currentRouteArr.length == 2) {
                    dispatch({
                        type: 'updateCurrentMenu',
                        payload: {
                            currentMenu: currentRouteArr[1],
                        },
                    });
                } else {
                    dispatch({
                        type: 'updateCurrentMenu',
                        payload: {
                            currentMenu: currentRouteArr[2],
                            currentSubMenu: currentRouteArr[1],
                        },
                    });
                }
            });
        },
    },
};
export default AppModel;
