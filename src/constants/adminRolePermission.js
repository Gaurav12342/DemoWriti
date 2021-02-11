import { MODULE, SUB_MODULE, ACTIONS } from './subscription'
import { SUB_CATEGORY } from './todo'

const { LIST, ADD, EDIT, DELETE, DOWNLOAD, UPLOAD, TRANSFER, UNDO, YES_NA, CANCEL, CONSENT_OBTAINED,
    E_BOX_USED, CHANGE_STICKER, X_RAY_DIET, FIRST_CHECK, SECOND_CHECK, VERBAL_ORDER,
    NURSE_PREP1, RX_ORDER_TODO, DRUG_RECORD, CARE_PLAN, PMR_TODO, NURSE_PREP2, PMR,
    X_RAY, PHARMACY_COMMENT, MOVE } = ACTIONS

export default [{
    "module": MODULE.USER,
    "moduleName": "User",
    isSelect: true,
    "actions": [{
        "label": LIST.LABEL,
        "code": LIST.CODE,
        isSelect: true
    }, {
        "label": ADD.LABEL,
        "code": ADD.CODE,
        isSelect: true
    }, {
        "label": EDIT.LABEL,
        "code": EDIT.CODE,
        isSelect: true
    }, {
        "label": DELETE.LABEL,
        "code": DELETE.CODE,
        isSelect: true
    }, {
        "label": UPLOAD.LABEL,
        "code": UPLOAD.CODE,
        isSelect: true
    }, {
        "label": DOWNLOAD.LABEL,
        "code": DOWNLOAD.CODE,
        isSelect: true
    }]
}, {
    "module": MODULE.PHARMACY,
    "moduleName": "Pharmacy",
    isSelect: true,
    "actions": [{
        "label": LIST.LABEL,
        "code": LIST.CODE,
        isSelect: true
    }, {
        "label": ADD.LABEL,
        "code": ADD.CODE,
        isSelect: true
    }, {
        "label": EDIT.LABEL,
        "code": EDIT.CODE,
        isSelect: true
    }, {
        "label": DELETE.LABEL,
        "code": DELETE.CODE,
        isSelect: true
    }],
    "subModules": [{
        "subModule": SUB_MODULE.PHARMACY_SETTING,
        "subModuleName": "Setting",
        isSelect: true,
        "actions": [{
            "label": ADD.LABEL,
            "code": ADD.CODE,
            isSelect: true
        }, {
            "label": EDIT.LABEL,
            "code": EDIT.CODE,
            isSelect: true
        }]
    }]
}, {
    "module": MODULE['IMAGING_DIAGNOSIS'],
    "moduleName": "Imaging & Diagnostic",
    isSelect: true,
    "actions": [{
        "label": LIST.LABEL,
        "code": LIST.CODE,
        isSelect: true
    }, {
        "label": ADD.LABEL,
        "code": ADD.CODE,
        isSelect: true
    }, {
        "label": EDIT.LABEL,
        "code": EDIT.CODE,
        isSelect: true
    }, {
        "label": DELETE.LABEL,
        "code": DELETE.CODE,
        isSelect: true
    }],
    "subModules": [{
        "subModule": SUB_MODULE['IMAGING_DIAGNOSIS_SETTING'],
        "subModuleName": "Setting",
        isSelect: true,
        "actions": [{
            "label": ADD.LABEL,
            "code": ADD.CODE,
            isSelect: true
        }, {
            "label": EDIT.LABEL,
            "code": EDIT.CODE,
            isSelect: true
        }]
    }]
}, {
    "module": MODULE.ORG_HOME,
    "moduleName": "Organization & Home",
    isSelect: true,
    "actions": [{
        "label": LIST.LABEL,
        "code": LIST.CODE,
        isSelect: true
    }, {
        "label": ADD.LABEL,
        "code": ADD.CODE,
        isSelect: true
    }, {
        "label": EDIT.LABEL,
        "code": EDIT.CODE,
        isSelect: true
    }, {
        "label": DELETE.LABEL,
        "code": DELETE.CODE,
        isSelect: true
    }],
    "subModules": [{
        "subModule": SUB_MODULE.ORG_HOME_SETTING,
        "subModuleName": "Setting",
        isSelect: true,
        "actions": [{
            "label": ADD.LABEL,
            "code": ADD.CODE,
            isSelect: true
        }, {
            "label": EDIT.LABEL,
            "code": EDIT.CODE,
            isSelect: true
        }]
    }]
}, {
    "module": MODULE.HOMEAREA,
    "moduleName": "Home Area",
    isSelect: true,
    "actions": [{
        "label": LIST.LABEL,
        "code": LIST.CODE,
        isSelect: true
    }, {
        "label": ADD.LABEL,
        "code": ADD.CODE,
        isSelect: true
    }, {
        "label": EDIT.LABEL,
        "code": EDIT.CODE,
        isSelect: true
    }, {
        "label": DELETE.LABEL,
        "code": DELETE.CODE,
        isSelect: true
    }],
    "subModules": [{
        "subModule": SUB_MODULE.HOMEAREA_SETTING,
        "subModuleName": "Setting",
        isSelect: true,
        "actions": [{
            "label": ADD.LABEL,
            "code": ADD.CODE,
            isSelect: true
        }, {
            "label": EDIT.LABEL,
            "code": EDIT.CODE,
            isSelect: true
        }]
    }]
}, {
    "module": MODULE.ROLE_BASE_ACCESS_PERMISSION,
    "moduleName": "Role Base Access Permission",
    isSelect: false,
    "actions": [{
        "label": LIST.LABEL,
        "code": LIST.CODE,
        isSelect: false
    }, {
        "label": ADD.LABEL,
        "code": ADD.CODE,
        isSelect: false
    }, {
        "label": EDIT.LABEL,
        "code": EDIT.CODE,
        isSelect: false
    }, {
        "label": DELETE.LABEL,
        "code": DELETE.CODE,
        isSelect: false
    }]
}, {
    "module": MODULE.RESIDENT,
    "moduleName": "Resident",
    isSelect: true,
    "actions": [{
        "label": LIST.LABEL,
        "code": LIST.CODE,
        isSelect: true
    }, {
        "label": ADD.LABEL,
        "code": ADD.CODE,
        isSelect: true
    }, {
        "label": EDIT.LABEL,
        "code": EDIT.CODE,
        isSelect: true
    }, {
        "label": TRANSFER.LABEL,
        "code": TRANSFER.CODE,
        isSelect: true
    }]
}, {
    "module": MODULE.RESIDENT_DOCUMENT,
    "moduleName": "Resident Document",
    isSelect: true,
    "actions": [{
        "label": LIST.LABEL,
        "code": LIST.CODE,
        isSelect: true
    }, {
        "label": ADD.LABEL,
        "code": ADD.CODE,
        isSelect: false
    }, {
        "label": EDIT.LABEL,
        "code": EDIT.CODE,
        isSelect: false
    }, {
        "label": DOWNLOAD.LABEL,
        "code": DOWNLOAD.CODE,
        isSelect: true
    }]
}, {
    "module": MODULE.DIGITAL_BINDER,
    "moduleName": "Digital Binder",
    isSelect: true,
    "actions": [{
        "label": LIST.LABEL,
        "code": LIST.CODE,
        isSelect: true
    }, {
        "label": DOWNLOAD.LABEL,
        "code": DOWNLOAD.CODE,
        isSelect: true
    }]
}, {
    "module": MODULE.ARCHIVED_DATA,
    "moduleName": "Archived Data",
    isSelect: true,
    "actions": [{
        "label": LIST.LABEL,
        "code": LIST.CODE,
        isSelect: true
    }, {
        "label": DOWNLOAD.LABEL,
        "code": DOWNLOAD.CODE,
        isSelect: true
    }]
}, {
    "module": MODULE.TODO,
    "moduleName": "TODO",
    isSelect: false,
    "actions": [{
        "label": YES_NA.LABEL,
        "code": YES_NA.CODE,
        isSelect: false
    }, {
        "label": UNDO.LABEL,
        "code": UNDO.CODE,
        isSelect: false
    }]
}, {
    "module": MODULE.RX_ORDER,
    "moduleName": "Rx Order",
    isSelect: true,
    "actions": [{
        "label": LIST.LABEL,
        "code": LIST.CODE,
        isSelect: true
    }, {
        "label": ADD.LABEL,
        "code": ADD.CODE,
        isSelect: false
    }, {
        "label": EDIT.LABEL,
        "code": EDIT.CODE,
        isSelect: false
    }, {
        "label": CANCEL.LABEL,
        "code": CANCEL.CODE,
        isSelect: false
    }],
    "subModules": [{
        "subModule": SUB_MODULE.RX_ORDER_TODO,
        "subModuleName": "Rx Order ToDo",
        isSelect: false,
        "actions": [{
            "label": DRUG_RECORD.LABEL,
            "code": DRUG_RECORD.CODE,
            "sequence": 1,
            "executionType": "parallel",
            "value": SUB_CATEGORY.PRESCRIPTION.DRUG_RECORD,
            isSelect: false
        }, {
            "label": CONSENT_OBTAINED.LABEL,
            "code": CONSENT_OBTAINED.CODE,
            "sequence": 2,
            "executionType": "parallel",
            "value": SUB_CATEGORY.PRESCRIPTION.CONSENT_OBTAINED,
            isSelect: false
        }, {
            "label": E_BOX_USED.LABEL,
            "code": E_BOX_USED.CODE,
            "sequence": 3,
            "executionType": "parallel",
            "value": SUB_CATEGORY.PRESCRIPTION.E_BOX_USED,
            isSelect: false
        }, {
            "label": CARE_PLAN.LABEL,
            "code": CARE_PLAN.CODE,
            "sequence": 4,
            "executionType": "parallel",
            "value": SUB_CATEGORY.PRESCRIPTION.CARE_PLAN,
            isSelect: false
        }, {
            "label": X_RAY_DIET.LABEL,
            "code": X_RAY_DIET.CODE,
            "sequence": 5,
            "executionType": "parallel",
            "value": SUB_CATEGORY.PRESCRIPTION.X_RAY_DIET,
            isSelect: false
        }, {
            "label": CHANGE_STICKER.LABEL,
            "code": CHANGE_STICKER.CODE,
            "sequence": 6,
            "executionType": "parallel",
            "value": SUB_CATEGORY.PRESCRIPTION.CHANGE_STICKER,
            isSelect: false
        }, {
            "label": "First Check",
            "code": FIRST_CHECK.CODE,
            "sequence": 7,
            "executionType": "parallel",
            "value": SUB_CATEGORY.PRESCRIPTION.FIRST_CHECK,
            isSelect: false
        }, {
            "label": SECOND_CHECK.LABEL,
            "code": SECOND_CHECK.CODE,
            "sequence": 8,
            "executionType": "series",
            "value": SUB_CATEGORY.PRESCRIPTION.SECOND_CHECK,
            isSelect: false
        }, {
            "label": VERBAL_ORDER.LABEL,
            "code": VERBAL_ORDER.CODE,
            "sequence": 9,
            "executionType": "parallel",
            "value": SUB_CATEGORY.PRESCRIPTION.VERBAL_ORDER,
            isSelect: false
        }]
    }]
}, {
    "module": MODULE.E_PROCESSING,
    "moduleName": "E-Processing",
    isSelect: true,
    "actions": [{
        "label": LIST.LABEL,
        "code": LIST.CODE,
        isSelect: true
    }, {
        "label": ADD.LABEL,
        "code": ADD.CODE,
        isSelect: false
    }, {
        "label": CANCEL.LABEL,
        "code": CANCEL.CODE,
        isSelect: false
    }]
}, {
    "module": MODULE.PMR,
    "moduleName": "PMR",
    isSelect: true,
    "subModules": [{
        "subModule": SUB_MODULE.PMR_GROUP,
        "subModuleName": "PMR Group",
        isSelect: true,
        "actions": [{
            "label": LIST.LABEL,
            "code": LIST.CODE,
            isSelect: true
        }, {
            "label": MOVE.LABEL,
            "code": MOVE.CODE,
            isSelect: false
        }, {
            "label": ADD.LABEL,
            "code": ADD.CODE,
            isSelect: false
        }, {
            "label": EDIT.LABEL,
            "code": EDIT.CODE,
            isSelect: false
        }, {
            "label": DELETE.LABEL,
            "code": DELETE.CODE,
            isSelect: false
        }]
    },
    {
        "subModule": SUB_MODULE.PMR_ORDER,
        "subModuleName": "PMR Orders",
        isSelect: true,
        "actions": []
    },
    {
        "subModule": SUB_MODULE.PMR_TODO,
        "subModuleName": "PMR ToDo",
        isSelect: false,
        "actions": [{
            "label": NURSE_PREP1.LABEL,
            "code": NURSE_PREP1.CODE,
            "sequence": 1,
            "executionType": "parallel",
            "value": SUB_CATEGORY.MED_REVIEW.NURSE_REVIEW_1,
            isSelect: false

        }, {
            "label": NURSE_PREP2.LABEL,
            "code": NURSE_PREP2.CODE,
            "sequence": 2,
            "executionType": "parallel",
            "value": SUB_CATEGORY.MED_REVIEW.NURSE_REVIEW_2,
            isSelect: false
        }, {
            "label": PHARMACY_COMMENT.LABEL,
            "code": PHARMACY_COMMENT.CODE,
            "sequence": 3,
            isSelect: false,
            // "value": SUB_CATEGORY.MED_REVIEW.NURSE_REVIEW_1
        }, {
            "label": PMR.LABEL,
            "code": PMR.CODE,
            "sequence": 4,
            "executionType": "parallel",
            "value": SUB_CATEGORY.MED_REVIEW.PMR,
            isSelect: false
        }, {
            "label": DRUG_RECORD.LABEL,
            "code": DRUG_RECORD.CODE,
            "sequence": 5,
            "executionType": "parallel",
            "value": SUB_CATEGORY.MED_REVIEW.DRUG_RECORD,
            isSelect: false
        }, {
            "label": CONSENT_OBTAINED.LABEL,
            "code": CONSENT_OBTAINED.CODE,
            "sequence": 6,
            "executionType": "parallel",
            "value": SUB_CATEGORY.MED_REVIEW.CONSENT_OBTAINED,
            isSelect: false
        }, {
            "label": E_BOX_USED.LABEL,
            "code": E_BOX_USED.CODE,
            "sequence": 7,
            "executionType": "parallel",
            "value": SUB_CATEGORY.MED_REVIEW.E_BOX_USED,
            isSelect: false
        }, {
            "label": CARE_PLAN.LABEL,
            "code": CARE_PLAN.CODE,
            "sequence": 8,
            "executionType": "parallel",
            "value": SUB_CATEGORY.MED_REVIEW.CARE_PLAN,
            isSelect: false
        }, {
            "label": CHANGE_STICKER.LABEL,
            "code": CHANGE_STICKER.CODE,
            "sequence": 9,
            "executionType": "parallel",
            "value": SUB_CATEGORY.MED_REVIEW.CHANGE_STICKER,
            isSelect: false
        }, {
            "label": FIRST_CHECK.LABEL,
            "code": FIRST_CHECK.CODE,
            "sequence": 10,
            "executionType": "parallel",
            "value": SUB_CATEGORY.MED_REVIEW.FIRST_CHECK,
            isSelect: false
        }, {
            "label": SECOND_CHECK.LABEL,
            "code": SECOND_CHECK.CODE,
            "sequence": 11,
            "executionType": "series",
            "value": SUB_CATEGORY.MED_REVIEW.SECOND_CHECK,
            isSelect: false
        }, {
            "label": X_RAY_DIET.LABEL,
            "code": X_RAY_DIET.CODE,
            "sequence": 12,
            "executionType": "parallel",
            "value": SUB_CATEGORY.MED_REVIEW.X_RAY_DIET,
            isSelect: false
        }]
    }]
}, {
    "module": MODULE.X_RAY_US,
    "moduleName": "X-Ray/ UltraSound",
    isSelect: true,
    "actions": [{
        "label": LIST.LABEL,
        "code": LIST.CODE,
        isSelect: true
    }, {
        "label": ADD.LABEL,
        "code": ADD.CODE,
        isSelect: true
    }, {
        "label": EDIT.LABEL,
        "code": EDIT.CODE,
        isSelect: true
    }, {
        "label": CANCEL.LABEL,
        "code": CANCEL.CODE,
        isSelect: true
    }],
    "subModules": [{
        "subModule": SUB_MODULE.X_RAY_US_TODO,
        "subModuleName": "X-Ray/ Ultrasound ToDo",
        isSelect: false,
        "actions": [{
            "label": X_RAY.LABEL,
            "code": X_RAY.CODE,
            "sequence": 1,
            "executionType": "parallel",
            "value": SUB_CATEGORY.XRAY.X_RAY_RESULT,
            isSelect: false
        },
        ]
    }]
}, {
    "module": MODULE.VIRTUAL_VISIT,
    "moduleName": "Virtual Visit",
    isSelect: true,
    "actions": [{
        "label": LIST.LABEL,
        "code": LIST.CODE,
        isSelect: true
    }, {
        "label": ADD.LABEL,
        "code": ADD.CODE,
        isSelect: true
    }, {
        "label": EDIT.LABEL,
        "code": EDIT.CODE,
        isSelect: true
    }, {
        "label": CANCEL.LABEL,
        "code": CANCEL.CODE,
        isSelect: true
    }]
}, {
    "module": MODULE.MASTER,
    "moduleName": "Masters",
    isSelect: true,
    "actions": [{
        "label": LIST.LABEL,
        "code": LIST.CODE,
        isSelect: true
    }, {
        "label": ADD.LABEL,
        "code": ADD.CODE,
        isSelect: true
    }, {
        "label": EDIT.LABEL,
        "code": EDIT.CODE,
        isSelect: true
    }, {
        "label": DELETE.LABEL,
        "code": DELETE.CODE,
        isSelect: true
    }]
}, {
    "module": MODULE.FEEDBACK,
    "moduleName": "Feedback",
    isSelect: true,
    "actions": [{
        "label": LIST.LABEL,
        "code": LIST.CODE,
        isSelect: true,
    }, {
        "label": ADD.LABEL,
        "code": ADD.CODE,
        isSelect: true,
    }]
}, {
    "module": MODULE.SUPPORT,
    "moduleName": "Support",
    isSelect: true,
    "actions": [{
        "label": LIST.LABEL,
        "code": LIST.CODE,
        isSelect: true,
    }, {
        "label": CANCEL.LABEL,
        "code": CANCEL.CODE,
        isSelect: true,
    }, {
        "label": ADD.LABEL,
        "code": ADD.CODE,
        isSelect: true,
    }]
}
]