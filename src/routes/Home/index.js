import { injectReducer } from '../../store/reducers';

export default (store) => ({
    path : '',
  /*  Async getComponent is only invoked when route matches   */
    getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
        require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
            const Counter = require('./containers/HomeContainer').default;
            const reducer = require('./modules/customers').default;

      /*  Add the reducer to the store on key 'customers'  */
            injectReducer(store, { key: 'customers', reducer });

      /*  Return getComponent   */
            cb(null, Counter);

    /* Webpack named bundle   */
        }, '');
    }
});
