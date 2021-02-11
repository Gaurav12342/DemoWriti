// /* eslint-disable react/prop-types */
// /* eslint-disable no-undef */
// import React from 'react';
// import Checkbox from './C-Checkbox';
// import { languageData } from '../../constants/common';
// import Popover from 'react-awesome-popover';
// import { connect } from 'react-redux';
// // import { switchLanguage } from '../../appRedux/actions/Auth';
// // import { SWITCH_LANGUAGE } from '../../appRedux/ActionTypes'
// function SwitchLanguage(props) {
//   console.log('TCL: SwitchLanguage -> props', props);
//   const { preferredLanguage } = props;
//   function handleSwitchLang(lang) {
//     console.log('TCL: handleLanguageChange -> e', lang);
//     props.switchLanguage(SWITCH_LANGUAGE,lang);
//   }
//   return (
//     <div className="switch-lang-popover">
//       <Popover>
//         <img
//           className="lang-btn"
//           src={require('../../assets/images/languageSwitch.png')}
//         />
//         <div className="filter_wrap switch-lang">
//           <div className="filter_section">
//             <div className="filter_value">
//               {languageData.map((data, i) => {
//                 return (
//                   <Checkbox
//                     key={`${data.locale}${i + 1}`}
//                     locale={data.locale}
//                     name={data.name}
//                     onChange={() => handleSwitchLang(data.locale)}
//                     selected={preferredLanguage}
//                   />
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       </Popover>
//     </div>
//   );
// }
// const mapStateToProps = ({ auth }) => {
//   const { preferredLanguage } = auth;
//   return { preferredLanguage };
// };
// export default connect(mapStateToProps, { switchLanguage })(SwitchLanguage);
