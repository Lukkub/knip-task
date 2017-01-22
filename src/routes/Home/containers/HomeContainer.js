import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { getAllCustomers, createCustomer, updateCustomer, deleteCustomer } from '../modules/customers';
import CustomersTable from '../components/CustomersTable';
import ApiStatusHandler from '../components/ApiStatusHandler';
import CustomerCreateHandler from '../components/CustomerCreateHandler';
import CustomerUpdateHandler from '../components/CustomerUpdateHandler';

class HomeContainer extends React.Component {

    static propTypes = {
        getAllCustomers: PropTypes.func,
        createCustomer: PropTypes.func,
        updateCustomer: PropTypes.func,
        deleteCustomer: PropTypes.func,
        isFetching: PropTypes.bool,
        doUpdate: PropTypes.bool,
        errorMessage: PropTypes.string,
        customersData: PropTypes.array
    };

    constructor (props) {
        super(props);

        this.handleCreateRandomCustomer = this.handleCreateRandomCustomer.bind(this);
        this.handleDeleteAllCustomers = this.handleDeleteAllCustomers.bind(this);
        this.checkApiStatus = this.checkApiStatus.bind(this);
        this.handleCreateCustomer = this.handleCreateCustomer.bind(this);
        this.handleDeleteCustomer = this.handleDeleteCustomer.bind(this);
        this.setCustomerToUpdate = this.setCustomerToUpdate.bind(this);
        this.handleUpdateCustomer = this.handleUpdateCustomer.bind(this);

        this.state = {
            isCustomerUpdate: false,
            customerUpdateData: null
        };
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

        const customerId = parseInt(Math.random() * 10000);
        const customerData = {
            email: customerId + '@example.com',
            description: 'Customer for ' + customerId + '@example.com',
            account_balance: customerId,
            metadata: {
                firstName: customerId + 'name',
                lastName: customerId + 'surname'
            }
        };

        this.props.createCustomer(customerData);
    }

    handleDeleteAllCustomers () {
        if (this.checkApiStatus()) {
            return;
        }

        this.setState({
            isCustomerUpdate: false,
            customerUpdateData: null
        });

        this.props.customersData.map((customer) => {
            this.props.deleteCustomer(customer.id);
        });
    }

    handleCreateCustomer (customerData) {
        if (this.checkApiStatus()) {
            return;
        }

        this.setState({
            isCustomerUpdate: false,
            customerUpdateData: null
        });

        this.props.createCustomer(customerData);
    }

    handleDeleteCustomer (customerId) {
        if (this.checkApiStatus()) {
            return;
        }

        this.setState({
            isCustomerUpdate: false,
            customerUpdateData: null
        });

        this.props.deleteCustomer(customerId);
    }

    setCustomerToUpdate (customerData) {
        if (this.checkApiStatus()) {
            return;
        }

        this.setState({
            isCustomerUpdate: true,
            customerUpdateData: customerData
        });
    }

    handleUpdateCustomer (customerId, customerData) {
        if (this.checkApiStatus()) {
            return;
        }

        this.props.updateCustomer(customerId, customerData);

        this.setState({
            isCustomerUpdate: false,
            customerUpdateData: null
        });
    }

    render () {
        return (
            <div>
                <button onClick={this.handleCreateRandomCustomer}>Create Random Customer</button>
                <button onClick={this.handleDeleteAllCustomers}>Delete All Customers</button>

                <CustomerCreateHandler handleCreateCustomer={this.handleCreateCustomer} />

                <CustomerUpdateHandler
                  customerUpdateData={this.state.customerUpdateData}
                  isVisible={this.state.isCustomerUpdate}
                  handleUpdateCustomer={this.handleUpdateCustomer} />

                <ApiStatusHandler
                  isFetching={this.props.isFetching}
                  errorMessage={this.props.errorMessage} />

                <CustomersTable
                  customersData={this.props.customersData}
                  handleDeleteCustomer={this.handleDeleteCustomer}
                  setCustomerToUpdate={this.setCustomerToUpdate} />
            </div>
        );
    }
}

const mapDispatchToProps = {
    getAllCustomers,
    createCustomer,
    updateCustomer,
    deleteCustomer
};

const mapStateToProps = (state) => ({
    isFetching: state.customers.isFetching,
    doUpdate: state.customers.doUpdate,
    errorMessage: state.customers.errorMessage,
    customersData: state.customers.customersData
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
