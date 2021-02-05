import { Effect, ImmerReducer, Subscription, history } from 'umi';
import Api from '@/services/api';
import _ from 'lodash';
import { matchPathRegexp } from '@/uilts';
import { UPLOAD_ACTION_TYPE } from '@/uilts/constant';

const {
    articleSave,
    getAllArticle,
    createCategory,
    createLabel,
    categoryList,
    labelList,
    deleteLabel,
    deleteArticle,
    uploadImage,
    updateArticleStatus,
    updateArticle,
} = Api;

export interface ArticleModelState {
    articleList: [];
    page: Number;
    pageSize: Number;
    categoryList: [];
    tagList: [];
    heroImage: '';
}
interface ArticleModelType {
    namespace: 'article';
    state: ArticleModelState;
    effects: {
        saveArticle: Effect;
        getAllArticle: Effect;
        createCategory: Effect;
        createLabel: Effect;
        categoryList: Effect;
        labelList: Effect;
        deleteLabel: Effect;
        deleteArticle: Effect;
        uploadImage: Effect;
        updateArticleStatus: Effect;
        updateHeroImage: Effect;
        updateArticle: Effect;
    };
    reducers: {
        putGetAllArticle: ImmerReducer<ArticleModelState>;
        putCategoryList: ImmerReducer<ArticleModelState>;
        putTagList: ImmerReducer<ArticleModelState>;
        putUploadImage: ImmerReducer<ArticleModelState>;
    };
    subscriptions: { setup: Subscription };
}

const ArticleModel: ArticleModelType = {
    namespace: 'article',
    state: {
        articleList: [],
        page: 1,
        pageSize: 10,
        categoryList: [],
        tagList: [],
        heroImage: '',
    },
    effects: {
        *saveArticle({ payload }, { call, put }) {
            const data = yield call(articleSave, payload);
            if (data && data.success) {
                return Promise.resolve(data);
            }
            return Promise.reject(data);
        },
        *getAllArticle({ payload }, { call, put, select }) {
            const { page, pageSize } = yield select((s: any) => s.article);
            payload.page = page;
            payload.pageSize = pageSize;
            const data = yield call(getAllArticle, payload);
            if (data && data.success) {
                let list: [] = [];
                _.map(data.result.list, (item, i) => {
                    item.index = i + 1;
                    list.push(item);
                });
                yield put({
                    type: 'putGetAllArticle',
                    payload: list,
                });
            }
        },
        *createCategory({ payload }, { call }) {
            const data = yield call(createCategory, payload);
            console.log(data);
            if (data && data.success) {
                return Promise.resolve(data);
            }
            return Promise.reject(data);
        },
        *createLabel({ payload }, { call, put }) {
            const data = yield call(createLabel, payload);
            if (data && data.success) {
                return Promise.resolve(data);
            }
            return Promise.reject(data);
        },
        *categoryList({ payload }, { call, put }) {
            const data = yield call(categoryList);
            if (data && data.success) {
                let list: [] = [];
                _.map(data.result, (item: object) => {
                    list.push(item.name);
                });
                yield put({
                    type: 'putCategoryList',
                    payload: list,
                });
            }
        },
        *labelList({ payload }, { call, put }) {
            const data = yield call(labelList);
            if (data && data.success) {
                let list: [] = [];
                _.map(data.result, (item: object) => {
                    list.push(item.name);
                });
                yield put({
                    type: 'putTagList',
                    payload: list,
                });
            }
        },
        *deleteLabel({ payload }, { call, put }) {
            const data = yield call(deleteLabel, payload);
            if (data && data.success) {
                return Promise.resolve(data);
            }
            return Promise.reject(data);
        },
        *deleteArticle({ payload }, { call, put }) {
            const data = yield call(deleteArticle, payload);
            if (data && data.success) {
                return Promise.resolve(data);
            }
            return Promise.reject(data);
        },
        *uploadImage({ payload }, { call, put }) {
            const data = yield call(uploadImage, payload.formData);
            if (data && data.success) {
                if (payload.action === UPLOAD_ACTION_TYPE.HEROIMAGE) {
                    yield put({
                        type: 'putUploadImage',
                        payload: data.result,
                    });
                }
                return Promise.resolve(data);
            }
            return Promise.reject(data);
        },
        *updateArticleStatus({ payload }, { call, put }) {
            const data = yield call(updateArticleStatus, payload);
            if (data && data.success) {
                return Promise.resolve(data);
            }
            return Promise.reject(data);
        },
        *updateHeroImage({ payload }, { call, put }) {
            yield put({
                type: 'putUploadImage',
                payload: {
                    imageUrl: payload.heroImage,
                },
            });
        },
        *updateArticle({ payload }, { call, put }) {
            const data = yield call(updateArticle, payload);
            if (data && data.success) {
                return Promise.resolve(data);
            }
            return Promise.reject(data);
        },
    },
    reducers: {
        putGetAllArticle(state, { payload }) {
            state.articleList = payload;
        },
        putCategoryList(state, { payload }) {
            state.categoryList = payload;
        },
        putTagList(state, { payload }) {
            state.tagList = payload;
        },
        putUploadImage(state, { payload }) {
            state.heroImage = payload.imageUrl;
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(location => {
                const matchManagePage = matchPathRegexp(
                    '/article/manage',
                    location.pathname,
                );
                const matchEditorPage = matchPathRegexp(
                    '/article/editor',
                    location.pathname,
                );
                if (matchManagePage) {
                    dispatch({
                        type: 'getAllArticle',
                        payload: { status: 'PUB' },
                    });
                } else if (matchEditorPage) {
                    dispatch({ type: 'categoryList', payload: {} });
                    dispatch({ type: 'labelList', payload: {} });
                    if (location.state?.articleObject) {
                        dispatch({
                            type: 'updateHeroImage',
                            payload: location.state?.articleObject,
                        });
                    } else {
                        dispatch({
                            type: 'updateHeroImage',
                            payload: { heroImage: '' },
                        });
                    }
                }
            });
        },
    },
};
export default ArticleModel;
