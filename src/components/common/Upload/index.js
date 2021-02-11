import React from 'react';
import RcUpload from 'rc-upload';
import UploadList from './list'

function getFileItem(file, fileList) {
    // get file from filelist
    const matchKey = file.uid !== undefined ? 'uid' : 'name';
    return fileList.filter(item => item[matchKey] === file[matchKey])[0];
}
function removeFileItem(file, fileList) {
    // remove file from filelist
    const matchKey = file.uid !== undefined ? 'uid' : 'name';
    const removed = fileList.filter(item => item[matchKey] !== file[matchKey]);
    if (removed.length === fileList.length) {
        return null;
    }
    return removed;
}
export default class Upload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fileList: props.fileList || props.defaultFileList || [],
            showFileList: typeof props.showFileList === 'boolean' ? props.showFileList : true
        }
    }

    handleRemove = (file) => {
        let self = this
        const { onRemove } = self.props;
        const { fileList } = self.state;

        Promise.resolve(typeof onRemove === 'function' ? onRemove(file) : onRemove).then(ret => {
            // Prevent removing file
            if (ret === false) {
                return;
            }

            const removedFileList = removeFileItem(file, fileList);

            if (removedFileList) {
                file.status = 'removed';

                if (self.upload) {
                    self.upload.abort(file);
                }
                self.setState({
                    fileList: removedFileList,
                });
            }
        });
    };

    onStart = (file) => {
        //start uploading file
        let self = this
        const { fileList } = self.state;
        const targetItem = file;
        targetItem.status = 'uploading';
        const nextFileList = fileList.concat();
        const fileIndex = nextFileList.findIndex(({ uid }) => uid === targetItem.uid);
        if (fileIndex === -1) {
            nextFileList.push(targetItem);
        } else {
            nextFileList[fileIndex] = targetItem;
        }
        self.onChange({
            file: targetItem,
            fileList: nextFileList,
        });
    }

    onProgress = (e, file) => {
        let self = this
        const { fileList } = self.state;
        const targetItem = getFileItem(file, fileList);
        if (!targetItem) {
            return;
        }
        targetItem.percent = e.percent;
        self.onChange({
            file: { ...targetItem },
            fileList,
        });
    }

    onSuccess = (response, file, xhr) => {
        // upload success handler
        let self = this
        try {
            if (typeof response === 'string') {
                response = JSON.parse(response);
            }
        } catch (e) {
            /* do nothing */
        }
        const { fileList } = self.state;
        const targetItem = getFileItem(file, fileList);
        if (!targetItem) {
            return;
        }
        targetItem.status = 'done';
        targetItem.response = response;
        targetItem.xhr = xhr;
        self.onChange({
            file: { ...targetItem },
            fileList,
        });
    };

    onError = (error, response, file) => {
        let self = this
        const { fileList } = self.state;
        const targetItem = getFileItem(file, fileList);
        if (!targetItem) {
            return;
        }
        targetItem.error = error;
        targetItem.response = response;
        targetItem.status = 'error';
        self.onChange({
            file: { ...targetItem },
            fileList,
        });
    }

    onChange = (info) => {
        if (!('fileList' in this.props)) {
            console.log("----", info.fileList)
            this.setState({ fileList: info.fileList });
        }
        const { onChange } = this.props;
        if (onChange) {
            onChange({
                ...info,
                fileList: [...info.fileList],
            });
        }
    };

    saveUpload = (node) => {
        this.upload = node;
    };

    render() {

        const uploadProps = {
            ...this.props,
            onSuccess: this.onSuccess,
            onStart: this.onStart,
            onProgress: this.onProgress,
            onError: this.onError,
        }

        return (
            <>
                <RcUpload {...uploadProps} ref={this.saveUpload}>{this.props.children}</RcUpload>
                {this.state.showFileList &&
                    this.state.fileList && this.state.fileList.length > 0 ?
                    <UploadList
                        fileList={this.state.fileList}
                        onRemove={this.handleRemove}
                    ></UploadList>
                    : null
                }
            </>
        );
    }
}

