import React, { Fragment, PureComponent } from 'react';
import {
    PageHeader,
    Card,
    Form,
    Input,
    Select,
    Switch,
    Radio,
    Button,
    message,
    Row,
    Col,
} from 'antd';
import styles from './index.less';
import CreateLabel from '../components/CreateLabel';
import CreateCategory from '../components/CreateCategory';
import { connect } from 'umi';
import { ArticleModelState } from '../models/articleModel';
import { UploadOutlined } from '@ant-design/icons';
import ImageUploadModal from '../components/ImageUploadModal/ImageUploadModal';
import BraftEditor from '@/components/BraftEditor/BraftEditor';
import _ from 'lodash';
import { history } from 'umi';

class EditorArticle extends PureComponent {
    state = {
        editorState: null,
        visibleModal: false,
    };

    handleEditorChange(editorState: any) {
        console.log(editorState);
        this.setState({ editorState });
    }
    submitContent = editorContent => {};
    onPublish(values: object) {
        const { location } = this.props;
        if (this.state.editorState == null) {
            message.error('请输入文章内容');
            return false;
        }
        let content = this.state.editorState.toHTML();
        if (_.isEmpty(this.props.location.state)) {
            console.log('editor::::', content);
            this.props
                .dispatch({
                    type: 'article/saveArticle',
                    payload: {
                        ...values,
                        content: content,
                        heroImage: this.props.article.heroImage,
                        createTime: Date.now(),
                    },
                })
                .then(
                    (res: object) => {
                        message.success(res.message);
                        history.push('/article/manage');
                    },
                    (err: object) => {
                        message.error(err.message);
                    },
                );
        } else {
            this.props
                .dispatch({
                    type: 'article/updateArticle',
                    payload: {
                        ...values,
                        content: content,
                        heroImage: this.props.article.heroImage,
                        articleId: location.state?.articleObject?.articleId,
                    },
                })
                .then(
                    (res: object) => {
                        message.success(res.message);
                        history.push('/article/manage');
                    },
                    (err: object) => {
                        message.error(err.message);
                    },
                );
        }
    }

    createCategory(category: string) {
        this.props
            .dispatch({
                type: 'article/createCategory',
                payload: { name: category, submenu: false },
            })
            .then(() => {
                this.props.dispatch({
                    type: 'article/categoryList',
                });
            });
    }

    createLabal(tag: string) {
        this.props
            .dispatch({
                type: 'article/createLabel',
                payload: { name: tag },
            })
            .then(() => {
                this.props.dispatch({
                    type: 'article/labelList',
                });
            });
    }

    removeLabel(name: string) {
        this.props
            .dispatch({
                type: 'article/deleteLabel',
                payload: { labelName: name },
            })
            .then(res => {
                message.success(res.message);
            });
    }

    cancelUpload() {
        this.setState({
            visibleModal: false,
        });
    }
    confirmUpload() {
        this.setState({
            visibleModal: false,
        });
    }

