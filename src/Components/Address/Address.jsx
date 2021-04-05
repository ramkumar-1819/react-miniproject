import { Component } from "react";
import { Link } from "react-router-dom";
import './Address.css'

export  default class Address extends Component{
    constructor(){
        super();
        this.state={isrender:false} //if isrender is true then popup appear and that hold link to bill component
    }
    submitting=(e)=>{ //when form submitted then the details is sent to home component by using the callback function we received as props
        var details={Name:document.getElementById("name").value,
                     DoorNumber:document.getElementById("dno").value,
                     Street:document.getElementById("street").value,
                     City:document.getElementById("city").value,
                     PinCode:document.getElementById("pin").value,
                     ContactNumber:document.getElementById("contact").value
                    }
        this.props.address(details)
        this.setState({isrender:true})
        e.preventDefault()
    }
    clickHandler=()=>{
        this.setState({isrender:false})
    }
    render(){
    return(
        <>
        <div id="head">
        <h1>PROMARKET</h1>
        <div>Please fill your Address to deliver the products</div>
        </div>
        <form onSubmit={this.submitting} id="form">
            <label>Name</label>
            <input type="text" required id="name"></input>
            <label>DoorNumber</label>
            <input type="text" required id="dno"></input>
            <label>Street</label> 
            <input type="text" required id="street"></input>
            <label>City</label>
            <input type="text" required id="city"></input>
            <label>Pincode</label>
            <input type="number" required id="pin"></input>
            <label>ContactNumber</label>
            <input type="number" required id="contact"></input>
            <button type="submit">PROCEED</button>
        </form>
        {this.state.isrender===true &&
        <>
        <div id="hide"></div>
        <div id="pop">
            <div>Can we Proceed to Bill?</div>
            <div className="yes_no">
            <button onClick={this.clickHandler}>No</button>
            <button><Link to="/payment">Yes</Link></button>
            </div>
        </div>     
        </>
        }
        </>
    )
    }
}