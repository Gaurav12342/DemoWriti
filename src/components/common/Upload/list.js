/* eslint-disable react/jsx-key */
import React from 'react';
import { ReactComponent as Close } from '../../../assets/images/math-plus.svg';
import Spin from '../Spin';
import Spinner from 'rc-spinner'

const List = (props) => {
  const { fileList, onRemove } = props;

  const handleRemove = (file) => {
    if (onRemove) {
      onRemove(file);
    }
  };

  return <div className="upl_files_wrap">
    {
      fileList.map(file =>
        // <Spin spinning={file.status === 'uploading'}>
        <div className="upd_file" onClick={() => handleRemove(file)}>
          <Spinner color="#609FAE" height="25px" lineWidth="2" className="file_spin"></Spinner>
          <span>{file.name}</span>
          <Close />
        </div>
        // </Spin>

        // <div style={{ border: '1px solid black', margin: '5px' }}>
        //     {file.name} {file.status === 'uploading' ? ' ...' : null} <span onClick={() => handleRemove(file)}>delete</span>
        // </div>
      )
    }
  </div>;
};

export default List;