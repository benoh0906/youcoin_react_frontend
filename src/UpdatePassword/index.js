import React, { Component } from 'react';
import { Button, Form, Grid, Header, Message, Segment} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class UpdatePassword extends Component{
    state={
        password:'',
        newPw:'',
        confirmPw:''
    }


    
    handleChange = (e)=>{
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit = async (e) =>{
        e.preventDefault();

        const updatePassword = this.props.updatePassword(this.state);
  
      updatePassword.then((data) => {
        if(data.status.message === 'Success'){
            console.log('pw change success')
            this.props.logout()
            this.props.history.push('/login')
        } else {
            console.log("fail")
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
                Update Password
              </Header>
              <Form onSubmit={this.handleSubmit}>
                  <Segment stacked>
                  Old Password:
                  <Form.Input fluid icon='lock' iconPosition='left' placeholder='old password' type='password' name='password' onChange={this.handleChange}/>
                  New Password:
                  <Form.Input fluid icon='lock' iconPosition='left' placeholder='email'  type='password' name='newPw' onChange={this.handleChange}/>
                  Confirm Password:
                  <Form.Input fluid icon='lock' iconPosition='left' type='password' name='confirmPw' onChange={this.handleChange}/>
                  <Button fluid size='large' type='sumbit'>Update</Button>
                  
                </Segment>
              </Form>
            </Grid.Column> 
          </Grid>
        )
    }
}


export default UpdatePassword;
