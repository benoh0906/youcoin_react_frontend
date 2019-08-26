import React, { Component } from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment} from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';

class CreateCoin extends Component{
    state = {
        channelUrl: "",
    }
    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }
    handleSubmit = async (e) => {
        e.preventDefault();

        const createCoin = this.props.create(this.state);
    
        createCoin.then((data) => {
          if(data.status.message === 'Success'){
            this.props.history.push('/create')
          } else {
            console.log(data, this.props)
          }
        }).catch((err) => {
          console.log(err)
        })
    }
    
    render(){
        return(
            <Grid textAlign='center' verticalAlign='middle' style={{ height: '100vh'}}>
                <Grid.Column style={{maxWidth: 450}}>
                    <Header as='h2' textAlign='center'>
                        Buy Coin
                    </Header>
                    <Form onSubmit={this.handleSubmit}>
                        <Segment stacked>
                            Channel URL:
                                <Form.Input   placeholder='Channel URL' type='text' name='channelUrl' onChange={this.handleChange}/>

                            <Button fluid size='large' type='sumbit'>Create</Button>
                            
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
        )
    }
}

export default withRouter(CreateCoin);