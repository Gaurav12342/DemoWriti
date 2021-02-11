import React, { Component } from 'react';
import Header from '../../components/Header';
import ChatSidebar from './View/sidebar';
import ChatList from './View/chat';

class Chat extends Component {
  render() {
    console.log('Chat')
    return (
      <div className="chat_wrap">
        {/* <Header /> */}
        <div className="chat-history">
          <ChatSidebar />
          <ChatList />
        </div>
      </div>
    );
  }
}

export default Chat;
