// import React from 'react'
// const Table = () => {
//     return <div className="pmr_list_wrap">
//         <div className="patient_order_wrap">
//             <div className="patient_order_head">
//                 <div className="p_head sr">
//                     <div className="p_head_container">
//                         <span>Sr. No.</span>
//                     </div>
//                 </div>
//                 <div className="p_head rs">
//                     <div className="p_head_container">
//                         <span>Resident</span>
//                     </div>
//                 </div>
//                 <div className="p_head ha">
//                     <div className="p_head_container">
//                         <span>Home Area</span>
//                     </div>

//                 </div>
//                 <div className="p_head dob">
//                     <div className="p_head_container">
//                         <span>DOB</span>

//                     </div>
//                 </div>
//                 <div className="p_head pmr">
//                     <div className="p_head_container">
//                         <span>PMR No</span>

//                     </div>
//                 </div>
//                 <div className="p_head ph">
//                     <div className="p_head_container">
//                         <span>Physician</span>

//                     </div>
//                 </div>
//                 <div className="p_head pr">
//                     <div className="p_head_container">
//                         <span>PMR Range</span>

//                     </div>
//                 </div>
//                 <div className="p_head dd">
//                     <div className="p_head_container">
//                         <span>Due Date</span>

//                     </div>
//                 </div>
//                 <div className="p_head phm">
//                     <div className="p_head_container">
//                         <span>PHM Review</span>

//                     </div>
//                 </div>
//                 <div className="p_head st">
//                     <div className="p_head_container">
//                         <span>Status</span>
//                         <Filters />
//                     </div>
//                 </div>
//                 <div className="p_head ac">
//                     <div className="p_head_container j-space-between">
//                         <span>Actions</span>
//                         <div className="refresh">
//                             <a>
//                                 <Refresh />
//                             </a>

//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div className="scroll_wrapper">
//                 {/*row start*/}
//                 <div className="patient_order_detail">
//                     <div className="patient_order_content">
//                         <div className="patient_order_d sr">
//                             <span>01</span>
//                         </div>
//                         <div className="patient_order_d rs">
//                             <span>Hightower, Madeleine</span>
//                         </div>
//                         <div className="patient_order_d ha">
//                             <span>Primary</span>
//                         </div>
//                         <div className="patient_order_d dob">
//                             <span>23rd Sep 1988</span>
//                         </div>
//                         <div className="patient_order_d pmr">
//                             <span>PMR 123456</span>
//                         </div>
//                         <div className="patient_order_d ph">
//                             <span>Dr. Osvaldo Ardiles</span>
//                         </div>
//                         <div className="patient_order_d pr">
//                             <span>From 01st May 2020</span> <span>to 31st Jul 2020</span>
//                         </div>
//                         <div className="patient_order_d dd">
//                             <span>23rd Apr 2020</span> <span>Due in 5 Days</span>
//                         </div>
//                         <div className="patient_order_d phm">
//                             <a>View</a>
//                         </div>

//                         <div className="patient_order_d st ">
//                             <span className="o_status uploaded">
//                                 Physician Review
//                                                 </span>
//                         </div>
//                         <div className="patient_order_d ac">
//                             <div className="actions">
//                                 <a onClick={() => this.modalActionFn('addResidentPopupRef', true)}>
//                                     <View />
//                                     <p>View</p>
//                                 </a>
//                                 <a>
//                                     <Notes />
//                                     <p>Notes</p>
//                                     <span className="notes tot">05</span>
//                                 </a>
//                                 <a>
//                                     <Reminder />
//                                     <p>Reminder</p>
//                                     <span className="rem tot read">05</span>
//                                 </a>
//                                 <a>
//                                     <Audit />
//                                     <p>Audit</p>
//                                 </a>
//                                 <a className="more">
//                                     <MoreDots />
//                                 </a>


//                             </div>
//                         </div>
//                     </div>


