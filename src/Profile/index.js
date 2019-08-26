import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Container, Button, Form, Grid, Header, Image, Message, Card, Icon} from 'semantic-ui-react';
class Profile extends Component {
    state = {
        id: 0,
        email: "",
        username: "",
        profit:0
    }
    
    render(){
        return(
            <Grid centered columns={3} padded celled='internally' style={{ height: '100vh'}}>

                <Grid.Row>

                    <Grid.Column>
                        <Grid.Row>
                            
                        </Grid.Row>
                        <Grid.Row>
                            <Header as='h2' textAlign='center' style={{ marginBottom: '1em' }}>
                                Profile Page
                            </Header>
                            Username: {this.props.userInfo.username}
                        </Grid.Row>
                        <Grid.Row>
                            Email: {this.props.userInfo.email}
                        </Grid.Row>
                        <Grid.Row>
                            Profit: {this.props.userInfo.profit}
                        </Grid.Row>
                        <Grid.Row>
                            <Button><Link to="/editUser">Edit</Link></Button>
                        </Grid.Row>
                    </Grid.Column>

                </Grid.Row>

            </Grid>
      
        )
    }
}

export default Profile;
