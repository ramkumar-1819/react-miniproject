import './Header.css';

export default function Header(props){
    var total=props.order.length //shows number of items you add to the cart
    return(<div className="header">
    <h1>PRO MARKET</h1>
    <div id="cart_list" onClick={props.cartHandler}>🛒<div id="total">{total}</div></div>
</div>)
}