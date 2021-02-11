export const IMAGING_DIAGNOSTIC_STATUS = {
    SUBMITTED: 1,
    SENT: 2,
    SCHEDULED: 3,
    DIAGNOSIS: 4,
    COMPLETED: 5,
    CANCELLED: 6,
    PARTIAL: 7,
    SCHEDULED:8
}
export const X_RAY_FORM_TYPE = {
    X_RAY: 1,
    MOBILE_ULTRASOUND: 2
}
export const IMAGING_RESULT_STATUS = {
    'D': 'Result Deleted',
    'F': 'Completed',
    'S': 'Partial Result',
    'X': 'Not obtained'
}

export const IMAGING_FORM_NAME = {
    [X_RAY_FORM_TYPE.X_RAY]: 'Mobile X-Ray',
    [X_RAY_FORM_TYPE.MOBILE_ULTRASOUND]: 'Mobile Ultrasound'
}
