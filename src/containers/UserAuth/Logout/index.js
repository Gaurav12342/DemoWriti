import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import LogoutUI from './LogoutUI';
import { connect, useSelector } from 'react-redux';
import { useIdleTimer } from 'react-idle-timer';
import { ReactComponent as LogOut } from '../../../assets/images/lock.svg';
import { userSignOut } from '../../../appRedux/actions/Auth';
import { getUserName } from '../../../util/common';
import { checkPassTokenRefresh } from '../../../services/api/routes/auth';
import { SIGNOUT_USER_SUCCESS } from '../../../appRedux/ActionTypes';
import { SUB_NURSE_TYPE, USER_TYPE } from '../../../constants/User';
import axios from '../../../services/api/config';
import { Toast } from '../../../components/common/Toast';
import Dialog from 'rc-dialog';
const _ = require('lodash');

function Logout(props) {
  const { userSignOut } = props;
  const [lockModal, setLockModal] = useState(false);
  const authUser = useSelector((state) => state.auth.authUser) || {};
  const inActiveTimeRef = React.useRef(authUser?.timeout?.inActiveTime || 10);
  const lockScreenTimeRef = React.useRef(
    authUser?.timeout?.lockScreenTime || 30
  );
  const timeoutRef = React.useRef();
  const timeoutPopupRef = React.useRef(true);

  const getIdleTimeout = React.useMemo(() => {
    inActiveTimeRef.current = authUser?.timeout?.inActiveTime || 10;
    lockScreenTimeRef.current = authUser?.timeout?.lockScreenTime || 30;
    return inActiveTimeRef.current;
  }, [authUser.timeout]);

  const [showModal, setShowModal] = useState(false);
  const [idleTimeout, setIdleTimeout] = useState(getIdleTimeout);

  const handleLogout = (str) => {
    // if (timeoutPopupRef?.current)
    if (str === 'idle')
      setLockModal(true);
    setShowModal(false);
    setTimeout(() => {
      userSignOut(SIGNOUT_USER_SUCCESS);
      setLockModal(false);
    }, 1000);
  };

  const handleIdle = () => {
    // if (!showModal) {
    //   return handleLogout()
    // }
    // handleVisible()
  };

  useEffect(() => {
    //reset();
    if (showModal) {
      // reset();
      timeoutPopupRef.current = false
      setIdleTimeout(1000 * 60 * lockScreenTimeRef.current);
    } else {
      setIdleTimeout(1000 * 60 * inActiveTimeRef.current);
    }
  }, [showModal]);

  const handleVisible = () => {
    setShowModal(true);
    // reset();
    setIdleTimeout(1000 * 60 * lockScreenTimeRef.current);
  };


  const handleOnAction = (e) => {
    // console.log('user did something', e)
  }

  useIdleTimer({
    stopOnIdle: true,
    onActive: handleOnAction,
    onAction: handleOnAction,
    onIdle: () => handleLogout('idle'),
    timeout: 1000 * 60 * +idleTimeout,
  });

  const handleContinue = (password) => {
    if (!password || !password.trim())
      return Toast.error('enter the password...!');

    let { method, url, baseURL } = checkPassTokenRefresh;
    axios({ method, url, data: { password }, baseURL })
      .then((response) => {
        if (response.data.code == 'OK') {
          clearTimeout(timeoutRef.current);
          Toast.success(response.data.message);
          setShowModal(false);
          // reset();
        } else {
          setShowModal(true);
          Toast.error(response.data.message);
        }
      })
      .catch(Toast.error);
  };

  return (
    <>
      <a onClick={handleVisible}>
        <LogOut />
      </a>
      {showModal && (
        <LogoutUI
          userName={getUserName(authUser)}
          showModal={showModal}
          onContinue={handleContinue}
          onLogout={handleLogout}
        />
      )}

      {lockModal && (
        <Dialog visible={lockModal} className='logout_popup'>
          <div className='popup-content-log'>
            <h3 className='name_head'>Locked</h3>
            <div className='bb'></div>
            <h2>
              {`Due to inactivity of ${
                showModal ? lockScreenTimeRef?.current || 30 : inActiveTimeRef?.current || 10
                } minutes your session has expired, Please login again.`}
            </h2>
          </div>
        </Dialog>
      )}
    </>
  );
}

export default connect(null, { userSignOut })(withRouter(Logout));
