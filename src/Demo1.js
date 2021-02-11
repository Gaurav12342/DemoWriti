import React, { useState, useEffect } from 'react';
import {
  DateRangePicker,
  TimePicker,
} from '../src/components/common/DatePicker/index';
import { getResidents } from '../src/services/api/routes/resident';
import { DateTimePicker } from '../src/components/common/DatePicker/index';
import enUS from 'rc-calendar/lib/locale/en_US';
import Tags from '../src/components/common/Tags';
import Badge from '../src/components/common/Badge';
import {
  Button,
  Input,
  Select,
  Option,
  TextArea,
} from '../src/components/common';
import axios from 'axios';
import { Filters } from '../src/assets/images/resident-detail/index';
import { Reminder } from '../src/assets/images/pmr/index';
import { Close } from '../src/assets/images/popup/index';
import { FirstPage, LastPage, Next, Prev } from '../src/assets/images/index';
import Uploader, {
  FILE_TYPES,
  FILE_CATEGORY,
} from './components/common/Upload/Uploader';
import moment from 'moment';
// import Pagination from "rc-pagination";
// import "rc-pagination/assets/index.less";
import { createForm } from 'rc-form';
import { toUpper } from 'lodash';

import SearchMedication from './components/SearchMedication/SearchMedicationCopy';
import InfiniteScroll from 'react-infinite-scroller';
// import { Input } from "./components/common";
import ErrorMsg from '../src/components/common/ErrorMsg';
import Search from '../src/components/common/Search';
import TimePickerPanel from 'rc-time-picker/lib/Panel';
import 'rc-time-picker/assets/index.css';
import Cascader from './components/CascaderFilter';
import AutoComplete from '../src/components/common/AutoComplete';
import PrescriptionModal from './containers/Resident/components/PrescriptionModal';
import Check from './components/common/CheckBox';
import HomeAreaFilter from './components/HomeAreaFilter';
import ReactTableScroll from 'rc-table-s';

