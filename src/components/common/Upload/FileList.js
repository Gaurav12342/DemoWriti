import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { useSelector } from 'react-redux';
import FilePreview from './FilePreview';
import {
  Cancel,
  Download,
} from './../../../assets/images/resident-detail/index';

import { Line } from 'rc-progress';
import axios from '../../../services/api/config';
import { generatePath } from 'react-router-dom';


const FileList = forwardRef(
  (
    {
      files = [],
      onRemoveFile,
      uploading = false,
      extraData = {},
      extraHeaders = {},
      uploadUrl,
      error = [],
    },
    ref
  ) => {
    const [progress, setProgress] = useState({});

    const uploadFiles = async () => {
      const promises = [];
      // for (let i = 0; i < files?.length; i++) {
      //   let file = files[i];

      //   //generate file data
      //   if (file.uploaded || !file.isValid) continue //return if file is uploaded or not valid
      //   const formData = new FormData()
      //   formData.append('file', file)
      //   for (let [key, value] of Object.entries(extraData)) {
      //     formData.append(key, value)
      //   }

      //   //create promise
      //   promises.push(
      //     axios.post(
      //       uploadUrl,
      //       formData,
      //       {
      //         headers: {
      //           'Content-Type': 'multipart/form-data',
      //           ...extraHeaders
      //         },
      //         onUploadProgress: (e) => {
      //           if (e.total > 0) {
      //             let percent = e.loaded / e.total * 100;
      //             setProgress(p => ({ ...p, [file.key]: percent }))
      //           }
      //         }
      //       }
      //     )
      //   )
      // }

      const formData = new FormData();
      for (let i = 0; i < files?.length; i++) {
        let file = files[i];
        //generate file data
        if (file.uploaded || !file.isValid) continue; //return if file is uploaded or not valid
        formData.append('file[]', file);
      }
      if (extraData) {
        for (let [key, value] of Object.entries(extraData)) {
          formData.append(key, value);
        }
      }
      promises.push(
        axios({
          ...uploadUrl,
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
            ...extraHeaders,
          },
        })
      );

      try {
        return await Promise.all(promises);
      } catch (err) {
        return Promise.reject(err);
      }
    };


    const showError = (file) => {
      // to show error after API call
      let isErr = error.find((x) => file.name === x.name);
      if (isErr) {
        return isErr.err;
      } else return '';
    };

    useImperativeHandle(ref, () => ({ uploadFiles }));

    const getPath = (file) => {
      return URL.createObjectURL(file)
    }

    return (
      <div className='fileWrapper'>
        {files.map((file) => {
          file.isUploadErr = showError(file);
          return (
            <div style={{ flexBasis: '50%', marginBottom: 15 }} key={file.key}>
              <div className='uploadFileList'>
                <div className='filePreview'>
                  <FilePreview file={file} key={file.key + '_preview'} />
                  {((!uploading && !file.uploaded) || file.isUploadErr) && (
                    <span
                      className='removeFile'
                      onClick={() => onRemoveFile(file.key)}
                    >
                      <Cancel />
                    </span>
                  )}
                </div>
                <div className='fileInformation'>
                  <span className={`fileName ${!file.isValid && 'fileError'}`}>
                    {file.name} &nbsp;
                                       <a href={getPath(file)} target="_blank" download>
                      <Download />
                    </a>
                  </span>
                  <Line
                    percent={progress[file.key] || file.isValid ? 100 : 0}
                    strokeWidth='4'
                    strokeColor='#609FAE'
                  />
                </div>
              </div>
              {!file.isValid && !!file.errorMsg && (
                <span className='errorText'>{file.errorMsg}</span>
              )}
              {error && error.length ? (
                <span className='errorText'>{file.isUploadErr}</span>
              ) : null}
            </div>
          );
        })}
      </div>
    );
  }
);

export default FileList;
