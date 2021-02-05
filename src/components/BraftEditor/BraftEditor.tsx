import { Fragment, PureComponent } from 'react';
import 'braft-editor/dist/index.css';
import 'braft-extensions/dist/code-highlighter.css';
import Editor from 'braft-editor';
import CodeHighlighter from 'braft-extensions/dist/code-highlighter';
import { UPLOAD_ACTION_TYPE } from '@/uilts/constant';

Editor.use(CodeHighlighter({ includeEditors: ['editor1'] }));
class BraftEditor extends PureComponent {
    state = {
        editorState: null,
    };
    componentDidUpdate(preProps: object, preState) {
        if (preProps.location.state && this.state.editorState === null) {
            this.setState({
                editorState: Editor.createEditorState(
                    this.props.location.state?.articleObject?.content,
                ),
            });
        }
    }
    handleEditorChange(editorState: any) {
        this.setState({ editorState });
        this.props.onChange(this.state.editorState);
    }
    submitContent = async () => {
        const htmlContent = this.state.editorState.toHTML();
        this.props.onSave(htmlContent);
    };

    myUploadFn = (param: File) => {
        let formData = new FormData();
        formData.append('file', param.file);
        this.props
            .dispatch({
                type: 'article/uploadImage',
                payload: {
                    formData: formData,
                    action: UPLOAD_ACTION_TYPE.OTHER,
                },
            })
            .then(
                (resp: object) => {
                    if (resp.success) {
                        param.success({ url: resp.result?.imageUrl });
                    }
                },
                (err: object) => {
                    param.error({ msg: err.message });
                },
            );
    };

    myValidateFn = (file: File) => {
        return new Promise((resolve, reject) => {
            file.size < 1024 * 1024 * 4 ? resolve(true) : reject(false);
        });
    };

    render() {
        return (
            <Fragment>
                <Editor
                    value={this.state.editorState}
                    onChange={this.handleEditorChange.bind(this)}
                    onSave={this.submitContent.bind(this)}
                    media={{
                        uploadFn: this.myUploadFn,
                        validateFn: this.myValidateFn,
                    }}
                    id="editor1"
                />
            </Fragment>
        );
    }
}

export default BraftEditor;
