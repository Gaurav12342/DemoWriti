/* eslint-disable react/no-unescaped-entities */
import React, { Component } from 'react';
import { Note } from '../../../assets/images/resident-detail/index';
// import { ReactComponent as Note } from '../../../assets/images/resident-detail/note.svg';

import { Etar,Emar,CarePlan,ChangeSticker,Consent,DrugRecord,Ebox,NursePrep,PhyReview,VerbalOrder,Xray } from '../../../assets/images/resident-detail/todo/index';
// import { ReactComponent as Etar } from '../../../assets/images/resident-detail/todo/1st-eTAR-eMAR.svg';
// import { ReactComponent as Emar } from '../../../assets/images/resident-detail/todo/2nd-eMAR-eTAR.svg';
// import { ReactComponent as CarePlan } from '../../../assets/images/resident-detail/todo/care-plan.svg';
// import { ReactComponent as ChangeSticker } from '../../../assets/images/resident-detail/todo/change-sticker.svg';
// import { ReactComponent as Consent } from '../../../assets/images/resident-detail/todo/consent.svg';
// import { ReactComponent as DrugRecord } from '../../../assets/images/resident-detail/todo/drug-record.svg';
// import { ReactComponent as Ebox } from '../../../assets/images/resident-detail/todo/e-box-used.svg';
// import { ReactComponent as NursePrep } from '../../../assets/images/resident-detail/todo/nurse-prep.svg';
// import { ReactComponent as PhyReview } from '../../../assets/images/resident-detail/todo/physician-review.svg';
// import { ReactComponent as VerbalOrder } from '../../../assets/images/resident-detail/todo/verbal-order.svg';
// import { ReactComponent as Xray } from '../../../assets/images/resident-detail/todo/x-ray.svg';

class TodoTab extends Component {
  render() {
    return (
      <div className="todotab_wrap">
        <div className="todotab">
          <div className="listing">
            <div className="order-processing">
              <h3 className="title">
                <span>Prescription Order Processing</span>
              </h3>
              <a href="" className="media">
                <div className="left">
                  <Etar className="etar" />
                  <span className="sub-title">1st eTAR/eMAR</span>
                </div>
                <div className="right">
                  <span className="count">05</span>
                  <span className="order-status green">70</span>
                </div>
              </a>
              <a href="" className="media">
                <div className="left">
                  <Consent className="consent" />
                  <span className="sub-title">Consent</span>
                </div>
                <div className="right">
                  <span className="order-status green">74</span>
                </div>
              </a>
              <a href="" className="media">
                <div className="left">
                  <Emar className="emar" />
                  <span className="sub-title">2nd eTAR/eMAR</span>
                </div>
                <div className="right">
                  <span className="count">05</span>
                  <span className="order-status green">04</span>
                </div>
              </a>
              <a href="" className="media">
                <div className="left">
                  <VerbalOrder className="vo" />
                  <span className="sub-title">Verbal Order</span>
                </div>
                <div className="right">
                  <span className="order-status green">00</span>
                </div>
              </a>
              <a href="" className="media">
                <div className="left">
                  <Ebox className="ebox" />
                  <span className="sub-title">E-Box Used</span>
                </div>
                <div className="right">

                  <span className="order-status green">75</span>
                </div>
              </a>
              <a href="" className="media">
                <div className="left">
                  <DrugRecord className="dr" />
                  <span className="sub-title">Drug Record</span>
                </div>
                <div className="right">
                  <span className="order-status green">75</span>
                </div>
              </a>
              <a href="" className="media">
                <div className="left">
                  <CarePlan className="cp" />
                  <span className="sub-title">Care Plan</span>
                </div>
                <div className="right">
                  <span className="order-status green">75</span>
                </div>
              </a>
              <a href="" className="media">
                <div className="left">
                  <Xray className="xray" />
                  <span className="sub-title">X-Ray Diet Lab Request</span>
                </div>
                <div className="right">
                  <span className="count">05</span>
                  <span className="order-status green">75</span>
                </div>
              </a>
              <a href="" className="media">
                <div className="left">
                  <ChangeSticker className="cs" />
                  <span className="sub-title">Change Sticker</span>
                </div>
                <div className="right">
                  <span className="order-status green">75</span>
                </div>
              </a>
            </div>



            <div className="order-processing">
              <h3 className="title">
                <span>Physician Medication Review</span>
              </h3>
              <a href="" className="media">
                <div className="left">
                  <NursePrep className="emar" />
                  <span className="sub-title">Nurse Prep 1</span>
                </div>
                <div className="right">

                  <span className="order-status green">00</span>
                </div>
              </a>
              <a href="" className="media">
                <div className="left">
                  <NursePrep className="vo" />
                  <span className="sub-title">Nurse Prep 2</span>
                </div>
                <div className="right">
                  <span className="order-status green">00</span>
                </div>
              </a>
              <a href="" className="media">
                <div className="left">
                  <PhyReview className="ebox" />
                  <span className="sub-title">Physician Review</span>
                </div>
                <div className="right">

                  <span className="order-status green">00</span>
                </div>
              </a>
              <a href="" className="media">
                <div className="left">
                  <DrugRecord className="etar" />
                  <span className="sub-title">Drug Record</span>
                </div>
                <div className="right">
                  <span className="order-status red">01</span>
                </div>
              </a>
              <a href="" className="media">
                <div className="left">
                  <Consent className="cs" />
                  <span className="sub-title">Consent</span>
                </div>
                <div className="right">

                  <span className="order-status red">01</span>
                </div>
              </a>
              <a href="" className="media">
                <div className="left">
                  <Ebox className="ebox" />
                  <span className="sub-title">E-Box Used</span>
                </div>
                <div className="right">
                  <span className="order-status green">01</span>
                </div>
              </a>
              <a href="" className="media">
                <div className="left">
                  <CarePlan className="cp" />
                  <span className="sub-title">Care Plan</span>
                </div>
                <div className="right">
                  <span className="order-status green">01</span>
                </div>
              </a>

              <a href="" className="media">
                <div className="left">
                  <ChangeSticker className="cs" />
                  <span className="sub-title">Change Sticker</span>
                </div>
                <div className="right">
                  <span className="order-status green">01</span>
                </div>
              </a>
              <a href="" className="media">
                <div className="left">
                  <Etar className="etar" />
                  <span className="sub-title">1st eTAR/eMAR</span>
                </div>
                <div className="right">
                  <span className="order-status green">01</span>
                </div>
              </a>
            </div>




          </div>
        </div>
        <div className="bottom">
          <div className="note">
            <Note />
          </div>
          <ul className="list">
            <li><span className="blue">Blue</span><span className="text">Pending To-Do's</span></li>
            <li><span className="red">Red</span><span className="text">Out od Compliance To-Do's</span></li>
          </ul>
        </div>
      </div>
    );
  }
}
export default TodoTab;
