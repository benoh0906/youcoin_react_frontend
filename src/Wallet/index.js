import React, { Component } from 'react';
import { Card, Button, Form, Grid, Header, Image, Message, Segment} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Show from '../Show'
import { async } from 'q';
class Wallet extends Component{
    state={
        coins:[],
        profit:this.props.userInfo.profit,
        username:'',
        id:''
    }

    listCoins = async()=>{
        try{
            const createResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/${this.props.userInfo.id}`)
            if(createResponse.status!==200){
                throw Error('404 from server')
            }

            const parsedResponse = await createResponse.json();

            this.setState({coins: parsedResponse.data});

            return parsedResponse
        }catch(err){
            console.log(err)
        }
        
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

            this.listCoins()
            this.updateProfit()

            return parsedResponse
        } catch(err){
            console.log(err)
        }
    }
    updateProfit = async ()=>{
    try{
        const profitResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/profit/${this.props.userInfo.id}`)
        const parsedResponse = await profitResponse.json();
        this.setState({
        profit: parsedResponse.data
        })
    }catch(err){
        console.log(err)
    }
    }
        
    componentDidMount(){
        this.listCoins()
        this.updateProfit()

    }

    render(){


    return(
        <main>
            
          
            <Card.Group centered>
                <div class="ui card">
                    <div class="content">
                    <div class="header">Curret Profit</div>
                    <div class="meta">{this.props.userInfo.username}</div>
                    <div class="description">
                        Profit:{this.state.profit}
                    </div>
                    </div>
                </div>
                </Card.Group>
            
            <Card.Group centered itemsPerRow={4}>
                
                {this.state.coins.map((coins)=>{
                    return(

                        <Show sellCoin={this.sellCoin} coins={coins} />
                        
                    )
                })}
            </Card.Group>
        </main>
            
        )
    }
}


export default Wallet