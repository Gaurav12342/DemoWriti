import moment from 'moment';
import localForage from 'localforage';

function checkExcludeOTP(result) {
    let excludeOTPVerification
    let current = moment().toISOString();
    if (moment(current).isAfter(result.extendedTime)) {
        excludeOTPVerification = false
    } else {
        excludeOTPVerification = true
    }
    return excludeOTPVerification
}

export async function getUserDetail(obj) {
    // check for user existence
    let exist = false, excludeOTPVerification = false
    return localForage.getItem(obj.email)
        .then((value) => {

            if (value)
                exist = true

            //set flag whether to show OTP screen or not
            if (exist) {
                excludeOTPVerification = checkExcludeOTP(value)
            }
            return { excludeOTPVerification: excludeOTPVerification }
        })
        .catch((error) => {
            console.log("getUserDetail -> error", error)

        });  // handle errors
}

export async function addUserData(obj) {

    let extendedTime = moment().add(4, "hours").toISOString();
    var data = {
        "extendedTime": extendedTime,
        "email": obj.email
    };

    // ES6 Promise
    return localForage.setItem(obj.email, data)
        .then((value) => {
            console.log("addUserData -> value", value)
        })    // do something with "foo"
        .catch((error) => {
            console.log("addUserData -> error", error)

        });  // handle errors
};

