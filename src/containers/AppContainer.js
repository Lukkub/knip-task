import React, { Component, PropTypes } from 'react'
import { browserHistory, Router } from 'react-router'
import { Provider } from 'react-redux'

class AppContainer extends Component {
  static propTypes = {
    routes : PropTypes.object.isRequired,
    store  : PropTypes.object.isRequired
  }

  componentDidMount() {

    var sendData = function(fullUrl, method, headers, body) {
        if (body) {
          body = $.param(body);
        }
        fetch(fullUrl, { method, headers, body })
                    .then(response =>
                        response.json().then(json => {
                            if (!response.ok) {
                                console.log('[API] rejected response ', fullUrl, response);

                                return Promise.reject(json);
                            }

                            console.log('[API] response from ' + fullUrl, json);

                            return Object.assign({}, json);
                        })
                    );
        }

        var userId = parseInt(Math.random()*100);

        //create new customer
        // sendData('https://api.stripe.com/v1/customers',
        //   'POST',
        //   {'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8', Authorization: 'Bearer sk_test_EfaFF4DvuxMeL5XwKfnWAkZg'},
        //   {email: userId + '@example.com', description: 'Customer for ' + userId + '@example.com',  account_balance: userId, metadata: { firstName: userId + 'name', lastName: userId + 'surname'}});

        //get all customers
        sendData('https://api.stripe.com/v1/customers?limit=100', 'GET',
          {Authorization: 'Bearer sk_test_EfaFF4DvuxMeL5XwKfnWAkZg'});

        //delete customer by ID
      // var customerId = 'cus_9yUThAt1fya8Qf';
      //   sendData('https://api.stripe.com/v1/customers/' + customerId, 'DELETE',
      //    {Authorization: 'Bearer sk_test_EfaFF4DvuxMeL5XwKfnWAkZg'});

      //update customer by ID
        // var customerId = 'cus_9yVcJMpOl9ZA9m'
        // sendData('https://api.stripe.com/v1/customers/' + customerId,
        //   'POST',
        //   {'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8', Authorization: 'Bearer sk_test_EfaFF4DvuxMeL5XwKfnWAkZg'},
        //   {email: userId + '@example.com', description: 'Customer for ' + userId + '@example.com',  account_balance: userId, metadata: { firstName: userId + 'name', lastName: userId + 'surname'}});
  }

  shouldComponentUpdate () {
    return false
  }

  render () {
    const { routes, store } = this.props

    return (
      <Provider store={store}>
        <div style={{ height: '100%' }}>
          <Router history={browserHistory} children={routes} />
        </div>
      </Provider>
    )
  }
}

export default AppContainer
