import React from 'react';
import {
    Alert
} from 'react-bootstrap';

function DisplayErrorMessage(message = null, type = 'danger', setShowMsg) {
    return (
        <div>
            {message && (
                <Alert
                    variant={type}
                    onClose={() => setShowMsg(false)}
                    dismissible>

                    <Alert.Heading>{type === 'danger' ? 'Error' : 'Success'}</Alert.Heading>
                    <p>{message}</p>
                </Alert>
            )}
        </div>
    );
}

export default DisplayErrorMessage;
