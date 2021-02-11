/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import ReactModal from 'react-modal';
import Dialog from 'rc-dialog';
class DeleteNotesPopup extends Component {

  constructor() {
    super();
    this.state = {
      deleteModal: false
    };

    // this.handleOpenModal = this.handleOpenModal.bind(this);
    // this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  // handleOpenModal () {
  //   this.setState({ deleteModal: true });
  // }

  handleCloseModal() {
    this.setState({ deleteModal: false });
  }
  render() {

    return (<>
      {/* start popup */}
      <Dialog visible={this.props.visible}
        onClose={this.props.onClosed}
        className="lock_popup del-notes-wrap"
      >
        <div className="popup-content">
          <h3 className="name_head">Delete Note - O'Laughlin, Craig (Room No 2056)</h3>
          <div className="bb"></div>
          <p>Are you sure you want to delete this note?</p>
          <div>
            <button className="screen-btn gray-btn" onClick={() => this.props.onClosed()}>CANCEL</button>
            <button className="screen-btn">YES</button>
          </div>

          <div className="bottom-line">This action cannot be undone</div>

        </div>

      </Dialog>
      {/* end popup */}
    </>);
  }
}
export default DeleteNotesPopup;