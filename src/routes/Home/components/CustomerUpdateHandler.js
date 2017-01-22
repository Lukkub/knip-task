import React, { PropTypes } from 'react';

class CustomerUpdateHandler extends React.Component {

    static propTypes = {
        isVisible: PropTypes.bool,
        customerUpdateData: PropTypes.object,
        handleUpdateCustomer: PropTypes.func
    };

    constructor (props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            email: '',
            description: '',
            balance: '0',
            name: '',
            surname: ''
        };
    }

    componentWillReceiveProps (nextProps) {
        const customerUpdateData = nextProps.customerUpdateData;

        if (!customerUpdateData) {
            return;
        }

        this.setState({
            email: customerUpdateData.email,
            description: customerUpdateData.description,
            balance: customerUpdateData.account_balance,
            name: customerUpdateData.metadata.firstName,
            surname: customerUpdateData.metadata.lastName
        });
    }

    handleChange (property, value) {
        this.setState({
            [property]: value
        });
    }

    handleSubmit () {
        const { email, description, balance, name, surname } = this.state;

        const customerId = this.props.customerUpdateData.id;

        const newCustomerData = {
            email,
            description,
            account_balance: parseInt(balance),
            metadata: {
                firstName: name,
                lastName: surname
            }
        };

        this.props.handleUpdateCustomer(customerId, newCustomerData);
    }

    render () {
        const { email, description, balance, name, surname } = this.state;

        if (!this.props.isVisible) {
            return null;
        }

        return (
            <div>
                <label>
			          	Email:
			          	<input type="text" value={email} onChange={(event) => this.handleChange('email', event.target.value)} />
                </label>
                <label>
			          	Description:
			          	<input type="text" value={description} onChange={(event) => this.handleChange('description', event.target.value)} />
                </label>
                <label>
			          	Balance:
			          	<input type="text" value={balance} onChange={(event) => this.handleChange('balance', event.target.value)} />
                </label>
                <label>
			          	Name:
			          	<input type="text" value={name} onChange={(event) => this.handleChange('name', event.target.value)} />
                </label>
                <label>
			          	Surname:
			          	<input type="text" value={surname} onChange={(event) => this.handleChange('surname', event.target.value)} />
                </label>
                <button onClick={this.handleSubmit}>Update Customer</button>
                <div> ------------- </div>
            </div>
        );
    }
}

export default CustomerUpdateHandler;
