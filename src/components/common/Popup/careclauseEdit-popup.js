/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
// import ReactModal from 'react-modal';
import Dialog from 'rc-dialog';
class CareClauseEditPopup extends Component {

  constructor() {
    super();
    this.state = {
      careModal: false
    };

    // this.handleOpenModal = this.handleOpenModal.bind(this);
    // this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  //   handleOpenModal () {
  //     this.setState({ careModal: true });
  //   }

  handleCloseModal() {
    this.setState({ careModal: false });
  }
  render() {

    return (<>
      {/* start popup */}
      <Dialog visible={this.props.visible}
        onClose={this.props.onClosed}
        className="logout_popup edit_warp view_notes_wrap"
      >
        <div className="popup-content-log">
          <h3 className="name_head">Care Clause - O'Laughlin, Craig (Room No 2056)</h3>
          <div className="bb mb-20"></div>
          <div className="additional-textarea mb-10">
            <textarea placeholder="The Continued Care Clause&#10;Lorem ipsum, or lipsum as it is sometimes known, 
                                is dummy text used in laying out print, graphic 
                                or web designs..."></textarea>
          </div>

          <div className="d-flex">
            <form action="">
              <div className="form_wrap">
                <div className="components mr-10">
                  <input type="tex" className="inputForm" placeholder="Weight"
                    onChange={(e) => console.log(e)} />
                </div>
                <div className="components mr-10">
                  <input type="tex" className="inputForm" placeholder="Blood Pressure"
                    onChange={(e) => console.log(e)} />
                </div>
                <div className="components">
                  <input type="tex" className="inputForm" placeholder="Pulse Rate"
                    onChange={(e) => console.log(e)} />
                </div>
              </div>
            </form>
          </div>

          <div className="d-flex mb-10">
            <div className="care-textarea wd49 mr-10">
              <textarea placeholder="Diet&#10;Lorem ipsum Lorem Ipsum"></textarea>
            </div>
            <div className="care-textarea wd49">
              <textarea placeholder="Allergies&#10;Lorem ipsum Lorem Ipsum"></textarea>
            </div>
          </div>

          <div className="care-textarea wd49 mb-20">
            <textarea placeholder="Conditions&#10;Lorem ipsum Lorem Ipsum"></textarea>
          </div>

          <div className="d-flex-end">
            <button className="screen-btn-s gray-btn-s mb-0 mr-10" onClick={() => this.props.onClosed()}>CANCEL</button>
            <button className="screen-btn-s green-btn-s mb-0">SAVE</button>
          </div>

        </div>

      </Dialog>
      {/* end popup */}
    </>);
  }
}
export default CareClauseEditPopup;