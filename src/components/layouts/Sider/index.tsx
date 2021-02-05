import { Fragment, PureComponent } from 'react';
import { Layout, Menu } from 'antd';
const { Sider } = Layout;
import { history, Link } from 'umi';
import {
    DashboardOutlined,
    UnorderedListOutlined,
    FolderOpenOutlined,
    EditOutlined,
} from '@ant-design/icons';
import { matchPathRegexp } from '@/uilts';

class Siders extends PureComponent {
    state = {
        selectedMenuKey: [],
        openSubMenuKey: [],
    };

    componentDidMount() {
        this.setState({
            selectedMenuKey: this.props.currentMenu,
            openSubMenuKey: this.props.currentSubMenu,
        });
    }

    componentDidUpdate(prevProps: object) {
        console.log(prevProps, this.props);
        if (prevProps.currentMenu !== this.props.currentMenu) {
            this.setState({
                selectedMenuKey: this.props.currentMenu,
            });
        }
        if (prevProps.currentSubMenu !== this.props.currentSubMenu) {
            this.setState({
                openSubMenuKey: this.props.currentSubMenu,
            });
        }
    }

    selectedMenu(key: string) {
        this.setState({
            selectedMenuKey: [key],
        });
        // 关闭二级菜单
        if (key === 'dashboard') {
            this.setState({
                openSubMenuKey: [],
            });
        }
        this.props.dispatch({
            type: 'app/updateCurrentMenu',
            payload: {
                currentMenu: key,
            },
        });
    }
    openSubKeys(key: []) {
        this.setState({
            openSubMenuKey: key,
        });
    }

    render() {
        const { currentMenu } = this.props;
        return (
            <Fragment>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.props.collapsed}
                >
                    <div className="logo">
                        {/* <img src="https://image.chengmac.cn/upperLogo1.png" alt="" /> */}
                    </div>
                    <Menu
                        theme="dark"
                        mode="inline"
                        selectedKeys={this.state.selectedMenuKey}
                        openKeys={this.state.openSubMenuKey}
                        onOpenChange={openKeys => {
                            this.openSubKeys(openKeys);
                        }}
                        onClick={({ item, key, keyPath, domEvent }) =>
                            this.selectedMenu(key)
                        }
                    >
                        <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
                            <Link to="/dashboard">概览</Link>
                        </Menu.Item>
                        <Menu.SubMenu
                            key="article"
                            icon={<FolderOpenOutlined />}
                            title="文章管理"
                            // onTitleClick={(key, doEvent) => }
                        >
                            <Menu.Item key="editor" icon={<EditOutlined />}>
                                <Link to="/article/editor">文章编辑</Link>
                            </Menu.Item>
                            <Menu.Item
                                key="manage"
                                icon={<UnorderedListOutlined />}
                            >
                                <Link to="/article/manage">文章管理</Link>
                            </Menu.Item>
                        </Menu.SubMenu>
                    </Menu>
                </Sider>
            </Fragment>
        );
    }
}

export default Siders;
