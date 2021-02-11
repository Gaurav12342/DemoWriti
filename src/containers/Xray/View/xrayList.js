import React, { Component } from 'react';
//         openFilter: false,
//     };
//     this.handleFilter = this.handleFilter.bind(this);

// }
import Table from '../../../components/common/Table/index'
import { createForm, formShape } from 'rc-form';
import { View, Notes, Reminder, MoreDots, Audit, Refresh, Sort, Download, Print, DetailsLess, DetailsMore } from '../../../assets/images/pmr/index';
import { FirstPage, LastPage, Next, Prev } from '../../../assets/images/index';
import AddResidentPopup from '../../../components/common/Popup/addResident-popup';
import { Filters } from '../../../assets/images/resident-detail/index';
import { UpperCaseStr } from "../../../util/common";
import { Column_classNames } from "../../../constants/Columns";

const status = {
    Submitted: 1
}
class Xraylist extends Component {


    // constructor() {
    //     super();
    //     this.state = {
    /* start add resident popup */
    state = {
        addResidentPopupRef: false,
        onAddResidentPopupClick: false,
        handleFilter: false,
        filter: {
            page: 1,
            limit: 20
        },
        data: [
            {
                resident: "Hightower, Madeleine",
                homearea: "Primary",
                room: '1234',
                requisition: "XRAY 123456",
                hc: "123456",
                requested: "Nurse Fisher, Kim",
                physician: "Dr. Ardiles, Osvaldo",
                date: "22nd Aug 2020 05:20 pm",
                result: 'View',
                status: 1
            },
            {
                resident: "Hightower, Madeleine",
                homearea: "Primary",
                room: '1234',
                requisition: "XRAY 123456",
                hc: "123456",
                requested: "Nurse Fisher, Kim",
                physician: "Dr. Ardiles, Osvaldo",
                date: "22nd Aug 2020 05:20 pm",
                result: 'View',
                status: 1
            },
            {
                resident: "Hightower, Madeleine",
                homearea: "Primary",
                room: '1234',
                requisition: "XRAY 123456",
                hc: "123456",
                requested: "Nurse Fisher, Kim",
                physician: "Dr. Ardiles, Osvaldo",
                date: "22nd Aug 2020 05:20 pm",
                result: 'View',
                status: 1
            },
            {
                resident: "Hightower, Madeleine",
                homearea: "Primary",
                room: '1234',
                requisition: "XRAY 123456",
                hc: "123456",
                requested: "Nurse Fisher, Kim",
                physician: "Dr. Ardiles, Osvaldo",
                date: "22nd Aug 2020 05:20 pm",
                result: 'View',
                status: 1
            },
            {
                resident: "Hightower, Madeleine",
                homearea: "Primary",
                room: '1234',
                requisition: "XRAY 123456",
                hc: "123456",
                requested: "Nurse Fisher, Kim",
                physician: "Dr. Ardiles, Osvaldo",
                date: "22nd Aug 2020 05:20 pm",
                result: 'View',
                status: 1
            },
            {
                resident: "Hightower, Madeleine",
                homearea: "Primary",
                room: '1234',
                requisition: "XRAY 123456",
                hc: "123456",
                requested: "Nurse Fisher, Kim",
                physician: "Dr. Ardiles, Osvaldo",
                date: "22nd Aug 2020 05:20 pm",
                result: 'View',
                status: 1
            },
            {
                resident: "Hightower, Madeleine",
                homearea: "Primary",
                room: '1234',
                requisition: "XRAY 123456",
                hc: "123456",
                requested: "Nurse Fisher, Kim",
                physician: "Dr. Ardiles, Osvaldo",
                date: "22nd Aug 2020 05:20 pm",
                result: 'View',
                status: 1
            },
            {
                resident: "Hightower, Madeleine",
                homearea: "Primary",
                room: '1234',
                requisition: "XRAY 123456",
                hc: "123456",
                requested: "Nurse Fisher, Kim",
                physician: "Dr. Ardiles, Osvaldo",
                date: "22nd Aug 2020 05:20 pm",
                result: 'View',
                status: 1
            },
            {
                resident: "Hightower, Madeleine",
                homearea: "Primary",
                room: '1234',
                requisition: "XRAY 123456",
                hc: "123456",
                requested: "Nurse Fisher, Kim",
                physician: "Dr. Ardiles, Osvaldo",
                date: "22nd Aug 2020 05:20 pm",
                result: 'View',
                status: 1
            },
            {
                resident: "Hightower, Madeleine",
                homearea: "Primary",
                room: '1234',
                requisition: "XRAY 123456",
                hc: "123456",
                requested: "Nurse Fisher, Kim",
                physician: "Dr. Ardiles, Osvaldo",
                date: "22nd Aug 2020 05:20 pm",
                result: 'View',
                status: 1
            },
            {
                resident: "Hightower, Madeleine",
                homearea: "Primary",
                room: '1234',
                requisition: "XRAY 123456",
                hc: "123456",
                requested: "Nurse Fisher, Kim",
                physician: "Dr. Ardiles, Osvaldo",
                date: "22nd Aug 2020 05:20 pm",
                result: 'View',
                status: 1
            },
            {
                resident: "Hightower, Madeleine",
                homearea: "Primary",
                room: '1234',
                requisition: "XRAY 123456",
                hc: "123456",
                requested: "Nurse Fisher, Kim",
                physician: "Dr. Ardiles, Osvaldo",
                date: "22nd Aug 2020 05:20 pm",
                result: 'View',
                status: 1
            },
            {
                resident: "Hightower, Madeleine",
                homearea: "Primary",
                room: '1234',
                requisition: "XRAY 123456",
                hc: "123456",
                requested: "Nurse Fisher, Kim",
                physician: "Dr. Ardiles, Osvaldo",
                date: "22nd Aug 2020 05:20 pm",
                result: 'View',
                status: 1
            },
            {
                resident: "Hightower, Madeleine",
                homearea: "Primary",
                room: '1234',
                requisition: "XRAY 123456",
                hc: "123456",
                requested: "Nurse Fisher, Kim",
                physician: "Dr. Ardiles, Osvaldo",
                date: "22nd Aug 2020 05:20 pm",
                result: 'View',
                status: 1
            },
            {
                resident: "Hightower, Madeleine",
                homearea: "Primary",
                room: '1234',
                requisition: "XRAY 123456",
                hc: "123456",
                requested: "Nurse Fisher, Kim",
                physician: "Dr. Ardiles, Osvaldo",
                date: "22nd Aug 2020 05:20 pm",
                result: 'View',
                status: 1
            }

        ],
    }
    modalActionFn = (key, action) => {
        this.setState({ [key]: action })
    }
    // handleFilter() {
    //     const { openFilter } = this.state;
    //     this.setState({ openFilter: !openFilter })
    // }

