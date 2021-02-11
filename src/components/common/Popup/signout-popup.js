/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Dialog from 'rc-dialog';
import { ReactComponent as Reminder } from '../../../assets/images/pmr/reminder.svg';
import { ReactComponent as Clarification } from '../../../assets/images/resident-detail/clarification.svg';
import { ReactComponent as Todo } from '../../../assets/images/resident-detail/todo.svg';
import { userSignOut } from '../../../appRedux/actions/Auth';
import { getUserNameWithDesignation } from '../../../util/common';
class SignOutPopup extends Component {

  constructor() {
    super();
    this.state = {
      logoutModal: false
    };
  }

  handleCloseModal() {
    this.props.userSignOut()

  }
  render() {
    const { authUser } = this.props
    return (<>
      {/* start popup */}
      <Dialog visible={this.props.visible}
        // onClose={this.handleCloseModal}
        className="logout_popup"
      >
        <div className="popup-content-log">
          <h3 className="name_head">Hi, {authUser ? getUserNameWithDesignation(authUser) : ''}!</h3>
          <div className="bb"></div>
          <p className="activity_head">05th June, 2020 | 11:45 am</p>
          <h2>You have IMPORTANT PENDING <span>tasks!</span></h2>
          <div className="d-flex mb-30">
            <a className="task-block">
              <Reminder />
              <h2>Reminder</h2>
              <span className="rt-l red-bg">05</span>
              <span className="rt-l green-bg">15</span>
            </a>
            <a className="task-block">
              <Todo />
              <h2>To Do</h2>
              <span className="rt-l red-bg">05</span>
              <span className="rt-l green-bg">15</span>
            </a>
            <a className="task-block">
              <Clarification />
              <h2>Messages</h2>
              <span className="rt-l red-bg">02</span>
            </a>
          </div>
          <div className="d-flex">
            <div className="after-r">You will be reminded every 30 mins/
              <span>Remind me after
                <div className="components">
                  <select className="inputForm select" placeholder="">
                    <option value="">10:00</option>
                    <option value=""> Physician Review</option>
                    <option value="">Nurse Prep</option>
                    <option value="">To Do</option>
                  </select>
                </div>
                mins</span>
            </div>
          </div>
          <div>
            <button className="screen-btn" onClick={() => this.handleCloseModal()}>DONE</button>
          </div>
          <div className="d-flex bottom-line">
            <img src={require('../../../assets/images/popup/info.svg')} />
            <span className="b-log-tag">Blue</span>
            Pending To-Do's |
            <span className="r-log-tag">Red</span>
            Out of Compliance To-Do's
          </div>

        </div>

      </Dialog>
      {/* end popup */}
    </>);
  }
}

const mapStateToProps = ({ auth }) => {
  const { authUser } = auth;
  return {
    authUser,
  };
};
export default connect(mapStateToProps, { userSignOut })((withRouter(SignOutPopup))
);
