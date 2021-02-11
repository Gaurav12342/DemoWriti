import React from "react"
import { Tabs } from 'react-tabs';

const CustomTabs = ({ children, myCustomProp, ...otherProps }) => {

    return (
        <Tabs className="tab_wrapper" {...otherProps}>
            {children}
            {myCustomProp && `myCustomProp: ${myCustomProp}`}
        </Tabs>
    )
}
CustomTabs.tabsRole = 'Tabs';
export default CustomTabs