//                 </div>
//                 {/*row end*/}
//                 {/*row start*/}
//                 <div className="patient_order_detail">
//                     <div className="patient_order_content">
//                         <div className="patient_order_d sr">
//                             <span>02</span>
//                         </div>
//                         <div className="patient_order_d rs">
//                             <span>LaRoche, J. J.</span>
//                         </div>
//                         <div className="patient_order_d ha">
//                             <span>Primary</span>
//                         </div>
//                         <div className="patient_order_d dob">
//                             <span>23rd Sep 1988</span>
//                         </div>
//                         <div className="patient_order_d pmr">
//                             <span>PMR 123456</span>
//                         </div>
//                         <div className="patient_order_d ph">
//                             <span>Dr. Osvaldo Ardiles</span>
//                         </div>
//                         <div className="patient_order_d pr">
//                             <span>From 01st May 2020</span> <span>to 31st Jul 2020</span>
//                         </div>
//                         <div className="patient_order_d dd over">
//                             <span>23rd Apr 2020</span> <span>Overdue in 5 Days</span>
//                         </div>
//                         <div className="patient_order_d phm">
//                             <span>-</span>
//                         </div>

//                         <div className="patient_order_d st ">
//                             <span className="o_status in_process">
//                                 Nurse Prep
//                                                 </span>
//                         </div>
//                         <div className="patient_order_d ac">
//                             <div className="actions">
//                                 <a>
//                                     <View />
//                                     <p>View</p>
//                                 </a>
//                                 <a>
//                                     <Notes />
//                                     <p>Notes</p>
//                                     <span className="notes tot">05</span>
//                                 </a>
//                                 <a>
//                                     <Reminder />
//                                     <p>Reminder</p>
//                                     <span className="rem tot read">05</span>
//                                 </a>
//                                 <a>
//                                     <Audit />
//                                     <p>Audit</p>
//                                 </a>
//                                 <a className="more">
//                                     <MoreDots />
//                                 </a>


//                             </div>
//                         </div>
//                     </div>


//                 </div>
//                 {/*row end*/}
//                 {/*row start*/}
//                 <div className="patient_order_detail">
//                     <div className="patient_order_content">
//                         <div className="patient_order_d sr">
//                             <span>03</span>
//                         </div>
//                         <div className="patient_order_d rs">
//                             <span>Van Pelt, Grace</span>
//                         </div>
//                         <div className="patient_order_d ha">
//                             <span>Primary</span>
//                         </div>
//                         <div className="patient_order_d dob">
//                             <span>23rd Sep 1988</span>
//                         </div>
//                         <div className="patient_order_d pmr">
//                             <span>PMR 123456</span>
//                         </div>
//                         <div className="patient_order_d ph">
//                             <span>Dr. Osvaldo Ardiles</span>
//                         </div>
//                         <div className="patient_order_d pr">
//                             <span>From 01st May 2020</span> <span>to 31st Jul 2020</span>
//                         </div>
//                         <div className="patient_order_d dd">
//                             <span>23rd Apr 2020</span> <span>Due in 5 Days</span>
//                         </div>
//                         <div className="patient_order_d phm">
//                             <a>View</a>
//                         </div>

//                         <div className="patient_order_d st ">
//                             <span className="o_status in_process">
//                                 Nurse Prep
//                                                 </span>
//                         </div>
//                         <div className="patient_order_d ac">
//                             <div className="actions">
//                                 <a>
//                                     <View />
//                                     <p>View</p>
//                                 </a>
//                                 <a>
//                                     <Notes />
//                                     <p>Notes</p>
//                                     <span className="notes tot">05</span>
//                                 </a>
//                                 <a>
//                                     <Reminder />
//                                     <p>Reminder</p>
//                                     <span className="rem tot read">05</span>
//                                 </a>
//                                 <a>
//                                     <Audit />
//                                     <p>Audit</p>
//                                 </a>
//                                 <a className="more">
//                                     <MoreDots />
//                                 </a>


//                             </div>
//                         </div>
//                     </div>


