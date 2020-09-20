import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import car from '../Images/photo.jpg';

const styles = {
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundImage: `url(${car})`,
    position: 'realtive', width: '100 %', height: '100 %'
}
export class Layout extends Component {
  static displayName = Layout.name;

  render () {
      return (
          <div>
              <NavMenu />
              <div style={styles}>
              <Container>
          {this.props.children}
            </Container>
              </div>
              </div>
      
    );
  }
}
