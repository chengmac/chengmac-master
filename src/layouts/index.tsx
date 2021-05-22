import React, { Children, Fragment, PureComponent } from 'react';
import PublicLayout from './PublicLayout';
import Cookies from 'js-cookie';
import { ConfigProvider, message } from 'antd';

message.config({
    top: 100,
    duration: 2,
    maxCount: 3,
    rtl: true,
    prefixCls: 'mc-message',
});
class IndexLayout extends PureComponent {
    render() {
        const { children } = this.props;
        const renderLayout = () => {
            if (Cookies.get('MCKEY')) {
                return <PublicLayout>{children}</PublicLayout>;
            } else {
                return <Fragment>{children}</Fragment>;
            }
        };
        return (
            <Fragment>
                <ConfigProvider prefixCls={'mc'}>
                    <div id="main" style={{ minHeight: '100vh' }}>
                        {renderLayout()}
                    </div>
                </ConfigProvider>
            </Fragment>
        );
    }
}
export default IndexLayout;
