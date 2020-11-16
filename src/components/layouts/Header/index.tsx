import React, { Fragment, PureComponent } from 'react';
import { Layout, Avatar, Dropdown, Menu, Badge } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  BellOutlined,
} from '@ant-design/icons';
import styles from './index.less';
import Cookies from 'js-cookie';
import { history } from 'umi';
const { Header } = Layout;

class Headers extends PureComponent {
  userLogout() {
    Cookies.remove('MCKEY');
    history.push('/login');
  }
  render() {
    const headerRitghtContent = [];
    const renderCollapsed = React.createElement(
      this.props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
      {
        className: 'trigger',
        onClick: this.props.toggle,
      },
    );
    headerRitghtContent.push(renderCollapsed);
    const menu = (
      <Menu>
        <Menu.Item
          key="0"
          onClick={() => {
            this.userLogout();
          }}
        >
          退出登录
        </Menu.Item>
      </Menu>
    );
    const noticeCenter = (
      <Badge size="default" count={5}>
        <span className={styles.noticeCenter}>
          <BellOutlined />
        </span>
      </Badge>
    );
    const renderAvatar = (
      <Dropdown overlay={menu}>
        <span>
          <Avatar
            size={32}
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          />
          <span className={styles.profileName}>chengmac</span>
        </span>
      </Dropdown>
    );
    headerRitghtContent.push(renderAvatar);
    return (
      <Fragment>
        <Header className="site-layout-background">
          {headerRitghtContent.map((ReactNode, i) => (
            <Fragment key={i}>{ReactNode}</Fragment>
          ))}
        </Header>
      </Fragment>
    );
  }
}

export default Headers;
