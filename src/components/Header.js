import React, { Component } from 'react';
import { ReactComponent as LogoW } from '../../src/assets/images/logo-w.svg';
import { ReactComponent as Search } from '../../src/assets/images/search.svg';
import { ReactComponent as Noti } from '../../src/assets/images/bell.svg';
import { ReactComponent as Lock } from '../../src/assets/images/lock.svg';
import { ReactComponent as LogOut } from '../../src/assets/images/log-off.svg';
import routes from '../routes/constant';
import Image from './common/Image';
import { createForm, formShape } from 'rc-form';
import LockScreenPopup from './common/Popup/lockscreen-popup';
import SignOutPopup from './common/Popup/signout-popup';
import SearchPopup from './common/Popup/GlobalSearch';
import LogoutComponent from '../containers/UserAuth/Logout';
import MenuBar from '../containers/MenuBar';
import { connect } from 'react-redux';
// import { getUserName } from '../util/common'
import SwitchHome from './../containers/UserAuth/SwitchHome';
import ShowUserName from './common/ShowUserName';
import { isDrOrNp, isModuleAccessible } from '../util/common';
import { USER_TYPE } from '../constants/User';
import { withRouter } from 'react-router-dom';
import Feedback from '../containers/Feedback/index';
import Support from '../containers/Support/index';
import { isExcludeTenant, getLFName } from '../util/common';
import { MODULE } from '../constants/subscription';
import GlobalSearch from '../containers/GlobalSearch';
import { userSignOut } from '../appRedux/actions/Auth';
const _ = require('lodash');

class Header extends Component {
  state = {
    lockPopupRef: false,
    onLockPopupClick: false,
    logoutPopupRef: false,
    onLogoutPopupClick: false,
    searchPopupRef: false,
    onSearchPopupClick: false,
    feedbackModal: false,
    supportModal: false,
  };

  modalActionFn = (key, action) => {
    this.setState({ [key]: action });
  };

  static propTypes = {
    form: formShape,
  };

  handlePushTodoRoute = (path) => {
    this.props.history.push({
      pathName: path,
    });
  };
  submit = () => {
    this.props.form.validateFields((error, value) => {
      console.log(error, value);
    });
  };

  handleFeedbackModal = () => {
    this.setState({ feedbackModal: true });
  };

  handleFeedbackModalClose = () => {
    this.setState({ feedbackModal: false });
  };

  // handleSupportModal = () => {
  //   this.setState({ supportModal: true });
  // };

  // handleSupportModalClose = () => {
  //   this.setState({ supportModal: false });
  // };

  handleRefreshComp = () => { };

