import React from 'react';
import Select from 'rc-select';
import { Option, OptGroup } from 'rc-select'


const AutoComplete = ({ searchable, ...props }) => {
  return (
    <>
      <Select
        {...props}
        value={props?.value}
        mode={props.combobox ? "combobox" : props.multiple ? "multiple" : ""}
        className={`custom-rc-select ${searchable ? ' searchable' : ''}`}
        // open={true}
        disabled={props.disabled ? true : false}
      >
        {props.children}
      </Select>
    </>
  );
};
export { Option, OptGroup }
export default AutoComplete
