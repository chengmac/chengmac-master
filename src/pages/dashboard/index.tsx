import React, { Fragment, PureComponent } from 'react';
import { PageHeader } from 'antd';
// import styles from './index.less';

class DashboardView extends PureComponent {
  render() {
    return (
      <Fragment>
        <PageHeader
          className="site-page-header"
          backIcon={false}
          title="概览"
        />
        <div>article editor page</div>
      </Fragment>
    );
  }
}
export default DashboardView;
