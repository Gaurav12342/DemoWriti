import React from 'react'
import Header from '../../components/Header'
import PageNotFoundUI from './PageNotFoundUI'
function PageNotFound({ showHeader }) {
    return (<>
        {showHeader ? {/* <Header /> */} : null}
        <div className="container">
            <div className="prep_wrap">
                <PageNotFoundUI />
            </div>
        </div>
    </>);
}

export default PageNotFound