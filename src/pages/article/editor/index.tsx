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
  Upload,
  message,
} from 'antd';
import styles from './index.less';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import CreateTag from '../components/CreateTag';
import CreateCategory from '../components/CreateCategory';
import { connect } from 'umi';
import { ArticleModelState } from '../models/articleModel';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { getBase64 } from '@/uilts';

class EditorArticle extends PureComponent {
  state = {
    editorState: null,
    uploadLoading: false,
  };
  async componentDidMount() {
    // const htmlContent = await fetchEditorContent();
    // // Use BraftEditor.createEditorState to convert html strings to editorState data needed by the editor
    // this.setState({
    //     editorState: BraftEditor.createEditorState(htmlContent)
    // })
  }
  handleEditorChange(editorState: any) {
    console.log(editorState);
    this.setState({ editorState });
  }
  submitContent = async () => {
    const htmlContent = this.state.editorState.toHTML();
    // const result = await saveEditorContent(htmlContent)
  };
  onPublish(values: object) {
    console.log(values);
    let content = this.state.editorState.toHTML();
    console.log('editor::::', content);
    this.props
      .dispatch({
        type: 'article/saveArticle',
        payload: {
          ...values,
          content: content,
          createTime: Date.now(),
        },
      })
      .then(
        (res: object) => {
          message.success(res.message);
        },
        (err: object) => {
          message.error(err.message);
        },
      );
  }

  handleChange(info: any) {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl: string) =>
        this.setState({
          imageUrl,
          uploadLoading: false,
        }),
      );
    }
  }

  beforeUpload(file: File) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }
  render() {
    const { loading } = this.props;
    const { uploadLoading, imageUrl } = this.state;
    const basicInfo = () => {
      return (
        <Fragment>
          <Form name="basic" onFinish={this.onPublish.bind(this)}>
            <Form.Item
              label="文章名称"
              name="title"
              rules={[{ required: true, message: '请输入文章名称!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="文章分类"
              name="category"
              rules={[{ required: true, message: '请选择文章分类!' }]}
            >
              <Select>
                <Select.Option value="node">Node</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="文章标签"
              name="label"
              rules={[{ required: true, message: '请选择文章标签!' }]}
              initialValue={['react']}
            >
              <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="请选择"
                // onChange={handleChange}
                optionLabelProp="label"
              >
                <Select.Option value="react" label="react">
                  react
                </Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="文章类型"
              name="type"
              required={true}
              initialValue={'1'}
            >
              <Radio.Group name="radiogroup">
                <Radio value={'1'}>原创</Radio>
                <Radio value={'0'}>转载</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label="存为草稿"
              name="status"
              required={true}
              initialValue={'PUB'}
            >
              <Radio.Group name="radiogroup">
                <Radio value={'DRA'}>是</Radio>
                <Radio value={'PUB'}>否</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="是否公开" name="private" required={true}>
              <Switch
                checkedChildren="是"
                unCheckedChildren="否"
                defaultChecked
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading.effects['article/saveArticle']}
                style={{ width: '80px' }}
              >
                立即发布
              </Button>
            </Form.Item>
          </Form>
        </Fragment>
      );
    };
    const uploadButton = (
      <div>
        {uploadLoading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <Fragment>
        <PageHeader
          className="site-page-header"
          backIcon={false}
          title="文章编辑"
        />
        <section className={styles.editorContainer}>
          <div className={styles.editors}>
            <Card title="文章内容">
              <BraftEditor
                value={this.state.editorState}
                onChange={this.handleEditorChange.bind(this)}
                onSave={this.submitContent.bind(this)}
              />
            </Card>
          </div>
          <div className={styles.basicInfo}>
            <Card title="文章主图">
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={this.beforeUpload}
                onChange={this.handleChange}
              >
                {imageUrl ? (
                  <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
                ) : (
                  uploadButton
                )}
              </Upload>
            </Card>
            <Card title="新建分类">
              <CreateCategory />
            </Card>
            <Card title="新建标签">
              <CreateTag />
            </Card>
            <Card title="基础信息">{basicInfo()}</Card>
          </div>
        </section>
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
