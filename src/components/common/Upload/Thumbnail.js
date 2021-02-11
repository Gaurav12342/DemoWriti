import React, { useEffect, useState } from "react";
import { Download } from "../../../assets/images/resident-detail";
import { extensions } from "../../../components/common/Upload/Uploader"

const GetFilename = (url) => {
    if (url) {
        let p = url?.split('/').pop()
        return p
    }
    return "";
}

const Thumbnail = props => {
    const { path } = props
    const [imgPath, setImgPath] = useState('')
    const [ext, setExt] = useState('')

    useEffect(() => {
        let fileType = '.' + path.split('.').pop()
        const ext = extensions.IMAGE.includes(fileType)
        if (ext) {
        }
        else {
            setExt(fileType)
        }
    }, [path])

    return <>
        <a href={path} target="_blank" download className="upd_img">
            <div className="dwn_img">
                {
                    ext ? <div className="ext">{ext}</div> :
                        <img src={path} />
                }
                <div className="dwn_ico">
                    <Download />
                </div>
            </div>
            <p>
                {GetFilename(path)}
            </p>
        </a>
    </>
}
export default Thumbnail