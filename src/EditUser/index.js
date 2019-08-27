import React, { Component } from 'react';
import { Button, Form, Grid, Header, Message, Segment} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class EditUser extends Component{
    state={
        username: this.props.userInfo.username,
        email: this.props.userInfo.email,
        password:''
    }
    componentDidMount(){
        const user = JSON.parse(localStorage.getItem("user"))
        if (user){
        this.setState({
            username: user.username,
            email:user.email,
            id:user.id,
            profit:user.id,
            loading:user.loading
        })

    }
    console.log(this.state,'<-mounted')
  }
    
    
    handleChange = (e)=>{
        console.log(e.target,"<-e.target")
        console.log(e.target.name,'<-e.target.name')
        console.log(e.target.value,'<-e.target.value')
        
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit = async (e) =>{
        e.preventDefault();

        console.log(this.state,'<-edit user state')
        const editUser = this.props.editUser(this.state);
  
      editUser.then((data) => {
        if(data.status.message === 'Success'){
          this.props.history.push('/profile')
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
                Edit
              </Header>
              <Form onSubmit={this.handleSubmit}>
                  <Segment stacked>
                  Username:
                  <Form.Input fluid icon='user' iconPosition='left' placeholder='username' value={this.state.username} type='text' name='username' onChange={this.handleChange}/>
                  Email:
                  <Form.Input fluid icon='mail' iconPosition='left' placeholder='email' value={this.state.email} type='text' name='email' onChange={this.handleChange}/>
                  Password:
                  <Form.Input fluid icon='lock' iconPosition='left' type='password' name='password' onChange={this.handleChange}/>
                  <Button fluid size='large' type='sumbit'>Edit</Button>
                  <Message>
                    Edit Password<Link to='/pw'>Edit Password</Link>
                  </Message>
                </Segment>
              </Form>
            </Grid.Column> 
          </Grid>
        )
    }
}


export default EditUser;
