export const PMR_SCHEDULE_GROUP_FREQUENCY = {
  MONTHLY: 1,
  QUARTERLY: 2,
  SEMI_ANNUAL: 3,
  YEARLY: 4,
};

export const JOB_QUEUE = {
  STATUS: {
    IN_QUEUE: 1,
    PROCESSING: 2,
    FINISHED: 3,
    FAILED: 4,
    ON_HOLD: 5,
  },
};

export const MED_REVIEW_TODO_TYPES = {
  CONSENT_OBTAINED: 22,
  FIRST_CHECK: 23,
  SECOND_CHECK: 24,
  E_BOX_USED: 25,
  DRUG_RECORD: 26,
  CARE_PLAN: 27,
  X_RAY_DIET: 28,
  CHANGE_STICKER: 29,
  PMR: 19,
  NURSE_REVIEW_1: 20,
  NURSE_REVIEW_2: 21,
  GENERAL: 30,
  MEDS_CHECK: 31,
};

export const PMR_REMINDER = {
  ONE_TIME: 1,
  REPEAT: 2,
};

export const PMR_REMINDER_CATEGORIES = [
  { name: 'a', id: 1 },
  { name: 'b', id: 2 },
];

export const PMR_REMINDER_TYPES = [
  { name: 'a', id: 1 },
  { name: 'b', id: 2 },
];

export const PMR_ORDER_TYPE = {
  ROUTINE: 1,
  PRN: 2,
  NON_DRUG: 3,
  STANDING_ORDER: 4,
  LAB_WORK: 5,
  DIET: 6
};

export const PMR_ORDER = {
  STATUS: {
    CONTINUE: 1,
    DISCONTINUE: 2,
    HOLD: 3,
    NURSE_ACKNOWLEDGED_1: 4,
    NURSE_ACKNOWLEDGED_2: 5,
    SUSPENDED: 6,
  },
  SUB_ACTION: {
    DISCONTINUE: 1,
    EDIT: 2,
    DISCONTINUE_AND_CREATE_NEW: 3,
  },
};

export const PMR_ORDER_LABEL = {
  NEW: 1,
  CHANGED: 2,
  NEW_EDIT: 3,
};
export const PMR_PROCESS_TYPE = {
  INITIATED: 1,
  COMPLETED: 2,
};
export const PMR_STATUS = {
  SUBMITTED: 1,
  REVIEW: 2,
  COMPLETED: 3,
  DECEASED: 4,
  DISCHARGED: 5,
};
export const PMR_ORDER_COLOR = {
  TAG: {
    NEW: '#009F30',
    CHANGED: '#9d8e0c',
    NEW_EDIT: '#5C8EFF',
    SUSPENDED: '#FF5C5D',

    DISCONTINUE: '#FF5C5D',
    CONTINUE: '#009688',
    HOLD: '#800000',
  },
  BGCOLOR: {
    CONTINUE: '#D9F0E2',
    HOLD: '#FCFFE3',
    ALERT: '#EBBABC',
  },
  TAG_CLASS: {
    NEW: 'red-new-tag',
    CHANGED: 'red-tag',
    NEW_EDIT: 'pink-tag',
    SUSPENDED: 'red-tag',
    DISCONTINUE: 'red-tag',
    CONTINUE: 'green-tag',
    HOLD: 'blue-tag',
  }
};

export const PMR_REMINDER_GROUP = {
  SELF: 1,
  NURSE: 2,
  DOCTOR: 3,
  ALL: 4,
};
export const MED_REVIEW_NAME = {
  CONSENT_OBTAINED: 'CONSENT',
  FIRST_CHECK: '1st_eMAR/eTAR',
  SECOND_CHECK: '2nd_eMAR/eTAR',
  E_BOX_USED: 'E_BOX_USED',
  DRUG_RECORD: 'DRUG_RECORD',
  CARE_PLAN: 'CARE_PLAN',
  X_RAY_DIET: 'X_RAY_DIET',
  CHANGE_STICKER: 'CHANGE_STICKER',
  PMR: 'PHYSICIAN_REVIEW',
  NURSE_REVIEW_1: 'NURSE_PREP_1',
  NURSE_REVIEW_2: 'NURSE_PREP_2',
  GENERAL: 'GENERAL',
  VERBAL_ORDER: 'VERBAL_ORDER',
  MEDS_CHECK: 'MEDS_CHECK',
};

export const KROLL_ORDER_STATUS = {
  ACTIVE: 1,
  SUSPENDED: 2
}

export const KROLL_ORDER_TYPE = {
  PMR: 1,
  STANDING: 2
};

