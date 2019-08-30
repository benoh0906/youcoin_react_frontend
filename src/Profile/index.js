import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Container, Button, Item, Form, Grid, Header, Image, Message, Card, Icon} from 'semantic-ui-react';
class Profile extends Component {
    state = {
        id: 0,
        email: "",
        username: "",
        profit:0
    }
    updateProfit = async ()=>{
        try{
            console.log('hitupdateprofit')
            const profitResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/profit/${this.props.userInfo.id}`)
            const parsedResponse = await profitResponse.json();
            this.setState({
            profit: parsedResponse.data
            })
            console.log(parsedResponse.data,'<updateprofit')
        }catch(err){
            console.log(err)
        }
    }
    componentDidMount(){
        this.updateProfit()
    }
    
    render(){
        return(
            <Grid centered columns={3} padded celled='internally' style={{ height: '100vh'}}>

                <Grid.Row>

                    <Grid.Column>
                        <Grid.Row>
                            <Header as='h2' textAlign='center' style={{ marginBottom: '1em' }}>
                                Profile Page
                            </Header>
                        </Grid.Row>

                        <Grid.Row>
                            <Item.Group>
                                <Item>
                                    <Item.Content>
                                        <Item.Header>Username: {this.props.userInfo.username}</Item.Header>
                                        <Item.Description>
                                            Email: {this.props.userInfo.email}<br/>
                                            Profit: {this.state.profit}
                                        </Item.Description>
                                        <Item.Extra>
                                        <Button><Link to="/editUser">Edit User Info</Link></Button>
                                        <Button><Link to="/updatePassword">Update Password</Link></Button>
                                        </Item.Extra>
                                    </Item.Content>
                                </Item>   
                            </Item.Group>                         
                        </Grid.Row>
                        
                    </Grid.Column>

                </Grid.Row>

            </Grid>
      
        )
    }
}

export default Profile;
