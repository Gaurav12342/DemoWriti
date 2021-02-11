/* eslint-disable react/display-name */
/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from "react";
import { Close } from "../src/assets/images/popup/index";
import Upload from "../src/components/common/Upload/index";
import Uploader, { fileTypes } from "./components/common/Upload/Uploader";

import axios from "./services/api/services/common";
import {
  TabList,
  TabPanel,
  Tab,
  Tabs,
} from "../src/components/common/Tabs/index";
import Button from "../src/components/common/Button";
import CheckBox from "../src/components/common/CheckBox";
import RadioButton from "../src/components/common/RadioButton";
import ConfirmPopup from "./components/common/Popup/ConfirmPopup";
import DeleteNote from "./components/NotesPopup/Delete";
import { NoteList } from "./components/NotesPopup";
import Modal from "../src/components/common/Popup/index";
import UpsertNote from "../src/components/NotesPopup/Upsert";
import ViewNote from "../src/components/NotesPopup/View";
// import Datepicker from './components/common/DatePicker/DatePicker';
import { FirstPage, LastPage, Next, Prev } from "../src/assets/images/index";
import Picker from "rc-calendar/lib/Picker";
import RangeCalendar from "rc-calendar/lib/RangeCalendar";
import zhCN from "rc-calendar/lib/locale/zh_CN";
import enUS from "rc-calendar/lib/locale/en_US";
import TimePickerPanel from "rc-time-picker/lib/Panel";
import {
  DateRangePicker,
  DateTimePicker,
} from "../src/components/common/DatePicker/index";
import Tags from "../src/components/common/Tags";
import "rc-calendar/assets/index.css";
import "rc-time-picker/assets/index.css";
import { UpperCaseStr } from "./util/common";
import { Toast } from "./components/common/index";
// import { RadioGroup, Radio } from "react-radio-group";
import RadioGroup from "../src/components/common/RadioGroup";

// import 'moment/locale/it.js';
// import '../node_modules/rc-datepicker/lib/style.css';
// import { DatePicker, DatePickerInput } from '../node_modules/rc-datepicker';
import moment from "moment";
import "rc-calendar/assets/index.css";

import "moment/locale/zh-cn";
import "moment/locale/en-gb";
import Search from "../src/components/common/Search";
import Input from "../src/components/common/Input";
import TextArea from "../src/components/common/TextArea";
import ReactPaginate from "../src/components/common/ReactPaginate";
// import Table from 'rc-table';
// import Tables from "../src/components/common/Table";
import { Cancel, Edit } from "../src/assets/images/resident-detail/index";
import master from "../src/assets/files/JSON/master.json";
import Table from "./components/common/Table/index";
import { Column_classNames } from "./constants/Columns";
import { Notes, View } from "./assets/images/pmr";
// import Pagination from 'react-js-pagination';
import Cascader from "./components/CascaderFilter";
import ActiveDeactive from "./components/common/ActiveDeactive";
import ReminderForm from "./components/common/Reminder";
import Support from "../src/containers/Support/index";
import Feedback from "../src/containers/Feedback/index";
import AutoComplete from "../src/components/common/AutoComplete";
import drugs from "../src/assets/files/JSON/drugs.json";
// import RadioGroup from "../src/components/common/RadioGroup";
import SearchMedication from "./components/SearchMedication";
import ViewTypeFilter from "./components/Todo/ViewTypeFilter";

// import ViewTypeFilter from "./components/Todo/ViewTypeFilter";

// import axios from "../src/services/api/config";
import { CLIENTELE_TYPE } from "../src/constants/Customer";
import { customerPaginate } from "../src/services/api/routes/customer";

