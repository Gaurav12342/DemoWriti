import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import {
  deleteNote,
  getAllNotes,
  updateNote,
  upsertNote,
} from '../../services/api/routes/notes';
import axios from '../../services/api/config';
import Note from './View';
import Dialog from '../common/Popup';
import { Button } from '../common';
import { NoteUpsert } from './index';
import { masterPaginate } from '../../services/api/routes/master';
import moment from 'moment'
import _ from "lodash"
const List = (props) => {
  const {
    visible,
    filterOptions,
    isArOrderNote,
    xRayNumber,
    isUpsertList,
    isNotApiCall,
    defaultNotes,
    isOnlyView
  } = props;
  const [notesData, setNotesData] = useState([]);
  const [noteTypes, setNoteTypes] = useState([]);
  const [visibleAdd, setVisibleAdd] = useState(false);
  const authUser = useSelector(state => state.auth.authUser)
  const [addButtonLoading,setAddButtonLoading] = useState(false)
  useEffect(() => {
    if (!!visible) {
      if (isNotApiCall)
        setNotesData(defaultNotes || [])
      else
        fetch();
      getNoteTypes();
    }
  }, []);

  const fetch = async () => {
    let obj = filterOptions;
    console.log("🚀 ~ file: List.js ~ line 45 ~ fetch ~ obj", obj)
    if (obj.query && obj.query.populate) {
      obj.query.populate = _.concat(obj.query.populate, [{ noteType: [] }, { "history.noteType": ["name"] }, { "history.addedBy": [], },])
    }
    let isAr = isArOrderNote;

    let objNotes = isAr ? { isArOrderNote: isAr, ...obj } : obj;

    axios({ ...getAllNotes, data: objNotes }).then(({ data }) => {
      let notesData = [];
      if (data.code === 'OK') {
        if (data.data && data.data.data && data.data.data.length > 0) {
          notesData = data.data.data;
        }
      }
      setNotesData(notesData);
    });
  };

  const getNoteTypes = () => {
    let data = {
      query: {
        find: {
          isActive: true,
          code: 'NOTE_TYPE',
        },
        populate: [
          {
            subMaster: [],
            match: { isActive: true },
          },
        ],
      },
    };
    axios({ ...masterPaginate, data }).then(({ data }) => {
      if (data.code === 'OK') {
        if (data.data.data.length > 0) {
          const masterData = data.data.data[0];
          if (masterData.subMaster && masterData.subMaster.length) {
            setNoteTypes(masterData.subMaster);
          }
        }
      }
    });
  };

  const handleAddNote = (visible) => {
    setVisibleAdd(visible);
  };

  const handleDelete = (noteObj, index) => {
    if (isNotApiCall) {
      let tempData = [...notesData]
      let index = tempData.find((x, i) => i === index)
      if (index < 0)
        return
      tempData.splice(index, 1)
      setNotesData(tempData)
    } else {
      axios({ ...deleteNote, url: `admin/note/${noteObj._id}` }).then(
        ({ data }) => {
          console.log('TCL: fetch -> data', data);
          if (data.code === 'OK') {
            fetch();
          }
        }
      );
    }
  };

  const handleUpdate = (noteId, updateData) => {
    setAddButtonLoading(true)

    axios({
      ...updateNote,
      url: `admin/note/${noteId}`,
      data: updateData,
    }).then(({ data }) => {
      console.log('handleUpdate -> data', data);
      if (data.code === 'OK') {
      setAddButtonLoading(false)

        fetch();
      }
    });
  };

  const handleAdd = (data) => {
    let addRequest = {
      ...data,
      ...props.addData,
      addedBy: { _id: authUser._id, mergeLFName: authUser.mergeLFName, type: authUser.type, homeId: authUser.homeId },
      createdAt: moment().toISOString()
    }
    if (isNotApiCall) {
      let tempNotes = [...notesData]
      tempNotes.push(addRequest)
      setNotesData(tempNotes)
      handleAddNote(false);
    } else {
      setAddButtonLoading(true)
      axios({ ...upsertNote, data: addRequest }).then(
        ({ data }) => {
          console.log('handleUpdate -> data', data);
          if (data.code === 'OK') {
            handleAddNote(false);
            // notesData.push(data.data);
            // setNotesData(notesData);
      setAddButtonLoading(false)

            fetch();
          }
        }
      );
    }
  };

  const handleClose = () => {
    const options = {
      notesData
    }
    props.onCancel(notesData.length, options)
  }

  return (
    <Dialog
      {...props}
      onCancel={() =>
        handleClose()
        // props.onCancel(notesData.length, props.addData.subCategory)
      }
      customChildren={true}
      footer={false}
      className='logout_popup add_notes_warp view_notes_wrap'
    >
      <div
        className='popup-content-log'
        style={{ maxHeight: '90vh', overflowY: 'auto' }}
      >
        <h3 className='name_head'>
          {props.modalTitle || 'View Note'}
          {isUpsertList == true ? (
            <Button
              style={{ marginLeft: '10px' }}
              onClick={() => handleAddNote(true)}
            >
              Add
            </Button>
          ) : null}
        </h3>
        <div className='bb'></div>
        {!!notesData &&
          !!notesData.length &&
          notesData.map((noteObj, i) => (
            <Note
              index={i}
              noteTypes={noteTypes}
              xRayNumber={xRayNumber}
              detail={noteObj}
              handleDelete={() => handleDelete(noteObj, i)}
              onUpdate={fetch}
              handleUpdate={handleUpdate}
              isOnlyView={isOnlyView}
            />
          ))}
      </div>
      {visibleAdd && (
        <NoteUpsert
        addButtonLoading={addButtonLoading}
          xRayNumber={xRayNumber}
          noteTypes={noteTypes}
          visible={visibleAdd}
          onCancel={() => handleAddNote(false)}
          handleAdd={handleAdd}
        />
      )}
    </Dialog>
  );
};
export default List;
