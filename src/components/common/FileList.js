import React from 'react'
import { ReactComponent as Attach } from '../../assets/images/chat/attach.svg'
import { ReactComponent as Close } from '../../assets/images/resident-detail/cancel.svg'
function FileList(props) {
    const { fileList, handleRemove } = props
    return <div className="upl_files_wrap">
        {
            fileList.map(file =>
                <div>
                    {/* <Spinner color="#609FAE" height="25px" lineWidth="2" className="file_spin"></Spinner> */}
                    <Attach />
                    <span>{file.name}</span>
                    <Close className="upd_file" onClick={() => handleRemove(file)} />
                </div>
            )
        }
    </div>
}
export default FileList