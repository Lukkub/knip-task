import React, { PropTypes } from 'react';
import { RaisedButton, TextField } from 'material-ui';

class CustomerCreateHandler extends React.Component {

    static propTypes = {
        handleCreateCustomer: PropTypes.func,
        handleCreateRandomCustomer: PropTypes.func
    };

    constructor (props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderTextFields = this.renderTextFields.bind(this);

        this.state = {
            showCreator: false,
            email: '',
            description: '',
            balance: '',
            name: '',
            surname: ''
        };
    }

    handleChange (property, value) {
        this.setState({
            [property]: value
        });
    }

    handleSubmit () {
        const { email, description, balance, name, surname } = this.state;

        const newCustomerData = {
            email,
            description,
            account_balance: parseInt(balance),
            metadata: {
                firstName: name,
                lastName: surname
            }
        };

        this.props.handleCreateCustomer(newCustomerData);
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
            <div key={key}>
                <TextField
                  hintText={data.hintText}
                  floatingLabelText={'Customer ' + data.id}
                  type="text"
                  value={data.value}
                  onChange={(event) => this.handleChange(data.id, event.target.value)} />
            </div>
            )
        );
    }

    render () {
        const { showCreator } = this.state;
        return (
            <div>
                <RaisedButton
                  style={styles.button}
                  onClick={this.props.handleCreateRandomCustomer}
                  label="Create Random Customer" />

                {'OR'}

                <RaisedButton
                  style={styles.button}
                  onClick={() => this.setState({ showCreator: !showCreator })}
                  label="Create Custom Customer" />

                { showCreator &&
                <div>
                    { this.renderTextFields() }
                    <RaisedButton
                      style={styles.button}
                      onClick={this.handleSubmit}
                      label="Create Customer" />
                </div> }
            </div>
        );
    }
}

const styles = {
    button: {
        margin: '10px'
    }
};

export default CustomerCreateHandler;
