import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { createForm } from 'rc-form';
import { withRouter } from 'react-router-dom';
import { Toast, Dialog } from '../../../../components/common';
import { upsertPmrGroup } from '../../../../services/api/routes/pmr';
import { getResidents } from '../../../../services/api/routes/resident';
import axios from '../../../../services/api/config';
import UpsertForm from './UpsertForm';
import moment from 'moment-timezone';
import { STATUS } from '../../../../constants/resident';
const _ = require('lodash');

const Upsert = (props) => {
  const { form, visible, onCancel, data, onOk, authUser } = props;
  const homeAreaId = _.find(data?.homeAreaIds, 'id');
  const [isSetPref, setIsSetPref] = useState(true);
  const [residentList, setResidentList] = useState('');
  const [loadResident, setLoadResident] = useState(false);
  const [saveLoader, setSaveLoader] = useState(false);
  const errorRef = useRef(false);

  // const [homeArea, setHomeArea] = useState(homeAreaId?.id ?? '');
  const [homeArea, setHomeArea] = useState(
    _.map(data?.homeAreaIds, (dd) => {
      return dd.id;
    })
  );

  const [selectedResident, setSelectedResident] = useState([]);
  const [total, setTotal] = useState('');
  const [filter, setFilter] = useState({
    sortBy: { mergeLFName: 'ASC' },
    fields: [],
    find: {},
    populate: [
      {
        homeAreaId: ['name'],
      },
      { pmrGroup: ['groupName', 'status', 'patients'] },
      {
        'physicianId': [
          "mergeLFName",
          "type",
          {
            "assignedCustomer": [
              "isActive",
              "homeId",
              {
                "designationId": [
                  "name",
                  "code",
                  "parentId"
                ]
              }
            ]
          }
        ]
      }
    ],
  });

  useEffect(() => {
    if (homeArea) {
      if (filter.hasOwnProperty('search') && filter.search['keyword']) {
        const delayDebounceFn = setTimeout(() => {
          getResidentList();
        }, 600);
        return () => clearTimeout(delayDebounceFn);
      } else getResidentList();
    }
  }, [homeArea, filter]);

  const handleSelectedResident = (data) => {
    setSelectedResident(data);
  };

  const handleHomeArea = (value) => {
    setHomeArea(value);
  };

  const getResidentList = () => {
    setLoadResident(true);
    axios({
      ...getResidents,
      data: {
        query: {
          ...filter,
          find: {
            homeAreaId: homeArea,
            status: STATUS.ACTIVE,
          },
        },
      },
      headers: {
        homeId: authUser.homeId?._id,
        homeIdentifier: authUser.homeId?.homeIdentifier,
        isCustom: true,
      },
    })
      .then((response) => {
        if (response.data.code === 'OK') {
          let u = []
          let userGroupWise = _.groupBy(response.data.data.data, (x) => {
            return x.homeAreaId.name
          });
          userGroupWise = _.map(userGroupWise, (user) => {
            u.push(_.sortBy(user, ["mergeLFName"]))

          })
          u = _.flatten(u)
          _.map(u, function (x) {
            if (data) {
              _.map(data?.patients, (dd) => {
                if (x._id == dd.id) {
                  x.id = x._id;
                  x.selected = true;
                  setSelectedResident(data?.patients);
                }
                // else if(selectedResident.find(x => x.id === dd.id)){
                //   x.selected = true
                // }
              });
            }
            x.id = x._id;
            if (selectedResident.find(y => y.id === x.id)) {
              x.selected = true
            }
            delete x._id;
            return x;
          });
          // setSelectedResident(old => [...old,data?.patients.filter(x => !!x.selected)]);
          setResidentList(u);
          setTotal(response.data.data.count);
          setLoadResident(false);
        } else {
          setLoadResident(false);
        }
      })
      .catch((error) => {
        setLoadResident(false);
      });
  };

  const handleSearch = (e) => {
    let value = e.target.value;
    let obj = {
      ...filter,
      page: 1,
      search: {
        keyword: value,
        keys: ['mergeLFName'],
      },
    };
    setFilter(obj);
  };

  const handleSave = () => {
    setSaveLoader(true);
    form.validateFields((error, values) => {
      if (!error) {
        let obj = _.clone(values);
        obj.timeZone = moment.tz.guess(true);
        const dateStart = new Date(obj.endDate);
        const dateEnd = new Date(obj.startDate);
        obj.endDate = dateStart.toISOString();
        obj.startDate = dateEnd.toISOString();
        obj.pharmacyId = authUser?.pharmacyId?._id;

        if (selectedResident) {
          let abc = [];
          _.map(selectedResident, (data) => {
            abc.push(data.id);
          });
          obj.patients = abc;
        }
        if (data?._id) {
          obj.id = data._id;
        }
        if (obj?.homeAreaIds) {
          let abc = [];
          obj.homeAreaIds.map((data) => {
            abc.push({ id: data });
          });
          obj.homeAreaIds = abc;
        }
        if (
          values.pushDays &&
          values.dueDays &&
          _.size(values.dueDays) > 0 &&
          _.size(values.pushDays) > 0
        ) {
          obj.dueDays = parseInt(values.dueDays);
          obj.pushDays = parseInt(values.pushDays);
        }
        if (selectedResident && selectedResident.length > 0) {
          if (data && data._id) {
            let { method, url, baseURL } = upsertPmrGroup;
            axios({ method, url, baseURL, data: obj })
              .then((response) => {
                if (response.data.code === 'OK') {
                  setSaveLoader(false);
                  Toast.success(response.data.message);
                  onCancel();
                  onOk();
                }
              })
              .catch((error) => {
                setSaveLoader(false);
                Toast.error(error);
              });
          } else {
            let { method, url, baseURL } = upsertPmrGroup;
            axios({ method, url, baseURL, data: obj })
              .then((response) => {
                if (response.data.code === 'OK') {
                  setSaveLoader(false);
                  Toast.success(response.data.message);
                  onCancel();
                  onOk();
                }
              })
              .catch((error) => {
                setSaveLoader(false);
                Toast.error(error);
              });
          }
        } else {
          setSaveLoader(false);
          Toast.error('Please select the resident.');
        }
      } else {
        setSaveLoader(false);
        Toast.error(error);
      }
    });
  };

  return (
    <>
      <Dialog
        visible={visible}
        title={`${data && data._id ? 'Edit' : 'Add'} PMR Schedule Group`}
        onOk={handleSave}
        onCancel={onCancel}
        okText={`${data && data._id ? 'Update' : 'Save'}`}
        okButtonProps={{ loading: saveLoader }}
        style={{ width: '900px' }}
      >
        <UpsertForm
          form={form}
          getDetail={data}
          isSetPref={isSetPref}
          loadResident={loadResident}
          residentList={residentList}
          total={total}
          // defaultValues={homeAreaId?.id}
          defaultValues={_.map(data?.homeAreaIds, (dd) => {
            return dd.id;
          })}
          onHomeArea={handleHomeArea}
          onHomeAreaValue={homeArea}
          onResidentId={handleSelectedResident}
          onSearch={handleSearch}
        />
      </Dialog>
    </>
  );
};

const mapStateToProps = ({ auth }) => {
  const { authUser } = auth;
  return {
    authUser,
  };
};

export default connect(mapStateToProps)(createForm()(withRouter(Upsert)));
