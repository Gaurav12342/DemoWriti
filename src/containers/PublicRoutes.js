import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import routes from "../routes/constant"
import Login from './UserAuth/Login'
import VerifyOtp from './UserAuth/otp'
import UnauthorizedPage from '../containers/UnauthorizedPage'
import Demo from '../UploadDemo'

const PublicRoutes = ({ match }) =>
    <>
        <Route path={routes.login.path} component={Login} />
        <Route path={routes.verifyOtp.path} component={VerifyOtp} />
        <Route path={routes.unAuthorizedPage} component={UnauthorizedPage} />
        <Route path={routes.demo} component={Demo} />
        {/* <Route path={`${match.url}login`} component={() => import('./Login')} /> */}
        {/* <Route path={`${match.url}verify-otp`} component={() => import('./otp')} /> */}
    </>
export default PublicRoutes