  render() {
    let errors;
    const { authUser } = this.props;
    const isAdmin =
      authUser &&
      (authUser.type === USER_TYPE.ADMIN.SUPER ||
        authUser.type === USER_TYPE.ADMIN.GENERAL);
    const { getFieldProps, getFieldError, getFieldDecorator } = this.props.form;

    return (
      <>
        <div className='header_container'>
          {/* <div className='menu'>
                    <div className='h_logo'>
                        <LogoW />
                    </div>
                    <div className='nav_link_wrap'>
                        <ul>
                            <li>
                                <a href='\resident-detail'> Resident</a>
                            </li>
                            <li className='\nurse-prep'>
                                <a>Clinical</a>
                            </li>
                            <li>
                                <a href='\todo'> ToDoManagement</a>
                            </li>
                            <li href='\virtualvisitrequest'>
                                <a>VirtualHealthcare </a>
                                <ul className='submenu'>
                                    <li>
                                        <a>Virtual Visit</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href='\chat'>Chat</a>
                            </li>
                            <li>
                                <a href='/#'>Others</a>
                                <ul className='submenu'>
                                    <li>
                                        <a>What's new</a>
                                    </li>
                                    <li>
                                        <a>Support</a>
                                    </li>
                                    <li>
                                        <a>Feedback</a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div> */}

          <MenuBar authUser={authUser} />
          <div className='user_section'>
            <div className='components'>
              {!isExcludeTenant({ authUser }) ? (
                <SwitchHome
                  pushTodoRoute={this.handlePushTodoRoute}
                  onSuccess={this.handleRefreshComp}
                />
              ) : null}
            </div>
            <div className='search'>
              <a onClick={() => this.modalActionFn('searchPopupRef', true)}>
                <Search />
              </a>
            </div>
            <div className='user_name'>
              {authUser?.image ? (
                <div
                  style={{
                    display: 'inline-flex',
                    height: "30px",
                  }}
                >
                  <img
                    src={authUser.image}
                    alt='image'
                  />
                </div>

              ) : (
                  <div>{getLFName(authUser)}</div>
                )}

              <a>
                <ShowUserName {...this.props} />
                <div className='nav_link_wrap'>
                  <ul className='submenu'>
                    {/* <li> */}
                    <li>
                      <label
                        onClick={() => {
                          this.props.history.push(`${routes.profile}`);
                        }}
                      >
                        My Account
                      </label>
                    </li>
                    {isAdmin || isModuleAccessible(MODULE.SUPPORT) ? (
                      <li>
                        <label
                          className='submenu-label'
                          onClick={() => {
                            this.props.history.push(
                              `${routes.supportFeedback.path}`
                            );
                          }}
                        >
                          Support
                        </label>
                      </li>
                    ) : null}

                    {isAdmin || isModuleAccessible(MODULE.FEEDBACK) ? (
                      <li>
                        <label
                          className='submenu-label'
                          onClick={() => {
                            this.props.history.push(`${routes.feedback.path}`);
                          }}
                        >
                          Feedback
                        </label>
                      </li>
                    ) : null}
                    {isModuleAccessible() ? (
                      <div>
                        <li>
                          <label
                            onClick={() => {
                              this.props.history.push(`${routes.pccLog.path}`);
                            }}
                          >
                            Pcc-Logs
                          </label>
                        </li>
                      </div>
                    ) : null}

                    {/* <li>
                    <label
                      className='submenu-label'
                      onClick={() => this.modalActionFn('lockPopupRef', true)}
                    >
                      Lock
                    </label>
                  </li> */}
                    <li>
                      <label
                        className='submenu-label'
                        onClick={() =>
                          this.props.userSignOut()
                          // this.modalActionFn('logoutPopupRef', true)
                        }
                      >
                        Logout
                      </label>
                    </li>
                    {/* </li> */}
                  </ul>
                </div>
              </a>
            </div>
            <div className='noti_log'>
              <div className='notification_block'>
                <a href='\notification'>
                  <Noti />
                  <span className='has_notification'></span>
                </a>
                <div className='notification_wrapper'>
                  <div className='head'>
                    <h4>Notifications</h4>
                    <a>Mark all as read</a>
                  </div>
                  <div className='notification_container new_noti'>
                    <div className='noti_type'>
                      <h5>New</h5>
                      <div className='notification_content unread'>
                        <p>
                          You have 1 New Message from Nurse Kim Fischer. Lorem
                          Ipsum dummy.
                        </p>
                        <span className='time'>51 mins</span>
                      </div>
                      <div className='notification_content unread'>
                        <p>
                          You have 1 New Message from Nurse Kim Fischer. Lorem
                          Ipsum dummy.
                        </p>
                        <span className='time'>1 hr</span>
                      </div>
                    </div>
                  </div>
                  <div className='notification_container'>
                    <div className='noti_type'>
                      <h5>Earlier</h5>
                      <div className='notification_content'>
                        <p>
                          You have 1 New Message from Nurse Kim Fischer. Dummy
                          text. Lorem Ipsum is a dummy text in advertising
                          industry.
                        </p>
                        <span className='time'>5 hrs</span>
                      </div>
                      <div className='notification_content unread'>
                        <p>Important Note</p>
                        <span className='time'>02nd Jul 2020 | 09:53 am</span>
                      </div>
                      <div className='notification_content'>
                        <p>You have 1 New Message from Nurse Kim Fischer</p>
                        <span className='time'>01st Jul 2020 | 02:00 pm</span>
                      </div>
                    </div>
                  </div>
                  <div className='noti_footer'>
                    <a href='/notification'>VIEW ALL</a>
                  </div>
                </div>
              </div>
              {/* <a>
                            <SwitchLanguage />
                        </a> */}
              {/* <a onClick={() => this.modalActionFn('lockPopupRef', true)}>
                            <Lock />
                        </a> */}

              <LogoutComponent />

              {/* <a onClick={() => this.modalActionFn('logoutPopupRef', true)}>
                            <LogOut />
                        </a> */}
            </div>
          </div>
          {this.state.searchPopupRef && (
            <GlobalSearch
              visible={this.state.searchPopupRef}
              onClosed={() => this.modalActionFn('searchPopupRef', false)}
            />
          )}
          {this.state.lockPopupRef && (
            <LockScreenPopup
              maskClosable={false}
              visible={this.state.lockPopupRef}
              onClosed={() => this.modalActionFn('lockPopupRef', false)}
            />
          )}
          {this.state.logoutPopupRef && (
            <SignOutPopup
              visible={this.state.logoutPopupRef}
              onClosed={() => this.modalActionFn('logoutPopupRef', false)}
            />
          )}

          {this.state.feedbackModal && (
            <Feedback
              visible={this.state.feedbackModal}
              title='Feedback'
              onClose={this.handleFeedbackModalClose}
              onCancel={this.handleFeedbackModalClose}
              maskClosable={true}
              okText='Submit'
              cancelText='Cancel'
            // onOk={handleFeedbackSubmit}
            />
          )}

          {/* {this.state.supportModal && (
            <Support
              visible={this.state.supportModal}
              title='Support'
              onClose={this.handleSupportModalClose}
              onCancel={this.handleSupportModalClose}
              maskClosable={true}
            />
          )} */}
          {/* <LockScreenPopup ref={this.lockPopupRef} />
                <SignOutPopup ref={this.logoutPopupRef} />
                <SearchPopup ref={this.searchPopupRef} /> */}
        </div>
      </>
    );
  }
}
const mapStateToProps = ({ auth }) => {
  const { authUser } = auth;
  return { authUser };
};
export default connect(mapStateToProps, { userSignOut })(createForm()(withRouter(Header)));
