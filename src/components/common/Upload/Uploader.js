import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactModal from 'react-modal';
import FileList from './FileList';
import Button from './../Button';
import { useBoolean, useDrop } from './../../../hooks';
import { Toast } from '../../../components/common';

export const FILE_CATEGORY = {
  IMAGE: 'IMAGE',
  PDF: 'PDF',
  DOC: 'DOC',
  XLS: 'XLS',
  JSON: 'JSON',
  EXE: 'EXE',
};
export const FILE_TYPES = {
  IMAGE: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'],
  PDF: ['application/pdf'],
  DOC: [
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ],
  MEDIA: ['audio/webm', 'video/webm', 'audio/mpeg', 'video/mpeg', 'video/mp4'],
  CSV: ['text/csv'],
  XLS: [
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ],
  JSON: ['application/json', 'application/javascript'], // application/javascript is use for JSONP(JSON with padding)
  EXE: [
    'application/octet-stream',
    'application/x-msdownload',
    'application/exe',
    'application/x-ms-dos-executable',
  ],
};

export const extensions = {
  IMAGE: ['.png', '.jpeg', '.webp', '.jpg', '.jpeg'],
  PDF: ['.pdf'],
  DOC: ['.doc', '.docx'],
  MEDIA: ['.mp3', '.mp4', '.webm'],
  CSV: ['.csv'],
  XLS: ['.xls', '.xlsx'],
  JSON: ['.json'],
  EXE: ['.exe'],
};

