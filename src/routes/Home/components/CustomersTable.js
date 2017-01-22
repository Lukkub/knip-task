import React, { PropTypes } from 'react';
import ReactTable from 'react-table';
import './CustomersTable.css';
import { RaisedButton } from 'material-ui';

export const CustomersTable = (props) => {
    const reverseData = [].concat(props.customersData);
    const data = [];
    reverseData.reverse().map((customer, key) => {
        data.push({
            key: key + 1,
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
        header: 'Nb.',
        accessor: 'key'
    }, {
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
              label="Delete" />
    }, {
        header: '',
        accessor: 'customer',
        render: tabProp =>
            <RaisedButton
              onClick={() => props.setCustomerToUpdate(tabProp.value)}
              label="Update" />
    }];

    return (
        <div style={{ margin: '5px' }}>
            <ReactTable defaultPageSize={5} sorting={[]} data={data} columns={columns} />
        </div>
    );
};

CustomersTable.propTypes = {
    customersData: PropTypes.array,
    handleDeleteCustomer: PropTypes.func,
    setCustomerToUpdate: PropTypes.func
};

export default CustomersTable;
