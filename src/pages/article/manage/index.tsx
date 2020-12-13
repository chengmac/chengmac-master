import React, { Fragment, PureComponent } from 'react';
import { PageHeader, Tabs } from 'antd';
import styles from './index.less';
import ArticleTable from '../components/ArticleTable';
import { ArticleModelState } from '../models/articleModel';
import AntdTabs from '@/components/AntdTabs/AntdTabs';
import { connect, history } from 'umi';
import {
    EditOutlined,
    DeleteOutlined,
    ExportOutlined,
    RocketOutlined,
} from '@ant-design/icons';

class ManageArticle extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            tabKey: 'PUB',
        };
    }
    tabOnChange(key: string) {
        console.log(key);
        this.setState({
            tabKey: key,
        });
        this.props.dispatch({
            type: 'article/getAllArticle',
            payload: {
                status: key,
            },
        });
    }

    changeArticleStatus(article: object, key: string) {
        this.props
            .dispatch({
                type: 'article/updateArticleStatus',
                payload: {
                    articleId: article?._id,
                    status: key,
                },
            })
            .then(resp => {
                this.props.dispatch({
                    type: 'article/getAllArticle',
                    payload: {
                        status: this.state.tabKey,
                    },
                });
            });
    }

    removeHandle(article: object) {
        this.props
            .dispatch({
                type: 'article/deleteArticle',
                payload: {
                    articleId: id,
                },
            })
            .then(resp => {
                this.props.dispatch({
                    type: 'article/getAllArticle',
                    payload: {
                        status: this.state.tabKey,
                    },
                });
            });
    }
    goToEditor(article: object) {
        history.push({
            pathname: '/article/editor',
            state: {
                articleObject: article,
            },
        });
    }

    render() {
        const { article } = this.props;

        const tabPane = [
            {
                name: '已发布',
                key: 'PUB',
                component: () => (
                    <ArticleTable
                        article={article.articleList}
                        key={'PUB'}
                        actionMenu={[
                            {
                                name: '编辑',
                                callback: this.goToEditor,
                                icon: <EditOutlined />,
                            },
                            {
                                name: '移至草稿箱',
                                callback: this.changeArticleStatus.bind(this),
                                action: 'DRA',
                                icon: <ExportOutlined />,
                            },
                            {
                                name: '删除',
                                callback: this.changeArticleStatus.bind(this),
                                action: 'DEL',
                                icon: <DeleteOutlined />,
                            },
                        ]}
                    />
                ),
            },
            {
                name: '已删除',
                key: 'DEL',
                component: () => (
                    <ArticleTable
                        key={'DEL'}
                        article={article.articleList}
                        actionMenu={[
                            {
                                name: '编辑',
                                callback: this.goToEditor,
                                icon: <EditOutlined />,
                            },
                            {
                                name: '移至草稿箱',
                                callback: this.changeArticleStatus.bind(this),
                                action: 'DRA',
                                icon: <ExportOutlined />,
                            },
                            {
                                name: '彻底删除',
                                callback: this.removeHandle.bind(this),
                                action: 'DEL',
                                icon: <DeleteOutlined />,
                            },
                        ]}
                    />
                ),
            },
            {
                name: '草稿箱',
                key: 'DRA',
                component: () => (
                    <ArticleTable
                        key={'DRA'}
                        article={article.articleList}
                        actionMenu={[
                            {
                                name: '编辑',
                                callback: this.goToEditor,
                                icon: <EditOutlined />,
                            },
                            {
                                name: '发布',
                                callback: this.changeArticleStatus.bind(this),
                                action: 'PUB',
                                icon: <RocketOutlined />,
                            },
                            {
                                name: '删除',
                                callback: this.changeArticleStatus.bind(this),
                                action: 'DEL',
                                icon: <DeleteOutlined />,
                            },
                        ]}
                    />
                ),
            },
        ];
        return (
            <Fragment>
                <PageHeader
                    className="site-page-header"
                    backIcon={false}
                    title="文章管理"
                />
                <section className={styles.manageContainer}>
                    <AntdTabs
                        activeTab={this.state.tabKey}
                        onChange={(key: string) => this.tabOnChange(key)}
                    >
                        {tabPane.map((tab, index) => (
                            <Tabs.TabPane tab={tab.name} key={tab.key}>
                                {tab.component()}
                            </Tabs.TabPane>
                        ))}
                    </AntdTabs>
                </section>
            </Fragment>
        );
    }
}
export default connect(
    ({ article, loading }: { article: ArticleModelState; loading: any }) => ({
        article,
        loading,
    }),
)(ManageArticle);
