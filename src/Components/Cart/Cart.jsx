import React, { Component } from 'react';
import './Cart.css'
import {
    Link
} from 'react-router-dom';


export default class Cart extends Component{
    constructor(props){
        super(props);
        this.state={list:this.props.order}  //setting the list items as we got from props
    }
    componentWillReceiveProps(nextProps){
        this.setState({list:nextProps.order,total:nextProps.total})  //set list of items and total cost when we update items in parent component and receive as props
    }
    changeHandler=(e,ind)=>{  //when qty of items is changed
        var new_list=this.state.list;
        new_list[ind][3]=e.target.value;
        this.setState({list:new_list,total:this.state.list.reduce((total,val,index)=>(total+val[2]*document.getElementsByClassName("qty")[index].value),0)})
    }
    clickHandler=()=>{ //when buy button is clicked set the list items and total to the callback function
        this.props.buy(this.state.list,this.state.total)
    }
    render(){
        console.log(this.state)
    return(
        <div className="final_cart">
        <h1>Cart</h1>
        {this.state.list.length>0 &&
        <>
        {this.state.list.map((val,index)=>(
            <div className="output" key={index}>
            <img src={val[0]} alt="vegetables"></img>
            <div className="name">{val[1]}</div>
            <div >Rs.{val[2]}</div>
            <input className="qty" type="number" onChange={(e)=>this.changeHandler(e,index)} defaultValue={val[3]}></input>
            </div>
        ))
        }
        <div id="cost">Total Rs:{this.state.total}</div>
        </>
        }
        <button id="buy" onClick={this.clickHandler}><Link to="/address">BUY NOW</Link></button>
        </div>
        
    )
    }
}
