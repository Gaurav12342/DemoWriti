import React, { Component } from 'react';
import { Check, Adduser, Audiocall, Videocall, Info } from '../../../assets/images/chat/index';

class ChatList extends Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);

    this.state = {
      popupVisible: false,
    };
  }
  handleClick() {
    if (!this.state.popupVisible) {
      // attach/remove event handler
      document.addEventListener('click', this.handleOutsideClick, false);
    } else {
      document.removeEventListener('click', this.handleOutsideClick, false);
    }

    this.setState((prevState) => ({
      popupVisible: !prevState.popupVisible,
    }));
  }

  handleOutsideClick(e) {
    // ignore clicks on the component itself
    if (this.node.contains(e.target)) {
      return;
    }

    this.handleClick();
  }
  render() {
    return (
      <div className="chatlist">
        <div className="profile-details">
          <div className="details">
            <h3 className="name">Dr.Ardiles Osvaldo</h3>
            <p className="last-seen">Last seen 5hr ago</p>
          </div>
          <ul className="chat-options">
            <li className="call">
              <a href="">
                <Audiocall />
              </a>
            </li>
            <li className="video">
              <a href="">
                <Videocall />
              </a>
            </li>
            <li className="add-contact">
              <a href="">
                <Adduser />
              </a>
            </li>
          </ul>
        </div>
        <div className="chat_history">
          <div className="chat-image">
            <div href="#" className="media left">
              <div className="contact-profile">
                <img src={require('../../../assets/images/chat/avtar.png')} />
              </div>
              <div className="media-body">
                <h3 className="name">Nurse Fischer Kim | 10:00 AM</h3>
                <div className="message-list">
                  <span>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit
                  </span>
                </div>
                <div className="message-list">
                  <span>Lorem ipsum dolor sit amet</span>
                </div>
              </div>
            </div>
            <div className="date">
              <span>23rd Jun 2020 | 09:53 am</span>
            </div>
            <div href="#" className="media right">
              <div className="media-body">
                <div className="message-list">
                  <span>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit
                  </span>
                </div>
                <div className="message-list">
                  <span className="note">
                    <Info />
                    Clarification Start : Patient O'Laughlin, Craig - Rx Order
                    123456
                  </span>
                  <span>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt.
                  </span>
                </div>
                <h3 className="name">
                  23rd Jun 2020 | 09:53 am
                  <span>
                    <Check />
                  </span>
                </h3>
              </div>
            </div>
            <div href="#" className="media left">
              <div className="contact-profile">
                <img src={require('../../../assets/images/chat/avtar.png')} />
              </div>
              <div className="media-body">
                <h3 className="name">Nurse Fischer Kim | 10:00 AM</h3>
                <div className="message-list">
                  <span>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit
                  </span>
                </div>
              </div>
            </div>
            <div href="#" className="media right">
              <div className="media-body">
                <div className="message-list">
                  <span className="note">
                    <Info />
                    Clarification Start : Patient O'Laughlin, Craig - Rx Order
                    123456
                  </span>
                  <span>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt.
                  </span>
                </div>
                <h3 className="name">
                  23rd Jun 2020 | 09:53 am
                  <span>
                    <Check />
                  </span>
                </h3>
              </div>
            </div>
            <div className="date">
              <span>23rd Jun 2020 | 09:53 am</span>
            </div>
            <div href="#" className="media left">
              <div className="contact-profile">
                <img src={require('../../../assets/images/chat/avtar.png')} />
              </div>
              <div className="media-body">
                <h3 className="name">Nurse Fischer Kim | 10:00 AM</h3>
                <div className="message-list">
                  <span>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="clarification">
          <div className="clari-note">
            <Info />
            <span>
              Clarification : Patient O'Laughlin, Craig - Rx Order 123456
              (Created By : Nurse Patrick Jane At: 26th May, 2020 | 09:53 am)
            </span>
          </div>
          <button className="button">End Clarification</button>
        </div>
        <div
          className="typing-searching"
          ref={(node) => {
            this.node = node;
          }}
        >
          <div className="typing-msg">
            <div className="at">
              <span>@</span>
            </div>
            <input
              type="text"
              className="typing-input"
              onClick={this.handleClick}
              placeholder="Type Message Here"
            />
            {this.state.popupVisible ? (
              <div className="searchBox">
                <h3 className="title">Resident</h3>
                <div className="listing">
                  <a href="#" className="media online">
                    <div className="contact-profile">
                      <img src={require('../../../assets/images/chat/avtar.png')} />
                    </div>
                    <div className="media-body">
                      <h3 className="name">Lisbon, Teresa</h3>
                      <p className="desc">Room No 2056</p>
                    </div>
                  </a>
                  <a href="#" className="media offline">
                    <div className="contact-profile">
                      <img src={require('../../../assets/images/chat/avtar.png')} />
                    </div>
                    <div className="media-body">
                      <h3 className="name">O'Laughlin, Craig</h3>
                      <p className="desc">Room No 2056</p>
                    </div>
                  </a>
                  <a href="#" className="media">
                    <div className="contact-profile">
                      <img src={require('../../../assets/images/chat/avtar2.png')} />
                    </div>
                    <div className="media-body">
                      <h3 className="name">Van, Pelt</h3>
                      <p className="desc">Room No 2056</p>
                    </div>
                  </a>
                  <a href="#" className="media">
                    <div className="contact-profile">
                      <img src={require('../../../assets/images/chat/avtar2.png')} />
                    </div>
                    <div className="media-body">
                      <h3 className="name">Wylie, Jason</h3>
                      <p className="desc">Room No 2056</p>
                    </div>
                  </a>
                  <a href="#" className="media">
                    <div className="contact-profile">
                      <img src={require('../../../assets/images/chat/avtar.png')} />
                    </div>
                    <div className="media-body">
                      <h3 className="name">Laroche, J. J.</h3>
                      <p className="desc">Room No 2056</p>
                    </div>
                  </a>
                </div>
                <div className="select">
                  <select className="inputForm">
                    <option value="">Resident</option>
                    <option value="">Physician Review</option>
                    <option value="">Nurse Prep</option>
                    <option value="">To Do</option>
                  </select>
                </div>
                <div className="search">
                  <input
                    type="text"
                    placeholder="Search"
                    className="inputForm"
                  />
                </div>
              </div>
            ) : null}
          </div>
          <div className="right-icon">
            <a href="" className="voice-icon">
              <img
                src={require('../../../assets/images/chat/voice-recorder.svg')}
                width="22"
              />
            </a>
            <a href="" className="link-icon">
              <img
                src={require('../../../assets/images/chat/attach.svg')}
                width="22"
              />
            </a>
            <a href="" className="action-icon">
              <img src={require('../../../assets/images/chat/group.svg')} />
            </a>
          </div>
        </div>
        <div className="priority">
          <ul>
            <li>
              <input type="checkbox" checked />
              <span>High Priority</span>
            </li>
            <li>
              <input type="checkbox" />
              <span>Need Acknowledgement</span>
            </li>
            <li>
              <input type="checkbox" />
              <span>Delete after</span>
            </li>
            <li className="select-time">
              <select className="inputForm" placeholder="">
                <option value="">hh:mm</option>
                <option value="">hh:mm</option>
                <option value="">hh:mm</option>
                <option value="">hh:mm</option>
              </select>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default ChatList;
