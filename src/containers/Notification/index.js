import React, { Component } from 'react';
import Header from '../../components/Header';
import NotificationHead from './View/pageHead';
import NotificationList from './View/notificatinList';

class Notification extends Component {
  
  render() {
    console.log("TCL: Notification")
    return (
      <div className="notification_wrap">
        {/* <Header /> */}
        <NotificationHead />
        <NotificationList />
      </div>
    );
  }
}

export default Notification;