const Demo1 = (props) => {
  // const [value, setValue] = useState("");
  // const [visible, setVisible] = useState(false);
  let errors;
  const [dispatchTime, setDispatchTime] = useState(
    moment('00:00:00', 'HH:mm:ss')
  );
  const [value, setValue] = useState('');
  const onChange = (value) => {
    console.log('handleChange', value);
    setValue(value);
  };

  // const handleChange = (value) => {
  //   console.log("handleChange", value);
  //   setValue(value);
  // };

  const handleValueChange = (value) => {
    setDispatchTime(value);
    console.log('value' + value);
  };
  const handleInputChange = (value) => {
    console.log('handleChange', value);
    setValue(value);
  };
  const data = [
    <a href='#' className='media offline'>
      <div className='media-body'>
        <h3 className='name'>Hightower, Madeleine</h3>
        {/* <p className="desc">Rx 123456</p> */}
      </div>
    </a>,
    <a href='#' className='media'>
      <div className='media-body'>
        <h3 className='name'>LaRoche, J. J.</h3>
      </div>
    </a>,
    <a href='#' className='media offline'>
      <div className='media-body'>
        <h3 className='name'>Van Pelt, Grace</h3>
      </div>
    </a>,
    <a href='#' className='media'>
      <div className='media-body'>
        <h3 className='name'>O'Laughlin, Craig</h3>
      </div>
    </a>,
    <a href='#' className='media'>
      <div className='media-body'>
        <h3 className='name'>Wayne, Rigsby</h3>
      </div>
    </a>,
    <a href='#' className='media'>
      <div className='media-body'>
        <h3 className='name'>Kimball, Cho</h3>
      </div>
    </a>,
    <a href='#' className='media'>
      <div className='media-body'>
        <h3 className='name'>Lisbon, Teresa</h3>
      </div>
    </a>,
    <a href='#' className='media'>
      <div className='media-body'>
        <h3 className='name'>wylie, Jason</h3>
      </div>
    </a>,
    <a href='#' className='media'>
      <div className='media-body'>
        <h3 className='name'>Vega, Michelle</h3>
      </div>
    </a>,
  ];
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const [residentData, setResidentData] = useState([]);
  const [abc, setAbc] = useState([]);
  const [data1, setData] = useState('');
  const [jsonData, setJsonData] = useState('');
  console.log('response', jsonData);

  console.log('abc', abc);
  const [hasMore, setHasMore] = useState(true);
  let scrollParentRef = null;
  useEffect(() => {
    setResidentData(data);
  }, []);

  const handleInfiniteOnLoad = (page) => {
    let arr = [...residentData];
    // arr = arr.concat(data1);
    if (arr.length === 18) setHasMore(false);
    setResidentData(arr);
  };

  const handleSubmit = () => {
    setVisible(true);
    props.form.validateFields((error, values) => {
      if (!error) {
        console.log('demo values', values);
      }
    });
  };

  const fileUpload = () => {
    let config = {
      headers: {
        Authorization:
          'JWT ' +
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWNmZjkyNTQ4ZWExMGY0ZDAzOTMxNThjIiwibmFtZSI6IkphbmUsIFN0YWNpIiwic2Vzc2lvbklkIjoiYmE3YjM0YTYtM2IwYy00ZWE2LWEzY2YtZTYzNzYwYTdlNjc2IiwiaG9tZUlkIjoiNWNkOTYzZWExZmQxNjAzYTA5YWU3ZjlmIiwidHlwZSI6NTIsInBhcmVudENsaWVudGVsZSI6W3siaWQiOiI1Y2Q5NjNlYTFmZDE2MDNhMDlhZTdmYTAifSx7ImlkIjoiNWRhMDBjYzIxYzQ0MzAyNjlkYTg5MWZjIn1dLCJsb2dpbkZyb20iOjEsInN1Yk51cnNlVHlwZSI6M30sImlhdCI6MTYwMjMxMjkyNSwiZXhwIjoxNjMzNDE2OTI1LCJhdWQiOiJyeC53cml0aS5jYSIsImlzcyI6InJ4LndyaXRpLmNhIn0.OsoGOlgqqu4huekkEJCVKlATYtcZAE6PpIiDUsvzspc',
      },
    };
    axios
      .post('http://192.168.0.133:3053/admin/user/upload-file', config)
      .then((response) => {
        console.log('response', response);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };
  const options = [
    {
      label: 'AA',
      value: 'fj',
      children: [
        {
          label: 'AA1',
          value: 'fuzhou',
          children: [
            {
              label: '马尾',
              value: 'mawei',
            },
          ],
        },
        {
          label: '泉州',
          value: 'quanzhou',
        },
      ],
    },
    {
      label: 'AB',
      value: 'zj',
      children: [
        {
          label: '杭州',
          value: 'hangzhou',
          children: [
            {
              label: 'Ab1',
              value: 'yuhang',
            },
          ],
        },
      ],
    },
    {
      label: 'Ac',
      value: 'bj',
      children: [
        {
          label: 'Ac1',
          value: 'chaoyang',
        },
        {
          label: '海淀区',
          value: 'haidian',
        },
      ],
    },
  ];

  const cols = [
    { text: 'id', valueKey: '_id', width: 40 },
    { text: 'name', valueKey: 'name', width: 150 },
    { text: 'date', valueKey: 'date', width: 150 },
  ];

  useEffect(() => {
    getResidentList();
  }, []);

  const modifiedList = (list) => {
    let modifiedList = list.map((current) => {
      return current;
    });
    return modifiedList;
  };

  const getResidentList = () => {
    // ...getResidents,
    // headers: {
    //   Authorization: tokenData,
    //   homeId: '5cd963ea1fd1603a09ae7f9f',
    //   homeIdentifier: 'th-1601612846755',
    // },
    // let tokenData =
    //   'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlblR5cGUiOiJhY2Nlc3MiLCJ1c2VyIjp7Il9pZCI6IjVmY2RmOGFlNmU4MWNmM2VjYmVlYzg0NCIsInNlc3Npb25JZCI6IjhhMDE2ZGUyLTIwZTMtNDgyNi05ZmI4LTYyZGJmYTkzNjYyOSIsImhvbWVJZCI6IjVjZDk2M2VhMWZkMTYwM2EwOWFlN2Y5ZiIsInR5cGUiOjIsImxvZ2luRnJvbSI6MX0sImlhdCI6MTYwODAwNzQ2NywiZXhwIjoxNjA4MDA4MDY3fQ.HgxovTsqFtTlERUInjsJMfoUgRXvDMUzx491MGjd0gw';

    axios({
      url: 'https://jsonplaceholder.typicode.com/todos',
      method: 'get',
    })
      .then((response) => {
        setJsonData(response.data);
        // response.data &&
        //   response.data.map((dd) => {
        //     setJsonData(dd);
        //     // console.log(dd.title)
        //   });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const table1Data = [
    {
      id: '1',
      groupName: 'gaurav',
      date: '12-12-12',
    },
    {
      id: '2',
      groupName: 'suresh',
      date: '12-12-12',
    },
    {
      id: '3',
      groupName: 'paresh',
      date: '12-12-12',
    },
    {
      id: '4',
      groupName: 'vijay',
      date: '12-12-12',
    },
    {
      id: '5',
      groupName: 'jay',
      date: '12-12-12',
    },
  ];

  const residentColumns = () => [
    {
      text: 'Resident',
      valueKey: 'mergeLFName',
      // key: 'mergeLFName',
    },
    {
      text: 'title',
      valueKey: 'title',
      render: (text) => <span>{text || '-'}</span>,
    },
    {
      text: 'Home Area',
      valueKey: 'homeAreaIds',
      render: (text) => <span>{text ? text.name : '-'}</span>,
    },
    {
      text: 'Physician',
      valueKey: 'doctorInfo',
      render: (text) => (
        <span style={{ wordWrap: 'break-word' }}>{text ? text : '-'}</span>
      ),
    },
    {
      text: 'HC #',
      valueKey: 'hc',
      render: (text) => <span>{text || '-'}</span>,
    },
  ];

  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      {/*new form component*/}
      <div className='form_row'>
        <div className='form_group col-xs-2 col-sm-2 col-md-4 col-lg-2 col-xl-2 required'>
          {/* <label>
            Label<span>*</span>
          </label>
          <Input placeholder='Input' className='form_control' disabled />{' '} */}
          {/*use disabled to disable input*/}
          {/* <input type="text" placeholder="Input" className="form_control" /> */}
          {/* <p className="error-msg">Enter input value</p> */}
        </div>
        {/* <div className='form_group col-2'>
          <label>
            Label<span>*</span>
          </label>
          <Select disabled>
            {' '}
            <Option>Abc</Option>
            <Option>Abc</Option>
          </Select>
        </div> */}
        {/* <div className='form_group col-2 inline_check'>
          <Check label={'sssss'} disabled={true} /> */}
        {/* <label className="filter_check">
            <input type="checkbox" />
            <span className="checkbox"></span>
            <span className="lbl">Virtual Visit Scheduled</span>
          </label> */}

        {/*pass true/false to disable*/}
        {/* </div> */}

        {/* <div className='form_group col-2 required'>
          <label>
            Name<span>*</span>
          </label>
          {props.form.getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: `Please enter name`,
                whitespace: true,
              },
            ],
          })(<Input placeholder={`Enter  Name`} />)}
        </div> */}
        {/* <div className='form_group col-2'>
          <label>
            Medicine<span>*</span>
          </label>
          {props.form.getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: `Please enter name`,
                whitespace: true,
              },
            ],
          })(<SearchMedication />)}
        </div> */}

        {/* <div className='form_group col-2'>
          <label>
            Cached Medicine<span>*</span>
          </label>
          <SearchMedication />
        </div> */}

        {/* <div className='form_group col-2'>
          <label>
            Search<span>*</span>
          </label>
          {props.form.getFieldDecorator('search', {
            rules: [
              {
                required: true,
                message: `Please enter name`,
                whitespace: true,
              },
            ],
          })(<Search onChange={() => console.log('ss')} allowClear={true} />)}
        </div> */}
        {/* <div className="form_wrap col-2">
          <label>Search<span>*</span></label>
                {props.form.getFieldDecorator('search', {
            rules: [{
              required: true, message: `Please enter name`,
              whitespace: true,
            }]
          })(
            <Search onChange={()=>console.log('ss')} allowClear={true}/>
          )}
 
 
        </div> */}
        {/* <div className='form_group col-2'>
          <label>
            Date & Time<span>*</span>
          </label>
          {props.form.getFieldDecorator('datetime', {
            rules: [
              {
                required: true,
                message: `Please enter name`,
                whitespace: true,
              },
            ],
          })(
            <DateTimePicker
              placeholder='Please select date'
              value={value}
              onChange={onChange}
              timePicker={true}
              format='DD/MM/YYYY HH:mm:ss'
              locale={enUS}
              disabled={true}
            />
          )}
        </div> */}
        {/* <div className='form_group col-2'>
          <label>
            Date Range<span>*</span>
          </label>
          {props.form.getFieldDecorator('daterange', {
            rules: [
              {
                required: true,
                message: `Please enter name`,
                whitespace: true,
              },
            ],
          })(
            <DateRangePicker
              placeholder='Start Date ~ End Date'
              value={value}
              onChange={handleInputChange}
              timePicker={false}
              format='DD-MM-YYYY'
              locale={enUS}
              disabled={true}
            />
          )}
        </div> */}
        {/* <div className='form_group col-2'>
          <label>
            Time Picker<span>*</span>
          </label>
          {props.form.getFieldDecorator('time', {
            rules: [
              {
                required: true,
                message: `Please enter name`,
                whitespace: true,
              },
            ],
          })(<TimePickerPanel />)}
        </div> */}
        {/* <div className='form_group col-2'>
          <label>
            Cascader<span>*</span>
          </label>
          {props.form.getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: `Please enter name`,
                whitespace: true,
              },
            ],
          })(
            <Cascader
              options={options}
              // value={['Ac', 'Ac1']}
              allowClear={true}
              onChange={(e) => console.log(e)}
              disabled={false}
            />
          )}
        </div> */}
        {/* <div className='form_group col-2'>
          <label>
            Autocomplete<span>*</span>
          </label>
          {props.form.getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: `Please enter name`,
                whitespace: true,
              },
            ],
          })(<AutoComplete disabled={false} />)}
        </div> */}
      </div>

      <div>
        <h2>GAurav</h2>
        <ReactTableScroll
          data={jsonData}
          cols={residentColumns()}
          showCheckbox={true}
          rowsClickHighlight={true}
          cellWithTitleAttr={true}
          onTableSelected={(e) => {
            setAbc(e);
          }}
        />
      </div>

      {/* <div className="form_group col-2 required">
        <label>
          Textarea<span>*</span>
        </label>
        {props.form.getFieldDecorator("textarea", {
          rules: [
            {
              required: true,
              message: `Please enter name`,
              whitespace: true,
            },
          ],
        })(<TextArea placeholder="input" disabled />)}
      </div> */}

      {/*new form component*/}
      {/* <div className="popup-content-log">
        <div className="form_wrap">
          <div className="components">
            {props.form.getFieldDecorator("name", {
              rules: [
                {
                  required: true,
                  message: "Please enter the name.",
                },
              ],
            })(<Input name="name" placeholder="Name" />)}
          </div>
          {(errors = props.form.getFieldError("name")) ? (
            <ErrorMsg errors={errors} />
          ) : null}
          <div className="components">
            {props.form.getFieldDecorator("city", {
              rules: [
                {
                  required: true,
                  message: "Please enter the city..",
                },
              ],
            })(<Input name="city" placeholder="City" />)}
          </div>
          {(errors = props.form.getFieldError("city")) ? (
            <ErrorMsg errors={errors} />
          ) : null}
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      </div> */}

      {/* <div>
        <Button
          onClick={() => {
            setVisible1(true);
          }}
        >
          Upload Logo
        </Button>
        <Uploader
          visible={visible1}
          onRequestClose={() => setVisible1(false)}
          multiple={true}
          uploadUrl={{ method: 'post', url: "http://192.168.0.109:3053/admin/upload-file" }}
          extraData={{
            category: [FILE_CATEGORY.IMAGE].join(',')
          }}
          // allowedTypes={[FILE_TYPES.IMAGE, FILE_TYPES.PDF]}
          maxSizeInMB={1}
          onError={(err) => {
            console.log("on error => ", err);
          }}
          onSuccess={(uploaded) => {
            console.log("uploaded response => ", uploaded);
          }}
        />
      </div> */}

      {/* <HomeAreaFilter onChange={(e) => console.log(100, e)} />
      <PrescriptionModal visible={visible} /> */}
      {/* <div className="searchlist">
        <div className="listing" ref={(ref) => (scrollParentRef = ref)}>
          <InfiniteScroll
            initialLoad={false}
            loadMore={handleInfiniteOnLoad}
            hasMore={hasMore}
            // loader={
            //   <div className="loader" key={0}>
            //     Loading ...
            //   </div>
            // }
            useWindow={false}
            getScrollParent={() => scrollParentRef}
          >
            {residentData.map((x) => x)}
          </InfiniteScroll>
        </div>
      </div> */}

      {/* <div style={{ marginTop: '100px' }}></div>
      <SearchMedication /> */}
      {/* <Button className="screen-btn gray-btn">Gaurav</Button> <br /> */}
      {/* <div className="date_range">
        <DateRangePicker
          placeholder="Start Date ~ End Date"
          value={value}
          onChange={handleChange}
          timePicker={false}
          format="DD-MM-YYYY"
          locale={enUS}
        // disabled={false}
        />
      </div>
      <br /> */}

      {/* <Tags>Submitted</Tags>
      <Tags className="in_process">In Process</Tags>
      <Tags className="edited">Edited</Tags>
      <Tags className="ph_review">Physician Review</Tags>
      <Tags className="uploaded">Uploaded</Tags> */}

      {/* ====================== */}

      {/* <div className="actions">
        <Badge title="Reminder" icon={<Reminder />} count={20} className="" />
      </div> */}

      {/* <TimePicker
        value={dispatchTime}
        onChange={handleValueChange}
        showSecond={true}
        showHour={true}
        showMinute={true}
        allowEmpty
        defaultValue={moment('00:00:00', 'HH:mm:ss')}
        disabled={true}
      /> */}

      {/* <ReactPaginate total={20}   /> */}
    </>
  );
};

export default createForm()(Demo1);