    //  addResidentPopupRef = ({handleOpenModal}) => {
    //     this.residentModal = handleOpenModal;
    //   }

    //   onAddResidentPopupClick = () => {
    //    this.residentModal();
    //   }
    /* end add resident popup */

    static propTypes = {
        form: formShape,
    };

    submit = () => {
        this.props.form.validateFields((error, value) => {
            console.log(error, value);
        });
    }

    getColumns = () => [
        {
            title: 'Sr.No',
            keyword: 'index',
            dataIndex: 'index',
            render: (text, record, index) => ((this.state.filter.page - 1) * this.state.filter.limit) + (index + 1)
        },
        {
            title: "Resident",
            dataIndex: "resident",
            // width:'20%',
            key: "resident",
            render: (text, record) => <span>{text}</span>,
        },
        {
            title: "Home Area",
            dataIndex: "homearea",
            // width:'20%',
            key: "homearea",

            render: (text, record) => <span>{text}</span>,
        },
        {
            title: "Room No.",
            dataIndex: "room",
            // width:'20%',
            key: "room",

            render: (text, record) => <span>{text}</span>,
        },
        {
            title: "Requisition No.",
            dataIndex: "requisition",
            // width:'20%',
            key: "requisition",

            render: (text, record) => <span>{text}</span>,
        },
        {
            title: "HC No.",
            dataIndex: "hc",
            // width:'20%',
            key: "hc",

            render: (text, record) => <span>{text}</span>,
        },
        {
            title: "Requested By",
            dataIndex: "requested",
            // width:'20%',
            key: "requested",

            render: (text, record) => <span>{text}</span>,
        },
        {
            title: "Physician",
            dataIndex: "physician",
            // width:'20%',
            key: "physician",

            render: (text, record) => <span>{text}</span>,
        },
        {
            title: "Date & Time",
            dataIndex: "date",
            // width:'20%',
            key: "date",

            render: (text, record) => <span>{text}</span>,
        },
        {
            title: "Result",
            dataIndex: "result",
            // width:'20%',
            key: "result",

            render: (text, record) => <a>{text}</a>,
        },

        {
            title: 'Status',
            dataIndex: 'status',

            classname: Column_classNames.Status,
            render: (text, record) => (
                <span className="o_status submitted">
                    {Object.keys(status).map((k) => {
                        return status[k] === text ? k : null;
                    })}
                </span>
            ),
            filters: [
                { text: "Submitted", value: 1 },
                { text: "De-Active", value: 2 },
                { text: "InterMediate", value: 3 },
            ],
            onFilter: (value, record) => record.status === value,
        },
        {
            title: 'Action',
            render: (text, record) => {
                return (
                    <div className="actions">
                        <a
                            onClick={() => console.log("View Clicked", record.resident)}
                        // style={{ height: "20px" }}
                        >
                            <View />
                            <p>View</p>
                        </a>
                        <a >
                            <Notes />
                            <p>Notes</p>
                            <span className="notes tot">05</span>
                        </a>
                        <a >
                            <Download />
                            <p>Download</p>
                        </a>
                        <a >
                            <Print />
                            <p>Print</p>
                        </a>
                        <a className="more">
                            <MoreDots />
                        </a>
                    </div>

                );
            },
        }
    ]