const Uploader = ({
  visible = false, //is modal now visible
  shouldClose = false, //can user close by clicking in overlay or ESC key?
  onRequestClose = () => { }, //handle close modal
  defaultList = [], // sample : [ {path} ]
  className = 'virtual-visit-wrap',
  title = 'Upload Files', //Modal Title
  multiple = false, //can user select multiple files
  allowedTypes = [], //leave empty if allow any type of file
  maxSizeInMB = 1,
  fileLength,
  uploadOnSelect = false, //start Uploading files as soon as user select files
  uploadUrl, //request endpoint to upload url
  extraHeaders = {}, //extra headers to pass while uploading file
  extraData = {}, //extra data to pass while uploading file
  onSuccess = () => { }, //Callback when files are uploaded
  onError = () => { }, //Callback when any error while uploading files
}) => {
  allowedTypes = [...allowedTypes.flat()];

  const [files, setFiles] = useState([]);
  const [uploading, setUploadingTrue, setUploadingFalse] = useBoolean(false);
  const inputRef = useRef(null);
  const fileListRef = useRef(null);
  const [error, setError] = useState([]);

  useEffect(() => {
    if (
      (!!defaultList && Array.isArray(defaultList) && defaultList.length > 0) ||
      defaultList?.length > fileLength
    ) {
      let defaultFiles = defaultList.map((file) => {
        const defaultListProperties = {
          isValid: true,
          uploaded: true,
          isDefault: true,
        };
        if (typeof file === 'string') {
          return {
            ...defaultListProperties,
            path: file,
            key: file,
            name: file.split('/').pop(),
          };
        } else if (typeof file === 'object') {
          return {
            ...file,
            ...defaultListProperties,
            path: file?.name ? file.name : null,
            key: file?.name ? file.name : null,
            name: file?.name ? file.name.split('/').pop() : null,
          };
        }
      });
      if (!!multiple) {
        setFiles((oldFiles) => [...defaultFiles, ...oldFiles]);
      } else {
        setFiles(defaultFiles);
      }
    }
  }, [defaultList, multiple]);

  const openFilePicker = () => {
    if (uploading) return;
    inputRef && inputRef.current.click();
  };

  const checkFileValidity = (size, type) => {
    let isValid = true,
      errorMsg = '',
      validTypes = [...allowedTypes];

    isValid = size <= maxSizeInMB * 1000 * 1000;
    if (!isValid) {
      errorMsg = `Please select files less than ${maxSizeInMB} MB`;
    }
    if (validTypes.length == 0) {
      validTypes = [...Object.values(FILE_TYPES)].flat();
    }

    isValid = validTypes.includes(type);
    if (!isValid) {
      errorMsg = 'This type of file is not allowed to upload';
    }

    return { isValid: errorMsg === '', errorMsg };
  };

  const onFiles = async (newFiles) => {
    let selectedFiles = [...newFiles];

    selectedFiles.map((file) => {
      const { name, size, lastModified, type } = file;
      const { isValid, errorMsg } = checkFileValidity(size, type);
      Object.assign(file, {
        key: `${name}${size}${lastModified}`,
        isValid,
        errorMsg,
      });
    });
    if (multiple) {
      setFiles((oldFiles) => [...oldFiles, ...selectedFiles]);
    } else {
      setFiles(selectedFiles);
    }
  };

  const uploadValidFiles = () => {
    if (uploading || files.length == 0) return;
    const validFiles = files.filter((f) => !f.uploaded || !f.isDefault);
    if (validFiles.length <= 0 || validFiles.length > fileLength)
      return Toast.error(`Please select maximum ${fileLength} files only.`);
    setUploadingTrue();
    fileListRef.current &&
      fileListRef.current
        .uploadFiles()
        .then((res) => {
          const { data } = res[0];
          if (data.code === 'OK') {
            Toast.success(data.message);
            let isErr = data.data.filter((x) => !x.status);
            if (!!isErr && isErr.length) {
              setError(isErr);
            }
            onSuccess(data);
          }
        })
        .catch(onError)
        .finally(() => {
          let uploadedFiles = [...files];
          uploadedFiles.map((file) => {
            Object.assign(file, { uploaded: true });
          });
          setFiles(uploadedFiles);
          setUploadingFalse();
        });
  };

  const handleClose = () => {
    setFiles([]);
    onRequestClose && onRequestClose();
  };

  useEffect(() => {
    !!uploadOnSelect && uploadValidFiles();
  }, [files]);

  const onRemoveFile = useCallback(
    (fileKey) => {
      setFiles((oldFiles) => [
        ...oldFiles.filter((file) => file.key !== fileKey),
      ]);
    },
    [files]
  );

  const getFileInputProps = () => {
    let props = {};
    props['multiple'] = !!multiple;
    if (allowedTypes.length > 0) {
      props['accept'] = allowedTypes.join(',');
    } else {
      props['accept'] = [...Object.values(extensions)].flat().join(',');
    }
    return props;
  };

  const [events, { isHovering }] = useDrop({ onFiles });

  return (
    <ReactModal
      shouldCloseOnEsc={shouldClose}
      shouldCloseOnOverlayClick={shouldClose}
      isOpen={visible}
      contentLabel='File Upload Modal'
      onRequestClose={onRequestClose}
      className={className}
      appElement={document.getElementById('root')}
    >
      <div className='uploadPopup' style={{ zIndex: 'auto' }}>
        {/* Modal Header */}
        <div className='row borderBottom'>
          <h3 className={'p15 m0 text-center'}>{title}</h3>
          <Button
            size='lg'
            onClick={openFilePicker}
            disabled={uploading}
            style={{ marginRight: 10 }}
          >
            + Select Files
          </Button>
        </div>

        {/* Modal Body */}
        <div
          {...events}
          className={`borderBottom p15 modalBody ${
            !!isHovering ? 'filehover' : ''
            }`}
        >
          <input
            type='file'
            style={{ display: 'none' }}
            ref={inputRef}
            onChange={(e) => onFiles(e.target.files)}
            {...getFileInputProps()}
          />
          {files.length == 0 ? (
            <div className='no-files'>
              <p>Please select any file to upload or DROP</p>
            </div>
          ) : (
              <FileList
                ref={fileListRef}
                files={files}
                allowedTypes={allowedTypes}
                onRemoveFile={onRemoveFile}
                uploading={uploading}
                extraData={extraData}
                extraHeaders={extraHeaders}
                uploadUrl={uploadUrl}
                error={error}
              />
            )}
        </div>

        {/* Modal Footer */}
        <div className={'upload_footer text-right borderTop p15'}>
          <Button
            size='lg'
            type='secondary'
            onClick={handleClose}
            disabled={uploading}
            style={{ marginRight: 10 }}
          >
            Close
          </Button>
          <Button
            size='lg'
            onClick={uploadValidFiles}
            loading={uploading}
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'Upload'}
          </Button>
        </div>
      </div>
    </ReactModal>
  );
};
export default Uploader;
