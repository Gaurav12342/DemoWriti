import React, { useEffect, useState } from 'react';
import { FILE_TYPES, extensions } from './Uploader';

const FilePreview = ({ file }) => {
  // console.log('file => ',file)
  const [imgData, setImgData] = useState(null);

  useEffect(() => {
    const reader = new FileReader();
    reader.onload = (e) => setImgData(e.target.result);
    if (file.isValid && !file.isDefault) {
      reader.readAsDataURL(file);
    }
  }, [file]);

  const getFileType = (file) => {
    let fileType = file?.name ? file.name.split('.').pop() : null;
    if (fileType && !file.isDefault) {
      for (let [key, value] of Object.entries(FILE_TYPES)) {
        if (value.includes(file.type)) {
          fileType = key;
          break;
        }
      }
    } else if (!!file.isDefault) {
      for (let [key, value] of Object.entries(extensions)) {
        if (value.includes('.' + fileType)) {
          fileType = key;
          break;
        }
      }
    }
    return fileType;
  };

  let fileType = getFileType(file);
  return fileType == 'IMAGE' ? (
    <img src={file.isDefault ? file.path : imgData} height={100} width={100} />
  ) : (
    <div className='previewBox'>
      <span>.{fileType}</span>
    </div>
  );
};
export default FilePreview;
