import React, { Fragment, PureComponent } from 'react';
import { PageHeader, Tabs } from 'antd';
import styles from './index.less';
import ArticleTable from '../components/ArticleTable';
import { ArticleModelState } from '../models/articleModel';
import { connect } from 'umi';

class ManageArticle extends PureComponent {
  tabOnChange() {}

  render() {
    const { article } = this.props;
    const publishTable = () => {
      return <></>;
    };
    const tabPane = [
      {
        name: '已发布',
        key: 'PUB',
        conponent: () => <ArticleTable dataSource={article.articleList} />,
      },
      {
        name: '已删除',
        key: 'DEL',
        conponent: () => <ArticleTable />,
      },
      {
        name: '草稿箱',
        key: 'DRA',
        conponent: () => <ArticleTable />,
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
          <Tabs defaultActiveKey="1" onChange={this.tabOnChange}>
            {tabPane.map((tab, index) => (
              <Tabs.TabPane tab={tab.name} key={tab.key}>
                {tab.conponent()}
              </Tabs.TabPane>
            ))}
          </Tabs>
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
