import React, { Fragment, PureComponent, useState } from 'react';
import styles from './LoginPanel.less';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
class LoginPanel extends PureComponent {
  render() {
    const { loading } = this.props;
    const onFinish = (values: object) => {
      console.log('Success:', values);
      this.props.dispatch({
        type: 'login/signin',
        payload: values,
      });
    };

    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
    };
    return (
      <Fragment>
        <Form
          size={'large'}
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input
              size="large"
              prefix={<UserOutlined />}
              placeholder={'用户名'}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined />}
              placeholder={'密码'}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading.effects['login/signin']}
              style={{ width: '100%' }}
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </Fragment>
    );
  }
}
export default LoginPanel;
