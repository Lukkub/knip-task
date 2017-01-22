import React from 'react'
import { connect } from 'react-redux'
import { getAllCustomers, createCustomer, updateCustomer, deleteCustomer } from '../modules/customers'
import CustomersTable from '../components/CustomersTable'
import ApiStatusHandler from '../components/ApiStatusHandler'
import CustomerCreateHandler from '../components/CustomerCreateHandler'


class HomeContainer extends React.Component {

	constructor (props) {
		super(props);

		this.handleCreateRandomCustomer = this.handleCreateRandomCustomer.bind(this);
		this.handleDeleteAllCustomers = this.handleDeleteAllCustomers.bind(this);
		this.checkApiStatus = this.checkApiStatus.bind(this);
		this.handleCreateCustomer = this.handleCreateCustomer.bind(this);
		this.handleDeleteCustomer = this.handleDeleteCustomer.bind(this);
	}

	componentDidMount () {
		this.props.getAllCustomers();
	}

	componentWillReceiveProps (nextProps) {
		if (nextProps.doUpdate) {
			this.props.getAllCustomers();
		}
	}

	checkApiStatus () {
		return this.props.isFetching;
	}

	handleCreateRandomCustomer () {

		if (this.checkApiStatus()) {
			return;
		}

		const customerId = parseInt(Math.random()*10000);
		const customerData = {
			email: customerId + '@example.com',
			description: 'Customer for ' + customerId + '@example.com',
			account_balance: customerId,
			metadata: {
				firstName: customerId + 'name',
				lastName: customerId + 'surname'
			}
		};
		console.log('New customerId', customerId);

		this.props.createCustomer(customerData);
	}

	handleDeleteAllCustomers () {

		if (this.checkApiStatus()) {
			return;
		}

		this.props.customersData.map((customer) => {
			this.props.deleteCustomer(customer.id);
		});
	}

	handleCreateCustomer(customerData) {

		if (this.checkApiStatus()) {
			return;
		}

		this.props.createCustomer(customerData);
	}


	handleDeleteCustomer(customerId) {

		if (this.checkApiStatus()) {
			return;
		}

		this.props.deleteCustomer(customerId);
	}

	render() {
	  return (
	  	<div>
	  		<button onClick={this.handleCreateRandomCustomer}>Create Random Customer</button>
	  		<button onClick={this.handleDeleteAllCustomers}>Delete All Customers</button>
	  		<CustomerCreateHandler {...this.props} handleCreateCustomer={this.handleCreateCustomer}/>
	  		<ApiStatusHandler {...this.props}/>
	  		<CustomersTable {...this.props} handleDeleteCustomer={this.handleDeleteCustomer}/>
	  	</div>
	  );
	}
}

const mapDispatchToProps = {
  getAllCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer
}

const mapStateToProps = (state) => ({
  isFetching : state.customers.isFetching,
  doUpdate: state.customers.doUpdate,
  errorMessage : state.customers.errorMessage,
  customersData : state.customers.customersData,
  createData: state.customers.createData
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)
