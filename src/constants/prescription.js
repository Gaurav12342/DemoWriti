import { Etar, Consent, Emar, VerbalOrder, Ebox, DrugRecord, CarePlan, Xray, ChangeSticker } from '../assets/images/resident-detail/todo/index';

export const
    TODO_STATUS = {
        SUBMITTED: 1,
        COMPLETED: 2,
        CANCELLED: 3,
        UNDO: 4
    },
    TODO_TYPES = {
        CONSENT_OBTAINED: { id: 1, name: 'Consent' },
        FIRST_CHECK: { id: 2, name: '1st_eMAR/eTAR' },
        SECOND_CHECK: { id: 3, name: '2nd_eMAR/eTAR' },
        VERBAL_ORDER: { id: 4, name: 'Consent' },
        E_BOX_USED: { id: 14, name: 'E-Box Used' },
        DRUG_RECORD: { id: 15, name: 'Drug Record' },
        CARE_PLAN: { id: 16, name: 'Care Plan' },
        X_RAY_DIET: { id: 17, name: 'X-Ray Diet Lab Request' },
        CHANGE_STICKER: { id: 18, name: 'Change Sticker' }
    },
    VOA_STATUS = {
        NOT_AVAILABLE: 1,
        PENDING: 2,
        CONFIRMED: 3
    },
    DEVICE_VIEW = {
        PENDING: 1,
        PRIMARY: 4,
        SECONDARY: 5,
        HISTORY: 2,
        OBTAINED_BY_YOU: 3,
    },
    TODO_ICONS = {
        [TODO_TYPES['CONSENT_OBTAINED'].id]: { component: Consent, className: 'consent' },
        [TODO_TYPES['FIRST_CHECK'].id]: { component: Emar, className: 'emar' },
        [TODO_TYPES['SECOND_CHECK'].id]: { component: Emar, className: 'emar' },
        [TODO_TYPES['VERBAL_ORDER'].id]: { component: VerbalOrder, className: 'vo' },
        [TODO_TYPES['E_BOX_USED'].id]: { component: Ebox, className: 'ebox' },
        [TODO_TYPES['DRUG_RECORD'].id]: { component: DrugRecord, className: 'dr' },
        [TODO_TYPES['CARE_PLAN'].id]: { component: CarePlan, className: 'cp' },
        [TODO_TYPES['X_RAY_DIET'].id]: { component: Xray, className: 'xray' },
        [TODO_TYPES['CHANGE_STICKER'].id]: { component: ChangeSticker, className: 'cs' },
    },
    ORDER_TYPE = {
        ROUTINE: 1,
        PRN: 2,
        NON_DRUG: 3,
        STANDING_ORDER: 4,
        LAB_WORK: 5,
        DIET: 6
    },
    TYPE = {
        FTT: 1,
        COE: 2,
        BOTH: 3, // FTT + COE
        THIRD_PARTY: 4,
        HISTORY: 5,
    },
    STATUS = {
        SUBMITTED: 1,
        EDITED: 2,
        CONFIRMED: 3,
        CANCELLED: 4,
        DISCARDED: 5,
        DRAFT: 6
    },
    RX_TYPE = {
        PRESCRIPTION: 1,
        THIRD_PARTY: 2,
        HISTORY: 3
    },
    STATUS_CLASSNAME = {
        [STATUS.SUBMITTED]: 'submitted',
        [STATUS.EDITED]: 'edited',
        [STATUS.CONFIRMED]: 'in_process',
        [STATUS.CANCELLED]: 'in_process',
        [STATUS.DISCARDED]: 'in_process',
        [STATUS.DRAFT]: 'in_process',
    },
    ORDER_TYPE_CLASSNAME = {
        [ORDER_TYPE.ROUTINE]: 'non_drug',
        [ORDER_TYPE.PRN]: 'prn',
        [ORDER_TYPE.NON_DRUG]: 'non_drug',
        [ORDER_TYPE.STANDING_ORDER]: 'std_order',
        [ORDER_TYPE.LAB_WORK]: 'non_drug',
        [ORDER_TYPE.DIET]: 'non_drug',
    },
    MODIFY_ACTION = {
        EDIT: 1,
        CANCEL: 2
    };
