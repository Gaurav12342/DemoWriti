import React, { useEffect, useState } from 'react';
import Table from '../../../components/common/Table/index';
import PageHead from '../../../containers/Customers/ImagingDiagnostics/components/PageHead';
import axios from '../../../services/api/config';
import { Edit } from '../../../assets/images/resident-detail/index';
import { CLIENTELE_TYPE } from '../../../constants/Customer';
import {
  imagingDiagnosticsPaginate,
  imagingDiagnosticsUpdate,
} from '../../../services/api/routes/customer';
import routes from '../../../routes/constant';
import ActiveDeactive from '../../../components/common/ActiveDeactive';
const _ = require('lodash');

const ImagingDiagnostics = (props) => {
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState({
    page: 1,
    limit: 10,
    fields: [],
    find: {},
    filter: {
      type: CLIENTELE_TYPE.IMAGING_DIAGNOSTIC,
    },
    sortBy: { createdAt: 'DESC' },
  });
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (filter.hasOwnProperty('search') && filter.search['keyword']) {
      const delayDebounceFn = setTimeout(() => {
        fetch();
      }, 600);
      return () => clearTimeout(delayDebounceFn);
    } else fetch();
  }, [filter]);

  const modifiedList = (list) => {
    let modifiedList = list.map((current) => {
      return current;
    });
    return modifiedList;
  };

  const fetch = () => {
    setLoading(true);
    axios({ ...imagingDiagnosticsPaginate, data: { query: { ...filter } } })
      .then((response) => {
        if (response.data.code === 'OK') {
          let updatedList = modifiedList(response.data.data.data);
          setData(updatedList);
          setTotal(response.data.data.count);
          setLoading(false);
        } else {
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  const handleTableChange = (pagination, tfilter, sorter) => {
    if (!pagination) return;
    let tempFilter = filter;
    tempFilter = {
      ...tempFilter,
      page: pagination.current,
      limit: pagination.pageSize,
    };
    if (tfilter && Object.keys(tfilter).length) {
      if (tfilter.isActive && tfilter.isActive.length) {
        tempFilter.find.isActive = tfilter.isActive;
      } else if (tempFilter.find.isActive) {
        delete tempFilter.find['isActive'];
      }
      tempFilter.page = pagination.current;
    } else {
    }
    setFilter(tempFilter);
  };

  const onShowSizeChange = (size) => {
    if (size) {
      setFilter((prevFilter) => ({ ...prevFilter, limit: size , page: 1}));
    }
  };

  const handleSearch = (event) => {
    let value = event.target.value;
    let obj = {
      ...filter,
      pageNo: 1,
      search: {
        keyword: value,
        keys: ['name', 'emails.email'],
      },
    };
    setFilter(obj);
  };

  const handleActiveDeactive = (record) => {
    let tempData = data.map((rec) => {
      if (rec._id === record._id) {
        return { ...rec, isActive: !rec.isActive };
      } else {
        return rec;
      }
    });
    setData(tempData);
  };

  const getColumns = () => [
    {
      title: 'Sr.No',
      keyword: 'index',
      dataIndex: 'index',
      render: (text, record, index) =>
        (filter.page - 1) * filter.limit + (index + 1),
    },
    {
      title: 'Name.',
      dataIndex: 'name',
      render: (text, record) => <>{text ? text : ''}</>,
    },
    {
      title: 'Email',
      dataIndex: 'emails',
      render: (text) => <span>{text ? text[0].email : ''}</span>,
    },
    {
      title: 'Phone No',
      dataIndex: 'phone',
      render: (text) => (
        <span style={{ textTransform: 'capitalize' }}>{text ? text : ' '}</span>
      ),
    },
    {
      title: 'Unique No',
      dataIndex: 'uniqueNo',
      render: (text) => (
        <span style={{ textTransform: 'capitalize' }}>{text ? text : ' '}</span>
      ),
    },
    {
      title: 'Active',
      dataIndex: 'isActive',
      render: (text, record) => (
        <span style={{ textTransform: 'capitalize' }}>
          <ActiveDeactive
            documentId={record._id}
            API={imagingDiagnosticsUpdate}
            record={record}
            isActive={record.isActive}
            model='master'
            onActiveDeactive={(record) => {
              handleActiveDeactive(record);
            }}
          />
        </span>
      ),
      filters: [
        { text: 'Active', value: true },
        { text: 'De-active', value: false },
      ],
      onFilter: (value, record) => record.isActive === value,
    },
    {
      title: 'Action',
      showRefresh: true,
      render: (text, record) => (
        <>
          <div className='actions'>
            <a
              onClick={() => {
                props.history.push(
                  `${routes.imagingUpsert.path}/${record._id}`
                );
              }}
            >
              <Edit />
              <p>Edit</p>
            </a>
          </div>
        </>
      ),
    },
  ];

  const handleRedirect = () => {
    props.history.push(routes.imagingUpsert.path);
  };

  return (
    <>
      <div className='container'>
        <div className='pmr_wrap'>
          <PageHead
            total={total}
            onRedirect={handleRedirect}
            onSearch={handleSearch}
          />
          <Table
            columns={getColumns()}
            datasource={data}
            loading={loading}
            onChange={handleTableChange}
            pagination={{
              current: filter.page,
              pageSize: filter.limit,
              total: total,
              showSizeChanger: true,
              onShowSizeChange: onShowSizeChange,
            }}
          />
        </div>
      </div>
    </>
  );
};

export default ImagingDiagnostics;
