import React, { Component } from 'react';
import './Bill.css'

function Bill(props){
   //contain table of itmes you order and total and address
    return(<div className="bill">
        <h1>PROMARKET</h1>
        <table id="table">
            <caption>BILL</caption>
            <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
            </tr>
            {props.list.map((val,index)=>(
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{val[1]}</td>
                    <td>{val[3]}</td>
                    <td>{val[2]}</td>
                </tr>
            ))}
        <div id="tot">Total - Rs.{props.total}</div>
        </table>
        
        <div className="adds">
            <b>Delivered to:</b>
            <address>
                Name: {props.address["Name"]}<br></br>
                DoorNumber: {props.address["DoorNumber"]}<br></br>
                Street: {props.address["Street"]}<br></br>
                City: {props.address["City"]}<br></br>
                PinCode: {props.address["PinCode"]}<br></br>
                ContactNumber: {props.address["ContactNumber"]}<br></br>
            </address>
        </div> 
    </div>)
}
export default Bill


