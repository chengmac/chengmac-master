import { Effect, ImmerReducer, Subscription } from 'umi';
import Cookies from 'js-cookie';
import { history } from 'umi';

export interface AppModelState {
  name: string;
}
export interface AppModelType {
  namespace: 'app';
  state: AppModelState;
  effects: {
    query: Effect;
  };
  reducers: {
    save: ImmerReducer<AppModelState>;
  };
  subscriptions: { setup: Subscription };
}

const AppModel: AppModelType = {
  namespace: 'app',
  state: {
    name: '',
  },
  effects: {
    *checkLoginStatus({ payload }, { call, put }) {
      if (Cookies.get('MCKEY')) {
        history.push('/dashboard');
      } else {
        history.push('/login');
      }
    },
  },
  reducers: {
    // 启用 immer 之后
    save(state, action) {
      state.name = action.payload;
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/') {
          dispatch({
            type: 'checkLoginStatus',
          });
        }
      });
    },
  },
};
export default AppModel;
