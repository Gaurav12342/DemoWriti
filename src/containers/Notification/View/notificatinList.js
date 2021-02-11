import React, { Component } from "react";

class NotificationList extends Component {
  render() {
    return (
      <div className="notifications">
        <div className="nlists">
          <div className="heading">
            <h3 className="title">New</h3>
          </div>
          <ul className="listing">
            <li>
              <a href="">
                <span>
                  You have 1 New Message from Nurse Kim Fischer. Lorem Ipsum
                  dummay.<span className="status"></span>
                </span>
                <span className="timming">1 hr</span>
              </a>
            </li>
            <li>
              <a href="">
                <span>
                  You have 1 New Message from Nurse Kim Fischer. Lorem Ipsum
                  dummay.<span className="status"></span>
                </span>
                <span className="timming">51 mins</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="nlists">
          <div className="heading">
            <h3 className="title">Earlier</h3>
          </div>
          <ul className="listing">
            <li>
              <a href="">
                <span>
                  You have 1 New Message from Nurse Kim Fischer.Dummy text. Lorem ipsum is a dummay text in advertising industry.
                </span>
                <span className="timming">5 hrs</span>
              </a>
            </li>
            <li>
              <a href="">
                <span>Important Note</span><span><span className="status"></span></span>
                <span className="timming">02nd Jul 2020 | 09:53 am</span>
              </a>
            </li>
            <li>
              <a href="">
                <span>
                  You have 1 New Message from Nurse Kim Fischer. 
                </span>
                <span className="timming">01st Jul 2020 | 02:00 pm</span>
              </a>
            </li>
            <li>
              <a href="">
                <span>Important Note</span><span><span className="status"></span></span>
                <span className="timming">02nd Jul 2020 | 09:53 am</span>
              </a>
            </li>
            <li>
              <a href="">
                <span>
                You have 1 New Message from Nurse Kim Fischer.
                </span>
                <span className="timming">01st Jul 2020 | 02:00 pm</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default NotificationList;