//                 </div>
//                 {/*row end*/}
//                 {/*row start*/}
//                 <div className="patient_order_detail">
//                     <div className="patient_order_content">
//                         <div className="patient_order_d sr">
//                             <span>04</span>
//                         </div>
//                         <div className="patient_order_d rs">
//                             <span>O'Laughlin, Craig</span>
//                         </div>
//                         <div className="patient_order_d ha">
//                             <span>Primary</span>
//                         </div>
//                         <div className="patient_order_d dob">
//                             <span>23rd Sep 1988</span>
//                         </div>
//                         <div className="patient_order_d pmr">
//                             <span>PMR 123456</span>
//                         </div>
//                         <div className="patient_order_d ph">
//                             <span>Dr. Osvaldo Ardiles</span>
//                         </div>
//                         <div className="patient_order_d pr">
//                             <span>From 01st May 2020</span> <span>to 31st Jul 2020</span>
//                         </div>
//                         <div className="patient_order_d dd over">
//                             <span>23rd Apr 2020</span> <span>Due in 5 Days</span>
//                         </div>
//                         <div className="patient_order_d phm">
//                             <a>View</a>
//                         </div>

//                         <div className="patient_order_d st ">
//                             <span className="o_status submitted">
//                                 To Do
//                                                 </span>
//                         </div>
//                         <div className="patient_order_d ac">
//                             <div className="actions">
//                                 <a>
//                                     <View />
//                                     <p>View</p>
//                                 </a>
//                                 <a>
//                                     <Notes />
//                                     <p>Notes</p>
//                                     <span className="notes tot">05</span>
//                                 </a>
//                                 <a>
//                                     <Reminder />
//                                     <p>Reminder</p>
//                                     <span className="rem tot read">05</span>
//                                 </a>
//                                 <a>
//                                     <Audit />
//                                     <p>Audit</p>
//                                 </a>
//                                 <a className="more">
//                                     <MoreDots />
//                                 </a>


//                             </div>
//                         </div>
//                     </div>


//                 </div>
//                 {/*row end*/}
//                 {/*row start*/}
//                 <div className="patient_order_detail">
//                     <div className="patient_order_content">
//                         <div className="patient_order_d sr">
//                             <span>05</span>
//                         </div>
//                         <div className="patient_order_d rs">
//                             <span>Wayne, Rigsby</span>
//                         </div>
//                         <div className="patient_order_d ha">
//                             <span>Primary</span>
//                         </div>
//                         <div className="patient_order_d dob">
//                             <span>23rd Sep 1988</span>
//                         </div>
//                         <div className="patient_order_d pmr">
//                             <span>PMR 123456</span>
//                         </div>
//                         <div className="patient_order_d ph">
//                             <span>Dr. Osvaldo Ardiles</span>
//                         </div>
//                         <div className="patient_order_d pr">
//                             <span>From 01st May 2020</span> <span>to 31st Jul 2020</span>
//                         </div>
//                         <div className="patient_order_d dd">
//                             <span>23rd Apr 2020</span> <span>Due in 5 Days</span>
//                         </div>
//                         <div className="patient_order_d phm">
//                             <span>-</span>
//                         </div>

//                         <div className="patient_order_d st ">
//                             <span className="o_status uploaded">
//                                 Physician Review
//                                                 </span>
//                         </div>
//                         <div className="patient_order_d ac">
//                             <div className="actions">
//                                 <a>
//                                     <View />
//                                     <p>View</p>
//                                 </a>
//                                 <a>
//                                     <Notes />
//                                     <p>Notes</p>
//                                     <span className="notes tot">05</span>
//                                 </a>
//                                 <a>
//                                     <Reminder />
//                                     <p>Reminder</p>
//                                     <span className="rem tot read">05</span>
//                                 </a>
//                                 <a>
//                                     <Audit />
//                                     <p>Audit</p>
//                                 </a>
//                                 <a className="more">
//                                     <MoreDots />
//                                 </a>


//                             </div>
//                         </div>
//                     </div>


