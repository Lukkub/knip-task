import React, { PropTypes } from 'react';
import ReactTable from 'react-table';
import './CustomersTable.css';
import { RaisedButton } from 'material-ui';

export const CustomersTable = (props) => {
    const data = [];
    props.customersData.map((customer) => {
        data.push({
            id: customer.id,
            email: customer.email,
            description: customer.description,
            account_balance: customer.account_balance,
            firstName: customer.metadata.firstName,
            lastName: customer.metadata.lastName,
            customer
        });
    });

    const columns = [{
        header: 'Email',
        accessor: 'email'
    }, {
        header: 'Description',
        accessor: 'description'
    }, {
        header: 'Balance',
        accessor: 'account_balance'
    }, {
        header: 'First Name',
        accessor: 'firstName'
    }, {
        header: 'Last Name',
        accessor: 'lastName'
    }, {
        header: '',
        accessor: 'id',
        render: tabProp =>
            <RaisedButton
              onClick={() => props.handleDeleteCustomer(tabProp.value)}
              label="Delete Customer" />
    }, {
        header: '',
        accessor: 'customer',
        render: tabProp =>
            <RaisedButton
              value={{ width: '100%' }}
              onClick={() => props.setCustomerToUpdate(tabProp.value)}
              label="Update Customer" />
    }];

    return (
        <div>
            <ReactTable defaultPageSize={5} data={data} columns={columns} />
        </div>
    );
};

CustomersTable.propTypes = {
    customersData: PropTypes.array,
    handleDeleteCustomer: PropTypes.func,
    setCustomerToUpdate: PropTypes.func
};

export default CustomersTable;
