import React, { Fragment, PureComponent } from 'react';
import { Table } from 'antd';
import styles from './index.less';

interface ArticleTableType {
  dataSource: [];
}
class ArticleTable extends PureComponent {
  tabOnChange() {}

  render() {
    const { dataSource } = this.props;
    console.log(dataSource);
    const publishTable = () => {
      return <></>;
    };
    const columns = [
      {
        title: '序号',
        dataIndex: 'index',
        key: 'name',
        render: (text: any) => <a>{text}</a>,
      },
      {
        title: '名称',
        dataIndex: 'title',
        key: 'name',
        render: (text: any) => <a>{text}</a>,
      },
      {
        title: '分类',
        dataIndex: 'category',
        key: 'name',
        render: (text: any) => <a>{text}</a>,
      },
      {
        title: '标签',
        dataIndex: 'label',
        key: 'name',
        render: (text: any) => <a>{text}</a>,
      },
      {
        title: '类型',
        dataIndex: 'type',
        key: 'name',
        render: (text: any) => <a>{text}</a>,
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'name',
        render: (text: any) => <a>{text}</a>,
      },
      {
        title: '修改时间',
        dataIndex: 'createTime',
        key: 'name',
        render: (text: any) => <a>{text}</a>,
      },
      {
        title: '操作',
        dataIndex: '',
        key: 'name',
        render: (text: any) => <a>{text}</a>,
      },
    ];

    return (
      <Fragment>
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={{ position: ['bottomRight'] }}
        />
      </Fragment>
    );
  }
}
export default ArticleTable;