    render() {
        let errors;
        const { getFieldProps, getFieldError, getFieldDecorator } = this.props.form;
        return (<>
            {/* <Table
                columns={this.getColumns()}
                datasource={this.state.data}
                pagination={{
                    current: this.state.filter.page,
                    pageSize: this.state.filter.limit,
                    total: this.state.data.length
                }}
            // onChange={this.handleChange}
            // rowKey={e => e.id}
            /> */}
            
            <div className="data_table_wrap">
                <div className="data_table_cotainer">
                    <table className="data_table">
                        <thead>
                            <tr>
                                <th className="p_head">
                                    <div className="p_head_container">
                                        <span>Sr. No.</span>
                                    </div>
                                </th>
                                <th className="p_head">
                                    <div className="p_head_container">
                                        <span>Resident</span>
                                    </div>
                                </th>
                                <th className="p_head">
                                    <div className="p_head_container">
                                        <span>Home Area</span>
                                    </div>
                                </th>
                                <th className="p_head">
                                    <div className="p_head_container">
                                        <span>Room No</span>
                                    </div>
                                </th>
                                <th className="p_head">
                                    <div className="p_head_container">
                                        <span>Requisition No.</span>
                                    </div>
                                </th>
                                <th className="p_head">
                                    <div className="p_head_container">
                                        <span>HC No.</span>
                                    </div>
                                </th>
                                <th className="p_head">
                                    <div className="p_head_container">
                                        <span>Requested By</span>
                                    </div>
                                </th>
                                <th className="p_head">
                                    <div className="p_head_container">
                                        <span>Physician</span>
                                    </div>
                                </th>
                                <th className="p_head">
                                    <div className="p_head_container">
                                        <span>Date & Time</span>
                                    </div>
                                </th>
                                <th className="p_head">
                                    <div className="p_head_container">
                                        <span>Result</span>
                                    </div>
                                </th>
                                <th className="p_head">
                                    <div className="p_head_container">
                                        <span>Status</span>
                                        <Filters onClick={() => this.modalActionFn('handleFilter', true)} />
                                    </div>
                                </th>
                                <th className="p_head">
                                    <div className="p_head_container j-space-between">
                                        <span>Result</span>
                                        <div className="refresh">
                                            <a>
                                                <Refresh />
                                            </a>
                                            <a>
                                                <DetailsLess />
                                            </a>
                                        </div>
                                    </div>
                                </th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <div className="patient_order_d">
                                        <span>01</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="patient_order_d">
                                        <span>Hightower, Madeleine</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="patient_order_d">
                                        <span>Primary</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="patient_order_d">
                                        <span>1234</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="patient_order_d">
                                        <span>XRAY 1234</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="patient_order_d">
                                        <span>1234</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="patient_order_d">
                                        <span>Nurse</span>
                                        <span>Fischer, Kim</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="patient_order_d">
                                        <span>Dr. Aldies, Osvaldo</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="patient_order_d">
                                        <span>22nd Aug 2020</span>
                                        <span>05:20 pm</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="patient_order_d">
                                        <a>View</a>
                                    </div>
                                </td>
                                <td>
                                    <div className="patient_order_d">
                                        <span className="status submitted">Submitted</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="patient_order_d">
                                        <div className="actions">
                                            <a>
                                                <View />
                                                <p>View</p>
                                            </a>
                                            <a >
                                                <Notes />
                                                <p>Notes</p>
                                                <span className="notes tot">05</span>
                                            </a>
                                            <a>
                                                <Download />
                                                <p>Download</p>
                                            </a>
                                            <a>
                                                <Print />
                                                <p>Print</p>
                                            </a>
                                            <a className="more">
                                                <MoreDots />

                                            </a>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="12" className="no_pad">
                                    <table>
                                        <tr>
                                            <td>
                                                <div class="patient_order_desc">
                                                    <div class="p_desc">
                                                        <h4>Orders</h4>
                                                        <ol>
                                                            <li>5 teaspoon baking soda in six ounces water. Swish and then spit out, three lorem ipsum is a dummy text. Lorem ipsum is a dummy text.</li>
                                                            <li>5 teaspoon baking soda in six ounces water. Swish and then spit out, three lorem ipsum is a dummy text. Lorem ipsum is a dummy text.</li>
                                                            <li>5 teaspoon baking soda in six ounces water. Swish and then spit out, three lorem ipsum is a dummy text. Lorem ipsum is a dummy text.</li>
                                                        </ol>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>

                        </tbody>
                        <tbody>
                            <tr>
                                <td>
                                    <div className="patient_order_d">
                                        <span>01</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="patient_order_d">
                                        <span>Hightower, Madeleine</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="patient_order_d">
                                        <span>Primary</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="patient_order_d">
                                        <span>1234</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="patient_order_d">
                                        <span>XRAY 1234</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="patient_order_d">
                                        <span>1234</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="patient_order_d">
                                        <span>Nurse</span>
                                        <span>Fischer, Kim</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="patient_order_d">
                                        <span>Dr. Aldies, Osvaldo</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="patient_order_d">
                                        <span>22nd Aug 2020</span>
                                        <span>05:20 pm</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="patient_order_d">
                                        <a>View</a>
                                    </div>
                                </td>
                                <td>
                                    <div className="patient_order_d">
                                        <span className="status submitted">Submitted</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="patient_order_d">
                                        <div className="actions">
                                            <a>
                                                <View />
                                                <p>View</p>
                                            </a>
                                            <a >
                                                <Notes />
                                                <p>Notes</p>
                                                <span className="notes tot">05</span>
                                            </a>
                                            <a>
                                                <Download />
                                                <p>Download</p>
                                            </a>
                                            <a>
                                                <Print />
                                                <p>Print</p>
                                            </a>
                                            <a className="more">
                                                <MoreDots />

                                            </a>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="12" className="no_pad">
                                    <table>
                                        <tr>
                                            <td>
                                                <div class="patient_order_desc">
                                                    <div class="p_desc">
                                                        <h4>Orders</h4>
                                                        <ol>
                                                            <li>5 teaspoon baking soda in six ounces water. Swish and then spit out, three lorem ipsum is a dummy text. Lorem ipsum is a dummy text.</li>
                                                            <li>5 teaspoon baking soda in six ounces water. Swish and then spit out, three lorem ipsum is a dummy text. Lorem ipsum is a dummy text.</li>
                                                            <li>5 teaspoon baking soda in six ounces water. Swish and then spit out, three lorem ipsum is a dummy text. Lorem ipsum is a dummy text.</li>
                                                        </ol>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>

                        </tbody>
                        <tbody>
                            <tr>
                                <td>
                                    <div className="patient_order_d">
                                        <span>01</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="patient_order_d">
                                        <span>Hightower, Madeleine</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="patient_order_d">
                                        <span>Primary</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="patient_order_d">
                                        <span>1234</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="patient_order_d">
                                        <span>XRAY 1234</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="patient_order_d">
                                        <span>1234</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="patient_order_d">
                                        <span>Nurse</span>
                                        <span>Fischer, Kim</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="patient_order_d">
                                        <span>Dr. Aldies, Osvaldo</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="patient_order_d">
                                        <span>22nd Aug 2020</span>
                                        <span>05:20 pm</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="patient_order_d">
                                        <a>View</a>
                                    </div>
                                </td>
                                <td>
                                    <div className="patient_order_d">
                                        <span className="status submitted">Submitted</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="patient_order_d">
                                        <div className="actions">
                                            <a>
                                                <View />
                                                <p>View</p>
                                            </a>
                                            <a >
                                                <Notes />
                                                <p>Notes</p>
                                                <span className="notes tot">05</span>
                                            </a>
                                            <a>
                                                <Download />
                                                <p>Download</p>
                                            </a>
                                            <a>
                                                <Print />
                                                <p>Print</p>
                                            </a>
                                            <a className="more">
                                                <MoreDots />

                                            </a>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="12" className="no_pad">
                                    <table>
                                        <tr>
                                            <td>
                                                <div class="patient_order_desc">
                                                    <div class="p_desc">
                                                        <h4>Orders</h4>
                                                        <ol>
                                                            <li>5 teaspoon baking soda in six ounces water. Swish and then spit out, three lorem ipsum is a dummy text. Lorem ipsum is a dummy text.</li>
                                                            <li>5 teaspoon baking soda in six ounces water. Swish and then spit out, three lorem ipsum is a dummy text. Lorem ipsum is a dummy text.</li>
                                                            <li>5 teaspoon baking soda in six ounces water. Swish and then spit out, three lorem ipsum is a dummy text. Lorem ipsum is a dummy text.</li>
                                                        </ol>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>

                        </tbody>
                        <tbody>
                            <tr>
                                <td>
                                    <div className="patient_order_d">
                                        <span>01</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="patient_order_d">
                                        <span>Hightower, Madeleine</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="patient_order_d">
                                        <span>Primary</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="patient_order_d">
                                        <span>1234</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="patient_order_d">
                                        <span>XRAY 1234</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="patient_order_d">
                                        <span>1234</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="patient_order_d">
                                        <span>Nurse</span>
                                        <span>Fischer, Kim</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="patient_order_d">
                                        <span>Dr. Aldies, Osvaldo</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="patient_order_d">
                                        <span>22nd Aug 2020</span>
                                        <span>05:20 pm</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="patient_order_d">
                                        <a>View</a>
                                    </div>
                                </td>
                                <td>
                                    <div className="patient_order_d">
                                        <span className="status submitted">Submitted</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="patient_order_d">
                                        <div className="actions">
                                            <a>
                                                <View />
                                                <p>View</p>
                                            </a>
                                            <a >
                                                <Notes />
                                                <p>Notes</p>
                                                <span className="notes tot">05</span>
                                            </a>
                                            <a>
                                                <Download />
                                                <p>Download</p>
                                            </a>
                                            <a>
                                                <Print />
                                                <p>Print</p>
                                            </a>
                                            <a className="more">
                                                <MoreDots />

                                            </a>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="12" className="no_pad">
                                    <table>
                                        <tr>
                                            <td>
                                                <div class="patient_order_desc">
                                                    <div class="p_desc">
                                                        <h4>Orders</h4>
                                                        <ol>
                                                            <li>5 teaspoon baking soda in six ounces water. Swish and then spit out, three lorem ipsum is a dummy text. Lorem ipsum is a dummy text.</li>
                                                            <li>5 teaspoon baking soda in six ounces water. Swish and then spit out, three lorem ipsum is a dummy text. Lorem ipsum is a dummy text.</li>
                                                            <li>5 teaspoon baking soda in six ounces water. Swish and then spit out, three lorem ipsum is a dummy text. Lorem ipsum is a dummy text.</li>
                                                        </ol>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>

                        </tbody>
                        <tbody>
                            <tr>
                                <td>
                                    <div className="patient_order_d">
                                        <span>01</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="patient_order_d">
                                        <span>Hightower, Madeleine</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="patient_order_d">
                                        <span>Primary</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="patient_order_d">
                                        <span>1234</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="patient_order_d">
                                        <span>XRAY 1234</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="patient_order_d">
                                        <span>1234</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="patient_order_d">
                                        <span>Nurse</span>
                                        <span>Fischer, Kim</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="patient_order_d">
                                        <span>Dr. Aldies, Osvaldo</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="patient_order_d">
                                        <span>22nd Aug 2020</span>
                                        <span>05:20 pm</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="patient_order_d">
                                        <a>View</a>
                                    </div>
                                </td>
                                <td>
                                    <div className="patient_order_d">
                                        <span className="status submitted">Submitted</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="patient_order_d">
                                        <div className="actions">
                                            <a>
                                                <View />
                                                <p>View</p>
                                            </a>
                                            <a >
                                                <Notes />
                                                <p>Notes</p>
                                                <span className="notes tot">05</span>
                                            </a>
                                            <a>
                                                <Download />
                                                <p>Download</p>
                                            </a>
                                            <a>
                                                <Print />
                                                <p>Print</p>
                                            </a>
                                            <a className="more">
                                                <MoreDots />

                                            </a>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="12" className="no_pad">
                                    <table>
                                        <tr>
                                            <td>
                                                <div class="patient_order_desc">
                                                    <div class="p_desc">
                                                        <h4>Orders</h4>
                                                        <ol>
                                                            <li>5 teaspoon baking soda in six ounces water. Swish and then spit out, three lorem ipsum is a dummy text. Lorem ipsum is a dummy text.</li>
                                                            <li>5 teaspoon baking soda in six ounces water. Swish and then spit out, three lorem ipsum is a dummy text. Lorem ipsum is a dummy text.</li>
                                                            <li>5 teaspoon baking soda in six ounces water. Swish and then spit out, three lorem ipsum is a dummy text. Lorem ipsum is a dummy text.</li>
                                                        </ol>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>

                        </tbody>
                        <tbody>
                            <tr>
                                <td>
                                    <div className="patient_order_d">
                                        <span>01</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="patient_order_d">
                                        <span>Hightower, Madeleine</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="patient_order_d">
                                        <span>Primary</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="patient_order_d">
                                        <span>1234</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="patient_order_d">
                                        <span>XRAY 1234</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="patient_order_d">
                                        <span>1234</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="patient_order_d">
                                        <span>Nurse</span>
                                        <span>Fischer, Kim</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="patient_order_d">
                                        <span>Dr. Aldies, Osvaldo</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="patient_order_d">
                                        <span>22nd Aug 2020</span>
                                        <span>05:20 pm</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="patient_order_d">
                                        <a>View</a>
                                    </div>
                                </td>
                                <td>
                                    <div className="patient_order_d">
                                        <span className="status submitted">Submitted</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="patient_order_d">
                                        <div className="actions">
                                            <a>
                                                <View />
                                                <p>View</p>
                                            </a>
                                            <a >
                                                <Notes />
                                                <p>Notes</p>
                                                <span className="notes tot">05</span>
                                            </a>
                                            <a>
                                                <Download />
                                                <p>Download</p>
                                            </a>
                                            <a>
                                                <Print />
                                                <p>Print</p>
                                            </a>
                                            <a className="more">
                                                <MoreDots />

                                            </a>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="12" className="no_pad">
                                    <table>
                                        <tr>
                                            <td>
                                                <div class="patient_order_desc">
                                                    <div class="p_desc">
                                                        <h4>Orders</h4>
                                                        <ol>
                                                            <li>5 teaspoon baking soda in six ounces water. Swish and then spit out, three lorem ipsum is a dummy text. Lorem ipsum is a dummy text.</li>
                                                            <li>5 teaspoon baking soda in six ounces water. Swish and then spit out, three lorem ipsum is a dummy text. Lorem ipsum is a dummy text.</li>
                                                            <li>5 teaspoon baking soda in six ounces water. Swish and then spit out, three lorem ipsum is a dummy text. Lorem ipsum is a dummy text.</li>
                                                        </ol>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>

                        </tbody>
                        <tbody>
                            <tr>
                                <td>
                                    <div className="patient_order_d">
                                        <span>01</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="patient_order_d">
                                        <span>Hightower, Madeleine</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="patient_order_d">
                                        <span>Primary</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="patient_order_d">
                                        <span>1234</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="patient_order_d">
                                        <span>XRAY 1234</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="patient_order_d">
                                        <span>1234</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="patient_order_d">
                                        <span>Nurse</span>
                                        <span>Fischer, Kim</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="patient_order_d">
                                        <span>Dr. Aldies, Osvaldo</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="patient_order_d">
                                        <span>22nd Aug 2020</span>
                                        <span>05:20 pm</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="patient_order_d">
                                        <a>View</a>
                                    </div>
                                </td>
                                <td>
                                    <div className="patient_order_d">
                                        <span className="status submitted">Submitted</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="patient_order_d">
                                        <div className="actions">
                                            <a>
                                                <View />
                                                <p>View</p>
                                            </a>
                                            <a >
                                                <Notes />
                                                <p>Notes</p>
                                                <span className="notes tot">05</span>
                                            </a>
                                            <a>
                                                <Download />
                                                <p>Download</p>
                                            </a>
                                            <a>
                                                <Print />
                                                <p>Print</p>
                                            </a>
                                            <a className="more">
                                                <MoreDots />

                                            </a>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="12" className="no_pad">
                                    <table>
                                        <tr>
                                            <td>
                                                <div class="patient_order_desc">
                                                    <div class="p_desc">
                                                        <h4>Orders</h4>
                                                        <ol>
                                                            <li>5 teaspoon baking soda in six ounces water. Swish and then spit out, three lorem ipsum is a dummy text. Lorem ipsum is a dummy text.</li>
                                                            <li>5 teaspoon baking soda in six ounces water. Swish and then spit out, three lorem ipsum is a dummy text. Lorem ipsum is a dummy text.</li>
                                                            <li>5 teaspoon baking soda in six ounces water. Swish and then spit out, three lorem ipsum is a dummy text. Lorem ipsum is a dummy text.</li>
                                                        </ol>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>

                        </tbody>
                        <tbody>
                            <tr>
                                <td>
                                    <div className="patient_order_d">
                                        <span>01</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="patient_order_d">
                                        <span>Hightower, Madeleine</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="patient_order_d">
                                        <span>Primary</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="patient_order_d">
                                        <span>1234</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="patient_order_d">
                                        <span>XRAY 1234</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="patient_order_d">
                                        <span>1234</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="patient_order_d">
                                        <span>Nurse</span>
                                        <span>Fischer, Kim</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="patient_order_d">
                                        <span>Dr. Aldies, Osvaldo</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="patient_order_d">
                                        <span>22nd Aug 2020</span>
                                        <span>05:20 pm</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="patient_order_d">
                                        <a>View</a>
                                    </div>
                                </td>
                                <td>
                                    <div className="patient_order_d">
                                        <span className="status submitted">Submitted</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="patient_order_d">
                                        <div className="actions">
                                            <a>
                                                <View />
                                                <p>View</p>
                                            </a>
                                            <a >
                                                <Notes />
                                                <p>Notes</p>
                                                <span className="notes tot">05</span>
                                            </a>
                                            <a>
                                                <Download />
                                                <p>Download</p>
                                            </a>
                                            <a>
                                                <Print />
                                                <p>Print</p>
                                            </a>
                                            <a className="more">
                                                <MoreDots />

                                            </a>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="12" className="no_pad">
                                    <table>
                                        <tr>
                                            <td>
                                                <div class="patient_order_desc">
                                                    <div class="p_desc">
                                                        <h4>Orders</h4>
                                                        <ol>
                                                            <li>5 teaspoon baking soda in six ounces water. Swish and then spit out, three lorem ipsum is a dummy text. Lorem ipsum is a dummy text.</li>
                                                            <li>5 teaspoon baking soda in six ounces water. Swish and then spit out, three lorem ipsum is a dummy text. Lorem ipsum is a dummy text.</li>
                                                            <li>5 teaspoon baking soda in six ounces water. Swish and then spit out, three lorem ipsum is a dummy text. Lorem ipsum is a dummy text.</li>
                                                        </ol>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>

                        </tbody>

                    </table>
                </div>
            </div>

            {/* <div className="patient_order_wrap">
                <div className="patient_order_head">
                    <div className="p_head sr">
                        <div className="p_head_container">
                            <span>Sr. No.</span>
                        </div>
                    </div>
                    <div className="p_head rs">
                        <div className="p_head_container">
                            <span>Resident</span>

                        </div>
                    </div>
                    <div className="p_head ha">
                        <div className="p_head_container">
                            <span>Home Area</span>
                        </div>

                    </div>
                    <div className="p_head dob">
                        <div className="p_head_container">
                            <span>Room No</span>

                        </div>
                    </div>
                    <div className="p_head pmr">
                        <div className="p_head_container">
                            <span>Requistion No.</span>

                        </div>
                    </div>
                    <div className="p_head ph">
                        <div className="p_head_container">
                            <span>HC No.</span>

                        </div>
                    </div>
                    <div className="p_head pr">
                        <div className="p_head_container">
                            <span>Requested By</span>

                        </div>
                    </div>
                    <div className="p_head dd">
                        <div className="p_head_container">
                            <span>Physician</span>

                        </div>
                    </div>
                    <div className="p_head phm">
                        <div className="p_head_container">
                            <span>Date & Time</span>

                        </div>
                    </div>
                    <div className="p_head phm">
                        <div className="p_head_container">
                            <span>Result</span>

                        </div>
                    </div>
                    <div className="p_head st">
                        <div className="p_head_container">
                            <span>Status</span>
                            <Filters onClick={() => this.modalActionFn('handleFilter', true)} />
                        </div>
                        {this.state.handleFilter && <div className="tab_filer">

                            <ul>
                                <li>
                                    <label for="pr" className="filter_check">
                                        <input type="checkbox" name="st" id="pr" />
                                        <span className="checkbox"></span>
                                        <span className="lbl">Physician Review</span>
                                    </label>

                                </li>
                                <li>
                                    <label for="np" className="filter_check">
                                        <input type="checkbox" name="st" id="np" />
                                        <span className="checkbox"></span>
                                        <span className="lbl">Nurse Prep</span>
                                    </label>

                                </li>
                                <li>
                                    <label for="td" className="filter_check">
                                        <input type="checkbox" name="st" id="td" />
                                        <span className="checkbox"></span>
                                        <span className="lbl">To Do</span>
                                    </label>

                                </li>
                            </ul>
                            <div className="filter_opt">
                                <span>Reset</span>
                                <button className="btn btn-sm primary-btn" onClick={() => this.modalActionFn('handleFilter', false)}>OK</button>
                            </div>
                        </div>}
                    </div>
                    <div className="p_head ac">
                        <div className="p_head_container j-space-between">
                            <span>Actions</span>
                            <div className="refresh">
                                <a>
                                    <Refresh />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="scroll_wrapper">
                    <div className="patient_order_detail">
                        <div className="patient_order_content">
                            <div className="patient_order_d sr">
                                <span>01</span>
                            </div>
                            <div className="patient_order_d rs">
                                <span>Hightower, Madeleine</span>
                            </div>
                            <div className="patient_order_d ha">
                                <span>Primary</span>
                            </div>
                            <div className="patient_order_d dob">
                                <span>1234</span>
                            </div>
                            <div className="patient_order_d pmr">
                                <span>PMR 123456</span>
                            </div>
                            <div className="patient_order_d ph">
                                <span>Dr. Osvaldo Ardiles</span>
                            </div>
                            <div className="patient_order_d pr">
                                <span>From 01st May 2020</span> <span>to 31st Jul 2020</span>
                            </div>
                            <div className="patient_order_d dd">
                                <span>23rd Apr 2020</span> <span>Due in 5 Days</span>
                            </div>
                            <div className="patient_order_d phm">
                                <a>View</a>
                            </div>

                            <div className="patient_order_d st ">
                                <span className="o_status submitted">
                                    Submitted
                                                            </span>
                            </div>
                            <div className="patient_order_d ac">
                                <div className="actions">
                                    <a onClick={() => this.modalActionFn('addResidentPopupRef', true)}>
                                        <View />
                                        <p>View</p>
                                    </a>
                                    <a>
                                        <Notes />
                                        <p>Notes</p>
                                        <span className="notes tot">05</span>
                                    </a>
                                    <a>
                                        <Download />
                                        <p>Download</p>

                                    </a>
                                    <a>
                                        <Print />
                                        <p>Print</p>
                                    </a>
                                    <a className="more">
                                        <MoreDots />
                                    </a>


                                </div>
                            </div>
                        </div>


                    </div>






                </div>

            </div> */}

            {/* <div className="pagination_wrap">
                    <div className="showing">
                        Showing 01 to 06 of 1000 entries
                    </div>
                    <div className="pagination">
                        <a><FirstPage /></a>
                        <a><Prev /></a>
                        <a className="active_page">01</a>
                        <a>02</a>
                        <a>03</a>
                        <a>04</a>
                        <a>05</a>
                        <a><Next /></a>
                        <a><LastPage /></a>
                    </div>
                </div> */}
            {/* <AddResidentPopup ref={this.addResidentPopupRef}/> */}

            {this.state.addResidentPopupRef && <AddResidentPopup visible={this.state.addResidentPopupRef}
                onClosed={() => this.modalActionFn('addResidentPopupRef', false)}
            />}

        </>)
    }
}
export default createForm()(Xraylist);