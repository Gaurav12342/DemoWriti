/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
// import { handleInputChange } from 'react-select/src/utils';
import Tabs, { TabPane } from '../../../../node_modules/rc-tabs';
import { StartVisit, Clarification } from '../../../assets/images/resident-detail/index';

class ChatSidebar extends Component {
  constructor() {
    super();
    this.state = {
      showChat: false,
      WindowWidth: window.innerWidth,
    };

    this.handleSidebar = this.handleSidebar.bind(this);
  }
  handleSidebar() {
    this.setState(state => ({ showChat: !showChat }));
  }
  handleResize = (e) => {
    if (this.state.WindowWidth > 1023) {
      this.setState({ showChat: true })
      this.setState({ WindowWidth: window.innerWidth });
    }
    else {
      this.setState({ showChat: true })
    }

  };
  componentDidMount = () => {
    window.addEventListener("load", this.handleResize);
  }

  componentWillUnMount = () => {
    window.addEventListener("load", this.handleResize);
  }
  render() {
    var callback = function (key) { };
    const { showChat } = this.state;
    return (
      <>
        {showChat &&
          <div className="chatSidebar" >
            <div className="sidebarTop">
              <div className="search">
                <input type="text" placeholder="Search" className="inputForm" />
              </div>
              <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="All" key="1">
                  <div className="all-tab">
                    <div className="button chat-options">
                      <a href="#">
                        <StartVisit />
                        <span>Meet Now</span>
                      </a>
                      <a href="#">
                        <Clarification />
                        <span>New Chat</span>
                      </a>
                    </div>
                    <div className="chat-listing">
                      <h3 className="title">Recent Chats</h3>
                      <div className="listing">
                        <a href="#" className="media online">
                          <div className="contact-profile">
                            <img src={require('../../../assets/images/chat/avtar.png')} />
                          </div>
                          <div className="media-body">
                            <h3 className="name">Nurse Fischer Kim</h3>
                            <p className="desc">Done</p>
                          </div>
                          <span className="msg-time">10:32 AM</span>
                        </a>
                        <a href="#" className="media online">
                          <div className="contact-profile">
                            <img src={require('../../../assets/images/chat/avtar2.png')} />
                          </div>
                          <div className="media-body">
                            <h3 className="name">Nurse Fischer Kim</h3>
                            <p className="desc">Lorem Ipsum dummy text</p>
                          </div>
                          <span className="msg-time">10:32 AM</span>
                        </a>
                        <a href="#" className="media online">
                          <div className="contact-profile">
                            <img src={require('../../../assets/images/chat/avtar.png')} />
                          </div>
                          <div className="media-body">
                            <h3 className="name">Nurse Fischer Kim</h3>
                            <p className="desc">Lorem Ipsum dummy text</p>
                          </div>
                          <span className="msg-time">10:32 AM</span>
                        </a>
                        <a href="#" className="media online">
                          <div className="contact-profile">
                            <img src={require('../../../assets/images/chat/avtar2.png')} />
                          </div>
                          <div className="media-body">
                            <h3 className="name">Nurse Fischer Kim</h3>
                            <p className="desc">Lorem Ipsum dummy text</p>
                          </div>
                          <span className="msg-time">10:32 AM</span>
                        </a>
                        <a href="#" className="media offline">
                          <div className="contact-profile">
                            <img src={require('../../../assets/images/chat/avtar2.png')} />
                          </div>
                          <div className="media-body">
                            <h3 className="name">Nurse Fischer Kim</h3>
                            <p className="desc">Lorem Ipsum dummy text</p>
                          </div>
                          <span className="msg-time">10:32 AM</span>
                        </a>
                        <a href="#" className="media online">
                          <div className="contact-profile">
                            <img src={require('../../../assets/images/chat/avtar.png')} />
                          </div>
                          <div className="media-body">
                            <h3 className="name">Nurse Fischer Kim</h3>
                            <p className="desc">Lorem Ipsum dummy text</p>
                          </div>
                          <span className="msg-time">10:32 AM</span>
                        </a>
                        <a href="#" className="media offline">
                          <div className="contact-profile">
                            <img src={require('../../../assets/images/chat/avtar2.png')} />
                          </div>
                          <div className="media-body">
                            <h3 className="name">Nurse Fischer Kim</h3>
                            <p className="desc">Lorem Ipsum dummy text</p>
                          </div>
                          <span className="msg-time">10:32 AM</span>
                        </a>
                        <a href="#" className="media online">
                          <div className="contact-profile">
                            <img src={require('../../../assets/images/chat/avtar.png')} />
                          </div>
                          <div className="media-body">
                            <h3 className="name">Nurse Fischer Kim</h3>
                            <p className="desc">Lorem Ipsum dummy text</p>
                          </div>
                          <span className="msg-time">10:32 AM</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </TabPane>
                <TabPane tab="Nurse" key="2">
                  <div className="all-tab">
                    <div className="button chat-options">
                      <a href="#">
                        <StartVisit />
                        <span>Meet Now</span>
                      </a>
                      <a href="#">
                        <Clarification />
                        <span>New Chat</span>
                      </a>
                    </div>
                    <div className="chat-listing">
                      <h3 className="title">Recent Chats</h3>
                      <div className="listing">
                        <a href="#" className="media online">
                          <div className="contact-profile">
                            <img src={require('../../../assets/images/chat/avtar.png')} />
                          </div>
                          <div className="media-body">
                            <h3 className="name">Nurse Fischer Kim</h3>
                            <p className="desc">Done</p>
                          </div>
                          <span className="msg-time">10:32 AM</span>
                        </a>
                        <a href="#" className="media online">
                          <div className="contact-profile">
                            <img src={require('../../../assets/images/chat/avtar2.png')} />
                          </div>
                          <div className="media-body">
                            <h3 className="name">Nurse Fischer Kim</h3>
                            <p className="desc">Lorem Ipsum dummy text</p>
                          </div>
                          <span className="msg-time">10:32 AM</span>
                        </a>
                        <a href="#" className="media online">
                          <div className="contact-profile">
                            <img src={require('../../../assets/images/chat/avtar.png')} />
                          </div>
                          <div className="media-body">
                            <h3 className="name">Nurse Fischer Kim</h3>
                            <p className="desc">Lorem Ipsum dummy text</p>
                          </div>
                          <span className="msg-time">10:32 AM</span>
                        </a>
                        <a href="#" className="media online">
                          <div className="contact-profile">
                            <img src={require('../../../assets/images/chat/avtar2.png')} />
                          </div>
                          <div className="media-body">
                            <h3 className="name">Nurse Fischer Kim</h3>
                            <p className="desc">Lorem Ipsum dummy text</p>
                          </div>
                          <span className="msg-time">10:32 AM</span>
                        </a>
                        <a href="#" className="media offline">
                          <div className="contact-profile">
                            <img src={require('../../../assets/images/chat/avtar2.png')} />
                          </div>
                          <div className="media-body">
                            <h3 className="name">Nurse Fischer Kim</h3>
                            <p className="desc">Lorem Ipsum dummy text</p>
                          </div>
                          <span className="msg-time">10:32 AM</span>
                        </a>
                        <a href="#" className="media online">
                          <div className="contact-profile">
                            <img src={require('../../../assets/images/chat/avtar.png')} />
                          </div>
                          <div className="media-body">
                            <h3 className="name">Nurse Fischer Kim</h3>
                            <p className="desc">Lorem Ipsum dummy text</p>
                          </div>
                          <span className="msg-time">10:32 AM</span>
                        </a>
                        <a href="#" className="media offline">
                          <div className="contact-profile">
                            <img src={require('../../../assets/images/chat/avtar2.png')} />
                          </div>
                          <div className="media-body">
                            <h3 className="name">Nurse Fischer Kim</h3>
                            <p className="desc">Lorem Ipsum dummy text</p>
                          </div>
                          <span className="msg-time">10:32 AM</span>
                        </a>
                        <a href="#" className="media online">
                          <div className="contact-profile">
                            <img src={require('../../../assets/images/chat/avtar.png')} />
                          </div>
                          <div className="media-body">
                            <h3 className="name">Nurse Fischer Kim</h3>
                            <p className="desc">Lorem Ipsum dummy text</p>
                          </div>
                          <span className="msg-time">10:32 AM</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </TabPane>
                <TabPane tab="Physician" key="3">
                  <div className="all-tab">
                    <div className="button chat-options">
                      <a href="#">
                        <StartVisit />
                        <span>Meet Now</span>
                      </a>
                      <a href="#">
                        <Clarification />
                        <span>New Chat</span>
                      </a>
                    </div>
                    <div className="chat-listing">
                      <h3 className="title">Recent Chats</h3>
                      <div className="listing">
                        <a href="#" className="media online">
                          <div className="contact-profile">
                            <img src={require('../../../assets/images/chat/avtar.png')} />
                          </div>
                          <div className="media-body">
                            <h3 className="name">Nurse Fischer Kim</h3>
                            <p className="desc">Done</p>
                          </div>
                          <span className="msg-time">10:32 AM</span>
                        </a>
                        <a href="#" className="media online">
                          <div className="contact-profile">
                            <img src={require('../../../assets/images/chat/avtar2.png')} />
                          </div>
                          <div className="media-body">
                            <h3 className="name">Nurse Fischer Kim</h3>
                            <p className="desc">Lorem Ipsum dummy text</p>
                          </div>
                          <span className="msg-time">10:32 AM</span>
                        </a>
                        <a href="#" className="media online">
                          <div className="contact-profile">
                            <img src={require('../../../assets/images/chat/avtar.png')} />
                          </div>
                          <div className="media-body">
                            <h3 className="name">Nurse Fischer Kim</h3>
                            <p className="desc">Lorem Ipsum dummy text</p>
                          </div>
                          <span className="msg-time">10:32 AM</span>
                        </a>
                        <a href="#" className="media online">
                          <div className="contact-profile">
                            <img src={require('../../../assets/images/chat/avtar2.png')} />
                          </div>
                          <div className="media-body">
                            <h3 className="name">Nurse Fischer Kim</h3>
                            <p className="desc">Lorem Ipsum dummy text</p>
                          </div>
                          <span className="msg-time">10:32 AM</span>
                        </a>
                        <a href="#" className="media offline">
                          <div className="contact-profile">
                            <img src={require('../../../assets/images/chat/avtar2.png')} />
                          </div>
                          <div className="media-body">
                            <h3 className="name">Nurse Fischer Kim</h3>
                            <p className="desc">Lorem Ipsum dummy text</p>
                          </div>
                          <span className="msg-time">10:32 AM</span>
                        </a>
                        <a href="#" className="media online">
                          <div className="contact-profile">
                            <img src={require('../../../assets/images/chat/avtar.png')} />
                          </div>
                          <div className="media-body">
                            <h3 className="name">Nurse Fischer Kim</h3>
                            <p className="desc">Lorem Ipsum dummy text</p>
                          </div>
                          <span className="msg-time">10:32 AM</span>
                        </a>
                        <a href="#" className="media offline">
                          <div className="contact-profile">
                            <img src={require('../../../assets/images/chat/avtar2.png')} />
                          </div>
                          <div className="media-body">
                            <h3 className="name">Nurse Fischer Kim</h3>
                            <p className="desc">Lorem Ipsum dummy text</p>
                          </div>
                          <span className="msg-time">10:32 AM</span>
                        </a>
                        <a href="#" className="media online">
                          <div className="contact-profile">
                            <img src={require('../../../assets/images/chat/avtar.png')} />
                          </div>
                          <div className="media-body">
                            <h3 className="name">Nurse Fischer Kim</h3>
                            <p className="desc">Lorem Ipsum dummy text</p>
                          </div>
                          <span className="msg-time">10:32 AM</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </TabPane>
                <TabPane tab="POA" key="4">
                  <div className="all-tab">
                    <div className="button chat-options">
                      <a href="#">
                        <StartVisit />
                        <span>Meet Now</span>
                      </a>
                      <a href="#">
                        <Clarification />
                        <span>New Chat</span>
                      </a>
                    </div>
                    <div className="chat-listing">
                      <h3 className="title">Recent Chats</h3>
                      <div className="listing">
                        <a href="#" className="media online">
                          <div className="contact-profile">
                            <img src={require('../../../assets/images/chat/avtar.png')} />
                          </div>
                          <div className="media-body">
                            <h3 className="name">Nurse Fischer Kim</h3>
                            <p className="desc">Done</p>
                          </div>
                          <span className="msg-time">10:32 AM</span>
                        </a>
                        <a href="#" className="media online">
                          <div className="contact-profile">
                            <img src={require('../../../assets/images/chat/avtar2.png')} />
                          </div>
                          <div className="media-body">
                            <h3 className="name">Nurse Fischer Kim</h3>
                            <p className="desc">Lorem Ipsum dummy text</p>
                          </div>
                          <span className="msg-time">10:32 AM</span>
                        </a>
                        <a href="#" className="media online">
                          <div className="contact-profile">
                            <img src={require('../../../assets/images/chat/avtar.png')} />
                          </div>
                          <div className="media-body">
                            <h3 className="name">Nurse Fischer Kim</h3>
                            <p className="desc">Lorem Ipsum dummy text</p>
                          </div>
                          <span className="msg-time">10:32 AM</span>
                        </a>
                        <a href="#" className="media online">
                          <div className="contact-profile">
                            <img src={require('../../../assets/images/chat/avtar2.png')} />
                          </div>
                          <div className="media-body">
                            <h3 className="name">Nurse Fischer Kim</h3>
                            <p className="desc">Lorem Ipsum dummy text</p>
                          </div>
                          <span className="msg-time">10:32 AM</span>
                        </a>
                        <a href="#" className="media offline">
                          <div className="contact-profile">
                            <img src={require('../../../assets/images/chat/avtar2.png')} />
                          </div>
                          <div className="media-body">
                            <h3 className="name">Nurse Fischer Kim</h3>
                            <p className="desc">Lorem Ipsum dummy text</p>
                          </div>
                          <span className="msg-time">10:32 AM</span>
                        </a>
                        <a href="#" className="media online">
                          <div className="contact-profile">
                            <img src={require('../../../assets/images/chat/avtar.png')} />
                          </div>
                          <div className="media-body">
                            <h3 className="name">Nurse Fischer Kim</h3>
                            <p className="desc">Lorem Ipsum dummy text</p>
                          </div>
                          <span className="msg-time">10:32 AM</span>
                        </a>
                        <a href="#" className="media offline">
                          <div className="contact-profile">
                            <img src={require('../../../assets/images/chat/avtar2.png')} />
                          </div>
                          <div className="media-body">
                            <h3 className="name">Nurse Fischer Kim</h3>
                            <p className="desc">Lorem Ipsum dummy text</p>
                          </div>
                          <span className="msg-time">10:32 AM</span>
                        </a>
                        <a href="#" className="media online">
                          <div className="contact-profile">
                            <img src={require('../../../assets/images/chat/avtar.png')} />
                          </div>
                          <div className="media-body">
                            <h3 className="name">Nurse Fischer Kim</h3>
                            <p className="desc">Lorem Ipsum dummy text</p>
                          </div>
                          <span className="msg-time">10:32 AM</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </TabPane>
                <TabPane tab="Group" key="5">
                  <div className="all-tab">
                    <div className="button chat-options">
                      <a href="#">
                        <StartVisit />
                        <span>Meet Now</span>
                      </a>
                      <a href="#">
                        <Clarification />
                        <span>New Chat</span>
                      </a>
                    </div>
                    <div className="chat-listing">
                      <h3 className="title">Recent Chats</h3>
                      <div className="listing">
                        <a href="#" className="media online">
                          <div className="contact-profile">
                            <img src={require('../../../assets/images/chat/avtar.png')} />
                          </div>
                          <div className="media-body">
                            <h3 className="name">Nurse Fischer Kim</h3>
                            <p className="desc">Done</p>
                          </div>
                          <span className="msg-time">10:32 AM</span>
                        </a>
                        <a href="#" className="media online">
                          <div className="contact-profile">
                            <img src={require('../../../assets/images/chat/avtar2.png')} />
                          </div>
                          <div className="media-body">
                            <h3 className="name">Nurse Fischer Kim</h3>
                            <p className="desc">Lorem Ipsum dummy text</p>
                          </div>
                          <span className="msg-time">10:32 AM</span>
                        </a>
                        <a href="#" className="media online">
                          <div className="contact-profile">
                            <img src={require('../../../assets/images/chat/avtar.png')} />
                          </div>
                          <div className="media-body">
                            <h3 className="name">Nurse Fischer Kim</h3>
                            <p className="desc">Lorem Ipsum dummy text</p>
                          </div>
                          <span className="msg-time">10:32 AM</span>
                        </a>
                        <a href="#" className="media online">
                          <div className="contact-profile">
                            <img src={require('../../../assets/images/chat/avtar2.png')} />
                          </div>
                          <div className="media-body">
                            <h3 className="name">Nurse Fischer Kim</h3>
                            <p className="desc">Lorem Ipsum dummy text</p>
                          </div>
                          <span className="msg-time">10:32 AM</span>
                        </a>
                        <a href="#" className="media offline">
                          <div className="contact-profile">
                            <img src={require('../../../assets/images/chat/avtar2.png')} />
                          </div>
                          <div className="media-body">
                            <h3 className="name">Nurse Fischer Kim</h3>
                            <p className="desc">Lorem Ipsum dummy text</p>
                          </div>
                          <span className="msg-time">10:32 AM</span>
                        </a>
                        <a href="#" className="media online">
                          <div className="contact-profile">
                            <img src={require('../../../assets/images/chat/avtar.png')} />
                          </div>
                          <div className="media-body">
                            <h3 className="name">Nurse Fischer Kim</h3>
                            <p className="desc">Lorem Ipsum dummy text</p>
                          </div>
                          <span className="msg-time">10:32 AM</span>
                        </a>
                        <a href="#" className="media offline">
                          <div className="contact-profile">
                            <img src={require('../../../assets/images/chat/avtar2.png')} />
                          </div>
                          <div className="media-body">
                            <h3 className="name">Nurse Fischer Kim</h3>
                            <p className="desc">Lorem Ipsum dummy text</p>
                          </div>
                          <span className="msg-time">10:32 AM</span>
                        </a>
                        <a href="#" className="media online">
                          <div className="contact-profile">
                            <img src={require('../../../assets/images/chat/avtar.png')} />
                          </div>
                          <div className="media-body">
                            <h3 className="name">Nurse Fischer Kim</h3>
                            <p className="desc">Lorem Ipsum dummy text</p>
                          </div>
                          <span className="msg-time">10:32 AM</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </TabPane>
              </Tabs>
            </div>
          </div>
        }
        <div className={`chat_toggle ` + (showChat ? 'open' : '')} onClick={this.handleSidebar}>
          <p>
            Chat Persons
        </p>
        </div>
      </>
    );
  }
}
export default ChatSidebar;
