import React from 'react'
import PropTypes from 'prop-types'
import { Navbar } from 'react-bootstrap'

const Header = props => {
  return (
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <a href=''>Delete Exif Web</a>
        </Navbar.Brand>
      </Navbar.Header>
    </Navbar>
  );
}

export default Header;
