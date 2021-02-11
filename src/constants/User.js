export const SUB_NURSE_TYPE = {
    NURSE_PRACTITIONER: 1,
    RPN: 2,
    RN: 3,
    TEMP_RPN: 4,
    TEMP_RN: 5
};

export const USER_TYPE = {
    ADMIN: {
        SUPER: 1,
        GENERAL: 2
    },
    ORGANIZATION: {
        ADMIN: 3
    },
    HOME: {
        ADMIN: 11,
        NURSE: 12,
        PHYSICIAN: 13,
        TECH: 14,
        STAFF: 15,
        OTHER: 16
    },
    PHARMACY: {
        ADMIN: 21,
        OTHER: 22
    }
};

export const MAPPED_USER_TYPE = {
    'writi-admin': 1,
    "pharmacy": 21,
    "organizations": 3,
    "home": 11,
    "home-area": 5
};
export const DESIGNATION_TYPE = {
    'DOCTOR': { id: USER_TYPE.HOME.PHYSICIAN, name: 'Dr' },
    // 'DOCTOR': { id: USER_TYPE.HOME["DOCTOR"], name: "Dr." },
    // 'NURSE_PRACTITIONER': { id: SUB_NURSE_TYPE["NURSE_PRACTITIONER"], name: "NP" },
    'NURSE_PRACTITIONER': { id: SUB_NURSE_TYPE["NURSE_PRACTITIONER"], name: "NP" },
}

export const USER_DESIGNATION_TYPE = {
    [USER_TYPE.HOME["DOCTOR"]]: 'Dr.',
    [SUB_NURSE_TYPE.NURSE_PRACTITIONER]: 'NP'
}

export const DESIGNATION = {
    DIETICIAN: 1,
    STUDENT_RN: 2,
    STUDENT_RPN: 3,
}

export const isPharmacyUser = (userType) => {
    if (!userType)
        return
    //is user pharmacy user or not
    return Object.values(USER_TYPE.PHARMACY).includes(userType)

}

export const isAdminUser = (userType) => {
    if (!userType)
        return
    let adminUser = [USER_TYPE.ADMIN.SUPER, USER_TYPE.ADMIN.GENERAL,
    USER_TYPE.ORGANIZATION.ADMIN,
    USER_TYPE.HOME.ADMIN, USER_TYPE.PHARMACY.ADMIN]
    return adminUser.includes(userType)

}

export const DEVICE_LINK = {
    ANDROID: 'https://play.google.com/store/apps/details?id=com.writi.digital&hl=en_US&gl=US',
    IOS: 'https://apps.apple.com/in/app/writi-care/id1506386977',
    PRIVACY_POLICY: 'https://quality.writi.ca/docs/writi-privacy-policy.pdf',
    TERMS_CONDITION: 'https://quality.writi.ca/docs/terms-of-use.pdf',
};