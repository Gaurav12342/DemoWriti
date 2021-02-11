import React from 'react';
import Select from 'react-select';
import LocaleContext from '../contexts/locale';
import languageData from '../LanguageData';

const Header = () => {
  const { setLocale } = React.useContext(LocaleContext)
  const options = languageData.map(cur => {
    return { value: cur.locale, label: cur.name }
  })
  return (
    <div className="loginBox" style={{ marginLeft: '500px', marginBottom: '30px', width: '300px' }}>
      <div >
        <Select placeholder="select language"
          defaultValue="en"
          options={options} onChange={opt => setLocale(opt.value)} />
      </div>
    </div>
  )
}

export default Header