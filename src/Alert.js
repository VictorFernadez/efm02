// Alert.jsx

import React from 'react';
import './styles.css';

const Alert = ({ message, success }) => {
    return (
        <div className={`alert ${success ? 'alert-success' : 'alert-danger'} alert-dismissible fade show`} role="alert">
            {message}
        </div>
    );
};

export default Alert;
