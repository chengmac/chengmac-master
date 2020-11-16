import React, { Fragment, PureComponent } from 'react';
import styles from './PublicLayout.less';
import { Layout } from 'antd';
const { Content } = Layout;
import Headers from '@/components/layouts/Header';
import Siders from '@/components/layouts/Sider';

class PublicLayout extends PureComponent {
  state = {
    collapsed: false,
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  render() {
    const { children } = this.props;
    return (
      <Fragment>
        <Layout className={styles.layout}>
          <Siders collapsed={this.state.collapsed} />
          <Layout className="site-layout">
            <Headers collapsed={this.state.collapsed} toggle={this.toggle} />
            <Content
              className="site-layout-background"
              style={{ margin: 16, padding: 15 }}
            >
              {children}
            </Content>
          </Layout>
        </Layout>
      </Fragment>
    );
  }
}
export default PublicLayout;
