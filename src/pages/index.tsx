import React, { Fragment } from 'react';
import { Redirect } from 'umi';

export default () => {
    return (
        <Fragment>
            <Redirect to="/login" />
        </Fragment>
    );
};
