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

class Siders extends PureComponent {
  state = {
    selectedMenuKey: [],
    openSubMenuKey: [],
  };

  componentDidMount() {
    const currentRoute = history.location.pathname;
    const currentRouteArr = currentRoute.split('/');
    if (currentRouteArr.length == 2) {
      this.setState({
        selectedMenuKey: currentRouteArr,
      });
    } else {
      this.setState({
        selectedMenuKey: currentRouteArr.slice(2, 3),
        openSubMenuKey: currentRouteArr.slice(1, 2),
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
  }
  openSubKeys(key: []) {
    this.setState({
      openSubMenuKey: key,
    });
  }

  render() {
    return (
      <Fragment>
        <Sider trigger={null} collapsible collapsed={this.props.collapsed}>
          <div className="logo"></div>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={this.state.selectedMenuKey}
            openKeys={this.state.openSubMenuKey}
            onOpenChange={openKeys => {
              this.openSubKeys(openKeys);
            }}
            onClick={({ item, key, keyPath, domEvent }) => {
              this.selectedMenu(key);
            }}
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
              <Menu.Item key="manage" icon={<UnorderedListOutlined />}>
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
