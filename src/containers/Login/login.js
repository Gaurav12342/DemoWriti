import React, { Component } from 'react'
import { Logo, PlayStore, AppStore } from '../../assets/images/index';
import { createForm, formShape } from 'rc-form';
import Spin from '../../components/common/Spin';
import { ReactComponent as Pvisible } from '../../assets/images/eye.svg';
import { ReactComponent as Punvisible } from '../../assets/images/eyeclosed.svg';
class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false
    };

  }
  static propTypes = {
    form: formShape,
  };
  passwordVisible = () => {
    const { show } = this.state;
    this.setState({ show: !show });
  }

  submit = () => {
    this.props.form.validateFields((error, value) => {
      console.log(error, value);
    });
  }
  render() {
    let errors;
    const { getFieldProps, getFieldError, getFieldDecorator } = this.props.form;
    return (<>
    
      <div className="container">

        {/* <Spin spinning={true} colorCode={'#609fae'} str={'overlay center'}><span>Loading...</span></Spin> */}

        <div className="loginContainer">
          <div className="loginBox">
            <div className="loginLogo">
              <Logo />
            </div>
            <h1>Welcome Back!</h1>
            <div className="form">
              <form action="\verify-otp">
                <div className="compnents">
                  {getFieldDecorator('email', {
                    rules: [{
                      required: true, type: 'email',
                      message: 'The input is not valid E-mail!',
                    }],
                  })(
                    <input type="email" placeholder="Email Address" className="inputForm"
                      onChange={(e) => console.log(e)} />
                  )}
                  {(errors = getFieldError('email')) ? errors.join(',') : null}
                </div>
                <div className="compnents">
                  <input type={(this.state.show) ? 'text' : 'password'} placeholder="Password" className="inputForm" {...getFieldProps('required', {
                    onChange() { }, // have to write original onChange here if you need
                    rules: [{ required: true }],
                  })} />
                  {
                    this.state.show ?
                      (
                        <Punvisible onClick={this.passwordVisible} />
                      )
                      :
                      (
                        <Pvisible onClick={this.passwordVisible} />
                      )
                  }
                </div>
                {(errors = getFieldError('required')) ? errors.join(',') : null}
                <div className="forgotPasswordLink">
                  <a className="">Forgot your password?</a>
                </div>
                <div className="signBtn">
                  <button className="btn" onClick={this.submit}>SIGN IN</button>
                </div>
              </form>

            </div>
          </div>
        </div>
        <div className="loginFooter">
          <div className="topFooter">
            <ul>
              <li>
                <a href="">Privacy Policy</a>
              </li>
              <li>
                •
                            </li>
              <li>
                <a href="">Terms of Use</a>
              </li>
            </ul>
          </div>
          <div className="bottomFooter">
            <div className="playAppLogo">
              <ul>
                <li>
                  <a>
                    <PlayStore />
                  </a>
                </li>
                <li>
                  <a>
                    <AppStore />
                  </a>
                </li>
                <li className="versionName">
                  V2.0, 25th May 2020
                                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>)
  }
}
export default createForm()(Login);