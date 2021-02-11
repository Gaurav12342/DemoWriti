import React, { Component } from 'react';
import ReactModal from 'react-modal';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class VVAttachment extends Component {

    constructor () {
        super();
        this.state = { 
          show3Modal: false
        };
        
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
      }
      
      handleOpenModal () {
        this.setState({ show3Modal: true });
      }
      
      handleCloseModal () {
        this.setState({ show3Modal: false });
      }
    render() {
       /* start slider */
        var settings = {
            dots: false,
            arrow:true,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1
        };
       /* end slider */
        return (<>
             {/* start popup */}
                       
                            <ReactModal 
                                isOpen={this.state.show3Modal}
                                contentLabel="onRequestClose Example"
                                onRequestClose={this.handleCloseModal}
                                className="virtual-visit-wrap slider-popup-wrap"
                                >
                                    <div className="popup-content">
                                        <h2>Virtual Visit Attachments - O'Laughlin, Craig (Room No 2056)</h2>
                                       <div>
                                        <Slider {...settings}>
                                            <div className="">
                                                <h3 className="slide-head">Image1</h3>
                                                <img alt="#" src={require("../../View/popup/img/x-ray.png")}/>
                                                <div className="d-flex j-space-between att-txt att-box">
                                                    <span className="att-txt">ZOOM IN</span>
                                                    <span className="att-txt red-color">REMOVE</span>
                                                </div>
                                            </div>
                                            <div className="">
                                                <h3 className="slide-head">Image2</h3>
                                                <img alt="#" src={require("../../View/popup/img/x-ray1.png")}/>
                                                <div className="d-flex j-space-between att-box">
                                                    <span className="att-txt">ZOOM IN</span>
                                                    <span className="att-txt red-color">REMOVE</span>
                                                </div>
                                            </div>
                                            <div className="select-part">
                                                <input type="file" />
                                                <img alt="#" src={require("../../View/popup/img/more.svg")}
                                                    className="choose-file-img"
                                                />
                                            </div>
                                            <div className="">
                                                <h3 className="slide-head">Image1</h3>
                                                <img alt="#" src={require("../../View/popup/img/x-ray.png")}/>
                                                <div className="d-flex j-space-between att-txt att-box">
                                                    <span className="att-txt">ZOOM IN</span>
                                                    <span className="att-txt red-color">REMOVE</span>
                                                </div>
                                            </div>
                                            <div className="">
                                                <h3 className="slide-head">Image2</h3>
                                                <img alt="#" src={require("../../View/popup/img/x-ray1.png")}/>
                                                <div className="d-flex j-space-between att-box">
                                                    <span className="att-txt">ZOOM IN</span>
                                                    <span className="att-txt red-color">REMOVE</span>
                                                </div>
                                            </div>
                                            <div className="select-part">
                                                <input type="file" />
                                                <img alt="#" src={require("../../View/popup/img/more.svg")}
                                                    className="choose-file-img"
                                                />
                                            </div>
                                        </Slider>
                                       </div>
                                       <div className="d-flex j-space-between">
                                            <span className="slide-head">Total Attachments : 10</span>
                                            <div className="d-flex-end mb-20">
                                                <button class="prev-screen-btn gray-btn sh-btn">REJECT</button>
                                                <button class="prev-screen-btn sh-btn">ACCEPT</button>
                                            </div>
                                       </div>
                                    </div>
                                   
                                    {/* <button className="close-btn" onClick={this.handleCloseModal}>
                                        <img src={require("../../View/popup/img/close.svg")}/>
                                    </button> */}
                                    
                            </ReactModal>
                        
                        {/* end popup */}
        </>)
    }
}
export default VVAttachment;