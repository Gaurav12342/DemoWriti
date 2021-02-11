/* eslint-disable no-undef */
import React, { Component } from 'react';
import { AddNote, Check, View, Call } from '../../../assets/images/todo/index';
// import { ReactComponent as AddNotes } from '../../../assets/images/todo/add-note.svg';
// import { ReactComponent as Check } from '../../../assets/images/todo/correct.svg';
// import { ReactComponent as View } from '../../../assets/images/todo/view.svg';
// import { ReactComponent as Call } from '../../../assets/images/todo/phone-call.svg';
import { Notes, Reminder } from '../../../assets/images/pmr/index';
// import { ReactComponent as Notes } from '../../../assets/images/pmr/notes.svg';
// import { ReactComponent as Reminder } from '../../../assets/images/pmr/reminder.svg';
import { Etar, Consent, Ebox, DrugRecord, CarePlan, Xray, ChangeSticker } from '../../../assets/images/resident-detail/todo/index';
// import { ReactComponent as Etar } from '../../../assets/images/resident-detail/todo/1st-eTAR-eMAR.svg';
// import { ReactComponent as Consent } from '../../../assets/images/resident-detail/todo/consent.svg';
// import { ReactComponent as Ebox } from '../../../assets/images/resident-detail/todo/e-box-used.svg';
// import { ReactComponent as DrugRecord } from '../../../assets/images/resident-detail/todo/drug-record.svg';
// import { ReactComponent as CarePlan } from '../../../assets/images/resident-detail/todo/care-plan.svg';
// import { ReactComponent as Xray } from '../../../assets/images/resident-detail/todo/x-ray.svg';
// import { ReactComponent as ChangeSticker } from '../../../assets/images/resident-detail/todo/change-sticker.svg';
import { TodoActions, PendingTodo } from '../../../components/Todo'
import LightBox from '../../../components/common/LightBox'
class TodoDetail extends Component {

  state = { modal: false }
  handleViewPresc() {
    this.setState({ modal: true })

  }

