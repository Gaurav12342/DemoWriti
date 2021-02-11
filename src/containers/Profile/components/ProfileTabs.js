import React from 'react';
import ProfileForm from '../../../containers/Profile/components/ProfileForm';
import ChangesPasswordForm from '../../../containers/Profile/components/ChangesPasswordForm';
import Tabs, { TabPane } from 'rc-tabs';
import 'rc-tabs/assets/index.css';

const ProfileTabs = (props) => {
  const {
    onUpdateProfile,
    onResetPassword,
    authUser,
    form,
    onProfileLoader,
    onPassLoader,
    visible,
    onOpen,
    onClose,
    fileData,
  } = props;

  return (
    <>
      <div className='pmr_list_wrap'>
        <div className='patient_order_wrap' style={{ border: 'none' }}>
          <Tabs defaultActiveKey='1' className='permission_tab_wrap'>
            <TabPane tab='Profile' key='1' className='resi_treat'>
              <ProfileForm
                onUpdateProfile={onUpdateProfile}
                authUser={authUser}
                form={form}
                onProfileLoader={onProfileLoader}
                visible={visible}
                onOpen={onOpen}
                onClose={onClose}
                fileData={fileData}
              />
            </TabPane>
            <TabPane tab='Change Password' key='2' className='resi_treat'>
              <ChangesPasswordForm
                authUser={authUser}
                onResetPassword={onResetPassword}
                form={form}
                onPassLoader={onPassLoader}
              />
            </TabPane>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default ProfileTabs;
