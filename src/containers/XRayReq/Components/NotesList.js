// import React, { Component } from 'react';
// import { Table, Divider, Modal, Empty } from 'antd';
// import { TODO_TYPES, MED_REVIEW_NAME, TODO_CATEGORY, MED_REVIEW_TODO_TYPES, ADMISSION_READMISSION_TODO_TYPES, ADMISSION_READMISSION_NAME } from '../../../constants/Common'
// import UtilService, { getUserNameWithDesignation } from '../../../services/util';
// import AddNoteModal from './AddNote'
// import { string } from 'prop-types';
// const _ = require('lodash')

// function bindToDoName(todoSubCategory, todoCat) {
//     let result = "";
//     let todoType = TODO_TYPES
//     let todoName = ''
//     if (todoCat) {
//         if (todoCat === TODO_CATEGORY["MED_REVIEW"]) {
//             todoType = MED_REVIEW_TODO_TYPES
//             todoName = MED_REVIEW_NAME
//         } else if (todoCat === TODO_CATEGORY["ADMISSION_READMISSION"]) {
//             todoType = ADMISSION_READMISSION_TODO_TYPES
//             todoName = ADMISSION_READMISSION_NAME
//         }
//     }
//     _.each(todoType, function (v, k) {
//         if (v === todoSubCategory) {
//             if (todoName)
//                 result = todoName[k].replace(/_/g, " ")
//             else
//                 result = k.replace(/_/g, " ");
//         }
//     });
//     return result;
// }
// class NotesList extends Component {
//     state = {
//         addedNotes: [],
//         showAddNoteModal: false,
//         editRec: null
//     }
//     componentDidMount() {
//         this.setState({
//             addedNotes: this.props.addedNotes
//         })
//     }
//     handleEdit = (record) => {
//         this.setState({
//             showAddNoteModal: true,
//             editRec: record
//         })
//     }
//     handleDelete = (record) => {
//         let tempAddedNotes = []
//         this.state.addedNotes.forEach(tNote => {
//             if (tNote.note !== record.note) {
//                 tempAddedNotes.push(tNote)
//             }
//         })
//         this.setState({
//             addedNotes: tempAddedNotes
//         })
//     }
//     hideAddNoteModal = (modifiedNoteText) => {
//         if (typeof modifiedNoteText === 'string') {
//             let tempAddedNotes = [...this.state.addedNotes]
//             tempAddedNotes.filter(tNote => {
//                 if (tNote.note === this.state.editRec.note) {
//                     tNote.note = modifiedNoteText
//                     return false
//                 }
//                 return true
//             })
//             this.setState({
//                 addedNotes: tempAddedNotes
//             })
//             this.setState({
//                 addedNotes: tempAddedNotes,
//                 showAddNoteModal: false,
//                 editRec: null
//             })
//         }
//         else {
//             this.setState({
//                 showAddNoteModal: false,
//                 editRec: null
//             })
//         }
//     }
//     componentWillReceiveProps(nextProps) {
//         if (this.state.addedNotes && nextProps.addedNotes) {
//             this.setState({
//                 addedNotes: nextProps.addedNotes
//             })
//         }
//     }
//     getColumns = () => [
//         {
//             title: 'Note',
//             dataIndex: 'note',
//             width: 300,
//             render: (text, record) => (
//                 <div style={{
//                     wordWrap: 'break-word', wordBreak: 'break-all'
//                 }}>
//                     {UtilService.setReadMore(text, 15, 250)}
//                 </div>
//             )
//         },
//         {
//             title: 'Added by',
//             dataIndex: 'addedBy',
//             width: 200,
//             render: (text) => (
//                 <span>
//                     {getUserNameWithDesignation(text)}
//                 </span>
//             )
//         },
//         {
//             title: 'Created at',
//             dataIndex: 'createdAt',
//             width: 200,
//             render: (text) => (
//                 <span>
//                     {UtilService.displayDate(text)}
//                 </span>
//             )
//         },
//         {
//             title: 'Type',
//             dataIndex: 'subCategory',
//             width: 200,
//             render: (text, record) =>
//                 <span>
//                     {bindToDoName(text, record.category)}
//                 </span>

//         },
//         {
//             title: 'Actions',
//             width: 200,
//             render: (text, record) => (
//                 <span>
//                     <a onClick={this.handleEdit.bind(this, record)}>Edit</a>
//                     <Divider type="vertical" />
//                     <a onClick={this.handleDelete.bind(this, record)}> Delete </a>
//                 </span>
//             )
//         }
//     ]
//     render() {
//         let { isVisible, onCancel, notesCount, } = this.props
//         let { showAddNoteModal, addedNotes, editRec } = this.state
//         return (
//             <Modal
//                 title={`Added Notes ${notesCount}`}
//                 visible={isVisible}
//                 onCancel={() => onCancel(addedNotes)}
//                 width={700}
//                 onOk={() => onCancel(addedNotes)}
//             >
//                 {
//                     addedNotes.length > 0 ?
//                         <Table
//                             columns={this.getColumns()}
//                             pagination={false}
//                             datasource={addedNotes}
//                         /> : <Empty />
//                 }

//                 {
//                     showAddNoteModal && (
//                         <AddNoteModal
//                             isVisible={showAddNoteModal}
//                             isEdit={true}
//                             editRec={editRec}
//                             onCancel={this.hideAddNoteModal}
//                         />
//                     )
//                 }
//             </Modal>
//         );
//     }
// }

// export default NotesList;