  render() {
    return (
      <div className="tododetails ">
        <div className="main-title">
          <h4>O'Laughlin, Craig (Room No 2056) 18th May 2020, 12:20 pm</h4>
        </div>
        <div className="todo-listing">
          <div className="form ">
            <div className="form-title">
              <h5>View Prescription - Rx 123456</h5>
              <span className="zoom-in" onClick={() => this.handleViewPresc()}>zoom in</span>
            </div>
            <div className="pres_img">
              <img src={require('../../../assets/images/todo/form.png')} alt="" />
            </div>
          </div>
          <div className='listing-right'>
            <TodoActions todoList={[1]} />
            <PendingTodo todo={{ id: 1 }} onFetchTodoDetail={null} />
          </div>
          <LightBox visible={this.state.modal} images={[{ src: require('../../../assets/images/todo/form.png') },
          { src: require('../../../assets/images/todo/avtar.png') }]}
            onCloseRequest={() => this.setState({ modal: false })}
            curImg={0} />
          {/* <div className="listing-right">
            <div className="listing-top">
              <ul>
                <li>
                  <a href="">
                    <div className="left">
                      <Etar className="etar" />
                      <span className="title">1st eTAR/eMAR</span>
                    </div>
                    <div className="middle">
                      <span className="yes">yes</span>
                      <span className="null">N/A</span>
                    </div>
                    <div className="right">
                      <span className="add-note">
                        <AddNote />
                        <span>Add Notes</span>
                      </span>
                      <span className="note">
                        <Notes />
                        <span>Notes</span>
                        <span className="tot">05</span>
                      </span>
                      <span className="reminder">
                        <Reminder />
                        <span>reminder</span>
                        <span className="tot">05</span>
                      </span>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="">
                    <div className="left">
                      <Consent className="consent" />
                      <span className="title">Consent</span>
                      <div className="contact-info">
                        <Call />
                        <div className="history">
                          <p>
                            <span>POA Name</span>
                            <span>:Last Name, First Name</span>
                          </p>
                          <p>
                            <span>Type</span>
                            <span>:Type</span>
                          </p>
                          <p>
                            <span>Cell</span>
                            <span>:(123) 123 123 123</span>
                          </p>
                          <p>
                            <span>Email</span>
                            <span>:nam@gmail.com</span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="middle">
                      <span className="yes">yes</span>
                      <span className="null">N/A</span>
                    </div>
                    <div className="right">
                      <span className="add-note">
                        <AddNote />
                        <span>Add Notes</span>
                      </span>
                      <span className="note">
                        <Notes />
                        <span>Notes</span>
                        <span className="tot">05</span>
                      </span>
                      <span className="reminder">
                        <Reminder />
                        <span>reminder</span>
                        <span className="tot">05</span>
                      </span>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="">
                    <div className="left">
                      <Ebox className="ebox" />
                      <span className="title">E-Box Used</span>
                    </div>
                    <div className="middle">
                      <span className="yes">yes</span>
                      <span className="null">N/A</span>
                    </div>
                    <div className="right">
                      <span className="add-note">
                        <AddNote />
                        <span>Add Notes</span>
                      </span>
                      <span className="note">
                        <Notes />
                        <span>Notes</span>
                        <span className="tot">05</span>
                      </span>
                      <span className="reminder">
                        <Reminder />
                        <span>reminder</span>
                        <span className="tot">05</span>
                      </span>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="">
                    <div className="left">
                      <DrugRecord className="dr" />
                      <span className="title">Drug Record</span>
                    </div>
                    <div className="middle">
                      <span className="yes">yes</span>
                      <span className="null">N/A</span>
                    </div>
                    <div className="right">
                      <span className="add-note">
                        <AddNote />
                        <span>Add Notes</span>
                      </span>
                      <span className="note">
                        <Notes />
                        <span>Notes</span>
                        <span className="tot">05</span>
                      </span>
                      <span className="reminder">
                        <Reminder />
                        <span>reminder</span>
                        <span className="tot">05</span>
                      </span>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="">
                    <div className="left">
                      <CarePlan className="cp" />
                      <span className="title">Care Plan</span>
                    </div>
                    <div className="middle">
                      <span className="yes">yes</span>
                      <span className="null">N/A</span>
                    </div>
                    <div className="right">
                      <span className="add-note">
                        <AddNote />
                        <span>Add Notes</span>
                      </span>
                      <span className="note">
                        <Notes />
                        <span>Notes</span>
                        <span className="tot">05</span>
                      </span>
                      <span className="reminder">
                        <Reminder />
                        <span>reminder</span>
                        <span className="tot">05</span>
                      </span>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="">
                    <div className="left">
                      <Xray className="xray" />
                      <span className="title">X-Ray Diet Lab Request</span>
                    </div>
                    <div className="middle">
                      <span className="check">
                        <Check />
                      </span>
                      <span className="undo">undo</span>
                    </div>
                    <div className="right">
                      <span className="add-note">
                        <AddNote />
                        <span>Add Notes</span>
                      </span>
                      <span className="note">
                        <Notes />
                        <span>Notes</span>
                        <span className="tot">05</span>
                      </span>
                      <span className="reminder">
                        <Reminder />
                        <span>reminder</span>
                        <span className="tot">05</span>
                      </span>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="">
                    <div className="left">
                      <ChangeSticker className="cs" />
                      <span className="title">Change Sticker</span>
                    </div>
                    <div className="middle">
                      <span className="yes">yes</span>
                      <span className="null">N/A</span>
                    </div>
                    <div className="right">
                      <span className="add-note">
                        <AddNote />
                        <span>Add Notes</span>
                      </span>
                      <span className="note">
                        <Notes />
                        <span>Notes</span>
                        <span className="tot">05</span>
                      </span>
                      <span className="reminder">
                        <Reminder />
                        <span>reminder</span>
                        <span className="tot">05</span>
                      </span>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
            <div className="listing-bottom">
              <div className="form-title">
                <h5>Pending To Do - 1st eMAR/eTAR</h5>
              </div>
              <a href="" className="top-cell pending-to-do">
                <span style={{ color: '#609fae' }}>Rx Order <span className="count">100</span></span>
                <span>PMR</span>
                <span>E-Processing</span>
              </a>
              <a href="" className="pending-to-do">
                <span>Rx 123456 - 18th May 2020, 12:20 pm</span>
                <View />
              </a>
              <a href="" className="pending-to-do">
                <span>Rx 123456 - 18th May 2020, 12:20 pm</span>
                <View />
              </a>
              <a href="" className="pending-to-do">
                <span>Rx 123456 - 18th May 2020, 12:20 pm</span>
                <View />
              </a>
              <a href="" className="pending-to-do">
                <span>Rx 123456 - 18th May 2020, 12:20 pm</span>
                <View />
              </a>
            </div>
          </div>
       */}
        </div>
      </div>
    );
  }
}
export default TodoDetail;
