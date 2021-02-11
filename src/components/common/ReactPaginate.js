/* eslint-disable react/display-name */
import React from 'react';
import PropTypes from 'prop-types';
import Pagination from 'react-js-pagination';
import { FirstPage, LastPage, Next, Prev } from '../../assets/images/index';

const ReactPaginate = (props) => {
  return <>{props.totalItemsCount > 0 && <Pagination {...props} />}</>;
};

ReactPaginate.defaultProps = {
  activePage: 1,
  itemsCountPerPage: 10,
  pageRangeDisplayed: 5,
  prevPageText: <Prev />,
  nextPageText: <Next />,
  firstPageText: <FirstPage />,
  lastPageText: <LastPage />,
  activeClass : 'active_page',
  activeLinkClass :'active_page'
};

ReactPaginate.propTypes = {
  className: PropTypes.string,
  totalItemsCount: PropTypes.number,
  onChange: PropTypes.func,
  activePage: PropTypes.number,
  itemsCountPerPage: PropTypes.number,
  pageRangeDisplayed: PropTypes.number,
  prevPageText: PropTypes.node || PropTypes.string,
  nextPageText: PropTypes.node || PropTypes.string,
  firstPageText: PropTypes.node || PropTypes.string,
  getPageUrl: PropTypes.func,
  innerClass: PropTypes.string,
  activeClass: PropTypes.string,
  activeLinkClass: PropTypes.string,
  itemClass: PropTypes.string,
  itemClassFirst: PropTypes.string,
  itemClassPrev: PropTypes.string,
  itemClassNext: PropTypes.string,
  itemClassLast: PropTypes.string,
  disabledClass: PropTypes.string,
  hideDisabled: PropTypes.bool,
  hideNavigation: PropTypes.bool,
  hideFirstLastPages: PropTypes.bool,
  linkClass: PropTypes.string,
  linkClassFirst: PropTypes.string,
  linkClassPrev: PropTypes.string,
  linkClassNext: PropTypes.string,
  linkClassLast: PropTypes.string,
};

export default ReactPaginate;