const Demo1 = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const [writiModal, setWritiModal] = useState(false);
  const [feedbackModal, setFeedbackModal] = useState(false);
  const [selectedRadioValue, setSelectedRadioValue] = useState("apple");
  const [radioValue, setRadioValue] = useState("");
  console.log("radio button value", radioValue);
  const [visible, setVisible] = useState(false);

  const [value, setValue] = useState("");
  const [reminder, setReminder] = useState(false);
  const state = {
    activePage: 15,
  };

  const handleRadioValue = (e) => {
    setRadioValue(e.target.value);
  };

  const [filterData, setFilterData] = useState({
    page: 1,
    limit: 10,
    filter: {
      type: CLIENTELE_TYPE.PHARMACY_HEAD,
    },
  });
  useEffect(() => {
    fetch();
  }, [filterData, filterData.filter]);

  const fetch = () => {
    axios({ ...customerPaginate, data: filterData })
      .then(({ data }) => {
        console.log("TCL: fetch -> data", data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const [getDate, setDate] = useState(moment());

  // const [fruite, setFruites] = useState([
  //   { id: 1, value: 'banana', isChecked: false },
  //   { id: 2, value: 'apple', isChecked: false },
  //   { id: 3, value: 'mango', isChecked: true },
  //   { id: 4, value: 'grap', isChecked: false },
  // ]);

  // const handleAllChecked = (event) => {
  //   let fruites = fruite;
  //   fruites.forEach((fruite) => (fruite.isChecked = event.target.checked));
  //   setFruites(fruites);
  // };

  // const handleCheckChieldElement = (event) => {
  //   console.log('Check chield', event.target.value);
  //   let fruites = fruite;
  //   fruites.forEach((fruite) => {
  //     if (fruite.value === event.target.value)
  //       fruite.isChecked = event.target.checked;
  //   });
  //   setFruites(fruites);
  // };

  const handleInputChange = (value) => {
    console.log("handleChange", value);
    setValue(value);
  };

  const onChange = (value) => {
    console.log("handleChange", value);
    setValue(value);
  };

  const handlePopupModal = () => {
    setOpenModal(true);
  };

  const dialogClose = () => {
    setOpenModal(false);
  };

  const handleChange = (page, pageSize) => {
    console.log("dsdssds", page);
    console.log("aaaaaa", pageSize);
  };

  const handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
  };

  const handleWritiModal = () => {
    setWritiModal(true);
  };

  const handleWritiModalClose = () => {
    setWritiModal(false);
  };

  const handleFeedbackModal = () => {
    setFeedbackModal(true);
  };
  const handleFeedbackModalClose = () => {
    setFeedbackModal(false);
  };

  const handleChangeRadio = (value) => {
    setSelectedRadioValue(value);
    // this.setState({ selectedValue: value });
  };

  const [filter, setFilter] = useState({
    page: 1,
    limit: 10,
  });

  const active = {
    Active: 1,
    deactive: 2,
    InterMediate: 3,
  };

  const handleTableChange = (pagination, filter, sorter) => {
    if (pagination) {
      setFilter({
        page: pagination.current,
        limit: pagination.pageSize,
      });
    }
  };

  const onShowSizeChange = (size) => {
    console.log("TCL: onShowSizeChange -> size", size);
    if (size) {
      setFilter((prevFilter) => ({ ...prevFilter, limit: size, page: 1 }));
    }
  };

  const columns = [
    {
      title: "Sr.No",
      classname: Column_classNames.sr,
      key: "index",
      width: "4%",
      render: (text, record, index) =>
        (filter.page - 1) * filter.limit + (index + 1),
    },
    {
      title: "Resident",
      dataIndex: "resident",
      // width:'20%',
      classname: Column_classNames.Resident,
      key: "resident",
      sorter: (a, b) => a.resident - b.resident,
      render: (text, record) => <span>{UpperCaseStr(text)}</span>,
    },
    {
      title: "Home Area",
      dataIndex: "home",
      // width:'15%',
      classname: Column_classNames.HomeArea,
      key: "home",
      render: (text, record) => <span>{text}</span>,
    },
    {
      title: "pmr No",
      dataIndex: "pmrNo",
      // width:'7%',
      classname: Column_classNames.pmr,
      key: "pmrNo",
      render: (text, record) => <span>{text}</span>,
    },
    {
      title: "Physician",
      dataIndex: "Physician",
      // width:'20%',
      classname: Column_classNames.physician,
      render: (text, record) => <span>{text}</span>,
      key: "index",
    },
    {
      title: "Age",
      dataIndex: "age",
      // width:'6%',
      classname: Column_classNames.sr,
      sorter: (a, b) => a.age - b.age,
      render: (text, record) => <span>{text}</span>,
      key: "index",
    },
    {
      title: "Status",
      // width:'10%',
      dataIndex: "isActive",
      classname: Column_classNames.physician,
      render: (text, record) => (
        <span>
          {Object.keys(active).map((k) => {
            return active[k] === text ? k : null;
          })}
        </span>
      ),
      filters: [
        { text: "Active", value: 1 },
        { text: "De-Active", value: 2 },
        { text: "InterMediate", value: 3 },
      ],
      onFilter: (value, record) => record.isActive === value,
    },
    {
      title: "action",
      showRefresh: true,
      className: Column_classNames.Actions,
      width: "5%",
      render: (text, record) => {
        return (
          <div className="patient_order_d ac">
            <div className="actions">
              <a
                onClick={() => console.log("View Clicked", record.resident)}
                style={{ height: "20px" }}
              >
                <View />
                <p>View</p>
              </a>
              <a style={{ height: "20px" }}>
                <Notes />
                <p>Notes</p>
                <span className="notes tot">05</span>
              </a>
            </div>
          </div>
          // </div>
        );
      },
    },
  ];

  const data = [
    {
      resident: "Hightower, Madeleine",
      home: "Primary",
      age: 20,
      date: "23rd Sep 1988",
      pmrNo: "PMR 123456",
      Physician: "Dr. Osvaldo Ardiles",
      isActive: 3,
      // description: {
      //   orders: [
      //     " 5 teaspoon baking soda in six ounces water. Swish and then spit out, three lorem ipsum is a dummy text. Lorem ipsum is a dummy text.",
      //     " 5 teaspoon baking soda in six ounces water. Swish and then spit out, three lorem ipsum is a dummy text. Lorem ipsum is a dummy text.",
      //     " 5 teaspoon baking soda in six ounces water. Swish and then spit out, three lorem ipsum is a dummy text. Lorem ipsum is a dummy text."
      //   ],
      //   Direction: [
      //     " 5 teaspoon baking soda in six ounces water. Swish and then spit out, three lorem ipsum is a dummy text. Lorem ipsum is a dummy text.",
      //     " 5 teaspoon baking soda in six ounces water. Swish and then spit out, three lorem ipsum is a dummy text. Lorem ipsum is a dummy text.",
      //     " 5 teaspoon baking soda in six ounces water. Swish and then spit out, three lorem ipsum is a dummy text. Lorem ipsum is a dummy text."
      //   ]
      // }
    },
  ];
  // const data = [
  //   { name: "Jack", age: 28, address: "some where", key: "1" },
  //   { name: "Rose", age: 36, address: "some where", key: "2" },
  // ];

  return (
    <>
      {/* <RadioGroup
        name="selectedRadioValue"
        selectedValue={radioValue}
        // value={radioValue}
        onChange={handleRadioValue}
      >
        <label>
          <Radio id="apple" value="apple" />
          Apple
        </label>
        <label>
          <Radio id="orange" value="orange" />
          Orange
        </label>
        <label>
          <Radio id="watermelon" value="watermelon" />
          Watermelon
        </label>
      </RadioGroup> */}

      {/* <RadioGroup
        options={[
          { label: "Male", value: "Male" },
          { label: "Female", value: "Female" },
          { label: "Other", value: "Other" },
        ]}
        name="gender"
        value={radioValue}
        // checked="Male"
        onChange={handleRadioValue}
      /> */}

      {/* <CheckBox onClick={handleAllChecked} />
      Check / Uncheck All
      <ul>
        {fruite.map((fruite) => {
          return (
            <li>
              <CheckBox
                onClick={handleCheckChieldElement}
                checked={fruite.isChecked}
                value={fruite.value}
              />
              {fruite.value}
            </li>
          );
        })}
      </ul>
      <ul> */}
      {/* <ActiveDeactive></ActiveDeactive>
      <Button loading={true} onClick={handlePopupModal}>
        Ok
      </Button>

      <Button
        type="secondary"
        loading={false}
        // className='btn grey-btn'
        // size='sm'
        onClick={handlePopupModal}
      >
        Cancel
      </Button>
      <br />
      {openModal && (
        <Modal
          visible={openModal}
          title="Add"
          maskClosable={true}
          closeIcon={<Close />}
          onCancel={dialogClose}
          onClose={dialogClose}
        >
          <p>first dialog</p>
        </Modal>
      )}

      <UpsertNote
        // visible={openModal}
        onClose={dialogClose}
      />

      <div className="form_wrap">
        <Search placeholder="search" />
        <Input placeholder="input" />
        <TextArea placeholder="input" />
      </div>
      <br />

      <div className="form_wrap">
        <DateRangePicker
          placeholder="Start Date ~ End Date"
          value={value}
          onChange={handleInputChange}
          timePicker={false}
          format="DD-MM-YYYY"
          locale={enUS}
          disabled={false}
        />
      </div>

      <div className="pagination_wrap">
        <ReactPaginate
          totalItemsCount={45}
          activePage={5}
          onChange={(pageNumber) => {
            console.log("pageNumber", pageNumber);
          }}
        // prevPageText={<Prev />}
        // nextPageText={<Next />}
        // firstPageText={<FirstPage />}
        // lastPageText={<LastPage />}
        />
      </div> */}
      {/* <Tables columns={columns} data={master} /> */}
      {/* <Table columns={columns} data={master} /> */}

      <>
        <div style={{ marginTop: 200 }}>
          <button
            className="prev-screen-btn sh-btn"
            onClick={() => setVisible(true)}
          >
            {" "}
            File Uplaoder
          </button>
        </div>
        <Uploader
          visible={visible}
          onRequestClose={() => setVisible(false)}
          multiple
          uploadUrl="http://192.168.0.133:3053/admin/user/upload-file"
          maxSizeInMB={1}
          uploadOnSelect
          onError={(err) => {
            console.log("on error => ", err);
          }}
          onSuccess={(uploaded) => {
            console.log("uploaded response => ", uploaded);
          }}
        />
      </>
      <br />
      <div style={{ marginTop: "100px" }}>
        <Button onClick={() => console.log("clicked")} loading={true} size="lg">
          Testing
        </Button>
        <br />
        <br />
        <br />
        {/* <SearchMedication /> */}
      </div>
      <br />
      <Button className="prev-screen-btn sh-btn" onClick={handleWritiModal}>
        Support
      </Button>
      {writiModal && (
        <Support
          visible={writiModal}
          title="Support"
          onClose={handleWritiModalClose}
          maskClosable={true}
          onCancel={handleWritiModalClose}
        />
      )}

      <Button type="secondary" onClick={handleFeedbackModal}>
        Feedback
      </Button>
      {feedbackModal && (
        <Feedback
          visible={feedbackModal}
          title="Feedback"
          onClose={handleFeedbackModalClose}
          onCancel={handleFeedbackModalClose}
          maskClosable={true}
          okText="Submit"
          cancelText="Cancel"
        // onOk={handleFeedbackSubmit}
        />
      )}

      <Table
        // style={{ width: "1050px" }}
        columns={columns}
        datasource={data}
        pagination={false}
        // descColumn="description"
        // showDescription={true}
        pagination={{
          pageSize: filter.limit,
          showSizeChanger: true,
          onShowSizeChange: onShowSizeChange,
          total: data.length,
        }}
        loading={false}
        onChange={handleTableChange}
      />
      <br />

      <DateTimePicker
        placeholder="Please select date"
        value={value}
        onChange={onChange}
        timePicker={true}
        format="DD/MM/YYYY HH:mm:ss"
        locale={enUS}
        disabled={false}
      />
      <Button
        onClick={() => {
          setReminder(true);
        }}
      >
        set reminder
      </Button>
      {reminder ? (
        <ReminderForm
          visible={reminder}
          onOk={() => setReminder(false)}
          onCancel={() => setReminder(false)}
        />
      ) : null}

      {/* <Pagination /> */}
    </>
  );
};

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.dialogClose = () => {
      this.setState({ openModal: false });
    };
    this.state = {
      visible: false,
      openModal: false,
      tabArr: [
        { tabtitle: "A", records: 100 },
        { tabtitle: "B", image: "" },
        { tabtitle: "C", image: "" },
      ],
      fruites: [
        { id: 1, value: "banana", isChecked: false },
        { id: 2, value: "apple", isChecked: false },
        { id: 3, value: "mango", isChecked: true },
        { id: 4, value: "grap", isChecked: false },
      ],
    };
    this.uploaderProps = {
      // action: 'http://localhost:3000/admin/file-upload-server',
      accept: ["image/jpeg", "image/png", "image/jpg"],
      showFileList: true,
      // fileList: this.state.fileList,
      beforeUpload(file) {
        console.log("beforeUpload", file.name);
      },
      onChange: (info) => this.onFileChange(info),
    };
  }

  onChange = (e) => {
    console.log("radio checked", e.target.value);
    this.setState({
      value: e.target.value,
    });
  };
  handleApi = async () => {
    //   let res=await axios({ url:'admin/subscription-group/paginate',method:"POST" })
    //   console.log("TCL: Demo -> handleApi -> res", res)
    // //   .then(({ data }) => {
    // //   console.log("TCL: Demo -> handleApi -> data", data)
    // // })
  };
  onFileChange = (info) => {
    console.log("Demo -> onFileChange -> info", info);
    this.setState({ fileList: info.fileList });
  };

  handleAllChecked = (event) => {
    let fruites = this.state.fruites;
    fruites.forEach((fruite) => (fruite.isChecked = event.target.checked));
    this.setState({ fruites: fruites });
  };

  handleCheckChieldElement = (event) => {
    console.log("Check chield", event.target.value);
    let fruites = this.state.fruites;
    fruites.forEach((fruite) => {
      if (fruite.value === event.target.value)
        fruite.isChecked = event.target.checked;
    });
    this.setState({ fruites: fruites });
  };

  handlePopupModal() {
    this.setState({ openModal: true });
  }

  render() {
    const { tabArr } = this.state;
    // console.log('Check all', this.state.fruites);
    const options = [
      {
        label: "AA",
        value: "fj",
        children: [
          {
            label: "AA1",
            value: "fuzhou",
            children: [
              {
                label: "马尾",
                value: "mawei",
              },
            ],
          },
          {
            label: "泉州",
            value: "quanzhou",
          },
        ],
      },
      {
        label: "AB",
        value: "zj",
        children: [
          {
            label: "杭州",
            value: "hangzhou",
            children: [
              {
                label: "Ab1",
                value: "yuhang",
              },
            ],
          },
        ],
      },
      {
        label: "Ac",
        value: "bj",
        children: [
          {
            label: "Ac1",
            value: "chaoyang",
          },
          {
            label: "海淀区",
            value: "haidian",
          },
        ],
      },
    ];
    return (
      <>
        <div
          style={{ marginTop: "100px" }}
          onChange={this.onChange}
          value={this.state.value}
        >
          <RadioButton value={1}>A</RadioButton>
          <RadioButton value={2}>B</RadioButton>
        </div>
        <div>
          <Button onClick={() => Toast.success("Success Success Success")}>
            Success
          </Button>
          <br />
          <br />
          <Button onClick={() => Toast.error("Success Success Success")}>
            Error
          </Button>
          <br />
          <br />
          <Button onClick={() => Toast.warn("Success Success Success")}>
            Warn
          </Button>
          <br />
          <br />
          <Button onClick={() => Toast.info("Success Success Success")}>
            Normal
          </Button>
          <br />
          <br />
        </div>
        <div>
          <Button onClick={this.handleApi}>Success</Button>
          <br />
          <br />
          <Button onClick={() => Toast.error("Success Success Success")}>
            Error
          </Button>
          <br />
          <br />
          <Button onClick={() => Toast.warn("Success Success Success")}>
            Warn
          </Button>
          <br />
          <br />
          <Button onClick={() => Toast.info("Success Success Success")}>
            Normal
          </Button>
          <br />
          <br />
        </div>
        {/* <SearchMedication /> */}
        <Cascader
          options={options}
          // value={['Ac', 'Ac1']}
          allowClear={true}
          onChange={(e) => console.log(e)}
        />
        <ViewTypeFilter />
        <Demo1 />
        <Upload {...this.uploaderProps}>
          <button>Uplaod</button>
        </Upload>
        <Tabs defaultIndex={this.state.activeIndex || 0}>
          <TabList>
            {tabArr.map((d, index) => {
              return (
                <Tab
                  key={d.tabtitle}
                  title={d.tabtitle}
                  count={d.records}
                  closeable={true}
                  onCloseTab={() => {
                    console.log("Demo -> render -> data, newIndex", d, index);
                  }}
                />
              );
            })}
          </TabList>
          <TabPanel>
            <h2>Any content 1</h2>
          </TabPanel>
          <TabPanel>
            <h2>Any content 2</h2>
          </TabPanel>
          <TabPanel>
            <h2>Any content 3</h2>
          </TabPanel>
        </Tabs>
        <Button
          type="submit"
          name="btn"
          onClick={() => {
            alert("Hii.........");
          }}
          width="520px"
        >
          SIGN IN
        </Button>
        <br />
        <br />
        <Button
          className="prev-screen-btn sh-btn"
          onClick={() => {
            this.setState({ visible: true });
          }}
        >
          View Notes
        </Button>
        <br />
        <br />
        <Button
          className="prev-screen-btn gray-btn sh-btn"
          onClick={(this.handlePopupModal = this.handlePopupModal.bind(this))}
        >
          Cancel
        </Button>
        {this.state.visible && (
          <NoteList
            visible={this.state.visible}
            onCancel={() => {
              this.setState({ visible: false });
            }}
          />
        )}
        <br />
        <CheckBox
          defaultChecked={true}
          disabled={true}
          onChange={(e) => {
            alert(e.target.checked);
          }}
          className=""
        >
          Gaurav Sali
        </CheckBox>{" "}
        <br />
        <RadioButton
          name="gn"
          value="Male"
          disabled={true}
          onChange={(e) => {
            alert(e.target.value);
          }}
        />
        Male
        <RadioButton
          name="gn"
          value="Female"
          onChange={(e) => {
            alert(e.target.value);
          }}
        />
        Female <br />
        <br />
        <br />{" "}
        <RadioGroup
          options={[
            { label: "Male", value: "Male" },
            { label: "Female", value: "Female" },
          ]}
          name="gender"
          onChange={(e) => {
            console.log("value radio group", e.target.value);
          }}
        />
      </>
    );
  }
}
export default Demo;
