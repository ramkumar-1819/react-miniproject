import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';
import axios from 'axios';
import Description from '../Description/Description';
import Cart from '../Cart/Cart';
import Header from '../Header/Header';
import './Home.css';
import Bill from '../Bill/Bill';
import Address from '../Address/Address';

var obj;                                             //this variable used to hold values that you order
export default class Home extends Component{
    constructor(){
        super();
        this.state={items:"",order:[],val1:"",val2:"",address:""} //item hold all datas and order hold what are all the things that you order and val1 and val2 are the items and total of items that used to generate a bill and address hold the address you entered in address form component.
    }

    componentDidMount(){                                //fetching from api using axios and setting in the state
        axios.get("https://api.mocki.io/v1/7bd0682b")
        .then(res=>this.setState({items:res.data.products}))
        .catch(err=>console.log(err))
    }

    cartHandler=()=>{                                    //when cart symbol is clicked
        if(document.getElementById("total").innerHTML==="0"){
            alert("No items in the Cart")
        }
        else{
        document.getElementsByClassName("cart")[0].style.display="block";
        document.getElementById("popup_section").style.display="block";
        }
    }

    clickHandler=(val)=>{                                //when you click on the image you are popup to the description page so u need the details to shown there for this we set these details in state
          this.setState({clicked:val})
    }
     
    updateHandler=(id,val)=>{                            //this function is passed to Description component as callback function and this perform when you edit the description and save the value.
          var updated_obj=this.state.items
          updated_obj[id].description=val 
          this.setState({items:updated_obj})
    }

    inc_dec_Handler=(val,ind)=>{                          //this function is used to increment or decrement the order quantity
           var inp_val= Number(document.getElementsByClassName("input")[ind].value)
            if(val==="+"){
                document.getElementsByClassName("input")[ind].value=inp_val+1
            }
            else if(val==="-" && inp_val>1){
                document.getElementsByClassName("input")[ind].value=inp_val-1
            }
    }

    orderHandler=(val,qty)=>{                             //when you click add to cart button, this function is called and perform the necessary action 
        document.getElementsByClassName("popup")[0].style.display="block";//showing the popup section
        document.getElementById("popup_section").style.display="block"; 
        var img=val.image;
        var name=val.name;
        var price=val.price;
        var quantity=qty;
        obj=[img,name,price,quantity]
        //setting the order values in obj object
    }
     
    cancel_ok=(val)=>{                                       //if ok is clicked then add order to state else it doesn't do nothing
        if(val==="cancel"){
            document.getElementsByClassName("popup")[0].style.display="none";
            document.getElementById("popup_section").style.display="none";
        }
        else if(val==="ok"){
            document.getElementsByClassName("popup")[0].style.display="none";
            document.getElementById("popup_section").style.display="none";
            var odr=this.state.order
            odr.push(obj)
            var total=odr.reduce((totl,val)=>(totl+val[2]*val[3]),0)
            this.buy_now(odr,total)
            this.setState({order:odr,total:total})
        }
    }

    buy_now=(arr,tot)=>{                                    //passed as a callback function to cart component to get the list items and total of items.
       this.setState({val1:arr,val2:tot})
    }
    get_address=(val)=>{                                     //passed as a callback function to address component
        this.setState({address:val})
    }
    render(){
        return(
            <Router basename={window.location.pathname || ''}>
                <>
                <Switch>
                <Route exact path="/">
                <Header order={this.state.order} cartHandler={this.cartHandler}/>
                        {this.state.items &&
                            <div className="container">
                                <div id="list">
                            {this.state.items.map((val,index)=>(
                                <div key={val.id} className="items">
                                    <div><Link to="/description"><img src={val.image} alt="vegetables pics" onClick={()=>this.clickHandler(val)}></img></Link></div>
                                    <div>{val.name}</div>
                                    <div>Rs:{val.price}</div>
                                    <div className="inputs"><button onClick={()=>this.inc_dec_Handler("+",index)}>+</button><input className="input" type="number" min="1" defaultValue="1"></input><button onClick={()=>this.inc_dec_Handler("-",index)}>-</button></div>
                                    <button onClick={()=>this.orderHandler(val,document.getElementsByClassName("input")[index].value)}>Add to Cart</button>
                                </div>
                            ))
                            }
                            </div>
                            <div id="popup_section"></div>
                            <div className="popup">
                                <div>Waiting for your Order Confirmation?</div>
                                <div>
                                <button onClick={()=>this.cancel_ok("cancel")}>Cancel</button>
                                <button onClick={()=>this.cancel_ok("ok")}>Ok</button>
                                </div>
                            </div>
                            <div className="cart">
                            <Cart order={this.state.order} buy={this.buy_now} total={this.state.total} />
                            </div>
                            </div>
                        } 
                        </Route> 
                        <Route path="/description">
                        <Description clicked={this.state.clicked} updater={this.updateHandler}/>
                        </Route>
                        <Route path="/address">
                            <Address address={this.get_address}/>
                        </Route>
                        <Route path="/payment">
                        <Bill list={this.state.val1} total={this.state.val2} address={this.state.address}/>
                       </Route>
        
                </Switch>
                </> 
            </Router>
        )
    }
}

