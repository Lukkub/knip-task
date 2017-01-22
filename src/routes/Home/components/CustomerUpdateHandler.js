import React, { PropTypes } from 'react';
import { RaisedButton, TextField } from 'material-ui';
import lodash from 'lodash';

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
        this.renderTextFields = this.renderTextFields.bind(this);

        this.state = {
            email: '',
            description: '',
            balance: '',
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

        // simple validation
        if (email.indexOf('@') === -1) {
            alert('Email field is not an email address.');
            return;
        }

        if (!lodash.isInteger(parseInt(balance))) {
            alert('Balance field is not an integer number.');
            return;
        }

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

    renderTextFields () {
        const { email, description, balance, name, surname } = this.state;

        const textDataArray = [{
            id: 'email',
            value: email,
            hintText: 'example@example.com'
        }, {
            id: 'description',
            value: description,
            hintText: 'short customer description'
        }, {
            id: 'balance',
            value: balance,
            hintText: 'customer balance (integer)'
        }, {
            id: 'name',
            value: name,
            hintText: 'user name'
        }, {
            id: 'surname',
            value: surname,
            hintText: 'user surname'
        }];

        return textDataArray.map((data, key) => (
            <TextField
              key={key}
              style={styles.textField}
              hintText={data.hintText}
              floatingLabelText={'Customer ' + data.id}
              type="text"
              value={data.value || ''}
              onChange={(event) => this.handleChange(data.id, event.target.value)} />
            )
        );
    }

    render () {
        if (!this.props.isVisible) {
            return null;
        }

        return (
            <div style={styles.container}>
                {this.renderTextFields()}
                <RaisedButton
                  style={styles.button}
                  onClick={this.handleSubmit}
                  label="Update Customer" />
            </div>
        );
    }
}

const styles = {
    container: {
        borderColor: '#ff4081',
        borderRadius: '15px',
        borderWidth: '5px',
        borderStyle: 'solid',
        padding: '10px',
        margin: '10px'
    },
    button: {
        margin: '10px'
    },
    textField: {
        marginRight: '10px'
    }
};

export default CustomerUpdateHandler;
