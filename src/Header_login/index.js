import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import {
    Container,
    Divider,
    Dropdown,
    Grid,
    Header,
    Image,
    List,
    Menu,
    Segment,
  } from 'semantic-ui-react'
import logo from './youcoin.png'

class Header_login extends Component {
    state={
        activeIndex: 0
    }
    render() {
        const { activeIndex } = this.state
        return (
            <div>
            <Menu fixed='top' >
              <Container>
                <Menu.Item as='a' header>
                  <Link to="/"><Image size='small' src={logo} style={{ marginRight: '1.5em' }} /></Link>
                </Menu.Item>
                    
                <Dropdown item simple text='Menu'>
                  <Dropdown.Menu>
                      
                    <Dropdown.Item><Link to="/login">Login</Link></Dropdown.Item>
                    <Dropdown.Item><Link to="/register">Register</Link></Dropdown.Item>

                  </Dropdown.Menu>
                </Dropdown>

              </Container>
            </Menu>
        
          </div>
            )
    }
    
}

export default Header_login;
