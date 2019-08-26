import React, { Component } from 'react';
import { Card, Button, Form, Grid, Header, Image, Message, Segment} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Wallet extends Component{
    state={
        coins:[]
    }
    componentDidMount(){
        this.listCoins()
    }
    listCoins = async()=>{
        try{
            const createResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/${this.props.userInfo.id}`)
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
                    
                    <Link to={'/show'}>
                    <Card key={coins.id}
                        image={coins.channelPic}
                        header={coins.channelTitle}
                        description={coins.profit}
                        style={{'marginLeft': '5vw'}}
                    />
                    </Link>
                    
                )
            })}
        </main>
            
        )
    }
}


export default Wallet