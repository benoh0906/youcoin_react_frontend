import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';
import CreateCoin from '../CreateCoin'
import { async } from 'q';

class CoinContainer extends Component {
    state = {
      user: this.props.userInfo.id,
      channelUrl: "",
      channelTitle:"",
      channelId:"",
      startingNum: 0,
      currentNum: 0,
      profit : 0,
      createdDate : ""
    }


    componentDidMount(){
      this.setState({user: this.props.userInfo.id});
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

    create = async (coinInfo)=>{
      try {
        coinInfo["user"]=JSON.parse(localStorage.getItem("user")).id
        const loginResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/`, {
          method: 'POST',
          credentials: 'include',
          body: JSON.stringify(coinInfo),
          headers: {
            'Content-Type': 'application/json'
          }
        })
  
        const parsedResponse = await loginResponse.json();
  
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

    render(){
      return(
        <main>
          <CreateCoin userInfo={this.state} create = {this.create}/>
        </main>
        )
    }
}

export default CoinContainer;

