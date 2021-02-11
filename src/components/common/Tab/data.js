import { MODULE } from '../../../constants/subscription';

export const TAB_KEYS = {
  OVERVIEW: 'overview',
  DIGITAL_BINDER: 'digitalbinder',
  ACTIONS: 'actions',
  TIMELINE: 'timeline',
  NOTES: 'notes',
  ORDERS: 'orders',
  PMR: 'pmr',
  E_PROCESSING: 'eprocessing',
  TODO: 'todo',
  VIRTUAL_VISIT: 'virtualvisit',
  X_RAY: 'xray',
  ARCHIVE: 'archive',
}

export const tabData = {
  tablist: [{
    tabtitle: 'O\'Laughlin, Craig',
    image: require('../../../assets/images/user.jpg'),
  },
  ],
  subTab: [
    {
      tabtitle: 'Overview',
      excludeRolePerm: true,
      tabKey: TAB_KEYS.OVERVIEW
    },
    {
      tabtitle: 'Digital Binder',
      module: MODULE.DIGITAL_BINDER,
      tabKey: TAB_KEYS.DIGITAL_BINDER
    },
    {
      tabtitle: 'Actions',
      module: 'ACTIONS',
      excludeRolePerm: true,
      tabKey: TAB_KEYS.ACTIONS
    },
    {
      tabtitle: 'Timeline',
      excludeRolePerm: true,
      tabKey: TAB_KEYS.TIMELINE
    },
    {
      tabtitle: 'Notes',
      excludeRolePerm: true,
      tabKey: TAB_KEYS.NOTES
    }
  ],
  resiTreat: [
    {
      tabtitle: 'Orders',
      records: 0,
      module: MODULE.RX_ORDER,
      tabKey: TAB_KEYS.ORDERS
    },
    {
      tabtitle: 'PMR',
      records: 0,
      module: MODULE.PMR,
      tabKey: TAB_KEYS.PMR
    },
    // {
    //   tabtitle: 'Admission/Re-Admission',
    //   records: 0,
    //   module: MODULE.ADMISSION_READMISSION
    // },
    {
      tabtitle: 'E-Processing',
      records: 0,
      module: MODULE.E_PROCESSING,
      tabKey: TAB_KEYS.E_PROCESSING
    },
    {
      tabtitle: 'To-Do',
      records: 0,
      module: MODULE.TODO,
      tabKey: TAB_KEYS.TODO
    },
    {
      tabtitle: 'Virtual Visit',
      records: 0,
      module: MODULE.VIRTUAL_VISIT,
      tabKey: TAB_KEYS.VIRTUAL_VISIT
    },
    {
      tabtitle: 'X-Ray',
      records: 0,
      module: MODULE.X_RAY_US,
      tabKey: TAB_KEYS.X_RAY
    },
    {
      tabtitle: 'Archive',
      records: 0,
      module: MODULE.ARCHIVED_DATA,
      tabKey: TAB_KEYS.ARCHIVE
    },
  ]
};