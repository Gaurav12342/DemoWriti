import React from 'react';
import { createForm, formShape } from 'rc-form';
import { useTranslate } from 'react-polyglot';
function Message({ ...props }) {
  const t = useTranslate();
  let errors;
  const { getFieldProps, getFieldError, getFieldDecorator } = props.form;
  return (<div className="container">
    <div className="loginContainer">
      <div className="loginBox">

        <h1>
          {t('Multi Factor Authentication')}
        </h1>
        <h2>{t('Hello world')}</h2>
        <p>
          {t('Your one time 6-digit OTP was sent to your registered mobile number via text message')}<br />as well to your registered email address.
        </p>
        <p>
          ******1515<br />****tor1@writi.ca
        </p>
        <p>
          {t('This code will expire in 60 seconds')}
        </p>
        <div className="form">
          <form action="\resident-detail">
            <div className="components">
              {getFieldDecorator('email', {
                rules: [{
                  required: true, type: 'email',
                  message: 'The input is not valid E-mail!',
                }],
              })(
                <input type="text" placeholder={t('Enter 6-digit Code')} className="inputForm centerInput"
                  onChange={(e) => console.log(e)} />
              )}
              {(errors = getFieldError('email')) ? errors.join(',') : null}
            </div>
            <div className="forgotPasswordLink text-center">
              <a className="">
                <input type="checkbox" id="no2" name="no2" value="no" />
                {t('Don\'t ask me again for next 4 hours')} <span className="b-b">{t('on this device')}</span>
              </a>
            </div>
            {(errors = getFieldError('required')) ? errors.join(',') : null}
            <div className="signBtn">

              <button className="btn" >
                {/* <Spin spinning={true} colorCode={"#ffffff"} str={"left"}></Spin> */}
                {t('LOGIN')}</button>
            </div>
          </form>
          <div className="timer-block">
            <div className="time-count">00:00</div>
            <p>{t('Didn\'t receive your OTP?')} <span>{t('Resend OTP')}</span></p>
            <span>{t('Back to Login')}</span>
          </div>

        </div>
      </div>
    </div>
    <div className="loginFooter">
      <div className="topFooter">
        <ul>
          <li>
            <a href="">{t('Privacy Policy')}</a>
          </li>
          <li>
            •
          </li>
          <li>
            <a href="">{t('Terms of Use')}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
  );
}
export default createForm()(Message);
// export default translate(createForm()(Message));

// function Message() {
//     const t = useTranslate()
//     return (
//         <section>
//             <p>{t('Multi Factor Authentication')}</p>
//         </section>
//     )
// }
// export default Message