import React, { PropTypes } from 'react';

export const ApiStatusHandler = (props) => {
    const apiStatusInfo = (props.isFetching) ? 'BUSY' : 'RESTING';
    const error = props.errorMessage;

    return (
        <div>
            <div>API STATUS: { apiStatusInfo }</div>
            {error && <div>ERROR: { error }</div>}
        </div>
    );
};

ApiStatusHandler.propTypes = {
    isFetching: PropTypes.bool,
    errorMessage: PropTypes.string
};

export default ApiStatusHandler;
