import React, { Component } from "react";

class NotificationHead extends Component {
  render() {
    return (
      <>  
        <div className="page_head">
          <h3>Notifications</h3>
          <div className="markOption">
            <a href="">Mark all as read</a>
          </div>
        </div>
      </>
    );
  }
}
export default NotificationHead;
