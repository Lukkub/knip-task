import React from 'react'
import ReactTable from 'react-table'
import './CustomersTable.css'

export const CustomersTable = (props) => {

	//{email: userId + '@example.com', description: 'Customer for ' + userId + '@example.com',
	//account_balance: userId, metadata: { firstName: userId + 'name', lastName: userId + 'surname'}

	let data = [];
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
	})

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
	  header: 'Delete',
	  accessor: 'id',
	  render: tabProp => <button onClick={() => props.handleDeleteCustomer(tabProp.value)}>Delete Customer</button>
	}, {
	  header: 'Update',
	  accessor: 'customer',
	  render: tabProp => <button onClick={() => props.setCustomerToUpdate(tabProp.value)}>Update Customer</button>
	}];

	return (
	  <div>
	    <ReactTable data={data} columns={columns} />
	  </div>
	);
}


export default CustomersTable
