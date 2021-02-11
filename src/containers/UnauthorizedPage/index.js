import React from 'react'
import Header from '../../components/Header'
import UnAuthorizedPage from './unAuthorizedPage'
function PageNotFound() {
    return (<>
        {/* <Header /> */}
        <div className="container">
            <div className="prep_wrap">
                <UnAuthorizedPage />
            </div>
        </div>
    </>);
}
export default PageNotFound
