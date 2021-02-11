import React, { useEffect, useState } from "react";
import SearchPopup from "../../components/common/Popup/GlobalSearch";


const GlobalSearch = (props) => {


    return (<>
        <SearchPopup {...props}></SearchPopup>
    </>
    )
}

export default GlobalSearch