import React, { Fragment, PureComponent } from 'react';
import { Alert } from 'antd';
import styles from './AntdAlert.less';

class AntdAlert extends PureComponent {
    render() {
        const { type, message, ...alertProps } = this.props;

        return (
            <Fragment>
                <div className={styles.antdAlert}>
                    <Alert type={type} message={message} {...alertProps} />
                </div>
            </Fragment>
        );
    }
}

export default AntdAlert;
