import React, { Component, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { Filters } from '../../../assets/images/resident-detail/index';
const data = [<a href="#" className="media offline">
  <div className="contact-profile">
    <img src={require('../../../assets/images/todo/avtar.png')} />
  </div>
  <div className="media-body">
    <h3 className="name">Hightower, Madeleine</h3>
    <p className="desc">Rx 123456</p>
  </div>
</a>,
<a href="#" className="media">
  <div className="contact-profile">
    <img src={require('../../../assets/images/todo/avtar2.png')} />
  </div>
  <div className="media-body">
    <h3 className="name">LaRoche, J. J.</h3>
    <p className="desc">Rx 123456</p>
  </div>
</a>,
<a href="#" className="media offline">
  <div className="contact-profile">
    <img src={require('../../../assets/images/todo/avtar.png')} />
  </div>
  <div className="media-body">
    <h3 className="name">Van Pelt, Grace</h3>
    <p className="desc">Rx 123456</p>
  </div>
</a>,
<a href="#" className="media">
  <div className="contact-profile">
    <img src={require('../../../assets/images/todo/avtar2.png')} />
  </div>
  <div className="media-body">
    <h3 className="name">O'Laughlin, Craig</h3>
    <p className="desc">Rx 123456</p>
  </div>
</a>,
<a href="#" className="media">
  <div className="contact-profile">
    <img src={require('../../../assets/images/todo/avtar2.png')} />
  </div>
  <div className="media-body">
    <h3 className="name">Wayne, Rigsby</h3>
    <p className="desc">Rx 123456</p>
  </div>
</a>,
<a href="#" className="media">
  <div className="contact-profile">
    <img src={require('../../../assets/images/todo/avtar.png')} />
  </div>
  <div className="media-body">
    <h3 className="name">Kimball, Cho</h3>
    <p className="desc">Rx 123456</p>
  </div>
</a>,
<a href="#" className="media">
  <div className="contact-profile">
    <img src={require('../../../assets/images/todo/avtar2.png')} />
  </div>
  <div className="media-body">
    <h3 className="name">Lisbon, Teresa</h3>
    <p className="desc">Rx 123456</p>
  </div>
</a>,
<a href="#" className="media">
  <div className="contact-profile">
    <img src={require('../../../assets/images/todo/avtar.png')} />
  </div>
  <div className="media-body">
    <h3 className="name">wylie, Jason</h3>
    <p className="desc">Rx 123456</p>
  </div>
</a>,
<a href="#" className="media">
  <div className="contact-profile">
    <img src={require('../../../assets/images/todo/avtar.png')} />
  </div>
  <div className="media-body">
    <h3 className="name">Vega, Michelle</h3>
    <p className="desc">Rx 123456</p>
  </div>
</a>]
const data1 = [<a href="#" className="media offline">
  <div className="contact-profile">
    <img src={require('../../../assets/images/todo/avtar.png')} />
  </div>
  <div className="media-body">
    <h3 className="name">Hightower, Madeleine</h3>
    <p className="desc">Rx 123456</p>
  </div>
</a>,
<a href="#" className="media">
  <div className="contact-profile">
    <img src={require('../../../assets/images/todo/avtar2.png')} />
  </div>
  <div className="media-body">
    <h3 className="name">LaRoche, J. J.</h3>
    <p className="desc">Rx 123456</p>
  </div>
</a>,
<a href="#" className="media offline">
  <div className="contact-profile">
    <img src={require('../../../assets/images/todo/avtar.png')} />
  </div>
  <div className="media-body">
    <h3 className="name">Van Pelt, Grace</h3>
    <p className="desc">Rx 123456</p>
  </div>
</a>,
<a href="#" className="media">
  <div className="contact-profile">
    <img src={require('../../../assets/images/todo/avtar2.png')} />
  </div>
  <div className="media-body">
    <h3 className="name">O'Laughlin, Craig</h3>
    <p className="desc">Rx 123456</p>
  </div>
</a>,
<a href="#" className="media">
  <div className="contact-profile">
    <img src={require('../../../assets/images/todo/avtar2.png')} />
  </div>
  <div className="media-body">
    <h3 className="name">Wayne, Rigsby</h3>
    <p className="desc">Rx 123456</p>
  </div>
</a>,
<a href="#" className="media">
  <div className="contact-profile">
    <img src={require('../../../assets/images/todo/avtar.png')} />
  </div>
  <div className="media-body">
    <h3 className="name">Kimball, Cho</h3>
    <p className="desc">Rx 123456</p>
  </div>
</a>,
<a href="#" className="media">
  <div className="contact-profile">
    <img src={require('../../../assets/images/todo/avtar2.png')} />
  </div>
  <div className="media-body">
    <h3 className="name">Lisbon, Teresa</h3>
    <p className="desc">Rx 123456</p>
  </div>
</a>,
<a href="#" className="media">
  <div className="contact-profile">
    <img src={require('../../../assets/images/todo/avtar.png')} />
  </div>
  <div className="media-body">
    <h3 className="name">wylie, Jason</h3>
    <p className="desc">Rx 123456</p>
  </div>
</a>,
<a href="#" className="media">
  <div className="contact-profile">
    <img src={require('../../../assets/images/todo/avtar.png')} />
  </div>
  <div className="media-body">
    <h3 className="name">Vega, Michelle</h3>
    <p className="desc">Rx 123456</p>
  </div>
</a>]
const SearchList = props => {
  const [residentData, setResidentData] = useState([])
  const [hasMore, setHasMore] = useState(true)
  let scrollParentRef = null
  useEffect(() => {
    setResidentData(data)
  }, [])

  const handleInfiniteOnLoad = (page) => {
    let arr = [...residentData]
    arr = arr.concat(data1)
    if (arr.length === 18)
      setHasMore(false)
    setResidentData(arr)
  }

  return (
    <div className="searchlist">
      <div className="components search">
        <input type="text" placeholder="Search Resident" className="inputForm" />
        <Filters />
      </div>
      <div className="components search">
        <input
          type="text"
          placeholder="Search by Rx Order"
          className="inputForm"
        />
      </div>
      <div className="listing" ref={(ref) => scrollParentRef = ref}>
        <InfiniteScroll
          initialLoad={false}
          loadMore={handleInfiniteOnLoad}
          hasMore={hasMore}
          loader={<div className="loader" key={0}>Loading ...</div>}
          useWindow={false}
          getScrollParent={() => scrollParentRef}
        >
          {
            residentData.map(x => x)
          }
        </InfiniteScroll>
      </div>
    </div>
  );

}
export default SearchList;
