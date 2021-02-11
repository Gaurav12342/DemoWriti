import React from 'react';
import PropTypes from 'prop-types';

const Badge = (props) => {
  const { title, count, icon, className } = props;
  return (
    <>
      <a>
        <span>
          {icon}
          {count > 0 && <span className={'tot ' + className}>{count}</span>}
        </span>
        <p>{title}</p>
      </a>
    </>
  );
};
Badge.defaultProps = { className: 'tot', count: 0 };
Badge.propTypes = {
  count: PropTypes.number,
  className: PropTypes.string,
  overflowCount: PropTypes.objectOf(PropTypes.number),
  color: PropTypes.string,
  title: PropTypes.string,
  icon: PropTypes.node,
  style: PropTypes.string,
  onClick : PropTypes.func
};

export default Badge;

