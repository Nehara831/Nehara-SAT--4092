import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const MessageBox = ({ message, onClose }) => {
  const messageBoxStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };

  return (
    <Snackbar
      open={message !== null}
      autoHideDuration={3000}
      onClose={onClose}
    >
      <Alert severity="success" onClose={onClose} style={messageBoxStyle}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default MessageBox;
