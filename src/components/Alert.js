import React from 'react'

export default function Alert(props) {

    const alertStyle = {
        height: "50px",
        display: "flex",
        paddingLeft: "4px",
        // justifyContent: center,
        alignItems: "center"
    }
    // const capitalize = (message) => {
    //     if (message === "danger") {
    //         message = "Error";
    //     }
    //     let lower = message.toLowerCase();
    //     return lower.charAt(0).toUpperCase() + lower.slice(1);
    // }
    return (
        <div className='container' style={{ height: "50px" }}>
            {props.alert &&
                <div style={alertStyle} className={`alert-${props.alert.type} alert-dismissible fade show`} role="alert">
                    {/* <strong>{capitalize(props.alert.type)}</strong>:  */}
                    {props.alert.msg}

                </div>}
        </div>

    )
}

