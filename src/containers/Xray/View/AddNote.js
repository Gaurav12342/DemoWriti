import React, { Component } from 'react';
import { Input, TextArea } from '../../../components/common/index'
import Modal from '../../../components/common/Popup/index'

class AddNote extends Component {
    state = {
        noteText: '',
        validated: false
    }
    componentWillMount() {
        let { isEdit, editRec } = this.props
        if (isEdit && editRec && editRec.note) {
            this.setState({
                noteText: editRec.note
            })
        }
    }
    handleSubmit = () => {
        let { validated, noteText } = this.state
        if (validated) {
            this.props.onCancel(noteText)
        }
    }
    handleText = (e) => {
        this.setState({
            noteText: e.target.value,
            validated: e.target.value ? true : false
        })
    }
    render() {
        let { isVisible, onCancel } = this.props
        let { validated, noteText } = this.state
        return (
            <Modal
                title="Add Note"
                visible={isVisible}
                onCancel={onCancel}
                onClose={onCancel}
                onOk={this.handleSubmit}
                okButtonProps={{ disabled: !validated }}>
                <div className='form_wrap' style={{ marginTop: '10px' }}>
                <TextArea placeholder="Please add note content" value={noteText} onChange={this.handleText}></TextArea>
                </div>
            </Modal>
        );
    }
}

export default AddNote;