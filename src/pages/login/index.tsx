import React, { Fragment, PureComponent } from 'react';
import styles from './index.less';
import LoginPanel from './LoginPanel';
import { Row, Col, Divider } from 'antd';
import { LoginModelState, connect } from 'umi';

class LoginPage extends PureComponent {
  render() {
    const { dispatch, loading } = this.props;
    return (
      <Fragment>
        <div className={styles.loginContainer}>
          <section className={styles.loginWarp}>
            <LoginPanel dispatch={dispatch} loading={loading} />
          </section>
        </div>
      </Fragment>
    );
  }
}

export default connect(
  ({ login, loading }: { login: LoginModelState; loading: any }) => ({
    login,
    loading,
  }),
)(LoginPage);