//                 </div>
//                 {/*row end*/}
//                 {/*row start*/}
//                 <div className="patient_order_detail">
//                     <div className="patient_order_content">
//                         <div className="patient_order_d sr">
//                             <span>06</span>
//                         </div>
//                         <div className="patient_order_d rs">
//                             <span>Kimball, Cho</span>
//                         </div>
//                         <div className="patient_order_d ha">
//                             <span>Primary</span>
//                         </div>
//                         <div className="patient_order_d dob">
//                             <span>23rd Sep 1988</span>
//                         </div>
//                         <div className="patient_order_d pmr">
//                             <span>PMR 123456</span>
//                         </div>
//                         <div className="patient_order_d ph">
//                             <span>Dr. Osvaldo Ardiles</span>
//                         </div>
//                         <div className="patient_order_d pr">
//                             <span>From 01st May 2020</span> <span>to 31st Jul 2020</span>
//                         </div>
//                         <div className="patient_order_d dd">
//                             <span>23rd Apr 2020</span> <span>Due in 5 Days</span>
//                         </div>
//                         <div className="patient_order_d phm">
//                             <span>-</span>
//                         </div>

//                         <div className="patient_order_d st ">
//                             <span className="o_status submitted">
//                                 To Do
//                                                 </span>
//                         </div>
//                         <div className="patient_order_d ac">
//                             <div className="actions">
//                                 <a>
//                                     <View />
//                                     <p>View</p>
//                                 </a>
//                                 <a>
//                                     <Notes />
//                                     <p>Notes</p>
//                                     <span className="notes tot">05</span>
//                                 </a>
//                                 <a>
//                                     <Reminder />
//                                     <p>Reminder</p>
//                                     <span className="rem tot read">05</span>
//                                 </a>
//                                 <a>
//                                     <Audit />
//                                     <p>Audit</p>
//                                 </a>
//                                 <a className="more">
//                                     <MoreDots />
//                                 </a>


//                             </div>
//                         </div>
//                     </div>


//                 </div>
//                 {/*row end*/}
//                 {/*row start*/}
//                 <div className="patient_order_detail">
//                     <div className="patient_order_content">
//                         <div className="patient_order_d sr">
//                             <span>07</span>
//                         </div>
//                         <div className="patient_order_d rs">
//                             <span>Kimball, Cho</span>
//                         </div>
//                         <div className="patient_order_d ha">
//                             <span>Primary</span>
//                         </div>
//                         <div className="patient_order_d dob">
//                             <span>23rd Sep 1988</span>
//                         </div>
//                         <div className="patient_order_d pmr">
//                             <span>PMR 123456</span>
//                         </div>
//                         <div className="patient_order_d ph">
//                             <span>Dr. Osvaldo Ardiles</span>
//                         </div>
//                         <div className="patient_order_d pr">
//                             <span>From 01st May 2020</span> <span>to 31st Jul 2020</span>
//                         </div>
//                         <div className="patient_order_d dd">
//                             <span>23rd Apr 2020</span> <span>Due in 5 Days</span>
//                         </div>
//                         <div className="patient_order_d phm">
//                             <span>-</span>
//                         </div>

//                         <div className="patient_order_d st ">
//                             <span className="o_status submitted">
//                                 To Do
//                                                 </span>
//                         </div>
//                         <div className="patient_order_d ac">
//                             <div className="actions">
//                                 <a>
//                                     <View />
//                                     <p>View</p>
//                                 </a>
//                                 <a>
//                                     <Notes />
//                                     <p>Notes</p>
//                                     <span className="notes tot">05</span>
//                                 </a>
//                                 <a>
//                                     <Reminder />
//                                     <p>Reminder</p>
//                                     <span className="rem tot read">05</span>
//                                 </a>
//                                 <a>
//                                     <Audit />
//                                     <p>Audit</p>
//                                 </a>
//                                 <a className="more">
//                                     <MoreDots />
//                                 </a>


//                             </div>
//                         </div>
//                     </div>


//                 </div>
//                 {/*row end*/}




//             </div>

//         </div>

//         <div className="pagination_wrap">
//             <div className="showing">
//                 Showing 01 to 06 of 1000 entries
//         </div>
//             <div className="pagination">
//                 <a><FirstPage /></a>
//                 <a><Prev /></a>
//                 <a className="active_page">01</a>
//                 <a>02</a>
//                 <a>03</a>
//                 <a>04</a>
//                 <a>05</a>
//                 <a><Next /></a>
//                 <a><LastPage /></a>
//             </div>
//         </div>
//         {/* <AddResidentPopup ref={this.addResidentPopupRef}/> */}


//     </div>

// }
// export default Table