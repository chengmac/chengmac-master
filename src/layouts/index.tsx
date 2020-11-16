import React, { Children, Fragment, PureComponent } from 'react';
import PublicLayout from './PublicLayout';
import Cookies from 'js-cookie';

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
        <div id="main" style={{ minHeight: '100vh' }}>
          {renderLayout()}
        </div>
      </Fragment>
    );
  }
}
export default IndexLayout;
