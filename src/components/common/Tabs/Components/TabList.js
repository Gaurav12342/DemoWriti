import React from "react"
import { TabList } from 'react-tabs';
import PropTypes from 'prop-types';

const CustomTabList = ({ children, myCustomProp, ...otherProps }) => {
    return <TabList>
        {children}
        {myCustomProp && `myCustomProp: ${myCustomProp}`}
    </TabList>
}
CustomTabList.tabsRole = 'TabList';
export default CustomTabList

// do not uncomment ande delete following code

// CustomTabList.defaultProps = {
//     image: 'image',
//     title: 'title',
//     count: 'count',
//     closeable: false,
// };

// CustomTabList.propTypes = {
//     data: PropTypes.array.isRequired,
//     image: PropTypes.string,
//     title: PropTypes.string,
//     id: PropTypes.string,
//     count: PropTypes.string,
//     closeable: PropTypes.bool,
//     onCloseTab: PropTypes.func,
// };

// export const CustomTabList = (props) => {
//     // do not use customtablist instead use CustomTab
//     const { data, image, title, count, id, closeable, onCloseTab } = props

//     const handleCloseTab = (d, index) => {
//         onCloseTab(d, getNewTabIndex(data, index))
//     }

//     return <TabList>
//         {data && data.map((d, index) => (
//             <CustomTab
//                 id={d[id] || index}
//                 image={d[image]}
//                 title={d[title]}
//                 count={d[count]}
//                 closeable
//                 onCloseTab={() => handleCloseTab(d, index)}
//             ></CustomTab>
//         ))}
//     </TabList>
// }