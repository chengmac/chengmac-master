import React, { Fragment, PureComponent } from 'react';
import styles from './PublicLayout.less';
import { Layout } from 'antd';
const { Content } = Layout;
import Headers from '@/components/layouts/Header';
import Siders from '@/components/layouts/Sider';
import { AppModelState, connect } from 'umi';

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
        const { children, dispatch, app } = this.props;
        return (
            <Fragment>
                <Layout className={styles.layout}>
                    <Siders
                        collapsed={this.state.collapsed}
                        dispatch={dispatch}
                        currentMenu={app.currentMenu}
                        currentSubMenu={app.currentSubMenu}
                    />
                    <Layout className="site-layout">
                        <Headers
                            collapsed={this.state.collapsed}
                            toggle={this.toggle}
                        />
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

export default connect(({ app }: { app: AppModelState }) => ({
    app,
}))(PublicLayout);
