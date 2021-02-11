import React, { Component } from 'react';
import { TodoSubCategory } from '../../../components/Todo'
class Todolist extends Component {
  render() {
    return (
      <TodoSubCategory
        todos={[]}
        homeAreaId=''
        viewType={1}
        onCascaderChange={null}
        onChangeListview={(e) => console.log(e)}
      />
    );
  }
}
export default Todolist;
