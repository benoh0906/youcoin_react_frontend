import React , { Component} from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import {Container} from 'semantic-ui-react'
import Register from './Register';
import Login from './Login';
import Profile from './Profile';
import CoinContainer from './CoinContainer';
import Wallet from './Wallet'
import Main from './Main'
import Header_login from './Header_login';
import Header_logout from './Header_logout';
import Show from './Show'
import EditUser from './EditUser'
import UpdatePassword from './UpdatePassword'
import { async } from 'q';

const My404 =() =>{
  return(
    <div>
      You are lost
    </div>
  )
}

class App extends Component {
  state = {
    id:0,
    username:"",
    email:"",
    profit:0,
    loading:true
  }

  componentDidMount(){
    const user = JSON.parse(localStorage.getItem("user"))
    if (user){
      this.setState({
        id:user.id,
        username:user.username,
        profit:user.profit,
        email:user.email,
        loading:user.loading
      })

    }
  }
  
  editUser = async(data)=>{
    try{
      const editResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/${this.state.id}`,{
        method:"PUT",
        credentials:"include",
        body:JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const parsedResponse = await editResponse.json();
      localStorage.setItem("user", JSON.stringify(parsedResponse.data))
      this.setState({ 
        ...parsedResponse.data,
        loading: false
      })
      return parsedResponse;
    }catch (err){
      console.log(err)
    }
  }
  updatePassword = async(data)=>{
    try{
      const editResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/pw/${this.state.id}`,{
        method:"PUT",
        credentials:"include",
        body:JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const parsedResponse = await editResponse.json();
      return parsedResponse

    } catch(err){
      console.log(err)
    }
  
  }

  register = async (data) => {
    try {

      const registerResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/register`, {
        method: 'POST',
        credentials: 'include',// on every request we have to send the cookie
        body: data,
        headers: {
          'enctype': 'multipart/form-data' //for form way

       }
     })


     const parsedResponse = await registerResponse.json();
    localStorage.setItem("user", JSON.stringify(parsedResponse.data))


     this.setState({ 
       ...parsedResponse.data,
       loading: false
     })
     return parsedResponse;

   } catch (err) {
     console.log(err)
   }
 }

 logIn = async (loginInfo) => {
  try {

    const loginResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/login`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(loginInfo),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const parsedResponse = await loginResponse.json();
    localStorage.setItem("user", JSON.stringify(parsedResponse.data))

    this.setState(() => {
      return {
        ...parsedResponse.data,
        loading: false
      }
    })
    return parsedResponse

  } catch (err) {
    console.log(err)
  }
}
  logout = async() =>{

    localStorage.clear()
    
    this.setState(()=>{
      return{
        id:0,
        username:"",
        email:"",
        profit:0,
        loading:true
      }
    
    })
  }

  render() {
    return(
      <main>
          {
              this.state.loading ?
              <main>
              <Header_login/> 
              <Container style={{ marginTop: '7em' }}>
                <Switch>
                  <Route exact path="/" render = {(props)=> <Main {...props} userInfo={this.state} /> }/>
                  <Route exact path="/login" render={(props) => <Login {...props} logIn={this.logIn} />} />
                  <Route exact path="/register" render={(props) => <Register {...props} register={this.register} /> } />
                  <Route exact path="/profile" render={(props) =>  <Main {...props} userInfo={this.state} />  } />
                  <Route exact path="/create" render={(props) =>  <Main {...props} userInfo={this.state} /> } />
                  <Route exact path="/wallet" render={(props) =>  <Main {...props} userInfo={this.state} /> } />
                  <Route exact path="/show" render={(props) => <Main {...props} userInfo={this.state} /> } />
                  <Route exact path="/editUser" render={(props) =>  <Main {...props} userInfo={this.state} /> } />
                  <Route exact path="/updatePassword" render={(props) =>  <Main {...props} userInfo={this.state} /> } />

                  <Route component={My404} />        
                </Switch>
              </Container>
              </main>
              
              :
              <main>
              <Header_logout userInfo={this.state} logout={this.logout}/>
              <Container text style={{ marginTop: '7em' }}>
                <Switch>

                  <Route exact path="/" render = {(props)=> <Main {...props} userInfo={this.state} /> }/>
                  <Route exact path="/login" render={(props) => <Login {...props} logIn={this.logIn} />} />
                  <Route exact path="/register" render={(props) => <Register {...props} register={this.register} /> } />
                  <Route exact path="/profile" render={(props) =>  <Profile {...props} userInfo={this.state}/> } />
                  <Route exact path="/create" render={(props) =>  <CoinContainer {...props} userInfo={this.state} /> } />
                  <Route exact path="/wallet" render={(props) =>  <Wallet {...props}   userInfo={this.state} /> } />
                  <Route exact path="/show" render={(props) =>  <Show {...props} userInfo={this.state} /> } />
                  <Route exact path="/editUser" render={(props) =>  <EditUser {...props} editUser={this.editUser} userInfo={this.state} /> } />
                  <Route exact path="/updatePassword" render={(props) =>  <UpdatePassword {...props} logout={this.logout} updatePassword={this.updatePassword} userInfo={this.state} /> } />

                  <Route component={My404} />        
                </Switch>
            </Container>
            </main>
            }
        </main>

    )
  }
}

export default App;
