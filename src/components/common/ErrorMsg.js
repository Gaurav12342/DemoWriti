import React from 'react'

function ErrorMsg({ errors }) {
    return <p className="error-msg">{errors.join(',')}</p>
}

export default ErrorMsg