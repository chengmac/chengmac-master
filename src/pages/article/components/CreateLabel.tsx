import React, { PureComponent } from 'react';
import { Input, Tag, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

class CreateLabel extends PureComponent {
    state = {
        inputVisible: false,
        inputValue: '',
        editInputIndex: -1,
        editInputValue: '',
    };
    handleClose = (removedTag: string) => {
        this.props.removeLabel(removedTag);
    };

    showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
    };

    handleInputChange = (e: any) => {
        this.setState({ inputValue: e.target.value });
    };
    handleInputConfirm = () => {
        this.setState({
            inputVisible: false,
            inputValue: '',
        });
        this.props.createLabel(this.state.inputValue);
    };

    handleEditInputChange = (e: any) => {
        this.setState({ editInputValue: e.target.value });
    };
    handleEditInputConfirm = () => {
        this.setState({
            editInputIndex: -1,
            editInputValue: '',
        });
        this.props.createLabel(this.state.inputValue);
    };

    saveInputRef = (input: string) => {
        this.input = input;
    };

    saveEditInputRef = (input: string) => {
        this.editInput = input;
    };
    render() {
        const {
            inputVisible,
            inputValue,
            editInputIndex,
            editInputValue,
        } = this.state;
        return (
            <>
                {this.props.tagList.map((tag, index) => {
                    // if (editInputIndex === index) {
                    //     return (
                    //         <Input
                    //             ref={this.saveEditInputRef}
                    //             key={tag}
                    //             size="small"
                    //             className="tag-input"
                    //             value={editInputValue}
                    //             onChange={this.handleEditInputChange}
                    //             onBlur={this.handleEditInputConfirm}
                    //             onPressEnter={this.handleEditInputConfirm}
                    //         />
                    //     );
                    // }

                    const isLongTag = tag.length > 20;

                    const tagElem = (
                        <Tag
                            className="edit-tag"
                            key={tag}
                            closable={true}
                            onClose={() => this.handleClose(tag)}
                        >
                            <span
                                onDoubleClick={e => {
                                    if (index !== 0) {
                                        this.setState(
                                            {
                                                editInputIndex: index,
                                                editInputValue: tag,
                                            },
                                            () => {
                                                this.editInput.focus();
                                            },
                                        );
                                        e.preventDefault();
                                    }
                                }}
                            >
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
                {inputVisible && (
                    <Input
                        ref={this.saveInputRef}
                        type="text"
                        size="small"
                        className="tag-input"
                        value={inputValue}
                        onChange={this.handleInputChange}
                        onBlur={this.handleInputConfirm}
                        onPressEnter={this.handleInputConfirm}
                    />
                )}
                {!inputVisible && (
                    <Tag className="site-tag-plus" onClick={this.showInput}>
                        <PlusOutlined /> New Tag
                    </Tag>
                )}
            </>
        );
    }
}

export default CreateLabel;
