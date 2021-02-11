import React from "react"
import { TabPanel } from 'react-tabs';
import PropTypes from 'prop-types';

const CustomTabPanel = ({ children, myCustomProp, ...otherProps }) => {

    return <TabPanel {...otherProps}
        className={"resi_sub_tab"}>
        {children}
        {myCustomProp && `myCustomProp: ${myCustomProp}`}
    </TabPanel>
}

CustomTabPanel.propTypes = {
    className: PropTypes.string,
}
CustomTabPanel.tabsRole = 'TabPanel';
export default CustomTabPanel