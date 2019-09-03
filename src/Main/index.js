import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Form, Grid, Header, Image, Message, Segment} from 'semantic-ui-react';
import Header_login from '../Header_login'
import Header_logout from '../Header_logout'


class Main extends Component {
    state={
        coins:[],
        users:[]
    }
    componentDidMount(){
        this.callRanking();
        this.callUserRanking();
    }
    callUserRanking = async() =>{
        try{
            const createResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/rank`)
            if(createResponse.status !==200){
                throw Error('404 from server')
            }
            const parsedResponse = await createResponse.json();
            this.setState({users: parsedResponse.data});
            return parsedResponse

        } catch(err){
            console.log(err)
        }
    }
    callRanking = async() =>{
        try{
            const createResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/main`)
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

    render(){
 
        return(
            <main>
                <Header as='h2'>Top 5 Users</Header>
                <Card.Group centered itemsPerRow={5}>
                {this.state.users.map((users)=>{
                    return(
                        <Card raised key={users.id}
                            header={users.username}
                            description={'Profit: '+users.profit}
                            style={{'marginLeft': '5vw'}}
                        />
                    )
                })}
                </Card.Group>

                <Header as='h2'>Top 5 Coins</Header>
                <Card.Group centered itemsPerRow={5}>
                {this.state.coins.map((coins)=>{
                    return(
                        <Card raised key={coins.id}
                            image={coins.channelPic}
                            header={coins.channelTitle}
                            description={'Profit: '+coins.profit}
                            meta={'User: '+coins.user.username}
                            style={{'marginLeft': '5vw'}}
                        />
                    )
                })}
                </Card.Group>

            </main>
        )
    }
}


export default Main