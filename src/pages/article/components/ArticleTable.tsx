import React, { Fragment, PureComponent } from 'react';
import { Table, Tag, Dropdown, Menu, Typography, Button, Popover } from 'antd';
import styles from './ArticleTable.less';
import { EllipsisOutlined } from '@ant-design/icons';
import moment from 'moment';
import HeroImage from '@/components/HeroImage/HeroImage';
import { NavLink } from 'umi';
const { Paragraph } = Typography;

interface ArticleTableType {
    dataSource: [];
}
class ArticleTable extends PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        const { article, actionMenu, key, loading } = this.props;
        const tableActionMenu = record => (
            <Menu>
                {actionMenu.map((menu: object, index: number) => (
                    <Menu.Item
                        key={index}
                        icon={menu.icon}
                        onClick={() => menu.callback(record, menu?.action)}
                    >
                        {menu.name}
                    </Menu.Item>
                ))}
            </Menu>
        );
        const columns = [
            {
                title: '序号',
                dataIndex: 'index',
                width: '60px',
                render: (row: any, record: object) => (
                    <Fragment>{record.index}</Fragment>
                ),
            },
            {
                title: '名称',
                dataIndex: 'title',
                render: (row: any, record: object) => (
                    <Fragment>
                        <NavLink to="#" className={styles.articleTitleWrap}>
                            <HeroImage src={record.heroImage} />
                            <Paragraph
                                ellipsis={2}
                                className={styles.articleTitle}
                            >
                                {record.title}
                            </Paragraph>
                        </NavLink>
                    </Fragment>
                ),
            },
            {
                title: '分类',
                dataIndex: 'category',
                width: '80px',
                render: (row: any, record: object) => (
                    <Fragment>{record.category}</Fragment>
                ),
            },
            {
                title: '标签',
                dataIndex: 'label',
                width: '150px',
                render: (row: any) => (
                    <>
                        {row.map((tag: string) => {
                            return (
                                <Tag key={tag} color="blue">
                                    {tag}
                                </Tag>
                            );
                        })}
                    </>
                ),
            },
            {
                title: '类型',
                dataIndex: 'type',
                width: '80px',
                render: (type: any) => (
                    <Fragment>{type == 1 ? '转载' : '原创'}</Fragment>
                ),
            },
            {
                title: '创建时间',
                dataIndex: 'createTime',
                width: '150px',
                render: (createTime: any) => (
                    <Fragment>
                        {moment(createTime).format('YYYY-MM-DD HH:mm:ss')}
                    </Fragment>
                ),
            },
            {
                title: '修改时间',
                dataIndex: 'updateTime',
                width: '150px',
                render: (updateTime: any) => (
                    <Fragment>
                        {!updateTime
                            ? '-'
                            : moment(updateTime).format('YYYY-MM-DD HH:mm:ss')}
                    </Fragment>
                ),
            },
            {
                title: '操作',
                dataIndex: '',
                width: '100px',
                render: (row: any, record: object) => (
                    <Fragment>
                        <Popover
                            placement="bottom"
                            title={undefined}
                            content={tableActionMenu(record)}
                        >
                            <Button>
                                <EllipsisOutlined />
                            </Button>
                        </Popover>
                    </Fragment>
                ),
            },
        ];

        return (
            <Fragment>
                <Table
                    className={styles.table}
                    columns={columns}
                    dataSource={article}
                    loading={loading}
                />
            </Fragment>
        );
    }
}
export default ArticleTable;
