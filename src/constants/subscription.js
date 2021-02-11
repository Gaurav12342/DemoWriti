import routes from '../routes/constant'
export const
    MODULE = {
        USER: 1,
        PHARMACY: 2,
        'IMAGING_DIAGNOSIS': 3,
        ORG_HOME: 4,
        HOMEAREA: 5,
        ROLE_BASE_ACCESS_PERMISSION: 6,
        RESIDENT: 7,
        RESIDENT_DOCUMENT: 8,
        DIGITAL_BINDER: 9,
        ARCHIVED_DATA: 10,
        TODO: 11,
        RX_ORDER: 12,
        E_PROCESSING: 13,
        PMR: 14,
        X_RAY_US: 15,
        VIRTUAL_VISIT: 16,
        ADMISSION_READMISSION: 17,
        SUBSCRIPTION_GROUP: 18,
        SUBSCRIPTION_ROLE_GROUP: 19,
        MASTER: 20,
        DESIGNATION_MASTER: 21,
        USER_ACCESS_PERMISSION: 22,
        FEEDBACK: 23,
        SUPPORT: 24,
        PCC_DATA: 25,
        PCC_LOGS: 26,
        PCC_FACILITY: 27,
        ACTIVITY_LOG: 28,
    },
    SUB_MODULE = {
        PHARMACY_SETTING: 51,
        'IMAGING_DIAGNOSIS_SETTING': 52,
        ORG_HOME_SETTING: 53,
        HOMEAREA_SETTING: 54,
        RX_ORDER_TODO: 55,
        PMR_GROUP: 56,
        PMR_TODO: 57,
        X_RAY_US_TODO: 58,
        PMR_ORDER: 59,
        KROLL_RESIDENT: 60,
        KROLL_LOGS: 61,
        QUEUE: 62,
        REQUEST_LOGS: 63,
        SERIES_GENERATE: 64,
        SETTING: 65,
        X_RAY_BODY_PART_DETAILS: 66,
        GROUP_PERMISSION: 67,
        ROLE_ACCESS_PERMISSION: 68,
        USER_INTERFACE: 69,
        X_RAY_RESPONSE: 70,
        X_RAY_LOG: 71,
        PRESCRIPTION_MEDICATION: 72,
        DRUG: 73,
        USER_FAVOURITE_DRUG: 74
    },
    ACTIONS = {
        LIST: { LABEL: 'List', CODE: 'LIST' },
        ADD: { LABEL: 'Add', CODE: 'ADD' },
        EDIT: { LABEL: 'Edit', CODE: 'EDIT' },
        DELETE: { LABEL: 'Delete', CODE: 'DELETE' },
        DOWNLOAD: { LABEL: 'Download', CODE: 'DOWNLOAD' },
        UPLOAD: { LABEL: 'Upload', CODE: 'UPLOAD' },
        TRANSFER: { LABEL: 'Transfer', CODE: 'TRANSFER' },
        UNDO: { LABEL: 'Undo', CODE: 'UNDO' },
        YES_NA: { LABEL: 'Yes/NA', CODE: 'YES_NA' },
        CANCEL: { LABEL: 'Cancel', CODE: 'CANCEL' },
        CONSENT_OBTAINED: { LABEL: 'Consent Obtained', CODE: 'CONSENT_OBTAINED' },
        E_BOX_USED: { LABEL: 'E-Box Used', CODE: 'E_BOX_USED' },
        CARE_PLAN: { LABEL: 'Care Plan', CODE: 'CARE_PLAN' },
        CHANGE_STICKER: { LABEL: 'Change Sticker', CODE: 'CHANGE_STICKER' },
        FIRST_CHECK: { LABEL: '1st eMAR/eTAR', CODE: 'FIRST_CHECK' },
        X_RAY_DIET: { LABEL: 'X-Ray Diet Lab Req', CODE: 'X_RAY_DIET' },
        SECOND_CHECK: { LABEL: '2nd eMAR/eTAR', CODE: 'SECOND_CHECK' },
        VERBAL_ORDER: { LABEL: 'Verbal Order', CODE: 'VERBAL_ORDER' },
        NURSE_PREP1: { LABEL: 'Nurse Prep1', CODE: 'NURSE_PREP1' },
        NURSE_PREP2: { LABEL: 'Nurse Prep2', CODE: 'NURSE_PREP2' },
        PMR: { LABEL: 'PMR', CODE: 'PMR' },
        PHARMACY_COMMENT: { LABEL: 'Pharmacy comment', CODE: 'PHARMACY_COMMENT' },
        DRUG_RECORD: { LABEL: 'Drug Record', CODE: 'DRUG_RECORD' },
        X_RAY: { LABEL: 'X-Ray', CODE: 'X_RAY' },
        MOVE: { LABEL: 'Move', CODE: 'MOVE' },
    },
    PERMISSION_ACCESS_TYPE = {
        DATA: 1,
        DO_NOT_HAVE_PERMISSION_TO_VIEW_THIS_PAGE: 2
    },
    TODOS = [SUB_MODULE.RX_ORDER_TODO, SUB_MODULE.PMR_TODO, SUB_MODULE.X_RAY_US_TODO]