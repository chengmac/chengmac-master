import { Effect, ImmerReducer, Subscription, history } from 'umi';
import Api from '@/services/api';

const { articleSave, getAll } = Api;
console.log();
export interface ArticleModelState {
  articleList: [];
  page: Number;
  pageSize: Number;
}
interface ArticleModelType {
  namespace: 'article';
  state: ArticleModelState;
  effects: {
    saveArticle: Effect;
    getAll: Effect;
  };
  reducers: {
    putGetAll: ImmerReducer<ArticleModelState>;
  };
  subscriptions: { setup: Subscription };
}

const ArticleModel: ArticleModelType = {
  namespace: 'article',
  state: {
    articleList: [],
    page: 1,
    pageSize: 10,
  },
  effects: {
    *saveArticle({ payload }, { call, put }) {
      console.log(payload);
      const data = yield call(articleSave, payload);
      if (data && data.success) {
        return Promise.resolve(data);
      }
      return Promise.reject(data);
    },
    *getAll({ payload }, { call, put, select }) {
      const { page, pageSize } = yield select((s: any) => s.article);
      payload.page = page;
      payload.pageSize = pageSize;
      console.log(page, pageSize);
      console.log(payload);
      const data = yield call(getAll, payload);
      if (data && data.success) {
        yield put({
          type: 'putGetAll',
          payload: data.result,
        });
      }
    },
  },
  reducers: {
    putGetAll(state, action) {
      state.articleList = action.payload.docs;
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/article/manage') {
          dispatch({ type: 'getAll', payload: {} });
        }
      });
    },
  },
};
export default ArticleModel;
