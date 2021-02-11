import React from 'react';
import { Call } from '../../assets/images/todo/index';

const Detail = ({ poaDetail }) => {
    return <div className="contact-info">
        <Call />
        <div className="history">
            <p>
                <span>POA Name</span>
                <span>:{poaDetail?.mergeLFName || '-'}</span>
            </p>
            <p>
                <span>Type</span>
                <span>:{poaDetail?.type || '-'}</span>
            </p>
            <p>
                <span>Cell</span>
                <span>:{poaDetail?.homePhone || '-'}</span>
                {/* <span>:(123) 123 123 123</span> */}
            </p>
            <p>
                <span>Email</span>
                <span>:{poaDetail?.email || '-'}</span>
            </p>
        </div>
    </div>
}
export default Detail
