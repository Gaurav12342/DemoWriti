import React, { useEffect, useState } from 'react';
import { createForm } from 'rc-form';
import { connect } from 'react-redux';
import ProfileTabs from '../Profile/components/ProfileTabs';
import {
  updateProfile,
  changePassword,
} from '../../../src/services/api/routes/profile';
import axios from '../../../src/services/api/config';
import { Toast } from '../../../src/components/common/Toast';
import { withRouter } from 'react-router-dom';
import { updateUserData } from '../../../src/appRedux/actions/Auth';
import Uploader, {
  FILE_CATEGORY,
  FILE_TYPES,
} from '../../../src/components/common/Upload/Uploader';
import { fileUpload } from '../../../src/services/api/routes/common';

const Profile = (props) => {
  const { form, authUser } = props;
  const [profileBtnLoading, setProfileBtnLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [fileData, setFileData] = useState(authUser?.image);
  const [passBtnLoading, setPassBtnLoading] = useState(false);
  let { resetFields } = form;

  const handleUpdateProfile = (value) => {
    setProfileBtnLoading(true);
    let { method, url, baseURL } = updateProfile;
    axios({ method, url, data: value, baseURL })
      .then((response) => {
        if (response.data.code === 'OK') {
          let user = { ...response.data.data };
          props.updateUserData(user);
          setProfileBtnLoading(false);
          Toast.success(response.data.message);
        } else {
          setProfileBtnLoading(false);
          Toast.error(response.data.message);
        }
      })
      .catch((error) => {
        setProfileBtnLoading(false);
        Toast.error(error);
      });
  };

  const handleResetPassword = (value) => {
    setPassBtnLoading(true);
    let { method, url, baseURL } = changePassword;
    axios({ method, url, data: value, baseURL })
      .then((response) => {
        if (response.data.code == 'OK') {
          // setDd(true);
          // form.resetFields()
          setPassBtnLoading(false);
          Toast.success(response.data.message);
        } else {
          setPassBtnLoading(false);
          Toast.error(response.data.message);
        }
      })
      .catch((error) => {
        setPassBtnLoading(false);
        Toast.error(error);
      });
  };

  const handleVisible = () => {
    setVisible(true);
  };
  const handleDisable = () => {
    setVisible(false);
  };

  return (
    <>
      <div className='container'>
        <div className='pmr_wrap'>
          <ProfileTabs
            onUpdateProfile={handleUpdateProfile}
            onResetPassword={handleResetPassword}
            authUser={authUser}
            form={form}
            onProfileLoader={profileBtnLoading}
            onPassLoader={passBtnLoading}
            fileData={fileData}
            visible={visible}
            onOpen={handleVisible}
            onClose={handleDisable}
          />
        </div>
      </div>
      {visible && (
        <Uploader
          visible={visible}
          onRequestClose={() => {
            handleDisable();
          }}
          multiple={false}
          uploadUrl={{ ...fileUpload }}
          // defaultList={authUser ? [authUser.image] : null}
          allowedTypes={FILE_TYPES.IMAGE}
          extraData={{
            category: [FILE_CATEGORY.IMAGE].join(','),
            isUploadToS3: true,
          }}
          // maxSizeInMB={1}
          fileLength={1}
          onError={(err) => {
            Toast.error(err);
          }}
          onSuccess={(uploaded) => {
            if (uploaded.code === 'OK') {
              uploaded &&
                uploaded.data &&
                uploaded.data.length &&
                uploaded.data.map((data) => {
                  return setFileData(data.path);
                });
              handleDisable();
            }
          }}
        />
      )}
    </>
  );
};
const mapStateToProps = ({ auth }) => {
  const { authUser } = auth;
  return { authUser };
};

export default connect(mapStateToProps, { updateUserData })(
  createForm()(withRouter(Profile))
);
