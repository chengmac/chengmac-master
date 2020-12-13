import React, { PureComponent } from 'react';
import { Alert, Input, Tag, Tooltip, Button, Row, Col } from 'antd';
import _ from 'lodash';

class CreateCategory extends PureComponent {
    state = {
        tags: this.props.categoryList || [],
        inputVisible: false,
        inputValue: '',
        isExist: false,
        tagColorList: [
            'magenta',
            'red',
            'volcano',
            'orange',
            'gold',
            'lime',
            'green',
            'cyan',
            'blue',
            'geekblue',
            'purple',
        ],
    };

    handleInputChange = (e: any) => {
        this.setState({ inputValue: e.target.value });
    };

    handleCreateConfirm = () => {
        // this.setState({ isExist: true });
        this.props.createCategory(this.state.inputValue);
    };

    render() {
        const { tags, inputValue, tagColorList, isExist } = this.state;
        return (
            <>
                {isExist ? (
                    <Alert message="该分类已经存在" type="warning" showIcon />
                ) : null}
                <Row style={{ marginLeft: 5 }}>
                    <Col span={16}>
                        <Input
                            type="text"
                            value={inputValue}
                            placeholder="请输入新的名称"
                            onChange={this.handleInputChange}
                        />
                    </Col>
                    <Col offset={1}>
                        <Button
                            type="primary"
                            onClick={this.handleCreateConfirm.bind(this)}
                            disabled={!inputValue}
                        >
                            创建
                        </Button>
                    </Col>
                </Row>
                {this.props.categoryList.map((tag, index) => {
                    const isLongTag = tag.length > 20;
                    const tagElem = (
                        <Tag
                            className="edit-tag"
                            key={tag}
                            color={tagColorList[index]}
                        >
                            <span>
                                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                            </span>
                        </Tag>
                    );
                    return isLongTag ? (
                        <Tooltip title={tag} key={tag}>
                            {tagElem}
                        </Tooltip>
                    ) : (
                        tagElem
                    );
                })}
            </>
        );
    }
}

export default CreateCategory;
