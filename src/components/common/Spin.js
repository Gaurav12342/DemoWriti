import React, { useEffect, useState } from 'react';
import Spinner from 'rc-spinner'
import PropTypes from 'prop-types';

const Spin = ({ spinning, children, colorCode, str, strokeWidth, style }) => {
    const [loading, setLoading] = useState(true)

    const updateSpinning = () => {
        if (loading !== spinning) {
            console.log("updateSpinning -> spinning", spinning)
            setLoading(spinning);
        }
    };


    useEffect(() => {
        updateSpinning()
    }, [spinning])

    return <>
        {
            loading ?
                <div className={`spin_wrap ` + str} style={style}>
                    <Spinner color={colorCode} lineWidth={strokeWidth} height={25} />
                </div>
                : null
        }

    </>
}
export default Spin
Spin.defaultProps = {
    colorCode: '#609fae',
}
Spin.propTypes = {
    colorCode: PropTypes.string,
}