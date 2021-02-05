import React, { Fragment, PureComponent } from 'react';
import { Modal, Skeleton, Tabs, Input, Card, Spin, Row, Col } from 'antd';
import styles from './ImageUploadModal.less';
import { unsplash, toJson } from '@/uilts/unsplash';
import CropImage from '@/components/CropImage/CropImage';
import AntdTabs from '@/components/AntdTabs/AntdTabs';
import AntdAlert from '@/components/AntdAlert/AntdAlert';
import InfiniteScroll from 'react-infinite-scroller';
import _ from 'lodash';
import { UPLOAD_ACTION_TYPE } from '@/uilts/constant';

class ImageUploadModal extends PureComponent {
    constructor(props: object) {
        super(props);
        this.state = {
            tabkey: '1',
            imageUrl: '',
            imageList: [],
            searchLoading: false,
            alertMessage: '',
            searchContent: '',
            page: 1,
            hasMore: true,
            total: 0,
        };
    }

    onSearch(input: string) {
        this.setState({ searchContent: input });
        this.fetchUnsplashData(input, this.state.page, 20);
    }

    fetchUnsplashData(input: string, page: number, pageSize: number) {
        this.setState({ searchLoading: true });
        unsplash.search
            .photos(input, page, pageSize)
            .then(toJson)
            .then((res: object) => {
                if (this.state.page > 1) {
                    let cloneImageList = _.cloneDeep(this.state.imageList);
                    cloneImageList = cloneImageList.concat(res.results);
                    this.setState({
                        imageList: cloneImageList,
                        searchLoading: false,
                        total: res.total,
                    });
                } else {
                    this.setState({
                        imageList: res.results,
                        searchLoading: false,
                        total: res.total,
                    });
                }
                if (res.total_pages >= this.state.page) {
                    this.setState({ hasMore: true });
                } else {
                    this.setState({ hasMore: false });
                }
            });
    }

    loadMoreImage() {
        console.log(this.state);
        let currentPage = this.state.page;
        currentPage += 1;
        this.setState({
            page: currentPage,
        });
        this.fetchUnsplashData(this.state.searchContent, currentPage, 20);
    }

    tabChange(key: string) {
        this.setState({
            tabkey: key,
        });
    }

    selectedImage(index: number) {
        let currentItem = this.state.imageList[index];
        this.setState({
            tabkey: '1',
            imageUrl: currentItem.urls.regular,
        });
    }

    showAlertMessage(alert: object) {
        this.setState({
            alertMessage: alert.message,
        });
    }

    saveHandle(blob: File) {
        let formData = new FormData();
        if (blob.name) {
            formData.append('file', blob, blob.name);
        } else {
            formData.append('file', blob);
        }
        if (blob) {
            this.props
                .dispatch({
                    type: 'article/uploadImage',
                    payload: {
                        formData: formData,
                        action: UPLOAD_ACTION_TYPE.HEROIMAGE,
                    },
                })
                .then(
                    (resp: object) => {
                        if (resp.success) {
                            // close modal
                            this.props.onCancel();
                        }
                    },
                    (error: object) => {
                        this.props.onCancel();
                    },
                );
        }
    }
    render() {
        const { title, visible, dispatch, loading, heroImage } = this.props;
        const { imageUrl, tabkey } = this.state;
        return (
            <Fragment>
                <Modal
                    bodyStyle={styles.modalStyle}
                    title={title}
                    visible={visible}
                    width={'1100px'}
                    onCancel={() => this.props.onCancel()}
                    footer={null}
                >
                    {this.state.alertMessage && (
                        <AntdAlert
                            message={this.state.alertMessage}
                            type={'error'}
                            closable
                            showIcon
                        />
                    )}
                    <AntdTabs
                        activeKey={tabkey}
                        onChange={(key: string) => this.tabChange(key)}
                        noBorder={true}
                    >
                        <Tabs.TabPane tab="本地上传" key="1">
                            <CropImage
                                url={this.state.imageUrl}
                                style={{ width: '100%' }}
                                showAlertMessage={this.showAlertMessage.bind(
                                    this,
                                )}
                                saveHandle={this.saveHandle.bind(this)}
                                dispatch={dispatch}
                                loading={loading}
                                width={650}
                                height={415}
                                aspect={16 / 9}
                            />
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="unsplash上传" key="2">
                            <div className={styles.search}>
                                <Input.Search
                                    placeholder="input search text"
                                    allowClear
                                    onSearch={this.onSearch.bind(this)}
                                    enterButton
                                    className={styles.input}
                                />
                                {this.state.total != 0 && (
                                    <span className={styles.total}>
                                        本次搜索结果共：{this.state.total}个
                                    </span>
                                )}
                            </div>
                            <div className={styles.imageWrap}>
                                <InfiniteScroll
                                    key={'InfiniteScroll'}
                                    initialLoad={false}
                                    pageStart={1}
                                    loadMore={this.loadMoreImage.bind(this)}
                                    hasMore={this.state.hasMore}
                                    loader={
                                        <div
                                            style={{
                                                width: '100%',
                                                textAlign: 'center',
                                            }}
                                        >
                                            <Spin
                                                spinning={
                                                    this.state.searchLoading
                                                }
                                            />
                                        </div>
                                    }
                                    threshold={30}
                                    useWindow={false}
                                >
                                    <Row>
                                        {this.state.imageList.map(
                                            (image: object, index: number) => (
                                                <Col
                                                    span={6}
                                                    style={{ padding: 10 }}
                                                    key={index}
                                                >
                                                    <Card hoverable>
                                                        {this.state
                                                            .searchLoading ? (
                                                            <Skeleton.Input
                                                                active={true}
                                                                style={{
                                                                    width:
                                                                        '100%',
                                                                    height: 160,
                                                                }}
                                                            />
                                                        ) : (
                                                            <figure
                                                                className={
                                                                    styles.imageCardView
                                                                }
                                                            >
                                                                <img
                                                                    src={
                                                                        image
                                                                            .urls
                                                                            .regular
                                                                    }
                                                                    onClick={() =>
                                                                        this.selectedImage(
                                                                            index,
                                                                        )
                                                                    }
                                                                    className={
                                                                        styles.imageCard
                                                                    }
                                                                />
                                                            </figure>
                                                        )}
                                                    </Card>
                                                </Col>
                                            ),
                                        )}
                                    </Row>
                                </InfiniteScroll>
                            </div>
                        </Tabs.TabPane>
                    </AntdTabs>
                </Modal>
            </Fragment>
        );
    }
}

export default ImageUploadModal;
