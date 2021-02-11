import React, { useEffect, useState } from 'react';
import { Toast } from '../../components/common';
import axios from '../../services/api/services/common';
import { feedbackUpsert } from '../../../src/services/api/routes/supportFeedback';
import { createForm } from 'rc-form';
import { dateTimeFormat, displayDateTime } from '../../util/moment';
import PageHead from './components/PageHead';
import { feedbackPaginate } from '../../services/api/routes/supportFeedback';
import Table from '../../components/common/Table/index';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { USER_TYPE } from '../../constants/User';
import UpsertForm from './components/UpsertForm';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';
import FeedbackDetail from './components/FeedbackDetail';
import { canPerformAction, getUserNameWithDesignation } from '../../../src/util/common';
import { MODULE, ACTIONS } from '../../../src/constants/subscription';

const _ = require('lodash');
const moment = require('moment');
const Feedback = (props) => {
  const tod = moment();

  const fromd = moment().subtract(15, 'days');
  const [feedbackDetail, setFeedbackDetail] = useState('');
  const [feedbackDetailVisible, setFeedbackDetailVisible] = useState(false);
  const { form, authUser } = props;
  const isAdmin =
    authUser &&
    (authUser.type === USER_TYPE.ADMIN.SUPER ||
      authUser.type === USER_TYPE.ADMIN.GENERAL);
  const [defaultDate, setDefaultDate] = useState([fromd, tod]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const [saveLoader, setSaveLoader] = useState(false);
  const onOpenModal = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
    changeSaveLoader(false);
  };
  const changeSaveLoader = (value) => {
    setSaveLoader(value);
  };
  const [apiFilter, setApiFilter] = useState(() => {
    const filter = {
      page: 1,
      limit: 10,
      populate: [{ addedBy: ['mergeLFName'] }],
      lte: [{ createdAt: tod }],
      gte: [{ createdAt: fromd }],
      fields: [],
      find: {},
      sort: { createdAt: 'DESC' },
    };
    if (!isAdmin) {
      _.extend(filter.find, { addedBy: authUser._id });
    }
    return filter;
  });

  useEffect(() => {
    fetch();
  }, [apiFilter]);
  const fetch = async () => {
    setLoading(true);
    let res = await axios({ ...feedbackPaginate, data: { query: apiFilter } });
    if (res) {
      if (res.code === 'OK') {
        setData(res.data.data);
        setCount(res.data.count);
      } else {
        Toast.error(res.message);
      }
    }
    setLoading(false);
    // filter.find && filter.find.facId ? setDetailLoader(false) : setLoading(false);
  };

  const handleFeedbackSubmit = () => {
    const { method, url, baseURL } = feedbackUpsert;
    props.form.validateFields((error, value) => {
      if (!error) {
        changeSaveLoader(true);
        axios({ method, url, data: value, baseURL })
          .then((data) => {
            if (data.code == 'OK') {
              Toast.success(data.message);
              form.resetFields();
              onClose();
              changeSaveLoader(false);
              setDefaultDate([fromd, moment()]);

              setApiFilter((filter) => {
                return {
                  ...filter,
                  lte: [{ createdAt: moment() }],
                  gte: [{ createdAt: fromd }],
                };
              });
            }
          })
          .catch((error) => {
            Toast.error(error);
            changeSaveLoader(false);
          });
      }
    });
  };
  const onDateChange = (dateRange) => {
    setDefaultDate(dateRange);
    setApiFilter((exFilter) => {
      return {
        ...exFilter,
        gte: [{ createdAt: dateRange[0] }],
        lte: [{ createdAt: dateRange[1] }],
        page: 1,
        limit: 10,
      };
    });
  };
  const getColumns = () => [
    {
      title: 'Sr.No',
      keyword: 'index',
      dataIndex: 'index',
      width: '20px',
      render: (text, record, index) =>
        (apiFilter.page - 1) * apiFilter.limit + (index + 1),
    },
    {
      title: 'Query',
      dataIndex: 'message',
      // className:  Column_classNames.query,
      width: '500px',

      render: (text, record) => (
        // <span>{text}</span>
        <Tooltip
          overlay={text}
          id={record._id}
          className='max-w-500'
          onClick={() => {
            console.log('sfsrfhbewsfujsbfhj');
            setFeedbackDetail(text);
            setFeedbackDetailVisible(true);
          }}
        >
          <div
            style={
              text.length > 150
                ? {
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                }
                : { cursor: 'pointer' }
            }
          >
            {text}
          </div>
        </Tooltip>
      ),
    },
    {
      title: 'Feedback By',
      dataIndex: 'addedBy',
      render: (text) => <span> {getUserNameWithDesignation(text)}</span>,
    },
    {
      title: 'Feedback Date',
      dataIndex: 'createdAt',
      render: (text) => (
        <span style={{ textTransform: 'capitalize' }}>
          {displayDateTime(text) || '-'}
        </span>
      ),
    },
  ];
  const handleTableChange = (pagination, tfilter, sorter) => {
    //  console.log("🚀 ~ file: index.js ~ line 56 ~ handleTableChange ~ pagination, tfilter, sorte", pagination, tfilter)
    let tempFilter = {
      ...apiFilter,
      page: pagination.current,
      limit: pagination.pageSize,
    };
    //  console.log("🚀 ~ file: index.js ~ line 58 ~ handleTableChange ~ tempFilter", tempFilter)
    setApiFilter(tempFilter);
  };

  const onShowSizeChange = (size) => {
    if (size) {
      setApiFilter((prevFilter) => ({ ...prevFilter, page: 1, limit: size, page: 1 }));
    }
  };
  const closeFeedbackDetail = () => {
    //   console.log("CLOSED")
    setFeedbackDetailVisible(false);
  };

  let addParams = {
    moduleId: MODULE.FEEDBACK,
    actiontoCheck: ACTIONS.ADD.CODE,
  };
  let tableListParams = {
    moduleId: MODULE.FEEDBACK,
    actiontoCheck: ACTIONS.LIST.CODE,
  };

  return (
    <>
      {visible && (
        <UpsertForm
          form={form}
          visible={visible}
          title='Submit Feedback'
          onCancel={onClose}
          handleFeedbackSubmit={handleFeedbackSubmit}
          okText='Submit'
          okButtonProps={{ loading: saveLoader }}
        ></UpsertForm>
      )}
      {feedbackDetailVisible && (
        <FeedbackDetail
          visible={feedbackDetailVisible}
          data={feedbackDetail}
          maskClosable={true}
          onClose={closeFeedbackDetail}
          title={'Message'}
        ></FeedbackDetail>
      )}
      <div className='pmr_wrap'>
        <div className='container'>
          <PageHead
            onAddParams={addParams}
            total={count}
            onDateChange={onDateChange}
            defaultDate={defaultDate}
            onUpsertButtonClick={onOpenModal}
          />

          <Table
            // columns={canPerformAction(tableListParams) ? getColumns() : null}
            columns={getColumns()}
            datasource={data}
            loading={loading}
            onChange={handleTableChange}
            pagination={{
              current: apiFilter.page,
              pageSize: apiFilter.limit,
              total: count,
              showSizeChanger: true,
              onShowSizeChange: onShowSizeChange,
            }}
          />
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (props) => {
  const { auth } = props;
  return auth;
};
export default connect(mapStateToProps)(createForm()(withRouter(Feedback)));
