import { MODULE, SUB_MODULE, ACTIONS } from './subscription'
import { SUB_CATEGORY } from './todo'

const { LIST, ADD, EDIT, DELETE, DOWNLOAD, UPLOAD, TRANSFER, UNDO, YES_NA, CANCEL, CONSENT_OBTAINED,
    E_BOX_USED, CHANGE_STICKER, X_RAY_DIET, FIRST_CHECK, SECOND_CHECK, VERBAL_ORDER,
    NURSE_PREP1, RX_ORDER_TODO, DRUG_RECORD, CARE_PLAN, PMR_TODO, NURSE_PREP2, PMR,
    X_RAY, PHARMACY_COMMENT, MOVE } = ACTIONS

export default [{
    "module": MODULE.USER,
    "moduleName": "User",
    "actions": [{
        "label": LIST.LABEL,
        "code": LIST.CODE
    }, {
        "label": ADD.LABEL,
        "code": ADD.CODE,
    }, {
        "label": EDIT.LABEL,
        "code": EDIT.CODE
    }, {
        "label": DELETE.LABEL,
        "code": DELETE.CODE
    }, {
        "label": UPLOAD.LABEL,
        "code": UPLOAD.CODE
    }, {
        "label": DOWNLOAD.LABEL,
        "code": DOWNLOAD.CODE
    }]
}, {
    "module": MODULE.PHARMACY,
    "moduleName": "Pharmacy",
    "actions": [{
        "label": LIST.LABEL,
        "code": LIST.CODE
    }, {
        "label": ADD.LABEL,
        "code": ADD.CODE,
    }, {
        "label": EDIT.LABEL,
        "code": EDIT.CODE
    }, {
        "label": DELETE.LABEL,
        "code": DELETE.CODE
    }],
    "subModules": [{
        "subModule": SUB_MODULE.PHARMACY_SETTING,
        "subModuleName": "Setting",
        "actions": [{
            "label": ADD.LABEL,
            "code": ADD.CODE
        }, {
            "label": EDIT.LABEL,
            "code": EDIT.CODE
        }]
    }]
}, {
    "module": MODULE['IMAGING_DIAGNOSIS'],
    "moduleName": "Imaging & Diagnostic",
    "actions": [{
        "label": LIST.LABEL,
        "code": LIST.CODE
    }, {
        "label": ADD.LABEL,
        "code": ADD.CODE,
    }, {
        "label": EDIT.LABEL,
        "code": EDIT.CODE
    }, {
        "label": DELETE.LABEL,
        "code": DELETE.CODE
    }],
    "subModules": [{
        "subModule": SUB_MODULE['IMAGING_DIAGNOSIS_SETTING'],
        "subModuleName": "Setting",
        "actions": [{
            "label": ADD.LABEL,
            "code": ADD.CODE
        }, {
            "label": EDIT.LABEL,
            "code": EDIT.CODE
        }]
    }]
}, {
    "module": MODULE.ORG_HOME,
    "moduleName": "Organization & Home",
    "actions": [{
        "label": LIST.LABEL,
        "code": LIST.CODE
    }, {
        "label": ADD.LABEL,
        "code": ADD.CODE,
    }, {
        "label": EDIT.LABEL,
        "code": EDIT.CODE
    }, {
        "label": DELETE.LABEL,
        "code": DELETE.CODE
    }],
    "subModules": [{
        "subModule": SUB_MODULE.ORG_HOME_SETTING,
        "subModuleName": "Setting",
        "actions": [{
            "label": ADD.LABEL,
            "code": ADD.CODE
        }, {
            "label": EDIT.LABEL,
            "code": EDIT.CODE
        }]
    }]
}, {
    "module": MODULE.HOMEAREA,
    "moduleName": "Home Area",
    "actions": [{
        "label": LIST.LABEL,
        "code": LIST.CODE
    }, {
        "label": ADD.LABEL,
        "code": ADD.CODE,
    }, {
        "label": EDIT.LABEL,
        "code": EDIT.CODE
    }, {
        "label": DELETE.LABEL,
        "code": DELETE.CODE
    }],
    "subModules": [{
        "subModule": SUB_MODULE.HOMEAREA_SETTING,
        "subModuleName": "Setting",
        "actions": [{
            "label": ADD.LABEL,
            "code": ADD.CODE
        }, {
            "label": EDIT.LABEL,
            "code": EDIT.CODE
        }]
    }]
}, {
    "module": MODULE.ROLE_BASE_ACCESS_PERMISSION,
    "moduleName": "Role Base Access Permission",
    "actions": [{
        "label": LIST.LABEL,
        "code": LIST.CODE
    }, {
        "label": ADD.LABEL,
        "code": ADD.CODE,
    }, {
        "label": EDIT.LABEL,
        "code": EDIT.CODE
    }, {
        "label": DELETE.LABEL,
        "code": DELETE.CODE
    }]
}, {
    "module": MODULE.RESIDENT,
    "moduleName": "Resident",
    "actions": [{
        "label": LIST.LABEL,
        "code": LIST.CODE
    }, {
        "label": ADD.LABEL,
        "code": ADD.CODE,
    }, {
        "label": EDIT.LABEL,
        "code": EDIT.CODE
    }, {
        "label": TRANSFER.LABEL,
        "code": TRANSFER.CODE
    }]
}, {
    "module": MODULE.RESIDENT_DOCUMENT,
    "moduleName": "Resident Document",
    "actions": [{
        "label": LIST.LABEL,
        "code": LIST.CODE
    }, {
        "label": ADD.LABEL,
        "code": ADD.CODE,
    }, {
        "label": EDIT.LABEL,
        "code": EDIT.CODE
    }, {
        "label": DOWNLOAD.LABEL,
        "code": DOWNLOAD.CODE
    }]
}, {
    "module": MODULE.DIGITAL_BINDER,
    "moduleName": "Digital Binder",
    "actions": [{
        "label": LIST.LABEL,
        "code": LIST.CODE
    }, {
        "label": DOWNLOAD.LABEL,
        "code": DOWNLOAD.CODE,
    }]
}, {
    "module": MODULE.ARCHIVED_DATA,
    "moduleName": "Archived Data",
    "actions": [{
        "label": LIST.LABEL,
        "code": LIST.CODE
    }, {
        "label": DOWNLOAD.LABEL,
        "code": DOWNLOAD.CODE,
    }]
}, {
    "module": MODULE.TODO,
    "moduleName": "TODO",
    "actions": [{
        "label": YES_NA.LABEL,
        "code": YES_NA.CODE
    }, {
        "label": UNDO.LABEL,
        "code": UNDO.CODE
    }]
}, {
    "module": MODULE.RX_ORDER,
    "moduleName": "Rx Order",
    "actions": [{
        "label": LIST.LABEL,
        "code": LIST.CODE
    }, {
        "label": ADD.LABEL,
        "code": ADD.CODE
    }, {
        "label": EDIT.LABEL,
        "code": EDIT.CODE
    }, {
        "label": CANCEL.LABEL,
        "code": CANCEL.CODE
    }],
    "subModules": [{
        "subModule": SUB_MODULE.RX_ORDER_TODO,
        "subModuleName": "Rx Order ToDo",
        "actions": [{
            "label": DRUG_RECORD.LABEL,
            "code": DRUG_RECORD.CODE,
            "sequence": 1,
            "executionType": "parallel",
            "value": SUB_CATEGORY.PRESCRIPTION.DRUG_RECORD,
        }, {
            "label": CONSENT_OBTAINED.LABEL,
            "code": CONSENT_OBTAINED.CODE,
            "sequence": 2,
            "executionType": "parallel",
            "value": SUB_CATEGORY.PRESCRIPTION.CONSENT_OBTAINED
        }, {
            "label": E_BOX_USED.LABEL,
            "code": E_BOX_USED.CODE,
            "sequence": 3,
            "executionType": "parallel",
            "value": SUB_CATEGORY.PRESCRIPTION.E_BOX_USED
        }, {
            "label": CARE_PLAN.LABEL,
            "code": CARE_PLAN.CODE,
            "sequence": 4,
            "executionType": "parallel",
            "value": SUB_CATEGORY.PRESCRIPTION.CARE_PLAN
        }, {
            "label": X_RAY_DIET.LABEL,
            "code": X_RAY_DIET.CODE,
            "sequence": 5,
            "executionType": "parallel",
            "value": SUB_CATEGORY.PRESCRIPTION.X_RAY_DIET
        }, {
            "label": CHANGE_STICKER.LABEL,
            "code": CHANGE_STICKER.CODE,
            "sequence": 6,
            "executionType": "parallel",
            "value": SUB_CATEGORY.PRESCRIPTION.CHANGE_STICKER
        }, {
            "label": "First Check",
            "code": FIRST_CHECK.CODE,
            "sequence": 7,
            "executionType": "parallel",
            "value": SUB_CATEGORY.PRESCRIPTION.FIRST_CHECK
        }, {
            "label": SECOND_CHECK.LABEL,
            "code": SECOND_CHECK.CODE,
            "sequence": 8,
            "executionType": "series",
            "value": SUB_CATEGORY.PRESCRIPTION.SECOND_CHECK,
            "parentTodo": SUB_CATEGORY.PRESCRIPTION.FIRST_CHECK
        }, {
            "label": VERBAL_ORDER.LABEL,
            "code": VERBAL_ORDER.CODE,
            "sequence": 9,
            "executionType": "parallel",
            "value": SUB_CATEGORY.PRESCRIPTION.VERBAL_ORDER
        }]
    }]
}, {
    "module": MODULE.E_PROCESSING,
    "moduleName": "E-Processing",
    "actions": [{
        "label": LIST.LABEL,
        "code": LIST.CODE
    }, {
        "label": ADD.LABEL,
        "code": ADD.CODE
    }, {
        "label": CANCEL.LABEL,
        "code": CANCEL.CODE
    }]
}, {
    "module": MODULE.PMR,
    "moduleName": "PMR",
    "actions": [{
        "label": LIST.LABEL,
        "code": LIST.CODE,
    }],
    "subModules": [{
        "subModule": SUB_MODULE.PMR_GROUP,
        "subModuleName": "PMR Group",
        "actions": [{
            "label": LIST.LABEL,
            "code": LIST.CODE,
        }, {
            "label": ADD.LABEL,
            "code": ADD.CODE
        }, {
            "label": EDIT.LABEL,
            "code": EDIT.CODE
        }, {
            "label": DELETE.LABEL,
            "code": DELETE.CODE
        }, {
            "label": MOVE.LABEL,
            "code": MOVE.CODE
        }]
    },
    {
        "subModule": SUB_MODULE.PMR_ORDER,
        "subModuleName": "PMR Orders",
        "actions": []
    },
    {
        "subModule": SUB_MODULE.PMR_TODO,
        "subModuleName": "PMR ToDo",
        "actions": [{
            "label": NURSE_PREP1.LABEL,
            "code": NURSE_PREP1.CODE,
            "sequence": 1,
            "executionType": "parallel",
            "value": SUB_CATEGORY.MED_REVIEW.NURSE_REVIEW_1

        }, {
            "label": NURSE_PREP2.LABEL,
            "code": NURSE_PREP2.CODE,
            "sequence": 2,
            "executionType": "parallel",
            "value": SUB_CATEGORY.MED_REVIEW.NURSE_REVIEW_2,
            "parentTodo": SUB_CATEGORY.MED_REVIEW.NURSE_REVIEW_1
        }, {
            "label": PHARMACY_COMMENT.LABEL,
            "code": PHARMACY_COMMENT.CODE,
            "sequence": 3,
            // "value": SUB_CATEGORY.MED_REVIEW.NURSE_REVIEW_1
        }, {
            "label": PMR.LABEL,
            "code": PMR.CODE,
            "sequence": 4,
            "executionType": "parallel",
            "value": SUB_CATEGORY.MED_REVIEW.PMR
        }, {
            "label": DRUG_RECORD.LABEL,
            "code": DRUG_RECORD.CODE,
            "sequence": 5,
            "executionType": "series",
            "value": SUB_CATEGORY.MED_REVIEW.DRUG_RECORD,
            "parentTodo": SUB_CATEGORY.MED_REVIEW.PMR
        }, {
            "label": CONSENT_OBTAINED.LABEL,
            "code": CONSENT_OBTAINED.CODE,
            "sequence": 6,
            "executionType": "series",
            "value": SUB_CATEGORY.MED_REVIEW.CONSENT_OBTAINED,
            "parentTodo": SUB_CATEGORY.MED_REVIEW.PMR
        }, {
            "label": E_BOX_USED.LABEL,
            "code": E_BOX_USED.CODE,
            "sequence": 7,
            "executionType": "series",
            "value": SUB_CATEGORY.MED_REVIEW.E_BOX_USED,
            "parentTodo": SUB_CATEGORY.MED_REVIEW.PMR
        }, {
            "label": CARE_PLAN.LABEL,
            "code": CARE_PLAN.CODE,
            "sequence": 8,
            "executionType": "series",
            "value": SUB_CATEGORY.MED_REVIEW.CARE_PLAN,
            "parentTodo": SUB_CATEGORY.MED_REVIEW.PMR
        }, {
            "label": CHANGE_STICKER.LABEL,
            "code": CHANGE_STICKER.CODE,
            "sequence": 9,
            "executionType": "series",
            "value": SUB_CATEGORY.MED_REVIEW.CHANGE_STICKER,
            "parentTodo": SUB_CATEGORY.MED_REVIEW.PMR
        }, {
            "label": FIRST_CHECK.LABEL,
            "code": FIRST_CHECK.CODE,
            "sequence": 10,
            "executionType": "series",
            "value": SUB_CATEGORY.MED_REVIEW.FIRST_CHECK,
            "parentTodo": SUB_CATEGORY.MED_REVIEW.PMR
        }, {
            "label": SECOND_CHECK.LABEL,
            "code": SECOND_CHECK.CODE,
            "sequence": 11,
            "executionType": "series",
            "value": SUB_CATEGORY.MED_REVIEW.SECOND_CHECK,
            "parentTodo": SUB_CATEGORY.MED_REVIEW.FIRST_CHECK
        }, {
            "label": X_RAY_DIET.LABEL,
            "code": X_RAY_DIET.CODE,
            "sequence": 12,
            "executionType": "series",
            "value": SUB_CATEGORY.MED_REVIEW.X_RAY_DIET,
            "parentTodo": SUB_CATEGORY.MED_REVIEW.PMR
        }]
    }]
}, {
    "module": MODULE.X_RAY_US,
    "moduleName": "X-Ray/ UltraSound",
    "actions": [{
        "label": LIST.LABEL,
        "code": LIST.CODE
    }, {
        "label": ADD.LABEL,
        "code": ADD.CODE
    }, {
        "label": EDIT.LABEL,
        "code": EDIT.CODE
    }, {
        "label": CANCEL.LABEL,
        "code": CANCEL.CODE
    }],
    "subModules": [{
        "subModule": SUB_MODULE.X_RAY_US_TODO,
        "subModuleName": "X-Ray/ Ultrasound ToDo",
        "actions": [{
            "label": X_RAY.LABEL,
            "code": X_RAY.CODE,
            "sequence": 1,
            "executionType": "parallel",
            "value": SUB_CATEGORY.XRAY.X_RAY_RESULT
        },
        ]
    }]
}, {
    "module": MODULE.VIRTUAL_VISIT,
    "moduleName": "Virtual Visit",
    "actions": [{
        "label": LIST.LABEL,
        "code": LIST.CODE
    }, {
        "label": ADD.LABEL,
        "code": ADD.CODE
    }, {
        "label": EDIT.LABEL,
        "code": EDIT.CODE
    }, {
        "label": CANCEL.LABEL,
        "code": CANCEL.CODE
    }]
}, {
    "module": MODULE.MASTER,
    "moduleName": "Masters",
    "actions": [{
        "label": LIST.LABEL,
        "code": LIST.CODE,
    }, {
        "label": ADD.LABEL,
        "code": ADD.CODE,
    }, {
        "label": EDIT.LABEL,
        "code": EDIT.CODE,
    }, {
        "label": DELETE.LABEL,
        "code": DELETE.CODE,
    }]
}, {
    "module": MODULE.FEEDBACK,
    "moduleName": "Feedback",
    "actions": [{
        "label": LIST.LABEL,
        "code": LIST.CODE,
    }, {
        "label": ADD.LABEL,
        "code": ADD.CODE,
    }]
}, {
    "module": MODULE.SUPPORT,
    "moduleName": "Support",
    "actions": [{
        "label": LIST.LABEL,
        "code": LIST.CODE,
    }, {
        "label": CANCEL.LABEL,
        "code": CANCEL.CODE,
    }, {
        "label": ADD.LABEL,
        "code": ADD.CODE,
    }]
}
]