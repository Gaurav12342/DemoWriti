import React, { Suspense, lazy } from 'react';
import { Route } from 'react-router-dom';
import routes from './constant';
// import Login from '../containers/Login/index.js';

const Login = lazy(() => import('../containers/UserAuth/Login/index'));
const VerifyOtp = lazy(() => import('../containers/UserAuth/Otp/index'));
const Demo = lazy(() => import('../UploadDemo'));
const ForgotPassword = lazy(() => import('../containers/UserAuth/ForgotPassword'));
const PageNotFound = lazy(() => import('../containers/PageNotFound'));
const Demo1 = lazy(() => import('../Demo1'));
const UpdateDefaultPassword = lazy(() => import('../containers/UserAuth/UpdateDefaultPassword'))
const ResetPassword = lazy(() => import('../containers/UserAuth/ResetPassword/index'))
const UnauthorizedPage = lazy(() => import('../containers/UnauthorizedPage/index'))
const PublicRoutes = (props) => (
  <>
    <Suspense fallback={<div>Loading.....</div>}>
      <Route path={routes.login.path} component={Login} />
      <Route path={routes.verifyOtp.path} component={VerifyOtp} />
      <Route path={routes.forgotPassword.path} component={ForgotPassword} />
      <Route exact path={routes.pageNotFound.path} render={() => <PageNotFound showHeader={props.authUser ? true : false} />} />
      <Route path={routes.demo.path} component={Demo1} />
      <Route exact path={routes.updateDefaultPassword.path} component={UpdateDefaultPassword} />
      <Route exact path={routes.unAuthorizedPage.path} component={UnauthorizedPage} />
      <Route exact path={routes.resetPassword.path} component={ResetPassword} />
    </Suspense>
  </>
);

export default PublicRoutes;
