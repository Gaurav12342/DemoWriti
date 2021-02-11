import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import SwitchHomeUI from './SwitchHome';
import SecurityModal from './SecurityModal';
import { createForm } from 'rc-form';
import { SET_USER_DATA, SET_HOME_ID } from '../../../appRedux/ActionTypes';
import { setUserData, setReduxHomeId } from '../../../appRedux/actions/Auth';
import { resetResident } from '../../../appRedux/actions/Resident';
import { verifyOtp, resendOtpLink } from '../../../services/api/routes/auth';
import { decryptData, encryptData } from '../../../util/Crypto';
import { prepareUserData } from '../../../services/api/services/Auth';
import { Toast } from '../../../components/common/Toast';
import { setHomeId } from '../../../services/api/routes/auth';
import UtilService from '../../../util/common';
import { getUserDetail } from '../../../services/DBService/auth';
import axios from '../../../services/api/config';
const _ = require('lodash');

let title = {
  password: 'Enter Password',
  otp: 'Enter Security Code',
};
function SwitchHome({ authUser, homeId, ...props }) {
  const [options, setOptions] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState(title.password);
  const [forPassword, setforPassword] = useState(true);
  const [okBtnLoading, setBtnLoading] = useState(false);
  const [excludeOTPVerification, setExcludeOTPVerification] = useState(false);
  const [changeHomeDetail, setChangeHomeDetail] = useState(undefined);
  const [count, setCount] = useState(0);
  const [curHomeId, setCurHomeId] = useState(homeId);
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    if (authUser && authUser.homeId && authUser.homeId._id) {
      props.setReduxHomeId(SET_HOME_ID, authUser.homeId._id);
    }
  }, [authUser]);

  useEffect(() => {
    let tempOptions = [];
    if (authUser && authUser.homeList && authUser.homeList.length > 0) {
      authUser.homeList.forEach((obj) => {
        tempOptions.push({ label: obj.name, id: obj._id, key: obj._id });
      });
      setOptions(tempOptions);
    }
  }, []);
  const handleModalSubmit = () => {
    if (forPassword) {
      handlePasswordSubmit();
    } else {
      handleSubmitOtp();
    }
  };
  const handleModalClose = () => {
    props.form.resetFields();
    setforPassword(true);
    setExcludeOTPVerification(false);
    setModalTitle(title.password);
    setCount(0);
    setModalVisible(false);
  };
  const handlePasswordSubmit = async () => {
    let request = getRequest();
    if (request) {
      handleSetHomeId(request);
    }
  };
  const getRequest = () => {
    const { validateFields } = props.form;
    let request = {};
    request.homeId = homeId;
    request.password = '';
    validateFields((err, values) => {
      console.log('TCL: getRequest -> err', err);
      if (err) {
        request = null;
        return;
      }
      request.password = values.password;
    });
    return request;
  };
  const handleSubmitOtp = (event) => {
    const { validateFields } = props.form;
    validateFields(async (err, values) => {
      if (err) {
        return;
      }

      setBtnLoading(true);
      if (values.otp) {
        axios({ ...verifyOtp, data: { ...values } })
          .then(({ data }) => {
            if (data.code === 'OK') {
              Toast.success(`${data.message}`);
              if (changeHomeDetail) {
                updateHomeData(changeHomeDetail);
              }
            }
            handleModalClose();
            setBtnLoading(false);
          })
          .catch((error) => {
            setBtnLoading(false);
          });
      }
    });
  };
  const startTimer = () => {
    var timeLeft = 60;
    var timerid = setInterval(countdown, 1000);
    function countdown() {
      if (timeLeft == 0) {
        clearTimeout(timerid);
        setCount(0);
      } else {
        setCount(timeLeft);
        timeLeft--;
      }
    }
  };
  const manageUserData = (data) => {
    let oldUserData = _.cloneDeep(decryptData(localStorage.getItem('user')));
    data = { ...oldUserData, ...data };
    localStorage.setItem('user', encryptData(data));
  };
  const updateHomeData = (data) => {
    props.setReduxHomeId(SET_HOME_ID, curHomeId);
    manageUserData(data);

    localStorage.removeItem('mappedModulePermissions');
    localStorage.removeItem('mappedSubModulePermissions');
    localStorage.removeItem('rolePemissionModules');

    axios.defaults.headers.common['homeId'] = data.homeId._id;

    if (data && data.homeId && data.homeId.homeIdentifier) {
      localStorage.setItem('tenantId', data.homeId.homeIdentifier);
      axios.defaults.headers.common['homeIdentifier'] =
        data.homeId.homeIdentifier;

      localStorage.setItem('homeId', data.homeId._id);
      axios.defaults.headers.common['homeId'] = data.homeId._id;
    }
    if (!data.homeId.homeIdentifier) {
      localStorage.setItem('tenantId', '');
    }

    updateUserData(data);
    // props.history.push('/') commented because it will redirect to default resident screen
    // props.history.push(props.location.pathname) commented because for same route it wont refresh screen
    window.location.reload();
    resetResident();
  };
  const handleSetHomeId = (request) => {
    request.homeId = curHomeId || request.homeId;
    setBtnLoading(true);
    axios({
      ...setHomeId,
      data: {
        ...request,
        excludeOTPVerification: false,
      },
    })
      .then(async ({ data }) => {
        if (data.code === 'OK') {
          let userDetail = await getUserDetail({
            email: UtilService.getPrimaryValue(authUser?.emails, 'email'),
          });
          if (
            userDetail.excludeOTPVerification ||
            authUser.excludeOTPVerification
          ) {
            updateHomeData(data.data);
            handleModalClose();
          } else {
            setChangeHomeDetail(data.data);
          }

          setExcludeOTPVerification(userDetail.excludeOTPVerification);
          if (
            !authUser.excludeOTPVerification &&
            !userDetail.excludeOTPVerification
          ) {
            setforPassword(false);
            setModalTitle(title.otp);
            startTimer();
          }

          Toast.success(data.message);
          props.form.resetFields();
          props.socket.disconnect();
          props.socket.connect();
        } else {
          Toast.error(data.message);
        }
        setBtnLoading(false);
      })
      .catch((error) => {
        setBtnLoading(false);
      });
  };
  const updateUserData = (data) => {
    let user = decryptData(localStorage.getItem('user'));
    user = { ...user, ...data };
    user = prepareUserData(user);
    localStorage.setItem('user', encryptData(user));
    props.setUserData(SET_USER_DATA, user);
  };
  function handleOptionChange(e) {
    setModalVisible(true);
  }
  const handleHomeChange = (val) => {
    // props.setReduxHomeId(SET_HOME_ID, val)
    setCurHomeId(val);
    setModalVisible(true);
  };
  const handleResentLink = () => {
    axios({ ...resendOtpLink }).then(({ data }) => {
      startTimer();
    });
  };
  return (
    <>
      <SwitchHomeUI
        className='inputForm select'
        placeholder='Select Home'
        options={options}
        value={homeId}
        authUser={authUser}
        onChange={handleOptionChange}
        onHomeChange={handleHomeChange}
      />
      {isModalVisible ? (
        <SecurityModal
          visible={isModalVisible}
          title={modalTitle}
          form={props.form}
          okBtnLoading={okBtnLoading}
          forPassword={forPassword}
          onCancel={handleModalClose}
          onClose={handleModalClose}
          onOk={handleModalSubmit}
          count={count}
          onResentLink={handleResentLink}
          excludeOTPVerification={excludeOTPVerification}
          showPass={showPass}
          onHideShowPassChange={() => setShowPass((showPass) => !showPass)}
        />
      ) : null}
    </>
  );
}

const mapStateToProps = ({ auth, commonData }) => {
  const { authUser, homeId } = auth;
  const { socket } = commonData;
  return { authUser, socket, homeId };
};

export default connect(mapStateToProps, {
  setUserData,
  setReduxHomeId,
  resetResident,
})(createForm('SwitchHome')(withRouter(SwitchHome)));
