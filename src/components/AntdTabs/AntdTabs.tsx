import React, { Fragment, PureComponent } from 'react';
import { Tabs } from 'antd';
import styles from './AntdTabs.less';
import classnames from 'classnames';

class AntdTabs extends PureComponent {
    render() {
        const {
            activeTab,
            noBorder = false,
            children,
            ...tabProps
        } = this.props;
        return (
            <Fragment>
                <div
                    className={classnames(
                        styles.antdTabs,
                        noBorder && styles.addTabBorder,
                    )}
                >
                    <Tabs activeKey={activeTab} {...tabProps}>
                        {children}
                    </Tabs>
                </div>
            </Fragment>
        );
    }
}

export default AntdTabs;
