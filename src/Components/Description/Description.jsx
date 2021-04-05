import React, { Component } from 'react';
import './Description.css'

export default class Description extends Component{
    clickHandler=()=>{ //when edit buttton is clicked you can able to edit the content
        document.getElementsByTagName("textarea")[0].disabled=false;
    }
    //this function will update the content you edit to main list in home component
    changeHandler=(e)=>{
        this.props.updater(this.props.clicked.id-1,e.target.value)
    }
    render(){
        return(<div className="main">
               <div>{this.props.clicked.name}</div>
               <div className="description">
               <img src={this.props.clicked.image} alt="vegetable"></img>
               <textarea disabled defaultValue={this.props.clicked.description} onChange={this.changeHandler}></textarea>
               </div>
               <button  onClick={this.clickHandler}>Edit</button>
        </div>)
    }
}