import React from 'react';
import Message from './Message';
import Header from './header';
function MultiLanguageDemo() {
  return (<div style={{ marginTop: '20px' }}>
    <>
      <div className="container" style={{ textAlign: 'center' }}>
        {/* <Header /> */}
        <Message />
      </div>
    </>
  </div>);
}
export default MultiLanguageDemo;