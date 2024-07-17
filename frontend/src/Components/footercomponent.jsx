// Footer.js
import React from 'react';
import { Box, Button } from '@mui/material';
import { styled } from '@mui/system';

const FooterContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-start',
  width: '100%',
  padding: '16px 0',
  position: 'fixed',
  bottom: '0',
  left: '0',
  zIndex: 1000,
  backgroundColor: 'white', // To ensure the footer is visible
  borderTop: '1px solid #ccc', // Optional: for a border at the top of the footer
});

const FooterButton = styled(Button)({
  margin: '0 8px',
  backgroundColor: 'red',
  color: 'white',
  border: '1px solid red',
  '&:hover': {
    backgroundColor: 'darkred',
  },
});

const Footer = ({ showTable, showForm, setShowTable, setShowForm }) => {
  return (
    <FooterContainer>
      <FooterButton
        className={showTable ? 'hideButton' : 'showButton'}
        onClick={() => setShowTable(!showTable)}
        style={{
          backgroundColor: showTable ? 'white' : 'red',
          color: showTable ? 'red' : 'white',
          border: '1px solid red',
        }}
      >
        {showTable ? 'Hide Grid' : 'Show Grid'}
      </FooterButton>
      <FooterButton
        className={showForm ? 'hideButton' : 'showButton'}
        onClick={() => setShowForm(!showForm)}
        style={{
          backgroundColor: showForm ? 'white' : 'red',
          color: showForm ? 'red' : 'white',
          border: '1px solid red',
        }}
      >
        {showForm ? 'Hide Form' : 'Show Form'}
      </FooterButton>
    </FooterContainer>
  );
};

export default Footer;