    render() {
        const { loading, article, dispatch, location } = this.props;
        const { categoryList, tagList, heroImage } = article;
        const basicInfo = () => {
            return (
                <Fragment>
                    <Form name="basic" onFinish={this.onPublish.bind(this)}>
                        <Form.Item
                            label="文章标题"
                            name="title"
                            rules={[
                                { required: true, message: '请输入文章标题!' },
                            ]}
                            initialValue={
                                location.state?.articleObject?.title || ''
                            }
                        >
                            <Input placeholder="请输入" />
                        </Form.Item>
                        <Form.Item
                            label="文章子标题"
                            name="subtitle"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入文章子标题!',
                                },
                            ]}
                            initialValue={
                                location.state?.articleObject?.subtitle || ''
                            }
                        >
                            <Input placeholder="请输入" />
                        </Form.Item>
                        <Form.Item
                            label="文章分类"
                            name="category"
                            rules={[
                                { required: true, message: '请选择文章分类!' },
                            ]}
                            initialValue={
                                location.state?.articleObject?.category ||
                                undefined
                            }
                        >
                            <Select placeholder="请选择">
                                {categoryList.map(category => {
                                    return (
                                        <Select.Option
                                            value={category}
                                            label={category}
                                        >
                                            {category}
                                        </Select.Option>
                                    );
                                })}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="文章标签"
                            name="label"
                            rules={[
                                { required: true, message: '请选择文章标签!' },
                            ]}
                            initialValue={
                                location.state?.articleObject?.label ||
                                undefined
                            }
                        >
                            <Select
                                mode="multiple"
                                showArrow
                                style={{ width: '100%' }}
                                placeholder="请选择"
                                optionLabelProp="label"
                            >
                                {tagList.map(tag => {
                                    return (
                                        <Select.Option value={tag} label={tag}>
                                            {tag}
                                        </Select.Option>
                                    );
                                })}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="文章类型"
                            name="type"
                            required={true}
                            initialValue={
                                location.state?.articleObject?.type || '0'
                            }
                        >
                            <Radio.Group name="radiogroup">
                                <Radio value={'0'}>原创</Radio>
                                <Radio value={'1'}>转载</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            label="存为草稿"
                            name="status"
                            required={true}
                            initialValue={
                                location.state?.articleObject?.status || 'PUB'
                            }
                        >
                            <Radio.Group name="radiogroup">
                                <Radio value={'DRA'}>是</Radio>
                                <Radio value={'PUB'}>否</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            label="是否公开"
                            name="private"
                            required={true}
                            initialValue={
                                location.state?.articleObject?.private || true
                            }
                        >
                            <Switch
                                checkedChildren="是"
                                unCheckedChildren="否"
                                defaultChecked
                            />
                        </Form.Item>
                        <Form.Item>
                            {_.isEmpty(location.state) ? (
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={
                                        loading.effects['article/saveArticle']
                                    }
                                    style={{ width: '80px' }}
                                >
                                    立即发布
                                </Button>
                            ) : (
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={
                                        loading.effects['article/updateArticle']
                                    }
                                    style={{ width: '80px' }}
                                >
                                    修改并发布
                                </Button>
                            )}
                        </Form.Item>
                    </Form>
                </Fragment>
            );
        };
        return (
            <Fragment>
                <PageHeader
                    className="site-page-header"
                    backIcon={false}
                    title="文章编辑"
                />
                <section className={styles.editorContainer}>
                    <Row>
                        <Col>
                            <Card title="文章主图">
                                <div
                                    className={styles.uploader}
                                    onClick={() =>
                                        this.setState({ visibleModal: true })
                                    }
                                >
                                    {heroImage != '' ? (
                                        <div
                                            style={{
                                                backgroundImage: `url(${heroImage})`,
                                            }}
                                            className={styles.heroImage}
                                        />
                                    ) : (
                                        <div className={styles.uploadWarp}>
                                            <UploadOutlined
                                                className={styles.updateIcon}
                                            />
                                            <span>点击上传</span>
                                        </div>
                                    )}
                                </div>
                            </Card>
                        </Col>
                    </Row>
                    <div className={styles.editorDiv}>
                        <div className={styles.editors}>
                            <Card title="文章内容">
                                <BraftEditor
                                    location={location}
                                    onChange={this.handleEditorChange.bind(
                                        this,
                                    )}
                                    onSave={this.submitContent.bind(this)}
                                    dispatch={dispatch}
                                />
                            </Card>
                        </div>
                        <div className={styles.basicInfo}>
                            <Card title="新建分类">
                                <CreateCategory
                                    createCategory={this.createCategory.bind(
                                        this,
                                    )}
                                    categoryList={categoryList}
                                />
                            </Card>
                            <Card title="新建标签">
                                <CreateLabel
                                    tagList={tagList}
                                    createLabel={this.createLabal.bind(this)}
                                    removeLabel={this.removeLabel.bind(this)}
                                />
                            </Card>
                            <Card title="基础信息">{basicInfo()}</Card>
                        </div>
                    </div>
                </section>
                <ImageUploadModal
                    key={'upload'}
                    title={'图片上传'}
                    visible={this.state.visibleModal}
                    onOk={this.confirmUpload.bind(this)}
                    onCancel={this.cancelUpload.bind(this)}
                    heroImage={heroImage}
                    loading={loading.effects['article/uploadImage']}
                    dispatch={dispatch}
                />
            </Fragment>
        );
    }
}
export default connect(
    ({ article, loading }: { article: ArticleModelState; loading: any }) => ({
        article,
        loading,
    }),
)(EditorArticle);
