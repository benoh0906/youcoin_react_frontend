import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {Container, Button, Form, Grid, Header, Image, Message, Card, Icon} from 'semantic-ui-react';
class showCoin extends Component {

    state = {
        id: this.props.coins.id,
        channelUrl:this.props.coins.channelUrl,
        channelTitle:this.props.coins.channelTitle,
        channelId:this.props.coins.channelId,
        startingNum: this.props.coins.startingNum,
        currentNum: this.props.coins.currentNum,
        profit : this.props.coins.profit,
        createdDate : this.props.coins.createdDate,
        channelPic: this.props.coins.channelPic,
        user:this.props.coins.user.username
      }

    handleSell = async () =>{
        const sellCoinResponse = this.props.sellCoin(this.props.coins.id)
        sellCoinResponse.then((data) => {
            if(data.status.message === 'Success'){
                console.log('pw change success')
                this.props.history.push('/wallet')
            } else {
                console.log("fail")
              console.log(data, this.props)
            }
          }).catch((err) => {
            console.log(err)
          })
    
    }
    sellCoin = async (e) =>{
        try{
            const createResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/delete/${e}`,{
                method: 'DELETE',
                credentials: 'include',
                body: null,
                headers: {
        'Content-Type': 'application/json'
      }
            })
            const parsedResponse = await createResponse.json();
            return parsedResponse
        } catch(err){
            console.log(err)
        }
    }
    render(){
        return(
            <Card raised key={this.props.coins.id}
                        image={this.props.coins.channelPic}
                        header={this.props.coins.channelTitle}
                        description={'Profit: '+this.props.coins.profit}
                        style={{'marginLeft': '5vw'}}
                        extra={<Button onClick={this.handleSell}>Sell</Button>}
                    />
        )
    }
}

export default withRouter(showCoin);
