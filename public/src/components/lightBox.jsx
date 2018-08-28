import React from 'react'
import {Alert} from 'reactstrap';
const LightBox = ({type, messages}) => {
    let color = 'info';
    if(type){
        color = type;
    }

    function message(){
        if(messages){
            return(
                <Alert color={color}>
                    <ul>
                        {messages.map((item, key) => <li key={key}>{item.content}</li>)}
                    </ul>
                </Alert>
            )
        }else{
            return (null)
        }
    }

    return (
        message()
    )
}

export {LightBox};