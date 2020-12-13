import React, { Fragment, PureComponent } from 'react';
import { Skeleton } from 'antd';
import styles from './HeroImage.less';
import PropTypes from 'prop-types';

class HeroImage extends PureComponent {
    render() {
        const { src, ...alertProps } = this.props;

        return (
            <Fragment>
                {!src ? (
                    <Skeleton.Input
                        active={true}
                        style={{ width: 80, height: 50 }}
                        loading={!src}
                    />
                ) : (
                    <figure className={styles.heroImage}>
                        <img src={src} className={styles.heroImage} />
                    </figure>
                )}
            </Fragment>
        );
    }
}

export default HeroImage;
