import React from 'react'
import Contacts from './Contacts'

const Home = (props) => {

    return (
        <div>
            <Contacts showAlert={props.showAlert} mode={props.mode} setName={props.setName} name={props.name} />
        </div>
    )
}

export default Home
