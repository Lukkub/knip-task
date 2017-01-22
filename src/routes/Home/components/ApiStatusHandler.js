import React, { PropTypes } from 'react';

export const ApiStatusHandler = (props) => {
    const apiStatusInfo = (props.isFetching) ? 'BUSY' : 'RESTING';

    const error = props.errorMessage;
    return (
        <div>
            <h4>API STATUS: { apiStatusInfo }</h4>
            {error && <h4>ERROR: { error }</h4>}
        </div>
    );
};

ApiStatusHandler.propTypes = {
    isFetching: PropTypes.bool,
    errorMessage: PropTypes.string
};

export default ApiStatusHandler;
