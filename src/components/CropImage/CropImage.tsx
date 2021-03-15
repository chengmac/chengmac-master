import React, { Children, Fragment, PureComponent } from 'react';
import { Upload, Row, Col, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import styles from './CropImage.less';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

class CropImage extends PureComponent {
    constructor(props: object) {
        super(props);
        this.state = {
            crop: {
                width: 0,
                height: 0,
                aspect: 16 / 9,
            },
            imageUrl: '',
            fileObject: null,
            currentFile: null,
        };
    }

    componentDidMount() {
        const { width, height, aspect } = this.props;
        this.setState({
            crop: {
                width: width,
                height: (width * 9) / 16,
            },
        });
    }

    componentDidUpdate(prevProps: object) {
        if (prevProps.url != this.props.url) {
            this.setState({
                imageUrl: this.props.url,
            });
        }
    }

    onCropComplete = (crop: any) => {
        this.makeClientCrop(crop);
    };

    onCropChange = (crop: any, percentCrop) => {
        this.setState({ crop });
    };

    async makeClientCrop(crop: any) {
        let imageName = null;
        if (this.state.currentFile) {
            imageName = this.state.currentFile.name;
        } else {
            let regx = /(?<=com\/).*?(?=\?crop)/gi;
            let type = this.state.imageUrl.match(/(?<=&fm=).*?(?=&ixid)/gi);
            imageName = this.state.imageUrl.match(regx) + '.' + type;
        }
        if (this.imageRef && crop.width && crop.height) {
            const croppedImageUrl = await this.getCroppedImg(
                this.imageRef,
                crop,
                imageName,
            );
            this.setState({
                fileObject: croppedImageUrl,
            });
        }
    }
    onImageLoaded = (image: any) => {
        this.imageRef = image;
    };
    async getCroppedImg(image: any, crop: any, fileName: string) {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height,
        );
        return new Promise((resolve, reject) => {
            canvas.toBlob(
                (blob: any) => {
                    blob.name = fileName;
                    resolve(blob);
                },
                'image/jpeg',
                1,
            );
        });
    }

    beforeUpload(file: File) {
        return new Promise((resolve, reject) => {
            const isJpgOrPng =
                file.type === 'image/jpeg' ||
                file.type === 'image/jpg' ||
                file.type === 'image/png';
            if (!isJpgOrPng) {
                this.props.showAlertMessage({
                    message: '当前仅支持JPG/JPEG/PNG等格式',
                });
                return reject(false);
            }
            const isLt4M = file.size / 1024 / 1024 < 4;
            if (!isLt4M) {
                this.props.showAlertMessage({
                    message: '上传图片不能大于4M',
                });
                return reject(false);
            }
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                this.setState({
                    imageUrl: reader.result,
                    currentFile: file,
                });
            };
            reject(reader);
        });
    }

    saveImage() {
        this.props.saveHandle(this.state.fileObject);
    }
    render() {
        const { url, resize, loading, ...cropProps } = this.props;
        const { crop } = this.state;
        return (
            <Fragment>
                {!this.state.imageUrl ? (
                    <Row>
                        <Col span={24} className={styles.col}>
                            <Upload.Dragger
                                className={styles.dragger}
                                beforeUpload={this.beforeUpload.bind(this)}
                                showUploadList={false}
                                action="#"
                            >
                                <Button icon={<UploadOutlined />}>
                                    点击上传
                                </Button>
                                <p className={styles.uploadDescript}>
                                    单击或拖动文件到该区域以上传
                                </p>
                            </Upload.Dragger>
                        </Col>
                    </Row>
                ) : (
                    <Row className={styles.reactCropRow}>
                        <Col span={18} className={styles.reactCropCol}>
                            <ReactCrop
                                src={this.state.imageUrl}
                                crop={crop}
                                onImageLoaded={this.onImageLoaded}
                                onComplete={this.onCropComplete}
                                onChange={this.onCropChange}
                                disabled={false}
                                locked={resize === false}
                                style={{ width: 650, height: 415 }}
                                crossorigin={'anonymous'}
                                imageStyle={{ width: 650, height: 415 }}
                                cropProps
                            />
                        </Col>
                        <Col span={6} className={styles.reactCropSave}>
                            <Button
                                type="primary"
                                onClick={() => this.saveImage()}
                                loading={loading}
                            >
                                保存
                            </Button>
                        </Col>
                    </Row>
                )}
            </Fragment>
        );
    }
}

export default CropImage;
