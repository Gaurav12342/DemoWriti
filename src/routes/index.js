import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Feedback from '../containers/Feedback';
import PccLog from '../containers/PccLog';
import routes from '../routes/constant';
const USER_PATHS = 'writi-admin|pharmacy|organizations|home|home-area';
const Pmr = lazy(() => import('../containers/Pmr'));
const VirtualVisitRequest = lazy(() =>
  import('../containers/VirtualVisitRequest')
);
const Notification = lazy(() => import('../containers/Notification'));
const Chat = lazy(() => import('../containers/Chat'));
const TodoDashboard = lazy(() => import('../containers/TodoDashboard'));
const Todo = lazy(() => import('../containers/PrescriptionTodo'));
const Resident = lazy(() => import('../containers/ResidentDetail'));
const ResidentCopy = lazy(() => import('../containers/ResidentDetailCopy'));
const PhysicianReview = lazy(() => import('../containers/PhysicianReview'));
const NursePrep = lazy(() => import('../containers/NursePrep'));
const AddPmr = lazy(() => import('../containers/AddPmr'));
const PageNotFound = lazy(() => import('../containers/PageNotFound'));
const UnauthorizedPage = lazy(() => import('../containers/UnauthorizedPage'));
const Master = lazy(() => import('../containers/Master/index'));
const SubMaster = lazy(() => import('../containers/Master/SubMaster/index'));
const Profile = lazy(() => import('../containers/Profile/index'));
const Xray = lazy(() => import('../containers/Xray/index'));
const MobileXRay = lazy(() => import('../containers/Xray/View/index'));
const Permission = lazy(() => import('../containers/Permission'));
const PermissionList = lazy(() => import('../containers/Permission/indexcopy'));
const SubscriptionUpsert = lazy(() =>
  import('../containers/SubscriptionUpsert')
);
const Pharmacy = lazy(() => import('../containers/Customers/Pharmacy/index'));
const AddUser = lazy(() =>
  import('../containers/User/Components/AddUser/index')
);
const VersionList = lazy(() => import('../containers/Version/index'));

const ImagingDiagnostics = lazy(() =>
  import('../containers/Customers/ImagingDiagnostics/index')
);
const imagingUpsert = lazy(() =>
  import('../containers/Customers/ImagingDiagnostics/components/ImagingTabs')
);
const pharmacyUpsert = lazy(() =>
  import('../containers/Customers/Pharmacy/components/PharmacyTabs')
);
const ClienteleTabs = lazy(() =>
  import('../containers/Customers/Clientele/components/ClienteleTabs')
);

const Clientele = lazy(() =>
  import('../../src/containers/Customers/Clientele/index')
);
const ClienteleUpsert = lazy(() =>
  import('../../src/containers/Customers/Clientele/components/ClienteleTabs')
);
const UserModule = lazy(() => import('../containers/User/index'));
const PmrGroup = lazy(() => import('../containers/PmrGroup'));
const Pcc = lazy(() => import('../containers/PCC/index'));
const ResidentDocument = lazy(() =>
  import('../containers/ResidentDocument/index')
);
const PmrTodo = lazy(() => import('../containers/PmrTodo/index'));
const MedReviewTodo = lazy(() => import('../containers/MedReviewTodo/index'));

const SupportFeedback = lazy(() => import('../containers/Support/index'));
const App = () => {
  return (
    <Switch>
      <Suspense fallback={<div>Loading.......</div>}>
        <Route exact path={routes.pmr.path} component={Pmr} />
        <Route exact path={routes.viewResident.path} component={Resident} />
        <Route exact path={routes.residents.path} component={ResidentCopy} />
        <Route
          exact
          path={routes.residentDocument.path}
          component={ResidentDocument}
        />
        <Route
          exact
          path={routes.physicianReview.path}
          component={PhysicianReview}
        />
        <Route exact path={routes.addPmr.path} component={AddPmr} />
        <Route exact path={routes.nursePrep.path} component={NursePrep} />
        <Route exact path={routes.notification.path} component={Notification} />
        <Route
          exact
          path={routes.virtualvisitrequest.path}
          component={VirtualVisitRequest}
        />
        <Route exact path={routes.chat.path} component={Chat} />
        <Route exact path={routes.todo.path} component={Todo} />
        <Route exact path={routes.todoDashboard.path} component={TodoDashboard} />
        {/* <Route exact path={routes.pageNotFound.path} component={PageNotFound} /> */}
        <Route
          exact
          path={routes.unAuthorizedPage.path}
          component={UnauthorizedPage}
        />
        <Route exact path={routes.master.path} component={Master} />
        <Route exact path={routes.submaster.path} component={SubMaster} />
        <Route exact path={routes.profile} component={Profile} />
        <Route exact path={routes.xRayList.path} component={Xray} />
        <Route exact path={routes.version} component={VersionList} />
        <Route exact path={routes.xRayRequest.path} component={MobileXRay} />
        <Route exact path={routes.permission} component={PermissionList} />
        <Route
          exact
          path={routes.subscription.path}
          component={SubscriptionUpsert}
        />
        <Route exact path={routes.rolePermission.path} component={Permission} />
        {/* <Route exact path={routes.xrayUltrasound} component={MobileXRayUltrasound} /> */}
        <Route exact path={routes.pharmacy.path} component={Pharmacy} />
        {/* <Route exact path={routes.pharmacy.path} component={Pharmacy} /> */}
        <Route
          exact
          path={`${routes.pharmacyUpsert.path}`}
          component={pharmacyUpsert}
        />
        <Route
          exact
          path={`${routes.pharmacyUpsert.path}/:id`}
          component={pharmacyUpsert}
        />

        <Route
          exact
          path={routes.imagingDiagnostics.path}
          component={ImagingDiagnostics}
        />
        <Route
          exact
          path={routes.imagingUpsert.path}
          component={imagingUpsert}
        />

        <Route
          exact
          path={`${routes.imagingUpsert.path}/:id`}
          component={imagingUpsert}
        />

        <Route exact path={routes.clientele.path} component={Clientele} />
        <Route
          exact
          path={routes.clienteleUpsert.path}
          component={ClienteleUpsert}
        />
        {/* <Route path={routes.organizationTab.path} component={OrganizationTabs}/> */}

        <Route
          exact
          path={routes.userAdd.path}
          // path='/user-t/upsert'
          component={AddUser}
        />
        <Route exact path={routes.userGeneral.path} component={UserModule} />

        <Route exact path={routes.pmrGroup.path} component={PmrGroup} />

        <Route exact path={routes.pcc.path} component={Pcc} />

        <Route
          exact
          path={routes.supportFeedback.path}
          component={SupportFeedback}
        />
        <Route
          exact
          path={routes.pccLog.path}
          component={PccLog}
        />
        <Route exact
          path={routes.feedback.path}
          component={Feedback} />

        <Route exact
          path={routes.pmrTodo.path}
          component={PmrTodo} />

        <Route exact
          path={routes.medReviewTodo.path}
          component={MedReviewTodo} />

        {/* <Route
          exact
          path={routes.xrayUltrasound}
          component={MobileXRayUltrasound}
        /> */}
      </Suspense>
    </Switch>
  );
};
export default App;
