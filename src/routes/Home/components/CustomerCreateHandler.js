import React from 'react'

class CustomerCreateHandler extends React.Component {

	constructor (props) {
		super(props);

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

		this.state = {
			email: 'exam@exam.pl',
			description: 'Great description',
			balance: '0',
			name: 'Adam',
			surname: 'Bed',
		}
	}

	handleChange (property, value) {
		this.setState({
			[property]: value
		});
	}

	handleSubmit () {
		const {
			email,
			description,
			balance,
			name,
			surname
		} = this.state;

		const newCustomerData = {
			email,
			description,
			account_balance: parseInt(balance),
			metadata: {
				firstName: name,
				lastName: surname
			}
		}

		this.props.handleCreateCustomer(newCustomerData)
	}

	render() {
		const {
			email,
			description,
			balance,
			name,
			surname
		} = this.state;

		return (
		  	<div>
			  	<div> ------------- </div>
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
			        <button onClick={this.handleSubmit}>Create Customer</button>
			    <div> ------------- </div>
			</div>
		);
	}
}

export default CustomerCreateHandler
