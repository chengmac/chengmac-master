import React, { Fragment } from 'react';
import styles from './index.less';
import { Redirect } from 'umi';

export default () => {
  return (
    <Fragment>
      <Redirect to="/login" />
    </Fragment>
  );
};
