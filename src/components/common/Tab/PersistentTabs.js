import React, { useState, useEffect, memo } from 'react';
import { Tab, Tabs, TabList } from 'react-tabs';

const PersistentTabs = (props) => {
  const { canSwitchTab, onSelect, data: tabData } = props;
  const tabKeys = tabData.map(d => d.tabKey);
  const [activeTabIndex, setActiveTabIndex] = useState(props.activeTabIndex || 0);

  useEffect(() => {
    setActiveTabIndex(props.activeTabIndex || 0)
  }, [props.activeTabIndex])

  const getChildren = (children = []) => {

    if (Array.isArray(children)) {
      return children.filter(child => child && tabKeys.includes(child.props.tabKey))
    } else if (children.constructor === Object) {
      if (children.props?.children) {
        return children.props.children.filter(child => child && tabKeys.includes(child.props.tabKey)) || []
      }
    }
    return [children]
  }

  const getDisplay = (childrens, index) => {
    return childrens.length == 1 ? 'block' : activeTabIndex === index ? 'block' : 'none'
  }

  const childs = getChildren(props.children);

  const children = React.Children.map(childs, (child, index) => {
    return (
      <div
        className={props.wrapperClass || 'resi_treat'}
        style={{ display: getDisplay(childs, index) }}>
        {React.cloneElement(child, { isTabActive: activeTabIndex === index })}
      </div>
    )
  });

  const handleSelect = (tabIndex) => {
    if (!canSwitchTab) return
    setActiveTabIndex(tabIndex)
    if (onSelect)
      onSelect(tabIndex)
  }

  return (
    <Tabs selectedIndex={activeTabIndex} onSelect={handleSelect} className="tab_wrapper" >
      <TabList>
        {tabData.map((tab, index) =>
          <Tab key={(tab.tabtitle || tab[props.titleKey]) + '_header'}>
            {
              props.renderHeader?.({ item: tab, isActive: activeTabIndex == index })
            }
          </Tab>

        )}
      </TabList>
      {children}
    </Tabs>
  );
};
export default memo(PersistentTabs);
PersistentTabs.defaultProps = {
  canSwitchTab: true
}