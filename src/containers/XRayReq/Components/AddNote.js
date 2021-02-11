// import React, { Component } from 'react';
// import { Modal, Input } from 'antd'

// class AddNote extends Component {
//     state = {
//         noteText: '',
//         validated: false
//     }
//     componentWillMount() {
//         let { isEdit, editRec } = this.props
//         if (isEdit && editRec && editRec.note) {
//             this.setState({
//                 noteText: editRec.note
//             })
//         }
//     }
//     handleSubmit = () => {
//         let {validated,noteText}=this.state
//         if (validated) {
//             this.props.onCancel(noteText)
//         }
//     }
//     handleText = (e) => {
//         this.setState({
//             noteText: e.target.value,
//             validated: e.target.value ? true : false
//         })
//     }
//     render() {
//         let { isVisible, onCancel } = this.props
//         let { validated, noteText } = this.state
//         return (
//             <Modal
//                 title="Add Note"
//                 visible={isVisible}
//                 onCancel={onCancel}
//                 onOk={this.handleSubmit}
//                 okButtonProps={{ disabled: !validated }}
//             >
//                 <Input.TextArea placeholder="Please add note content" value={noteText} onChange={this.handleText}></Input.TextArea>
//             </Modal>
//         );
//     }
// }

// export default AddNote;