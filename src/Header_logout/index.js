import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
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
import { parse } from '@babel/parser';

class Header_logout extends Component {
    state = { activeIndex: 0 }

    handleClick = (e, titleProps) => {
      const { index } = titleProps
      const { activeIndex } = this.state
      const newIndex = activeIndex === index ? -1 : index
      this.setState({ activeIndex: newIndex })
    }

    handleSubmit = async (e) => {
      e.preventDefault();
      const logout = this.props.logout();
      this.props.history.push('/login')
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
                  <Dropdown.Item><Link to="/profile">Profile</Link></Dropdown.Item>
                  <Dropdown.Item><Link to="/create">Buy Coin</Link></Dropdown.Item>
                  <Dropdown.Item><Link to="/wallet">Wallet</Link></Dropdown.Item>
                  <Dropdown.Item onClick={this.handleSubmit}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

            </Container>
          </Menu>
      
        </div>
      )
    }
}

export default withRouter(Header_logout);
