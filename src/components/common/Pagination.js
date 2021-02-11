import React from 'react';
import Pagination from 'rc-pagination'
import 'rc-pagination/assets/index.less';
import PropTypes from 'prop-types';

export default ({ componentClass, ...props }) => {
    return <Pagination total={20} />
};