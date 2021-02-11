import React, { useState } from 'react'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'
import PropTypes from 'prop-types';

const LightBox = props => {
    const { visible, images, onCloseRequest, imageTitle } = props
    // console.log("images", images)
    // console.log("props.curImg", props.curImg)
    const [curImg, setCurImg] = useState(props.curImg)
    const mainSrc = images[curImg].src
    const nextSrc = images[(curImg + 1) % images.length].src
    const prevSrc = images[(curImg + images.length - 1) % images.length].src

    const onMovePrevRequest = () => { setCurImg((curImg + images.length - 1) % images.length) }
    const onMoveNextRequest = () => { setCurImg((curImg + 1) % images.length) }

    const getImageTitle = () => {
        if (imageTitle?.caption) {
            return <div>
                <div style={{ float: "left" }}>
                    {images[curImg]?.caption}
                </div>
            </div>
        }
    }

    const lightBoxProps = {
        mainSrc, imageTitle: getImageTitle(), nextSrc, prevSrc,
        onCloseRequest, onMovePrevRequest, onMoveNextRequest
    }

    return <> {
        visible && images && images.length ?
            <Lightbox
                {...lightBoxProps}
            /> : null}
    </>
}
LightBox.defaultProps = { curImg: 0, visible: false };
LightBox.propTypes = {
    curImg: PropTypes.number,
    visible: PropTypes.bool,
    images: PropTypes.array
}
export default LightBox