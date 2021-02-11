import React, { Component } from 'react';
import { createForm, formShape } from 'rc-form';
import Tabs, { TabPane } from 'rc-tabs';
import PermissionsList from '../../Permission/View/permissionList';
class Permission extends Component {


    static propTypes = {
        form: formShape,
    };

    submit = () => {
        this.props.form.validateFields((error, value) => {
            console.log(error, value);
        });
    }

    render() {
        let errors;
        var callback = function (key) { };
        const { getFieldProps, getFieldError, getFieldDecorator } = this.props.form;
        return (<>

            <Tabs defaultActiveKey="1" onChange={callback} className="permission_tab_wrap">
                <TabPane tab="All" key="1">
                    <PermissionsList />
                </TabPane>
                <TabPane tab="Inventory" key="2">
                    <PermissionsList />
                </TabPane>
                <TabPane tab="Clients" key="3">
                    <PermissionsList />
                </TabPane>
                <TabPane tab="Enquiry" key="4">
                    <PermissionsList />
                </TabPane>
                <TabPane tab="Transactions" key="5">
                    <PermissionsList />
                </TabPane>
                <TabPane tab="Notifications" key="6">
                    <PermissionsList />
                </TabPane>
                <TabPane tab="Dashboard" key="7">
                    <PermissionsList />
                </TabPane>

            </Tabs>
        </>)
    }
}
export default createForm()(Permission);