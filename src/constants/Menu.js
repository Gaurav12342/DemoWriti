import routes from '../routes/constant';
import { USER_TYPE } from './User';
export const MENU = [
  {
    name: 'User Management',
    id: 1,
    visibilty: true,
    children: [
      {
        path: routes.userAdmin.path,
        componentName: 'User',
        id: routes.userAdmin.id,
        // module: routes.userAdmin.module,
        // onlySuperAdmin:true,
        name: 'WRITI Admin',
      },
      {
        path: routes.userPharmacy.path,
        id: routes.userPharmacy.id,
        module: routes.userPharmacy.module,
        name: 'Pharmacy',
      },
      {
        path: routes.userOrganization.path,
        id: routes.userOrganization.id,
        module: routes.userOrganization.module,
        name: 'Organization',
      },
      {
        path: routes.userHome.path,
        id: routes.userHome.id,
        module: routes.userHome.module,
        name: 'Home',
      },

      // {
      //   path: routes.userHomeArea.path,
      //   id: routes.userHomeArea.id,
      //   name: 'Home Area',
      // },
    ],
  },
  {
    componentName: 'Resident',
    name: 'Resident',
    visibilty: true,
    children: [
      {
        module: routes.viewResident.module,
        path: routes.viewResident.path,
        componentName: 'User',
        id: 21,
        name: 'Management',
      },
      {
        module: routes.residentDocument.module,
        path: routes.residentDocument.path,
        componentName: 'ResidentDocument',
        id: 22,
        name: 'Document',
      },
    ],
  },
  {
    name: 'Customer',
    id: 3,
    visibilty: true,
    excludePharHomeAdmin: true,
    children: [
      {
        componentName: 'Pharmacy',
        id: 31,
        name: 'Pharmacy',
        module: routes.pharmacy.module,
        path: routes.pharmacy.path,
      },
      {
        componentName: 'Imaging & Diagnostic',
        id: 32,
        name: 'Imaging & Diagnostic',
        path: routes.imagingDiagnostics.path,
        module: routes.imagingDiagnostics.module
      },
      {
        componentName: 'Organization',
        id: 33,
        name: 'Organization',
        // path : `${routes.clientele.path}`
        path: `${routes.clientele.path}?type=organization`,
        module: routes.clientele.module
      },
      {
        componentName: 'Home',
        id: 34,
        name: 'Home',
        // path : `${routes.clientele.path}`
        path: `${routes.clientele.path}?type=home`,
        module: routes.clientele.module
      },
      {
        componentName: 'Home Area',
        id: 35,
        name: 'Home Area',
        path: `${routes.clientele.path}?type=homeArea`,
        // path: `${routes.clientele.path}`,
      },
      {
        componentName: 'Pharmacy Upsert',
        id: routes.pharmacyUpsert.id,
        name: 'Pharmacy Upsert',
        path: routes.pharmacyUpsert.path,
        module: routes.pharmacyUpsert.module,
        isPublic: false,
      },
      {
        componentName: 'Imaiging & Dianostics Upsert',
        id: routes.imagingUpsert.id,
        name: 'Imaiging & Dianostics Upsert',
        path: routes.imagingUpsert.path,
        module: routes.imagingUpsert.module,
        isPublic: false,
      },
      {
        componentName: 'PCC',
        name: 'PointClickCare',
        path: routes.pcc.path,
        showDefault: true,
      },
    ],
  },
  {
    name: 'Setup',
    id: 4,
    visibilty: false,
    children: [
      {
        path: '/wa/setup/printer',
        componentName: 'Printer',
        id: 41,
        name: 'Printer',
      },
      {
        path: '/wa/setup/pen',
        componentName: 'Pen',
        id: 42,
        name: 'Pen',
      },
      {
        path: '/wa/setup/device',
        componentName: 'Device',
        id: 43,
        name: 'Device',
      },
      {
        path: '/wa/setup/version-apk',
        componentName: 'version',
        id: 44,
        name: 'Version',
      },
      {
        path: '/wa/permission-group',
        componentName: 'PermissionGroup',
        id: 48,
        name: 'Permission Group',
      },
      // {
      //   path: '/wa/assign-doctor',
      //   componentName: 'AssignDoctor',
      //   id: 45,
      //   name: 'Assign Physician/Nurse'
      // }
    ],
  },
  {
    name: 'NCode',
    id: 5,
    visibilty: false,
    children: [
      {
        path: '/wa/ncodepage-request',
        componentName: 'NCodePageRequest',
        id: 51,
        name: 'Page Request',
      },
      {
        path: '/wa/ncodenumber',
        componentName: 'NCodeNumber',
        id: 52,
        name: 'Numbers',
      },
    ],
  },
  {
    name: 'Rx Orders',
    id: 6,
    visibilty: false,
    children: [
      {
        path: '/wa/orders?type=order',
        componentName: 'PrescribedForm',
        id: 61,
        name: 'Rx Orders',
      },
      {
        path: '/wa/orders?type=draft',
        componentName: 'PrescribedForm',
        id: 61,
        name: 'Drafts',
      },
      {
        path: '/wa/printed-orders/prescription?type=prescription',
        componentName: 'PrintedOrder',
        id: 62,
        name: 'Printed Orders',
      },
    ],
  },
  {
    path: '/wa/forms',
    componentName: 'PrescriptionForm',
    id: 7,
    name: 'Forms',
    visibilty: false,
  },
  {
    id: 8,
    name: 'Master',
    visibilty: true,
    path: routes.master.path,
    componentName: 'Master',
    module: routes.master.module,
    children: [
      // {
      //   path: routes.master.path,
      //   componentName: 'Master',
      //   id: 81,
      //   name: 'Master',
      // },
      /* {
              path: '/wa/indication',
              componentName: 'Indication',
              id: 82,
              name: 'Indication',
              
            },
            {
              path: '/wa/master-admission-Order-Record',
              id: 83,
              componentName: 'MasterAdmissionOrderRecord',
              name: 'Admission Order Record',
              
            } */
    ],
  },
  {
    id: 9,
    name: 'Settings',
    visibilty: true,
    showDefault: true,
    children: [
      {
        path: routes.subscription.path,
        id: 91,
        showDefault: true,
        // module: routes.rolePermission.module, donot add module key for super admin
        name: 'Subscription',
        excludePharHomeAdmin: true
      },
      {
        path: routes.rolePermission.path,
        id: 92,
        module: routes.rolePermission.module,
        name: 'Role Based Access Permission',
        excludeGenAdmin: true,
      },
      {
        path: routes.version,
        id: 93,
        name: 'Version',
        showDefault: true,
        // module: routes.rolePermission.module,
      },
    ],
  },
  {
    path: routes.todoDashboard.path,
    componentName: 'Todo',
    id: 10,
    module: routes.todoDashboard.module,
    name: 'ToDo Management',
    visibilty: true,
    // excludeGenAdmin: true,
    // excludePharHomeAdmin: true
  },
  {
    name: 'PMR',
    id: 20,
    componentName: 'Pmr',
    visibilty: true,
    showDefault: false,
    excludeGenAdmin: true,
    path: routes.pmr.path,
    children: [
      {
        path: routes.pmrGroup.path,
        componentName: 'PmrScheduleGroup',
        id: 201,
        name: 'Schedule/Group',
        module: routes.pmrGroup.module,
        subModule: routes.pmrGroup.subModule,
        showDefault: false,
      },
      // {
      //     path: "/wa/pmr-report",
      //     componentName: "PmrReport",
      //     id: 203,
      //     name: "PMR Report",
      // },
      // {
      //     path: "/wa/pmr-reminder",
      //     componentName: "PmrReminders",
      //     id: 204,
      //     name: "PMR Reminders",
      // },
      // {
      //     path: "/wa/printed-orders/pmr?type=pmr",
      //     componentName: "PrintedOrder",
      //     id: 205,
      //     name: "PMR Prints",
      // },
    ],
  },
  {
    name: 'Change Log',
    id: 71,
    visibilty: false,
    children: [
      {
        path: '/wa/change-log',
        componentName: 'ChangeLog',
        id: 711,
        name: 'ChangeLog List',
      },
    ],
  },
  {
    name: 'TODO Preference',
    id: 35,
    visibilty: false,
    excludeGenAdmin: true,
    children: [
      {
        path: '/wa/preference/pmr?type=pmr',
        componentName: 'PmrPreference',
        id: 350,
        name: 'PMR',
      },
      {
        path: '/wa/preference?type=ar',
        componentName: 'PmrPreference',
        id: 351,
        name: 'Admission & Re-Admission',
      },
    ],
  },
  /* {
     name: "Admission/Re-admission",
     id: 22,
    
     children: [
       {
         path: '/wa/admission-readmission',
         componentName: 'AdmissionReadmission',
         id: 221,
         name: 'Admission & Re-Admission Report',
         
       },
       {
         path: '/wa/printed-orders/ar?type=ar',
         componentName: 'PrintedOrder',
         id: 222,
         name: 'AR Prints',
         
       },
     ]
   }, */
  {
    name: 'Virtual Healthcare',
    id: 47,
    visibilty: true,
    excludeGenAdmin: true,
    excludePharHomeAdmin: true,
    children: [
      {
        path: '/wa/virtual-visit',
        componentName: 'VirtualVisit',
        id: 471,
        name: 'Visits',
        module: routes.virtualvisitrequest.module,
        path: routes.virtualvisitrequest.path,
      },
      {
        path: '/wa/billing-report',
        componentName: 'VirtualVisit',
        id: 472,
        name: 'Billing Report',
        module: routes.virtualvisitrequest.module,
      },
    ],
  },
  {
    name: 'X-Ray - U/S',
    id: 16,
    visibilty: true,
    module: routes.xRayList.module,
    children: [
      {
        path: routes.xRayList.path,
        componentName: 'XRayReqList',
        id: routes.xRayList.id,
        module: routes.xRayList.module,
        name: 'X-Ray - U/S Request List',
      },
      {
        path: routes.xRayRequest.path,
        componentName: 'XRayReq',
        id: routes.xRayRequest.id,
        module: routes.xRayRequest.module,
        name: 'X-Ray - U/S Request Detail',
        isPublic: false
      },
    ],
  },
  // {
  //   path: routes.chat.path,
  //   componentName: 'Chat',
  //   id: 72,
  //   name: 'Chat',
  //   visibilty: true,
  // },
  // {
  //   path: routes.notification.path,
  //   componentName: 'Notification',
  //   id: 73,
  //   name: 'Notification',
  //   visibilty: true,
  // },
  // {
  //     path: routes.xRayList.path,
  //     componentName: 'XRayReqList',
  //     id: 161,
  //     name: 'X Ray Request List',
  //     visibilty: true,
  // },
  {
    path: '/wa/todo-detail',
    id: 30,
    visibilty: false,
  },
  {
    path: 'wa/pmr-todo',
    id: 49,
    visibilty: false,
  },
  {
    path: 'wa/pmr',
    id: 50,
    visibilty: false,
  },
  {
    path: 'wa/admission-readmission-order',
    id: 53,
    visibilty: false,
  },
  {
    path: 'wa/admission-readmission-todo',
    id: 54,
    visibilty: false,
  },
  {
    path: '/wa/plotting-logs',
    id: 40,
    name: 'Plotting Logs',
    visibilty: false,
  },
];
