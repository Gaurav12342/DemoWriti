import React from 'react';
import { Tab, Tabs, TabList } from 'react-tabs';
import { Cancel } from '../../../../src/assets/images/resident-detail/index';
import Image from '../Image';
import { isModuleAccessible } from '../../../util/common';

const CommonTab = (props) => {
  return (
    <Tabs onSelect={props.onSelect} className="tab_wrapper">
      <TabList>
        {props.data.map((d) => (
          <>
            {
              d.module ?
                isModuleAccessible(d.module) ?
                  <Tab>
                    <div className="resi_d">
                      {d.image ?
                        <Image image={d.image} />
                        : null}
                      <h3>{d.tabtitle}</h3>
                    </div>
                    {d.image ?
                      <div className="resi_c">
                        <Cancel />
                      </div>
                      : null
                    }
                    {
                      props.count &&
                      <div className="c_records">{d.records}</div>
                    }
                  </Tab>
                  : null : <Tab>
                  <div className="resi_d">
                    {d.image ?
                      <Image image={d.image} />
                      : null}
                    <h3>{d.tabtitle}</h3>
                  </div>
                  {d.image ?
                    <div className="resi_c">
                      <Cancel />
                    </div>
                    : null
                  }
                  {
                    props.count &&
                    <div className="c_records">{d.records}</div>
                  }
                </Tab>
            }
          </>
        ))}
      </TabList>
      {props.children}
    </Tabs >
  );
};
export default CommonTab;