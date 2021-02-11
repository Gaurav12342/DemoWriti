import React from 'react';
import PropTypes from 'prop-types';

const TextArea = ({ ...props }) => {
    return  <textarea {...props} className="form_control"></textarea>
};

export default TextArea;