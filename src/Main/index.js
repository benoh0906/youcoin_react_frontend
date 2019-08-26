import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Form, Grid, Header, Image, Message, Segment} from 'semantic-ui-react';

import Header_login from '../Header_login'
import Header_logout from '../Header_logout'


class Main extends Component {
    state={
        coins:[]
    }
    componentDidMount(){
        this.callRanking();
    }
    callRanking = async() =>{
        try{
            const createResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/main`)
            if(createResponse.status!==200){
                throw Error('404 from server')
            }
            console.log(createResponse)

            const parsedResponse = await createResponse.json();
            console.log(parsedResponse,'<-parsedresponse')

            this.setState({coins: parsedResponse.data});
            console.log(this.state.coins,'<-this.state.coins')

            return parsedResponse
        }catch(err){
            console.log(err)
        }

    }
    render(){
        return(
            <main>
                
                {this.state.coins.map((coins)=>{
                    return(

                        <Card key={coins.id}
                        image={coins.channelPic}
                        header={coins.channelTitle}
                        meta={'Owner: '+coins.user.username}
                        description={'Profit: '+coins.profit}
                        style={{'marginLeft': '5vw'}}
                    />
                    )
                })}
            </main>
        )
    }
}


export default Main